// third-party
import { combineReducers } from 'redux';

// project imports
import snackbarReducer from './slices/snackbar';
import menuReducer from './slices/menu';
import userReducer from './slices/user';
import configReducer from './slices/config';
import accountReducer from './accountReducer';
import ticketReducer from './slices/ticket';
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    auth: accountReducer,
    snackbar: snackbarReducer,
    menu: menuReducer,
    user: userReducer,
    config: configReducer,
    ticket: ticketReducer
});
export default reducer;
