import {CALL_API} from 'redux-api-middleware';

export const START_POST_LOADING = 'START_POST_LOADING';
export const SUCCESS_POST_LOADING = 'SUCCESS_POST_LOADING';
export const ERROR_POST_LOADING = 'ERROR_POST_LOADING';

export const START_POST_SENDING = 'START_POST_SENDING';
export const SUCCESS_POST_SENDING = 'SUCCESS_POST_SENDING';
export const ERROR_POST_SENDING = 'ERROR_POST_SENDING';

export const START_POST_LIKING = 'START_POST_LIKING';
export const SUCCESS_POST_LIKING = 'SUCCESS_POST_LIKING';
export const ERROR_POST_LIKING = 'ERROR_POST_LIKING';

export const START_POST_UNLIKING = 'START_POST_UNLIKING';
export const SUCCESS_POST_UNLIKING = 'SUCCESS_POST_UNLIKING';
export const ERROR_POST_UNLIKING = 'ERROR_POST_UNLIKING';


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

// export const startPostLoading = () => {
//     return {
//         type: START_POST_LOADING,
//     };
// };
//
// export const successPostLoading = (newPost) => {
//     return {
//         type: SUCCESS_POST_LOADING,
//         payload: newPost,
//     };
// };
//
// export const errorPostLoading = () => {
//     return {
//         type: ERROR_POST_LOADING,
//     };
// };

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

export const errorPostSending = () => {
    return {
        type: ERROR_POST_SENDING,
    };
};

export const startPostLiking = () => {
    return {
        type: START_POST_LIKING,
    };
};

export const successPostLiking = (newPost) => {
    return {
        type: SUCCESS_POST_LIKING,
        payload: newPost,
    };
};

export const errorPostLiking = () => {
    return {
        type: ERROR_POST_LIKING,
    };
};

export const startPostUnliking = (del) => {
    return {
        type: START_POST_UNLIKING,
        payload: del,
    };
};

export const successPostUnliking = () => {
    return {
        type: SUCCESS_POST_UNLIKING,
    };
};

export const errorPostUnliking = () => {
    return {
        type: ERROR_POST_UNLIKING,
    };
};

