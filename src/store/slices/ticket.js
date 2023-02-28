// action - state management
/* eslint-disable camelcase */

import {
    TICKET_BYID_FAILED,
    TICKET_BYID_REQUEST,
    TICKET_BYID_SUCCESS,
    TICKET_FAILED,
    TICKET_REQUEST,
    TICKET_SUCCESS,
    DELETE_TICKET_FAILED,
    DELETE_TICKET_REQUEST,
    DELETE_TICKET_SUCCESS,
    CREATE_TICKET_FAILED,
    CREATE_TICKET_REQUEST,
    CREATE_TICKET_SUCCESS
} from '../actionsType';

// ==============================|| User REDUCER ||============================== //

const initialState = {
    loading: false,
    isSaved: false,
    isDeleted: false,
    tickets: [],
    pagination: {
        count: null,
        pageno: null,
        perpage: null
    },
    ticket: {},
    error: null
};

// eslint-disable-next-line
const ticketReducer = (state = initialState, action) => {
    switch (action.type) {
        case TICKET_REQUEST: {
            return {
                ...state,
                loading: true
            };
        }

        case TICKET_SUCCESS: {
            return {
                ...state,
                loading: false,
                tickets: action.payload.data,
                pagination: {
                    count: action.payload.total,
                    pageno: action.payload.current_page,
                    perpage: action.payload.per_page
                }
            };
        }

        case TICKET_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        }

        case TICKET_BYID_REQUEST: {
            return {
                ...state,
                loading: true
            };
        }

        case TICKET_BYID_SUCCESS: {
            return {
                ...state,
                loading: false,
                ticket: action.payload
            };
        }

        case TICKET_BYID_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        }

        case CREATE_TICKET_REQUEST: {
            return {
                ...state,
                loading: true,
                isSaved: false
            };
        }

        case CREATE_TICKET_SUCCESS: {
            return {
                ...state,
                loading: false,
                isSaved: true
            };
        }

        case CREATE_TICKET_FAILED: {
            return {
                ...state,
                loading: false,
                isSaved: false,
                error: action.payload
            };
        }

        case DELETE_TICKET_REQUEST: {
            return {
                ...state,
                loading: true,
                isDeleted: false
            };
        }

        case DELETE_TICKET_SUCCESS: {
            return {
                ...state,
                loading: false,
                isDeleted: true
            };
        }

        case DELETE_TICKET_FAILED: {
            return {
                ...state,
                loading: false,
                isDeleted: false,
                error: action.payload
            };
        }

        default: {
            return { ...state };
        }
    }
};

export default ticketReducer;
