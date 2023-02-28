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
    Slide
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'store';
import actions from 'store/actions';
// import { saveUsers } from 'store/slices/user';
import TableComponent from 'components/grid';

// assets
import { IconSearch } from '@tabler/icons';
import { Add, HighlightOffTwoTone } from '@mui/icons-material';

// ==============================|| DEPARTMENT PAGE ||============================== //
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
const initiaDepartmentState = {
    department_name: ''
};

const columns = [
    {
        name: '#',
        field: 'id'
    },
    {
        name: 'Name',
        field: 'department_name'
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

const DepartmentPage = () => {
    let composePosition = {};
    const dispatch = useDispatch();
    const [isNew, setNew] = useState(false);
    const [department, setDepartment] = useState({ ...initiaDepartmentState });
    const [isEdit, setEdit] = useState(false);
    const [position, setPosition] = useState(true);
    const [isDeleteModal, setDeleteModal] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const { list, isSaved, loading, error, isDeleted } = useSelector((state) => state.config.departments);

    const getDepartmentList = () => {
        dispatch(actions.config.getDepartments());
    };

    const setInitialState = () => {
        setDepartment({
            ...initiaDepartmentState
        });

        setNew(false);
        setEdit(false);
    };

    useEffect(() => {
        getDepartmentList();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (isSaved) {
            setInitialState();
            getDepartmentList();
        }
    }, [isSaved, department]);

    useEffect(() => {
        setDeleteItemId(null);
        setDeleteModal(false);
        getDepartmentList();
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
        const departments = {
            ...department,
            [event.target.name]: event.target.value
        };
        console.log('department 78', departments);
        setDepartment(departments);
    };

    const handleCreate = () => {
        console.log('department', department);
        // setNew(false);
        dispatch(actions.config.saveDepartments(department, isEdit));
    };

    const handleEdit = (row, index) => {
        console.log(row, index);
        setDepartment({
            ...initiaDepartmentState,
            ...row
        });
        setEdit(true);
    };

    const handleDelete = (row, index) => {
        setDeleteItemId(row.id);
        console.log(row, index);
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

    const canDialogOpen = () => !!(isNew || isEdit);

    const userForm = () => (
        <Dialog open={canDialogOpen()} TransitionComponent={Transition} keepMounted onClose={handleCloseDialog} sx={composePosition}>
            {canDialogOpen() && (
                <DialogContent>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" spacing={0}>
                                <Grid item sm zeroMinWidth>
                                    <Typography component="div" align="left" variant="h4">
                                        {`${isNew ? 'New' : 'Edit'} Department`}
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
                            <TextField
                                fullWidth
                                name="department_name"
                                label="Name"
                                value={department.department_name}
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1} alignItems="center">
                                <Grid item sx={{ flexGrow: 1 }} />
                                <Grid item>
                                    <Button variant="contained" onClick={() => handleCreate()}>
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
        setDeleteItemId(null);
        setDeleteModal(false);
    };

    const confirmDelete = () => {
        setDeleteModal(false);
        dispatch(actions.config.deleteDepartments(deleteItemId));
    };

    const confirmationDialog = () => (
        <Dialog open={isDeleteModal} TransitionComponent={Transition} keepMounted onClose={closeDeleteModal} sx={composePosition}>
            <DialogContent>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container alignItems="center" spacing={0}>
                            <Grid item sm zeroMinWidth>
                                <Typography component="div" align="left" variant="h3">
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
            {userForm()}
            {confirmationDialog()}
            <TableComponent action={handleAction} data={list} columns={columns} />
        </MainCard>
    );
};

export default DepartmentPage;
