import { SET_SCREAMS, SET_SCREAM, LOADING_UI, DELETE_SCREAM, LIKE_SCREAM, POST_SCREAM, UNLIKE_SCREAM, LOADING_DATA, SET_ERRORS, CLEAR_ERRORS, STOP_LOADING_UI, POST_COMMENT } from '../actionTypes';
import axios from 'axios';

export const deleteScream = (screamId) => (dispatch) => {
    axios.delete(`screams/${screamId}`)
        .then(() => {
            dispatch({ type: DELETE_SCREAM, payload: screamId })
        })
        .catch((err) => console.log(err));
}

export const getScream = (screamId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.get(`screams/${screamId}`)
        .then(res => {
            dispatch({
                type: SET_SCREAM,
                payload: res.data
            })
            dispatch({ type: STOP_LOADING_UI})
        })
        .catch(err => console.log(err));
}

export const getScreams = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get('screams')
        .then(res => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({ 
                type: SET_SCREAMS,
                payload: []
            })
        })
}

export const getUserScreamData = (handle) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get(`user/${handle}`)
        .then((res) => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data.screams
            });
        })
        .catch(() => dispatch({ type: SET_SCREAMS, payload: null}))
}

export const likeScream = (screamId) => (dispatch) => {
    axios.get(`screams/${screamId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_SCREAM,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const postComment = (screamId, data) => (dispatch) => {
    axios.post(`screams/${screamId}/comment`, data)
        .then(res => {
            dispatch({
                type: POST_COMMENT,
                payload: res.data
            })
            dispatch({ type: CLEAR_ERRORS })
        })
        .catch(err => dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        }))
}

export const postScream = (scream, next) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    axios.post('screams', scream)
        .then(res => {
            dispatch({
                type: POST_SCREAM,
                payload: res.data
            });
            dispatch({ type: CLEAR_ERRORS })
            next();
        })
        .catch(err => dispatch({ type: SET_ERRORS, payload: err.response.data }))
}

export const unlikeScream = (screamId) => (dispatch) => {
    axios.get(`screams/${screamId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_SCREAM,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}