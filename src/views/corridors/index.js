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

// assets
import { IconSearch } from '@tabler/icons';
import { Add, HighlightOffTwoTone } from '@mui/icons-material';
import TableComponent from 'components/grid';

// ==============================|| USER PAGE ||============================== //
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
const initialCorridorState = {
    corridor_name: '',
    distance: ''
};

const columns = [
    {
        name: '#',
        field: 'id'
    },
    {
        name: 'Name',
        field: 'corridor_name'
    },
    {
        name: 'Distance',
        field: 'distance'
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
const data = [
    {
        id: 1,
        corridor_name: 'Eastern Corridor',
        distance: '1800 km'
    },
    {
        id: 2,
        corridor_name: 'Southernn Corridor',
        distance: '2000 km'
    }
];
const CorridorPage = () => {
    let composePosition = {};
    const dispatch = useDispatch();
    const [isNew, setNew] = useState(false);
    const [corridor, setCorridor] = useState({ ...initialCorridorState });
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [isEdit, setEdit] = useState(false);
    const [position, setPosition] = useState(true);
    const [isDeleteModal, setDeleteModal] = useState(false);
    const { list, isSaved, error, isDeleted } = useSelector((state) => state.config.corridors);
    const getCorridorsData = () => {
        dispatch(actions.config.getcorridors());
    };

    const setInitialState = () => {
        setCorridor({
            ...initialCorridorState
        });
        setNew(false);
        setEdit(false);
    };

    useEffect(() => {
        getCorridorsData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (isSaved) {
            setInitialState();
            getCorridorsData();
        }
    }, [isSaved, corridor]);

    useEffect(() => {
        setDeleteItemId(null);
        setDeleteModal(false);
        getCorridorsData();
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
        const corridorObj = {
            ...corridor,
            [event.target.name]: event.target.value
        };
        console.log('section 78', corridorObj);
        setCorridor(corridorObj);
    };

    const handleCreate = () => {
        console.log('corridor', corridor);
        dispatch(actions.config.saveCorridors(corridor, isEdit));
    };

    const handleEdit = (row, index) => {
        console.log(row, index);
        setCorridor({
            ...initialCorridorState,
            ...row
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

    const canDialogOpen = () => !!(isNew || isEdit);

    const corridorForm = () => (
        <Dialog open={canDialogOpen()} TransitionComponent={Transition} keepMounted onClose={handleCloseDialog} sx={composePosition}>
            {canDialogOpen() && (
                <DialogContent>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" spacing={0}>
                                <Grid item sm zeroMinWidth>
                                    <Typography component="div" align="left" variant="h4">
                                        {`${isNew ? 'New' : 'Edit'} Corridor`}
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
                                name="corridor_name"
                                label="Name"
                                value={corridor.corridor_name}
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="distance" fullWidth label="Distance" value={corridor.distance} onChange={handleFormChange} />
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
        dispatch(actions.config.deleteCorridor(deleteItemId));
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
            {corridorForm()}
            {confirmationDialog()}
            <TableComponent action={handleAction} data={list} columns={columns} />
        </MainCard>
    );
};

export default CorridorPage;
