import { SET_USER, SET_UNAUTHENTICATED, MARK_NOTIFICATION_READ, SET_AUTHENTICATED, LOADING_USER, LIKE_SCREAM, UNLIKE_SCREAM } from '../actionTypes';

const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_AUTHENTICATED: 
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            };
        case LOADING_USER: 
            return {
                ...state,
                loading: true,
            }
        case LIKE_SCREAM: 
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        screamId: action.payload.screamId
                    }
                ]
            }
        case UNLIKE_SCREAM:
            return {
                ...state,
                likes: state.likes.filter(like => like.screamId !== action.payload.screamId )
            }
        case MARK_NOTIFICATION_READ:
            state.notifications.forEach(n => n.read = true )
            return {
                ...state
            }
        default:
            return state
    }
}