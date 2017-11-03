import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import posts from './posts';
import users from './users';
import events from "./events";
import subscribed from "./subscribed";


export default combineReducers({
    routerReducer,
    posts,
    users,
    events,
    subscribed,
});