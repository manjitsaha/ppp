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
const initialSectionState = {
    section_name: '',
    start_latitude: '',
    end_latitude: '',
    start_longitude: '',
    end_longitude: '',
    section_code: '',
    corridor_id: '',
    distance: ''
};

const columns = [
    {
        name: '#',
        field: 'id'
    },
    {
        name: 'Name',
        field: 'section_name'
    },
    {
        name: 'Start Latitude',
        field: 'start_latitude'
    },
    {
        name: 'End Latitude',
        field: 'end_latitude'
    },
    {
        name: 'Start Longitude',
        field: 'start_longitude'
    },
    {
        name: 'End Longitude',
        field: 'end_longitude'
    },
    {
        name: 'Section Code',
        field: 'section_code'
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
const SectionPage = () => {
    let composePosition = {};
    const dispatch = useDispatch();
    const [isNew, setNew] = useState(false);
    const [section, setSection] = useState({ ...initialSectionState });
    const [corridors, setCorridors] = useState([]);
    const [isEdit, setEdit] = useState(false);
    const [position, setPosition] = useState(true);
    const [isDeleteModal, setDeleteModal] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const { list, loading, error, isSaved, isDeleted } = useSelector((state) => state.config.sections);
    const corridorData = useSelector((state) => state.config.corridors);

    const getSectionData = () => {
        dispatch(actions.config.getSections());
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

    const getCorridorsData = () => {
        dispatch(actions.config.getcorridors());
    };

    const setInitialState = () => {
        setSection({
            ...initialSectionState
        });
        setNew(false);
        setEdit(false);
    };

    useEffect(() => {
        getSectionData();
        getCorridorsData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (isSaved) {
            openNotification(isNew ? 'New section record created successfully.' : 'Section record updated successfully.');
            setInitialState();
            getSectionData();
        }
    }, [isSaved, section]);

    useEffect(() => {
        if (isDeleted) {
            openNotification('Record Deleted!!!');
            setDeleteItemId(null);
            setDeleteModal(false);
            getSectionData();
        }
    }, [isDeleted]);

    useEffect(() => {
        if (corridorData.list) {
            setCorridors(corridorData.list);
        }
    }, [corridorData]);

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
        const sections = {
            ...section,
            [event.target.name]: event.target.value
        };
        console.log('section 78', sections);
        setSection(sections);
    };
    const handleAutocompleteChange = (name, value) => {
        const sections = {
            ...section,
            [name]: value
        };
        console.log('106', sections);
        setSection(sections);
    };

    const handleCreate = () => {
        console.log('section', section);
        const data = {
            ...section,
            corridor_id: section.corridor.id
        };
        delete data.corridor;
        console.log('section', data);
        dispatch(actions.config.saveSection(data, isEdit));
    };

    const handleEdit = (row, index) => {
        console.log(row, index);
        const selectedC0rridor = corridors.find((x) => x.corridor_name === row.corridor_name);
        const data = {
            ...initialSectionState,
            ...row,
            corridor: selectedC0rridor,
            corridor_id: selectedC0rridor.id
        };
        delete data.corridor_name;
        setSection({
            ...data
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

    const setSelection = (corId) => (corId ? corridors.find((x) => x.id === corId) : {});

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
                                        {`${isNew ? 'New' : 'Edit'} Section`}
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
                                name="section_name"
                                label="Name"
                                value={section.section_name}
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="start_latitude"
                                fullWidth
                                label="Start Latitude"
                                value={section.start_latitude}
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="end_latitude"
                                fullWidth
                                label="End Latitude"
                                value={section.end_latitude}
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="start_longitude"
                                fullWidth
                                label="Start Longitude"
                                value={section.start_longitude}
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="end_longitude"
                                fullWidth
                                label="End Longitude"
                                value={section.end_longitude}
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="section_code"
                                fullWidth
                                label="Section Code"
                                value={section.section_code}
                                onChange={handleFormChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                // multiple
                                options={corridors}
                                getOptionLabel={(corridor) => corridor.corridor_name}
                                defaultValue={setSelection(section.corridor_id)}
                                onChange={(event, value) => handleAutocompleteChange('corridor', value)}
                                renderInput={(params) => <TextField {...params} label="Corridor" />}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="distance" fullWidth label="Distance" value={section.distance} onChange={handleFormChange} />
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
        dispatch(actions.config.deleteSections(deleteItemId));
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
                            color="secondary"
                            variant="contained"
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

export default SectionPage;
