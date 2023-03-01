// action - state management
import {
    LOGIN_REQUEST,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    SEND_OTP_REQUEST,
    SEND_OTP_SUCCESS,
    SEND_OTP_FAILED,
    VERIFY_OTP_REQUEST,
    VERIFY_OTP_SUCCESS,
    VERIFY_OTP_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
    LOGIN,
    LOGOUT,
    REGISTER,
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAILED
} from './actionsType';

// ==============================|| ACCOUNT REDUCER ||============================== //

const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null,
    error: null,
    sendotp: {
        email: null,
        loading: false,
        isOTPSent: false,
        error: null
    },
    verifyotp: {
        loading: false,
        isOTPVerified: false,
        error: null
    },
    resetpassword: {
        loading: false,
        ispasswordset: false,
        error: null
    }
};

// eslint-disable-next-line
const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER: {
            const { user } = action.payload;
            return {
                ...state,
                user
            };
        }
        case LOGIN_REQUEST: {
            return {
                ...state,
                isLoggedIn: false,
                isInitialized: true,
                user: null
            };
        }

        case LOGIN_SUCCESS: {
            return {
                ...state,
                isLoggedIn: true,
                isInitialized: true,
                user: action.payload
            };
        }

        case LOGIN_FAILED: {
            return {
                ...state,
                isLoggedIn: false,
                isInitialized: false,
                error: action.payload
            };
        }

        case SEND_OTP_REQUEST: {
            return {
                ...state,
                resetpassword: {
                    ...state.resetpassword,
                    ispasswordset: false
                },
                sendotp: {
                    ...state.sendotp,
                    email: action.payload,
                    loading: true,
                    isOTPSent: false,
                    error: null
                }
            };
        }

        case SEND_OTP_SUCCESS: {
            return {
                ...state,
                sendotp: {
                    ...state.sendotp,
                    loading: false,
                    isOTPSent: true
                }
            };
        }

        case SEND_OTP_FAILED: {
            return {
                ...state,
                sendotp: {
                    ...state.sendotp,
                    loading: false,
                    error: action.payload
                }
            };
        }

        case VERIFY_OTP_REQUEST: {
            return {
                ...state,
                sendotp: {
                    ...state.sendotp,
                    isOTPSent: false
                },
                verifyotp: {
                    ...state.verifyotp,
                    loading: true,
                    isOTPVerified: false,
                    error: null
                }
            };
        }

        case VERIFY_OTP_SUCCESS: {
            return {
                ...state,
                verifyotp: {
                    ...state.verifyotp,
                    loading: false,
                    isOTPVerified: true
                }
            };
        }

        case VERIFY_OTP_FAILED: {
            return {
                ...state,
                verifyotp: {
                    ...state.verifyotp,
                    loading: false,
                    isOTPVerified: false,
                    error: action.payload
                }
            };
        }
        case RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                verifyotp: {
                    ...state.verifyotp,
                    isOTPVerified: false
                },
                resetpassword: {
                    ...state.resetpassword,
                    loading: true,
                    ispasswordset: false,
                    error: null
                }
            };
        }

        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetpassword: {
                    ...state.resetpassword,
                    loading: false,
                    ispasswordset: true
                }
            };
        }

        case RESET_PASSWORD_FAILED: {
            return {
                ...state,
                resetpassword: {
                    ...state.resetpassword,
                    loading: false,
                    ispasswordset: false,
                    error: action.payload
                }
            };
        }

        case USER_PROFILE_REQUEST: {
            return {
                ...state,
                isLoggedIn: true,
                isInitialized: true
            };
        }

        case USER_PROFILE_SUCCESS: {
            return {
                ...state,
                isLoggedIn: true,
                isInitialized: true,
                user: action.payload
            };
        }

        case USER_PROFILE_FAILED: {
            return {
                ...state,
                isLoggedIn: false,
                isInitialized: false,
                user: null
            };
        }

        case LOGIN: {
            return {
                ...state,
                isLoggedIn: true,
                isInitialized: true
            };
        }

        case LOGOUT: {
            return {
                ...state,
                isInitialized: true,
                isLoggedIn: false,
                user: null
            };
        }
        default: {
            return { ...state };
        }
    }
};

export default accountReducer;
