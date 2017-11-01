import {CALL_API} from 'redux-api-middleware';

export const START_EVENT_LOADING = 'START_EVENT_LOADING';
export const SUCCESS_EVENT_LOADING = 'SUCCESS_EVENT_LOADING';
export const ERROR_EVENT_LOADING = 'ERROR_EVENT_LOADING';

export const loadEvents = (url) => {
    return {
        [CALL_API]: {
            credentials: 'include',
            endpoint: url,
            method: 'GET',
            types: [
                START_EVENT_LOADING, SUCCESS_EVENT_LOADING, ERROR_EVENT_LOADING,
            ],
        },
    };
};