// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconMail, IconHome, IconUsers, IconMessageCircle, IconSettings, IconTicket } from '@tabler/icons';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [
        {
            id: 'pages',
            type: 'group',
            children: [
                {
                    id: 'dashboard',
                    title: <FormattedMessage id="dashboard" />,
                    icon: IconHome,
                    type: 'item',
                    url: '/sample-page'
                },
                {
                    id: 'users',
                    title: <FormattedMessage id="users" />,
                    icon: IconUsers,
                    type: 'item',
                    url: '/users'
                },
                {
                    id: 'master-data',
                    title: <FormattedMessage id="master-data" />,
                    icon: IconUsers,
                    type: 'collapse',
                    children: [
                        {
                            id: 'department',
                            title: <FormattedMessage id="department" />,
                            // icon: IconHome,
                            type: 'item',
                            url: '/departments'
                        },
                        {
                            id: 'section',
                            title: <FormattedMessage id="section" />,
                            // icon: IconUsers,
                            type: 'item',
                            url: '/sections'
                        },
                        {
                            id: 'corridor',
                            title: <FormattedMessage id="corridor" />,
                            // icon: IconUsers,
                            type: 'item',
                            url: '/corridors'
                        },
                        {
                            id: 'category',
                            title: <FormattedMessage id="category" />,
                            // icon: IconUsers,
                            type: 'item',
                            url: '/category'
                        },
                        {
                            id: 'sub-category',
                            title: <FormattedMessage id="sub-category" />,
                            // icon: IconUsers,
                            type: 'item',
                            url: '/sub-category'
                        },
                        {
                            id: 'priority',
                            title: <FormattedMessage id="priority" />,
                            // icon: IconUsers,
                            type: 'item',
                            url: '/priority'
                        },
                        {
                            id: 'status',
                            title: <FormattedMessage id="status" />,
                            // icon: IconUsers,
                            type: 'item',
                            url: '/status'
                        },
                        {
                            id: 'permissions',
                            title: <FormattedMessage id="permissions" />,
                            // icon: IconUsers,
                            type: 'item',
                            url: '/permissions'
                        }
                    ]
                },
                {
                    id: 'Tickets',
                    title: <FormattedMessage id="tickets" />,
                    icon: IconTicket,
                    type: 'collapse',
                    children: [
                        {
                            id: 'Create Ticket',
                            title: <FormattedMessage id="create_ticket" />,
                            // icon: IconUsers,
                            type: 'item',
                            url: '/ticket/create'
                        },
                        {
                            id: 'All Tickets',
                            title: <FormattedMessage id="all_tickets" />,
                            // icon: IconHome,
                            type: 'item',
                            url: '/ticket/all'
                        },
                        {
                            id: 'My Tickets',
                            title: <FormattedMessage id="my_ticket" />,
                            // icon: IconUsers,
                            type: 'item',
                            url: '/ticket/my-ticket'
                        },
                        {
                            id: 'Created by me',
                            title: <FormattedMessage id="created_by_me" />,
                            // icon: IconUsers,
                            type: 'item',
                            url: '/ticket/created-by-me'
                        }
                    ]
                },
                {
                    id: 'settigns',
                    title: <FormattedMessage id="settings" />,
                    icon: IconSettings,
                    type: 'item',
                    url: '/sample-page'
                }
            ]
        }
    ]
};

export default menuItems;
