const express = require('express')
const router = express.Router()
const { admin, db } = require('../utils/admin')
const config = require('../utils/config')
const fbAuth = require('../utils/fbAuth')

const { reduceUserDetails } = require('../utils/validators') 

//UPLOAD PROFILE PHOTO
router.post('/image', fbAuth, (req, res) => {
    const Busboy = require('busboy')
    const path = require('path')
    const os = require('os')
    const fs = require('fs')

    const busboy = new Busboy({ headers: req.headers })

    let imageFileName;
    let imageToBeUploaded = {};

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        if( mimetype !== 'image/jpeg' && mimetype !== 'image/png' ){
            return res.status(400).json({ error: 'Wrong file Type.'})
        }
        const imageExt = filename.split('.')[filename.split('.').length-1]  
        imageFileName = `${Math.round(Math.random()*10000000000)}.${imageExt}`
        const filepath = path.join(os.tmpdir(), imageFileName);
        imageToBeUploaded = { filepath, mimetype };
        file.pipe(fs.createWriteStream(filepath))
    })
    busboy.on('finish', () => {
        admin.storage().bucket().upload(imageToBeUploaded.filepath, {
            resumable: false,
            metadata: {
                metadata: {
                    contentType: imageToBeUploaded.mimetype
                }
            }
        })
        .then(() => {
            const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`
            return db.doc(`/users/${req.user.handle}`).update({ imageUrl })
        })
        .then(() => {
            return res.json({ message: 'Image uploaded successfully '})
        })
        .catch(err => {
            console.error(err)
            return res.status(500).json({ error: err.code })
        })
    })
    busboy.end(req.rawBody);
})

//UPDATE USER DETAILS
router.post('/details', fbAuth, (req, res) => {
    let userDetails = reduceUserDetails(req.body)
    db.doc(`/users/${req.user.handle}`).update(userDetails)
        .then(() => {
            return res.json({ message: 'Profile info updated'})
        })
        .catch((err) => {
            console.error(err)
            return res.status(500).json({ error: err.code })
        })
})

//GET USER DETAILS
router.get('/', fbAuth, (req, res) => {
    let userData = {}

    db.doc(`/users/${req.user.handle}`).get()
        .then((doc) => {
            if(doc.exists) {
                userData.credentials = doc.data()
                return db.collection('likes')
                    .where('userHandle', '==', req.user.handle)
                    .get()
            }
        })
        .then((data) => {
            userData.likes = []
            data.forEach(doc => {
                userData.likes.push(doc.data())
            })
            return db.collection('notifications').where('recipient', '==', req.user.handle)
                .orderBy('createdAt', 'desc').limit(10).get()
        })
        .then((data) => {
            userData.notifications = []
            data.forEach(doc => {
                userData.notifications.push({
                    recipent: doc.data().recipient,
                    sender: doc.data().sender,
                    createdAt: doc.data().createdAt,
                    screamId: doc.data().screamId,
                    type: doc.data().type,
                    read: doc.data().read,
                    notificationId: doc.id
                })
            })
            return res.json(userData)
        })
        .catch(err => {
            console.error(err)
            return res.status(500).json({ error: err.code })
        })
})

//DETAIL OF PARTICULAR USER
router.get('/:handle', fbAuth, (req, res) => {
    let userData = {};

    db.doc(`/users/${req.params.handle}`).get()
        .then(doc => {
            if(doc.exists) {
                userData.user = doc.data()
                return db.collection('screams').where('userHandle', '==', req.params.handle)
                    .orderBy('createdAt', 'desc')
                    .get()
            } else {
                return res.status(404).json({ error: 'User not found.' })
            }
        }) 
        .then(data => {
            userData.screams = []
            data.forEach(doc => {
                userData.screams.push({
                    body: doc.data().body,
                    createdAt: doc.data().createdAt,
                    userHandle: doc.data().userHandle,
                    userImage: doc.data().userImage,
                    likeCount: doc.data().likeCount,
                    commentCount: doc.data().commentCount,
                    screamId: doc.id
                }) 
            })
            return res.json(userData)
        })
        .catch(err => {
            console.error(err)
            return res.status(500).json({ error: err.code })
        })
})

//MARK NOTIFICATION AS READ
router.post('/notifications', fbAuth, (req, res) => {
    let batch = db.batch()

    req.body.forEach(notificationId => {
        const notification = db.doc(`/notifications/${notificationId}`)
        batch.update(notification, { read: true })
    })

    batch.commit()
        .then(() => {
            return res.json({ message: 'Notification marked read'})
        })
        .catch(err => {
            console.error(err)
            return res.status(500).json({ error: err.code })
        })
})


module.exports = router;
