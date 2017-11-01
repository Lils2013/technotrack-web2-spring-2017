import {CALL_API} from 'redux-api-middleware';

export const START_POST_LOADING = 'START_POST_LOADING';
export const SUCCESS_POST_LOADING = 'SUCCESS_POST_LOADING';
export const ERROR_POST_LOADING = 'ERROR_POST_LOADING';

export const START_POST_SENDING = 'START_POST_SENDING';
export const SUCCESS_POST_SENDING = 'SUCCESS_POST_SENDING';
export const ERROR_POST_SENDING = 'ERROR_POST_SENDING';


export const loadPosts = (url) => {
    return {
        [CALL_API]: {
            credentials: 'include',
            endpoint: url,
            method: 'GET',
            types: [
                START_POST_LOADING, SUCCESS_POST_LOADING, ERROR_POST_LOADING,
            ],
        },
    };
};

export const startPostSending = () => {
    return {
        type: START_POST_SENDING,
    };
};

export const successPostSending = (newPost) => {
    return {
        type: SUCCESS_POST_SENDING,
        payload: newPost,
    };
};

export const errorPostSending = (newPost) => {
    return {
        type: ERROR_POST_SENDING,
    };
};
