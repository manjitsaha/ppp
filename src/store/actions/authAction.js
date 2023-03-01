import axios from 'utils/axios';
import { dispatch } from 'store/index';
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
    LOGOUT,
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAILED
} from 'store/actionsType';

const loginRequest = () => ({
    type: LOGIN_REQUEST
});

const loginSuccess = (data) => ({
    type: LOGIN_SUCCESS,
    payload: data
});

const loginFailed = (err) => ({
    type: LOGIN_FAILED,
    payload: err
});

export const loginAction = (data) => async () => {
    dispatch(loginRequest);
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    try {
        const res = await axios.post('/login', formData);
        console.log('response', res);
        if (res.data.status === 'Success') {
            const tokenObj = res.data.token.original;
            localStorage.setItem('token', tokenObj.access_token);
            dispatch(loginSuccess(tokenObj.user));
        } else {
            dispatch(loginFailed);
        }
    } catch (err) {
        dispatch(loginFailed('Wrong Credentials'));
    }
};

const sendOTPRequest = (email) => ({
    type: SEND_OTP_REQUEST,
    payload: email
});

const sendOTPSuccess = () => ({
    type: SEND_OTP_SUCCESS
});

const sendOTPFailed = (err) => ({
    type: SEND_OTP_FAILED,
    payload: err
});

export const sendOTP = (email) => async () => {
    dispatch(sendOTPRequest(email));
    const formData = new FormData();
    formData.append('email', email);
    try {
        const res = await axios.post('/forgot-password', formData);
        console.log('response', res);
        if (res.data.success === true) {
            dispatch(sendOTPSuccess());
        } else {
            dispatch(sendOTPFailed(''));
        }
    } catch (err) {
        dispatch(sendOTPFailed('Something went wrong!'));
    }
};

const verifyOTPRequest = () => ({
    type: VERIFY_OTP_REQUEST
});

const verifyOTPSuccess = (data) => ({
    type: VERIFY_OTP_SUCCESS,
    payload: data
});

const verifyOTPFailed = (err) => ({
    type: VERIFY_OTP_FAILED,
    payload: err
});

export const verifyOTP = (email, otp) => async () => {
    dispatch(verifyOTPRequest);
    const formData = new FormData();
    formData.append('email', email);
    formData.append('token', otp);
    try {
        const res = await axios.post('/verify/pin', formData);
        console.log('response', res);
        if (res.data.status === 'Success') {
            dispatch(verifyOTPSuccess());
        } else {
            dispatch(verifyOTPFailed(''));
        }
    } catch (err) {
        dispatch(verifyOTPFailed('Something went wrong!'));
    }
};

const resetPasswordRequest = () => ({
    type: RESET_PASSWORD_REQUEST
});

const resetPasswordSuccess = (data) => ({
    type: RESET_PASSWORD_SUCCESS,
    payload: data
});

const resetPasswordFailed = (err) => ({
    type: RESET_PASSWORD_FAILED,
    payload: err
});

export const resetPassword = (email, password, confirmPassword) => async () => {
    dispatch(resetPasswordRequest);
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password_confirmation', confirmPassword);
    try {
        const res = await axios.post('/reset-password', formData);
        console.log('response', res);
        if (res.data.success === true) {
            dispatch(resetPasswordSuccess());
        } else {
            dispatch(resetPasswordFailed(''));
        }
    } catch (err) {
        dispatch(resetPasswordFailed('Something went wrong!'));
    }
};

const logoutSuccess = () => ({
    type: LOGOUT
});

export const logout = () => async () => {
    console.log('logout');
    const res = await axios.post('/logout');
    localStorage.removeItem('token');
    dispatch(logoutSuccess);
};

const userProfileRequest = () => ({
    type: USER_PROFILE_REQUEST
});

const userProfileSuccess = (data) => ({
    type: USER_PROFILE_SUCCESS,
    payload: data
});

const userProfileFailed = (err) => ({
    type: USER_PROFILE_FAILED,
    payload: err
});

export const userProfile = () => async () => {
    dispatch(userProfileRequest);
    try {
        const res = await axios.get('/user-profile');
        console.log('res', res);
        if (res.data.status === 'Success') {
            dispatch(userProfileSuccess(res.data.data));
        }
    } catch (err) {
        dispatch(userProfileFailed('Something went wrong!'));
    }
};
