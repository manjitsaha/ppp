import { lazy } from 'react';

// project imports
import GuestGuard from 'utils/route-guard/GuestGuard';
import MinimalLayout from 'layout/MinimalLayout';
import NavMotion from 'layout/NavMotion';
import Loadable from 'ui-component/Loadable';

// login routing
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('views/pages/authentication/Register3')));
const AuthForgotPassword = Loadable(lazy(() => import('views/pages/authentication/ForgotPassword')));
const AuthVerifyOTP = Loadable(lazy(() => import('views/pages/authentication/CodeVerification')));
const AuthResetPassword = Loadable(lazy(() => import('views/pages/authentication/ResetPassword')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: (
        <NavMotion>
            <GuestGuard>
                <MinimalLayout />
            </GuestGuard>
        </NavMotion>
    ),
    children: [
        {
            path: '/',
            element: <AuthLogin />
        },
        {
            path: '/login',
            element: <AuthLogin />
        },
        {
            path: '/register',
            element: <AuthRegister />
        },
        {
            path: '/forgot',
            element: <AuthForgotPassword />
        },
        {
            path: '/verify-otp',
            element: <AuthVerifyOTP />
        },
        {
            path: '/reset-password',
            element: <AuthResetPassword />
        }
    ]
};

export default LoginRoutes;
