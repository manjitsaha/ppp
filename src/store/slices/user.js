// action - state management
/* eslint-disable camelcase */

import { USER_REQUEST, USER_SUCCESS, USER_FAILED, CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAILED } from '../actionsType';

// ==============================|| User REDUCER ||============================== //

const initialState = {
    loading: false,
    list: [],
    error: null,
    pagination: {
        count: null,
        pageno: null,
        perpage: null
    },
    isSaved: false,
    isDeleted: false
};

// eslint-disable-next-line
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_REQUEST: {
            return {
                ...state,
                loading: true
            };
        }

        case USER_SUCCESS: {
            return {
                ...state,
                loading: false,
                list: action.payload.data,
                pagination: {
                    count: action.payload.total,
                    pageno: action.payload.current_page,
                    perpage: action.payload.per_page
                }
            };
        }

        case USER_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        }

        case CREATE_USER_REQUEST: {
            return {
                ...state,
                loading: true,
                isSaved: false
            };
        }

        case CREATE_USER_SUCCESS: {
            return {
                ...state,
                loading: false,
                isSaved: true
            };
        }

        case CREATE_USER_FAILED: {
            return {
                ...state,
                loading: false,
                isSaved: false
            };
        }

        default: {
            return { ...state };
        }
    }
};

export default userReducer;
