import {CALL_API} from 'redux-api-middleware';

export const START_SUBSCRIBED_LOADING = 'START_SUBSCRIBED_LOADING';
export const SUCCESS_SUBSCRIBED_LOADING = 'SUCCESS_SUBSCRIBED_LOADING';
export const ERROR_SUBSCRIBED_LOADING = 'ERROR_SUBSCRIBED_LOADING';

export const loadSubscribed = (url) => {
    return {
        [CALL_API]: {
            credentials: 'include',
            endpoint: url,
            method: 'GET',
            types: [
                START_SUBSCRIBED_LOADING, SUCCESS_SUBSCRIBED_LOADING, ERROR_SUBSCRIBED_LOADING,
            ],
        },
    };
};