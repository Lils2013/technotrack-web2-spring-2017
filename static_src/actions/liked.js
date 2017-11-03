import {CALL_API} from 'redux-api-middleware';

export const START_LIKED_LOADING = 'START_LIKED_LOADING';
export const SUCCESS_LIKED_LOADING = 'SUCCESS_LIKED_LOADING';
export const ERROR_LIKED_LOADING = 'ERROR_LIKED_LOADING';

export const loadLiked = (url) => {
    return {
        [CALL_API]: {
            credentials: 'include',
            endpoint: url,
            method: 'GET',
            types: [
                START_LIKED_LOADING, SUCCESS_LIKED_LOADING, ERROR_LIKED_LOADING,
            ],
        },
    };
};