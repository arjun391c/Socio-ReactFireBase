const app = require('express')();
const cors = require('cors')
const functions = require('firebase-functions');

const { db } = require('./utils/admin');

app.use(cors());

/* =======================Routes================================ */
app.use('/screams', require('./routes/screamsRoutes'))
app.use('/auth', require('./routes/authRoutes'))
app.use('/user', require('./routes/usersRoutes'))

exports.api = functions.https.onRequest(app);

exports.createNotificationOnLike = functions.firestore.document('likes/{id}')
    .onCreate((snapshot) => {
        return db.doc(`/screams/${snapshot.data().screamId}`).get()
            .then(doc => {
                if(doc.exists && doc.data().userHandle !== snapshot.data().userHandle) {
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdAt: new Date().toISOString(),
                        recipient: doc.data().userHandle,
                        sender: snapshot.data().userHandle,
                        type: 'like',
                        read: false,
                        scramId: doc.id
                    })
                }
            })
            .catch(err => {
                console.error(err)
            })
    })

exports.deleteNotificationOnUnLike = functions.firestore.document('likes/{id}')
    .onDelete((snapshot) => {
        return db.doc(`/notifications/${snapshot.id}`)
            .delete()
            .catch(err => {
                console.error(err)
            })
    })

exports.createNotificationOnComment = functions.firestore.document('comments/{id}')
    .onCreate((snapshot) => {
        return db.doc(`/screams/${snapshot.data().screamId}`).get()
            .then(doc => {
                if(doc.exists && doc.data().userHandle !== snapshot.data().userHandle) {
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdAt: new Date().toISOString(),
                        recipient: doc.data().userHandle,
                        sender: snapshot.data().userHandle,
                        type: 'comment',
                        read: false,
                        scramId: doc.id
                    })
                }
            })
            .catch(err => {
                console.error(err)
            })
    })

exports.onUserImageChange = functions.firestore.document('/users/{userId}')
    .onUpdate((change) => {
        if(change.before.data().imageUrl !== change.after.data().imageUrl){
            let batch = db.batch()
            return db.collection('screams')
                .where('userHandle', '==', change.before.data().handle).get()
                .then((data) => {
                    data.forEach(doc => {
                        const scream = db.doc(`/screams/${doc.id}`)
                        batch.update(scream, { userImage: change.after.data().imageUrl })
                    })
                    return batch.commit();
                })
        } else {
            return true
        }
    })

exports.onScreamDelete = functions.firestore.document('/screams/{screamId}')
.onDelete((snapshot, context) => {
    const screamId = context.params.screamId;
    const batch = db.batch();
    return db.collection('comments').where('screamId', '==', screamId).get()
        .then((data) => {
            data.forEach(doc => {
                batch.delete(db.doc(`/comments/${doc.id}`));
            })
            return db.collection('likes').where('screamId', '==', screamId).get()
        })
        .then((data) => {
            data.forEach(doc => {
                batch.delete(db.doc(`/likes/${doc.id}`));
            })
            return db.collection('notifications').where('screamId', '==', screamId).get()
        })
        .then((data) => {
            data.forEach(doc => {
                batch.delete(db.doc(`/notifications/${doc.id}`));
            })
            return batch.commit()
        })
        .catch(err => {
            console.error(err)
        })
})