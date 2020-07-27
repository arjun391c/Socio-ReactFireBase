import { SET_SCREAMS, POST_COMMENT, SET_SCREAM, POST_SCREAM, LIKE_SCREAM, UNLIKE_SCREAM, LOADING_DATA, DELETE_SCREAM } from '../actionTypes';

const initialState = {
    screams: [],
    scream: {},
    loading: false
}

export default (state=initialState, action) => {
    switch(action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
                loading: false
            }
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            let index = state.screams.findIndex((s) => s.screamId === action.payload.screamId)
            state.screams[index].likeCount = action.payload.likeCount
            return {
                ...state,
            }
        case DELETE_SCREAM:
            return {
                ...state,
                screams: state.screams.filter((s) => s.screamId !== action.payload)
            }
        case POST_SCREAM:
            return {
                ...state,
                screams: [
                    action.payload,
                    ...state.screams
                ]
            }
        case SET_SCREAM:
            return {
                ...state,
                scream: action.payload
            }
        case POST_COMMENT:
            return {
                ...state,
                scream: {
                    ...state.scream,
                    comments: [action.payload, ...state.scream.comments],
                    commentCount: state.scream.commentCount + 1
                },
            }
        default: return state;
    }
}