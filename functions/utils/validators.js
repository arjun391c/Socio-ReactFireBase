/* ============validators======= */
const isEmpty = string => string.trim().length > 0 ? true : false;
const isEmail = email => email
    .match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    ? true : false;
/* ============================= */

exports.validateSignup = (data) => {
    //validation
    let errors = {}
  
    if(!isEmpty(data.email)) {
      errors.email = 'Email must not be empty.'
    } else if (!isEmail(data.email)) {
      errors.email ='Must be a valid email address.'
    } 
  
    if(!isEmpty(data.password)) errors.password = 'Must not be emplty.'
    if(data.password.length < 6) errors.password = 'Must be more than 6 characters.'
    if(data.password !== data.confirmpassword) errors.confirmpassword = 'Password Does not match.'
    if(!isEmpty(data.handle)) errors.handle = 'Must not be emplty.'

    return {
        errors,
        valid: Object.keys(errors).length > 0 ? false : true
    }
}

exports.validateLogin = (data) => {
    let errors = {}
  
    if(!isEmpty(data.email)) errors.email = 'Must not be empty'
    if(!isEmpty(data.password)) errors.password = 'Must not be empty'
    
    return {
        errors,
        valid: Object.keys(errors).length > 0 ? false : true
    }
}

exports.reduceUserDetails = (data) => {
    let userDetails = {}

    if(isEmpty(data.bio.trim())) userDetails.bio = data.bio
    if(isEmpty(data.website.trim())) {
        //https:
        if(data.website.trim().substring(0, 4) !== 'http'){
            userDetails.website = `https://${data.website.trim()}`
        } else userDetails.website = data.website
    }
    if(isEmpty(data.location.trim())) userDetails.location = data.location

    return userDetails
}