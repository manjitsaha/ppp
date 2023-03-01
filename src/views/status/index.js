import React, { useState, useEffect } from 'react';
import {
    Button,
    Grid,
    InputAdornment,
    OutlinedInput,
    Dialog,
    DialogContent,
    TextField,
    Typography,
    IconButton,
    Slide,
    Autocomplete
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'store';
import actions from 'store/actions';
import { openSnackbar } from 'store/slices/snackbar';
// import { saveUsers } from 'store/slices/user';

// assets
import { IconSearch } from '@tabler/icons';
import { Add, HighlightOffTwoTone } from '@mui/icons-material';
import TableComponent from 'components/grid';

// ==============================|| USER PAGE ||============================== //
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
const initialStatusState = {
    name: '',
    color: null
};

const columns = [
    {
        name: '#',
        field: 'id'
    },
    {
        name: 'Name',
        field: 'name'
    },
    {
        name: 'Color',
        field: 'color',
        renderer(params) {
            return <div style={{ backgroundColor: `${params.color}`, width: '50%', height: '40px', borderRadius: '5px' }} />;
        }
    },
    {
        name: 'Action',
        field: 'action',
        option: {
            edit: true,
            delete: true
        }
    }
];

const StatusPage = () => {
    let composePosition = {};
    const dispatch = useDispatch();
    const [isNew, setNew] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [status, setStatus] = useState({ ...initialStatusState });
    const [isEdit, setEdit] = useState(false);
    const [position, setPosition] = useState(true);
    const [isDeleteModal, setDeleteModal] = useState(false);
    const { isSaved, list, error, isDeleted } = useSelector((state) => state.config.status);
    const colorData = useSelector((state) => state.config.color.list);

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

    const getStatusData = () => {
        dispatch(actions.config.getStatus());
    };

    const setInitialState = () => {
        setStatus({
            ...initialStatusState
        });
        setNew(false);
        setEdit(false);
    };

    useEffect(() => {
        getStatusData();
        dispatch(actions.config.getColors());
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (isSaved) {
            openNotification(isNew ? 'Status created successfully.' : 'Status updated successfully.');
            setInitialState();
            getStatusData();
        }
    }, [isSaved, status]);

    useEffect(() => {
        if (isDeleted) {
            openNotification('Record Deleted!!!');
            setDeleteItemId(null);
            setDeleteModal(false);
            getStatusData();
        }
    }, [isDeleted]);

    const handleClickOpen = () => {
        setNew(true);
    };

    const handleCloseDialog = () => {
        setInitialState();
    };

    if (!position) {
        composePosition = {
            '& .MuiDialog-container': {
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                '& .MuiPaper-root': { mb: 0, borderRadius: '12px 12px 0px 0px', maxWidth: 595 }
            }
        };
    }

    const handleFormChange = (event) => {
        const statusObj = {
            ...status,
            [event.target.name]: event.target.value
        };
        console.log('section 78', statusObj);
        setStatus(statusObj);
    };

    const handleCreate = () => {
        const statusObj = {
            ...status,
            color: status.color.code
        };
        console.log('user', statusObj);
        dispatch(actions.config.saveStatus(statusObj, isEdit));
    };

    const handleEdit = (row, index) => {
        console.log(row, index);
        setStatus({
            ...initialStatusState,
            ...row,
            color: colorData.find((x) => x.code === row.color || x.color === row.color)
        });
        setEdit(true);
    };

    const handleDelete = (row, index) => {
        console.log(row, index);
        setDeleteItemId(row.id);
        setDeleteModal(true);
    };

    const handleAction = (actionId, r, i) => {
        switch (actionId) {
            case 1:
                handleEdit(r, i);
                break;
            case 2:
                handleDelete(r, i);
                break;
            default:
                break;
        }
    };

    const handleAutocompleteChange = (key, value) => {
        const statusObj = {
            ...status,
            [key]: value
        };
        setStatus(statusObj);
    };

    const canDialogOpen = () => !!(isNew || isEdit);

    const statusForm = () => (
        <Dialog open={canDialogOpen()} TransitionComponent={Transition} keepMounted onClose={handleCloseDialog} sx={composePosition}>
            {canDialogOpen() && (
                <DialogContent>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" spacing={0}>
                                <Grid item sm zeroMinWidth>
                                    <Typography component="div" align="left" variant="h4">
                                        {`${isNew ? 'New' : 'Edit'} Status`}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <IconButton onClick={handleCloseDialog} size="large">
                                        <HighlightOffTwoTone />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth name="name" label="Name" value={status.name} onChange={handleFormChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                options={colorData}
                                getOptionLabel={(opt) => `${opt.color}(${opt.code})`}
                                value={status.color}
                                onChange={(event, value) => handleAutocompleteChange('color', value)}
                                renderInput={(params) => <TextField {...params} label="Color" />}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1} alignItems="center">
                                <Grid item sx={{ flexGrow: 1 }} />
                                <Grid item>
                                    <Button variant="contained" color="secondary" onClick={() => handleCreate()}>
                                        {isNew ? 'Create' : 'Update'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            )}
        </Dialog>
    );

    const closeDeleteModal = () => {
        setDeleteModal(false);
    };

    const confirmDelete = () => {
        dispatch(actions.config.deleteStatus(deleteItemId));
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
                                <Button variant="contained" color="secondary" onClick={confirmDelete}>
                                    Yes
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" onClick={closeDeleteModal}>
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
                    <Grid>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleClickOpen}
                            sx={{ width: '100%' }}
                            size="large"
                            startIcon={<Add />}
                        >
                            New
                        </Button>
                    </Grid>
                </Grid>
            }
            content={false}
        >
            {statusForm()}
            {confirmationDialog()}
            <TableComponent action={handleAction} data={list} columns={columns} />
        </MainCard>
    );
};

export default StatusPage;
