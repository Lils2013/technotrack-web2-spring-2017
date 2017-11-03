import update from 'react-addons-update';
import { START_LIKED_LOADING, SUCCESS_LIKED_LOADING, ERROR_LIKED_LOADING } from './../actions/liked';


const initialState = {
    liked: {},
};


export default function liked(store = initialState, action) {
    let newStore = store;
    switch (action.type) {
        case START_LIKED_LOADING: {
            return newStore
        }
        case SUCCESS_LIKED_LOADING: {
            let insert = {};
            insert[action.payload.id] = action.payload.liked;
            return update(newStore, {
                liked: {$set: [...store.liked,insert] },
            });
        }
        case ERROR_LIKED_LOADING: {
            return newStore
        }
        default:
            return newStore;
    }
}