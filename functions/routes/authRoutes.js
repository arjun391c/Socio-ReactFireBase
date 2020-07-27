const express = require('express')
const router = express.Router()
const { db, firebase } = require('../utils/admin')
const config = require('../utils/config')

const { validateSignup, validateLogin } = require('../utils/validators') 
 
//SIGNUP
router.post('/signup', (req, res) => {
    const newUser = {
      email: req.body.email,
      password: req.body.password,
      confirmpassword: req.body.confirmpassword,
      handle: req.body.handle,
    }
  
    const { errors, valid } = validateSignup(newUser)
    if(!valid) return res.status(400).json(errors)

    const defaultImg = 'default.jpg'
  
    //database
    let token, userId;
    db.doc(`/users/${newUser.handle}`).get()
      .then(doc => {
        if(doc.exists){
          return res.status(400).json({ handle: 'This handle is already taken' })
        } else {
          return firebase
                  .auth()
                  .createUserWithEmailAndPassword(newUser.email, newUser.password)
        }
      })
      .then(data => {
        userId = data.user.uid;
        return data.user.getIdToken()
      })
      .then(idtoken => {
        token = idtoken;
        const userCredentials = {
          handle: newUser.handle,
          email: newUser.email,
          createdAt: new Date().toISOString(),
          imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${defaultImg}?alt=media`,
          userId
        }
        return db.doc(`/users/${newUser.handle}`).set(userCredentials)
      })
      .then(() => {
        return res.status(201).json({ token })
      })
      .catch(err => {
        console.error(err)
        if(err.code === 'auth/email-already-in-use'){
          return res.status(400).json({ email: 'email already taken.' })
        }
        return res.status(500).json({ general: 'Something went wrong, Please try again.' })
      })
  })

//LOGIN
router.post('/login', (req, res) => {
    const user = {
      email: req.body.email,
      password: req.body.password
    };
  
    const { errors, valid } = validateLogin(user)
    if(!valid) return res.status(400).json(errors)
  
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(data => {
        return data.user.getIdToken();
      })
      .then(token => {
        return res.json({ token })
      })
      .catch(err => {
        console.error(err)
        //auth/wrong-password
        //auth/user-not-found
        return res.status(500).json({ general: 'Wrong credentials, Please try again!' })
      });
  })

module.exports = router;
