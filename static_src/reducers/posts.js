import update from 'react-addons-update';
import { START_POST_LOADING, SUCCESS_POST_LOADING, ERROR_POST_LOADING } from './../actions/posts';


const initialState = {
    postList: [],
    posts: {},
    isLoading: false,
};


export default function tasks(store = initialState, action) {
    let newStore = store;
    if (action.payload && action.payload.entities && action.payload.entities.tasks) {
        newStore = update(store, {
            tasks: { $merge: action.payload.entities.tasks },
        });
    }

    switch (action.type) {
        case START_POST_LOADING: {
            return update(newStore, {
                isLoading: { $set: true },
            });
        }
        case SUCCESS_POST_LOADING: {
            return update(newStore, {
                isLoading: { $set: false },
                taskList: { $set: action.payload.result },
            });
        }
        case ERROR_POST_LOADING: {
            return update(newStore, {
                isLoading: { $set: false },
            });
        }
        default:
            return newStore;
    }
}