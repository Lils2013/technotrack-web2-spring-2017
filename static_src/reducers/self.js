import update from 'react-addons-update';
import {ERROR_SELF_LOADING, START_SELF_LOADING, SUCCESS_SELF_LOADING} from "../actions/self";


const initialState = {
    self: {},
};


export default function selfs(store = initialState, action) {
    let newStore = store;
    switch (action.type) {
        case START_SELF_LOADING: {
            return newStore
        }
        case SUCCESS_SELF_LOADING: {
            return update(newStore, {
                self: {$set: action.payload},
            });
        }
        case ERROR_SELF_LOADING: {
            return newStore
        }
        default:
            return newStore;
    }
}