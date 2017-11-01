import update from 'react-addons-update';
import {ERROR_USER_LOADING, START_USER_LOADING, SUCCESS_USER_LOADING} from "../actions/users";


const initialState = {
    users: {},
};


export default function users(store = initialState, action) {
    let newStore = store;
    switch (action.type) {
        case START_USER_LOADING: {
            return newStore
        }
        case SUCCESS_USER_LOADING: {
            return update(newStore, {
                users: { $set: action.payload },
            });
        }
        case ERROR_USER_LOADING: {
            return newStore
        }
        default:
            return newStore;
    }
}