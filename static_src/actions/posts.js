import {CALL_API} from 'redux-api-middleware';

export const START_POST_LOADING = 'START_POST_LOADING';
export const SUCCESS_POST_LOADING = 'SUCCESS_POST_LOADING';
export const FINAL_POST_LOADING = 'FINAL_POST_LOADING';
export const ERROR_POST_LOADING = 'ERROR_POST_LOADING';

export const START_POST_SENDING = 'START_POST_SENDING';
export const SUCCESS_POST_SENDING = 'SUCCESS_POST_SENDING';
export const ERROR_POST_SENDING = 'ERROR_POST_SENDING';


// export const loadPosts = (url) => {
//     return {
//         [CALL_API]: {
//             credentials: 'include',
//             endpoint: url,
//             method: 'GET',
//             types: [
//                 START_POST_LOADING, SUCCESS_POST_LOADING, ERROR_POST_LOADING,
//             ],
//         },
//     };
// };

export const loadPosts = (url) => {
    let payload;
    startPostLoading();
    fetch(url, {
        method: 'GET',
        credentials: 'include',
    }).then(
        body => body.json(),
    ).then(
        (json) => {
            console.log(json);
            payload = json;
            // successPostLoading(json);
        },
    );
    // return {
    //     [CALL_API]: {
    //         credentials: 'include',
    //         endpoint: url,
    //         method: 'GET',
    //         types: [
    //             START_POST_LOADING, SUCCESS_POST_LOADING, ERROR_POST_LOADING,
    //         ],
    //     },
    // };
};

export const startPostLoading = () => {
    return {
        type: START_POST_LOADING,
    };
};

export const successPostLoading = (newPost) => {
    return {
        type: SUCCESS_POST_LOADING,
        payload: newPost,
    };
};

export const errorPostLoading = () => {
    return {
        type: ERROR_POST_LOADING,
    };
};

export const finalPostLoading = () => {
    return {
        type: FINAL_POST_LOADING,
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
