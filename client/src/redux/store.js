import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

//reducers
import dataReducer from './reducers/dataReducer';
import userReducer from './reducers/userReducer';
import uiReducer from './reducers/uiReducer';

const initialState = {};

const middlewares = [
    thunk,
    logger
]

const reducers = {
    data: dataReducer,
    user: userReducer,
    ui: uiReducer
}

export default createStore(
    combineReducers(reducers),
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
)