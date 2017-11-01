import {CALL_API} from 'redux-api-middleware';

export const START_USER_LOADING = 'START_USER_LOADING';
export const SUCCESS_USER_LOADING = 'SUCCESS_USER_LOADING';
export const ERROR_USER_LOADING = 'ERROR_USER_LOADING';

export const loadUsers = (url) => {
    return {
        [CALL_API]: {
            credentials: 'include',
            endpoint: url,
            method: 'GET',
            types: [
                START_USER_LOADING, SUCCESS_USER_LOADING, ERROR_USER_LOADING,
            ],
        },
    };
};