import * as authActions from './authAction';
import * as configAction from './configAction';
import * as userAction from './userAction';
import * as ticketAction from './ticketAction';

const actions = {
    auth: authActions,
    config: configAction,
    user: userAction,
    ticket: ticketAction
};
export default actions;
