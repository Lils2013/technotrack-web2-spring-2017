import update from 'react-addons-update';
import {
    ERROR_POST_SENDING,
    START_POST_SENDING,
    SUCCESS_POST_SENDING,
    ERROR_POST_LIKING,
    START_POST_LIKING,
    SUCCESS_POST_LIKING,
    START_POST_LOADING,
    SUCCESS_POST_LOADING,
    ERROR_POST_LOADING,
    ERROR_POST_UNLIKING,
    START_POST_UNLIKING,
    SUCCESS_POST_UNLIKING
} from './../actions/posts';


const initialState = {
    postList: [],
    isLoading: false,
};


export default function posts(store = initialState, action) {
    let newStore = store;
    switch (action.type) {
        case START_POST_LOADING: {
            return update(newStore, {
                postList: {$set: []},
                isLoading: {$set: true},
            });
        }
        case SUCCESS_POST_LOADING: {
            return update(newStore, {
                isLoading: {$set: false},
                postList: {$set: [...store.postList, action.payload]},
            });
        }
        case ERROR_POST_LOADING: {
            return update(newStore, {
                isLoading: {$set: false},
            });
        }
        case START_POST_SENDING: {
            return update(newStore, {
                isLoading: {$set: true},
            });
        }
        case SUCCESS_POST_SENDING: {
            return update(newStore, {
                isLoading: {$set: false},
                postList: {$set: [...store.postList, action.payload]},
            });
        }
        case ERROR_POST_SENDING: {
            return update(newStore, {
                isLoading: {$set: false},
            });
        }
        case START_POST_LIKING: {
            return newStore;
        }
        case SUCCESS_POST_LIKING: {
            return update(newStore, {
                postList: {
                    $set: [...store.postList.map(item => {
                        if (item.id == action.payload.object_id) {
                            item.liked = true;
                            item.likes_count++;
                            item.liked_id = action.payload.id;
                        }
                        return item;
                    })]
                },
            });
        }
        case ERROR_POST_LIKING: {
            return newStore;
        }
        case START_POST_UNLIKING: {
            return update(newStore, {
                postList: {
                    $set: [...store.postList.map(item => {
                        if (item.id == action.payload) {
                            item.liked = false;
                            item.likes_count--;
                        }
                        return item;
                    })]
                },
            });
        }
        case SUCCESS_POST_UNLIKING: {
            newStore;
        }
        case ERROR_POST_UNLIKING: {
            return newStore;
        }
        default:
            return newStore;
    }
}