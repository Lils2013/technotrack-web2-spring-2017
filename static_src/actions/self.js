import {CALL_API} from 'redux-api-middleware';

export const START_SELF_LOADING = 'START_SELF_LOADING';
export const SUCCESS_SELF_LOADING = 'SUCCESS_SELF_LOADING';
export const ERROR_SELF_LOADING = 'ERROR_SELF_LOADING';

export const loadSelf = (url) => {
    return {
        [CALL_API]: {
            credentials: 'include',
            endpoint: url,
            method: 'GET',
            types: [
                START_SELF_LOADING, SUCCESS_SELF_LOADING, ERROR_SELF_LOADING,
            ],
        },
    };
};