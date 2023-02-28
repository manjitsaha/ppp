import axios from 'utils/axios';
import { dispatch } from 'store/index';
/* eslint-disable camelcase */
import { USER_REQUEST, USER_SUCCESS, USER_FAILED, CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAILED } from 'store/actionsType';

const userRequest = () => ({
    type: USER_REQUEST
});

const userSuccess = (data) => ({
    type: USER_SUCCESS,
    payload: data
});

const userFailed = () => ({
    type: USER_FAILED
});

export const getUsers = (args) => async () => {
    try {
        let url = '/all-users';

        if (args.filter === 'department') {
            url = `/get-user-by-department/${args.selected}`;
        }

        if (args.filter === 'section') {
            url = `/get-user-by-section/${args.selected}`;
        }

        if (args.page) {
            url = `${url}?page=${args.page} `;
        }
        dispatch(userRequest);
        const response = await axios.get(url);
        console.log('data', response.data.data);
        if (response.data.status === 'Success') dispatch(userSuccess(response.data.data));
    } catch (error) {
        dispatch(userFailed(error));
    }
};

const createUserRequest = () => ({
    type: CREATE_USER_REQUEST
});

const createUserSuccess = () => ({
    type: CREATE_USER_SUCCESS
});

const createUserFailed = () => ({
    type: CREATE_USER_FAILED
});

export const saveUsers = (data, isEdit) => async () => {
    try {
        const formdata = new FormData();
        formdata.append('first_name', data.first_name);
        formdata.append('last_name', data.last_name);
        formdata.append('email', data.email);
        formdata.append('role_id', data.roleid);
        formdata.append('department_id', data.departmentid);
        formdata.append('section_id', data.sectionid);
        dispatch(createUserRequest);
        // isEdit
        const response = await axios.post('/register', formdata);
        dispatch(createUserSuccess());
    } catch (error) {
        dispatch(createUserFailed(error));
    }
};
