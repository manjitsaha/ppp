import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const UsersPage = Loadable(lazy(() => import('views/users')));
const DepartmentPage = Loadable(lazy(() => import('views/departments')));
const CorridorPage = Loadable(lazy(() => import('views/corridors')));
const SectionPage = Loadable(lazy(() => import('views/sections')));
const CategoryPage = Loadable(lazy(() => import('views/category')));
const SubCategoryPage = Loadable(lazy(() => import('views/subcategory')));
const StatusPage = Loadable(lazy(() => import('views/status')));
const PriorityPage = Loadable(lazy(() => import('views/priority')));
const TicketPage = Loadable(lazy(() => import('views/tickets')));
const PermissionPage = Loadable(lazy(() => import('views/permissions')));
const CreateTicketPage = Loadable(lazy(() => import('views/tickets/ticketFormView')));
const TicketView = Loadable(lazy(() => import('views/tickets/ticketView')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/',
            element: <SamplePage />
        },
        {
            path: '/sample-page',
            element: <SamplePage />
        },
        {
            path: '/users',
            element: <UsersPage />
        },
        {
            path: '/departments',
            element: <DepartmentPage />
        },
        {
            path: '/sections',
            element: <SectionPage />
        },
        {
            path: '/corridors',
            element: <CorridorPage />
        },
        {
            path: '/category',
            element: <CategoryPage />
        },
        {
            path: '/sub-category',
            element: <SubCategoryPage />
        },
        {
            path: '/ticket/:type',
            element: <TicketPage />
        },
        {
            path: '/ticket/create',
            element: <CreateTicketPage />
        },
        {
            path: '/ticket/view/:id',
            element: <TicketView />
        },
        {
            path: '/priority',
            element: <PriorityPage />
        },
        {
            path: 'status',
            element: <StatusPage />
        },
        {
            path: 'permissions',
            element: <PermissionPage />
        }
    ]
};

export default MainRoutes;
