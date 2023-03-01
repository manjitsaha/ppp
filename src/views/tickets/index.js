import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Grid, InputAdornment, OutlinedInput, Dialog, DialogContent, Typography, IconButton, Slide } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'store';
import actions from 'store/actions';
import { openSnackbar } from 'store/slices/snackbar';

// assets
import { IconSearch } from '@tabler/icons';
import { HighlightOffTwoTone } from '@mui/icons-material';
import TableComponent from 'components/grid';

// ==============================|| USER PAGE ||============================== //
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const columns = [
    {
        name: '#',
        field: 'id'
    },
    {
        name: 'Ticket No',
        field: 'ticket_no'
    },
    {
        name: 'Title',
        field: 'title'
    },
    {
        name: 'Description',
        field: 'description'
    },
    {
        name: 'Note',
        field: 'note'
    },
    {
        name: 'Status',
        field: 'status'
    },
    {
        name: 'Priority',
        field: 'priority'
    },
    {
        name: 'Department',
        field: 'department_name'
    },
    {
        name: 'Catgeory',
        field: 'category'
    },
    {
        name: 'Sub Category',
        field: 'sub_category'
    },
    {
        name: 'Assigned To',
        field: 'assigned_user_fname'
    },
    {
        name: 'Sub Category',
        field: 'sub_category'
    },
    {
        name: 'Action',
        field: 'action',
        option: {
            view: true,
            delete: true
        }
    }
];
const TicketPage = () => {
    let composePosition = {};
    const { type } = useParams();
    const navigate = useNavigate();
    console.log('type', type);
    const dispatch = useDispatch();
    const [position, setPosition] = useState(true);
    const [deleteItem, setDeleteItem] = useState(null);
    const [isDeleteModal, setDeleteModal] = useState(false);
    const { tickets, pagination, isDeleted } = useSelector((state) => state.ticket);
    const { user } = useSelector((state) => state.auth);

    const getTicketData = (type, userId, page) => {
        dispatch(actions.ticket.getTickets({ type, uid: userId, page }));
    };

    const openNotification = (msg) => {
        dispatch(
            openSnackbar({
                open: true,
                message: msg,
                variant: 'alert',
                alert: {
                    color: 'success'
                },
                close: false
            })
        );
    };

    useEffect(() => {
        if (user?.id) {
            getTicketData(type, user.id);
        }
    }, [type, user]);

    useEffect(() => {
        if (isDeleted) {
            openNotification('Record Deleted!!!');
            setDeleteItem(null);
            setDeleteModal(false);
            getTicketData(type, user.id);
        }
    }, [isDeleted]);

    if (!position) {
        composePosition = {
            '& .MuiDialog-container': {
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                '& .MuiPaper-root': { mb: 0, borderRadius: '12px 12px 0px 0px', maxWidth: 595 }
            }
        };
    }

    const handleEdit = (row, index) => {
        console.log(row, index);
    };

    const handleDelete = (row, index) => {
        console.log(row, index);
        setDeleteItem(row);
        setDeleteModal(true);
    };

    const handlePageChange = (page) => {
        console.log('page 112', page, type, user.id);
        getTicketData(type, user.id, page);
    };

    const handleTicketView = (r, i) => {
        navigate(`/ticket/view/${r.ticket_no}`, { repalce: true });
    };

    const handleAction = (actionId, r, i) => {
        switch (actionId) {
            case 1:
                handleEdit(r, i);
                break;
            case 2:
                handleDelete(r, i);
                break;
            case 3:
                handlePageChange(r);
                break;
            case 4:
                handleTicketView(r, i);
                break;
            default:
                break;
        }
    };

    const closeDeleteModal = () => {
        setDeleteModal(false);
    };

    const confirmDelete = () => {
        dispatch(actions.ticket.deleteTicket(deleteItem.ticket_no));
    };

    const confirmationDialog = () => (
        <Dialog open={isDeleteModal} TransitionComponent={Transition} keepMounted onClose={closeDeleteModal} sx={composePosition}>
            <DialogContent>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container alignItems="center" spacing={0}>
                            <Grid item sm zeroMinWidth>
                                <Typography component="div" align="left" variant="h4">
                                    Do you want to delete the selected record???
                                </Typography>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={closeDeleteModal} size="large">
                                    <HighlightOffTwoTone />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={1} alignItems="center">
                            <Grid item>
                                <Button variant="contained" color="success" onClick={confirmDelete}>
                                    Yes
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" onClick={closeDeleteModal}>
                                    No
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );

    return (
        <MainCard
            title={
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item>
                        <OutlinedInput
                            id="input-search-list-style1"
                            placeholder="Search"
                            startAdornment={
                                <InputAdornment position="start">
                                    <IconSearch stroke={1.5} size="16px" />
                                </InputAdornment>
                            }
                            size="small"
                        />
                    </Grid>
                </Grid>
            }
            content={false}
        >
            {confirmationDialog()}
            <TableComponent action={handleAction} data={tickets} columns={columns} pagination={pagination} />
        </MainCard>
    );
};

export default TicketPage;
