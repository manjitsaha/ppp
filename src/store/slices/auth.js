// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    users: [],
    isUserSaved: false
};

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET USERS
        getUsersSuccess(state, action) {
            state.users = action.payload;
        },

        createUserSuccess(state, action) {
            state.users = action.payload;
            state.isUserSaved = true;
        }
    }
});

// Reducer
export default slice.reducer;
