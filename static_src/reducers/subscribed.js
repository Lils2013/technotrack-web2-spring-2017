import update from 'react-addons-update';
import { START_SUBSCRIBED_LOADING, SUCCESS_SUBSCRIBED_LOADING, ERROR_SUBSCRIBED_LOADING } from './../actions/subscribed';


const initialState = {
    subscribedList: [],
    isLoading: false,
};


export default function subscribed(store = initialState, action) {
    let newStore = store;
    switch (action.type) {
        case START_SUBSCRIBED_LOADING: {
            return update(newStore, {
                isLoading: { $set: true },
            });
        }
        case SUCCESS_SUBSCRIBED_LOADING: {
            return update(newStore, {
                isLoading: { $set: false },
                subscribedList: { $set: action.payload },
            });
        }
        case ERROR_SUBSCRIBED_LOADING: {
            return update(newStore, {
                isLoading: { $set: false },
            });
        }
        default:
            return newStore;
    }
}