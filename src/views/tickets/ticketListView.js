import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
    section_code: [],
    corridor_id: [],
    distance: []
};

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
        name: 'Description',
        field: 'description'
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
            edit: true,
            delete: true
        }
    }
];
const corridors = [
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
const TicketListView = () => {
    let composePosition = {};
    const { type } = useParams();
    console.log('type', type);
    const dispatch = useDispatch();
    const [isNew, setNew] = useState(false);
    const [section, setSection] = useState({ ...initialSectionState });
    const [isEdit, setEdit] = useState(false);
    const [position, setPosition] = useState(true);
    const [isDeleteModal, setDeleteModal] = useState(false);
    const { tickets, ticket, error, isSaved, isDeleted, pagination } = useSelector((state) => state.ticket);

    useEffect(() => {
        dispatch(actions.ticket.getTickets());
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setNew(false);
        setEdit(false);
        setDeleteModal(false);
        dispatch(actions.ticket.getTickets());
    }, [type]);

    useEffect(() => {
        if (isSaved) {
            setNew(false);
            setEdit(false);
        }
    }, [isSaved]);

    const handleClickOpen = () => {
        setNew(true);
    };

    const handleCloseDialog = () => {
        setSection({
            ...initialSectionState
        });

        setNew(false);
        setEdit(false);
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
        console.log('user', section);
        // dispatch(saveUsers(section));
    };

    const handleEdit = (row, index) => {
        console.log(row, index);
        setSection({
            ...initialSectionState,
            ...row
        });
        setEdit(true);
    };

    const handleDelete = (row, index) => {
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

    const canOpenTicketForm = () => !!(isNew || isEdit);

    const ticketForm = () => (
        <Grid item xs={12} sx={{ p: 3 }}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <TextField fullWidth name="section_name" label="Name" value={section.section_name} onChange={handleFormChange} />
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
                        name="end_latitude"
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
                        multiple
                        options={corridors}
                        getOptionLabel={(corridor) => corridor.corridor_name}
                        // defaultValue={section.corridor_id}
                        onChange={(event, value) => handleAutocompleteChange('roles', value)}
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
                            <Button variant="outlined" onClick={() => handleCloseDialog()}>
                                Close
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="secondary" onClick={() => handleCreate()}>
                                {isNew ? 'Create' : 'Update'}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );

    const closeDeleteModal = () => {
        setDeleteModal(false);
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
                                <Button variant="contained" color="success" onClick={closeDeleteModal}>
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

    const formView = () => (
        <MainCard
            title={
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container alignItems="center" spacing={0}>
                            <Grid item sm zeroMinWidth>
                                <Typography component="div" align="left" variant="h4">
                                    {`${isNew ? 'New' : 'Edit'} Ticket`}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            }
            content={false}
        >
            {ticketForm()}
        </MainCard>
    );

    const listView = () => (
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
                    <Grid item>
                        {type === 'created-by-me' ? (
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
                        ) : (
                            ''
                        )}
                    </Grid>
                </Grid>
            }
            content={false}
        >
            {confirmationDialog()}
            <TableComponent action={handleAction} data={tickets} columns={columns} pagination={pagination} />
        </MainCard>
    );

    return canOpenTicketForm() ? formView() : listView();
};

export default TicketListView;
