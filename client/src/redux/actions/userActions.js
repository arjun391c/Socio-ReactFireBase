import { LOADING_UI, CLEAR_ERRORS, SET_ERRORS,
        SET_USER, SET_UNAUTHENTICATED, MARK_NOTIFICATION_READ, LOADING_USER } from '../actionTypes';
import axios from 'axios';

//helpers
import { setAuthHeaders } from '../../utils/helpers';

export const editUserDetails = (data) => (dispatch) => {
    dispatch({ type: LOADING_USER })
    axios.post('user/details', data)
        .then(() => {
            dispatch(getUserData());
        })
        .catch(err => console.log(err));
}

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER })
    axios.get('user')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
}

export const loginUser = (data) => async (dispatch) => {
    dispatch({ type: LOADING_UI });
    try {
        const res = await axios.post('auth/login', {
            email: data.email,
            password: data.password
        });
        setAuthHeaders(res.data.token)
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS })
        data.history.push('/');
    } catch(err) {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    } 
} 

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED })
}

export const markNotifRead = (id) => (dispatch) => {
    axios.post('/notifications', id)
        .then(res => {
            dispatch({
                type: MARK_NOTIFICATION_READ
            })
            .catch(err => console.log(err))
        })
}

export const signupUser = (data) => async (dispatch) => {
    dispatch({ type: LOADING_UI });
    try {
        const res = await axios.post('auth/signup', {
            email: data.email,
            password: data.password,
            confirmpassword: data.confirmPassword,
            handle: data.handle
        });
        setAuthHeaders(res.data.token)
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS })
        data.history.push('/');
    } catch(err) {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    } 
}

export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post('user/image', formData)
        .then(() => {
            dispatch(getUserData());
        })
        .catch(err => console.log(err))
} 