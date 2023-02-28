import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dispatch, useSelector } from 'store';
import actions from 'store/actions';

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }) => {
    debugger;
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);
    const token = localStorage.getItem('token');

    useEffect(() => {
        debugger;
        if (!auth.isLoggedIn && !token) {
            navigate('login', { replace: true });
        }

        if (!auth.isLoggedIn && token) {
            dispatch(actions.auth.userProfile());
        }
    }, [auth.isLoggedIn, navigate, token]);

    return children;
};

AuthGuard.propTypes = {
    children: PropTypes.node
};

export default AuthGuard;
