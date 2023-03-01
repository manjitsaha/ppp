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
import TableComponent from 'components/grid';

// assets
import { IconSearch } from '@tabler/icons';
import { Add, HighlightOffTwoTone } from '@mui/icons-material';

// ==============================|| USER PAGE ||============================== //
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
const initialUserState = {
    first_name: '',
    last_name: '',
    email: '',
    roles: [],
    departments: [],
    sections: []
};

const intitalFormError = {
    first_name: '',
    last_name: '',
    email: '',
    roles: '',
    departments: '',
    sections: ''
};

const column = [
    {
        name: '#',
        field: 'id'
    },
    {
        name: 'First Name',
        field: 'first_name'
    },
    {
        name: 'Last Name',
        field: 'last_name'
    },
    {
        name: 'Email',
        field: 'email'
    },
    {
        name: 'Role',
        field: 'roles',
        renderer: (params) => params.role.map((x) => x.role).toString()
    },
    {
        name: 'Department',
        field: 'departments',
        renderer: (params) => params.department_section.map((x) => x.department_name).toString()
    },
    {
        name: 'Section',
        field: 'sections',
        renderer: (params) => params.department_section.map((x) => x.section_name).toString()
    },
    {
        name: 'Action',
        field: 'action',
        option: {
            delete: true,
            view: true
        }
    }
];

const filters = [
    {
        name: 'Department',
        field: 'department'
    },
    {
        name: 'Section',
        field: 'section'
    }
];

const UsersPage = () => {
    let composePosition = {};
    const dispatch = useDispatch();
    const [isNew, setNew] = useState(false);
    const [user, setUser] = useState({ ...initialUserState });
    const [isEdit, setEdit] = useState(false);
    const [isView, setView] = useState(false);
    const [formError, setFormError] = useState({ ...intitalFormError });
    const [position, setPosition] = useState(true);
    const [isDeleteModal, setDeleteModal] = useState(false);
    const { roles, departments, sections } = useSelector((state) => state.config);
    const { isSaved, list, pagination } = useSelector((state) => state.user);
    const [filter, setFilter] = useState(null);
    const [selected, setSelected] = useState(null);

    console.log(roles, departments, sections, list);

    const getUserData = (page = null, filter = null, selection = null) => {
        dispatch(actions.user.getUsers({ page, filter, selected: selection }));
    };

    const setInitialState = () => {
        setUser({
            ...initialUserState
        });

        setNew(false);
        setEdit(false);
        setView(false);
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
        dispatch(actions.config.getDepartments());
        dispatch(actions.config.getRoles());
        dispatch(actions.config.getSections());
        getUserData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (isSaved) {
            openNotification('Registration Successfull. Password is sent on email');
            setInitialState();
            getUserData();
        }
    }, [isSaved]);

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
        const users = {
            ...user,
            [event.target.name]: event.target.value
        };
        setUser(users);
    };
    const handleAutocompleteChange = (name, value) => {
        const users = {
            ...user,
            [name]: value
        };
        setUser(users);
    };

    const handleCreate = () => {
        console.log('user', user);
        const data = {
            ...user,
            sectionid: user.sections.map((x) => x.id).toString(),
            departmentid: user.departments.map((x) => x.id).toString(),
            roleid: user.roles.map((x) => x.id).toString()
        };
        dispatch(actions.user.saveUsers(data));
    };

    const handleEdit = (row) => {
        setUser({
            ...initialUserState,
            ...row,
            roles: roles.list.filter((x) => row.role.find((y) => y.id === x.id)),
            departments: departments.list.filter((x) => row.department_section.find((y) => y.department_id === x.id)),
            sections: sections.list.filter((x) => row.department_section.find((y) => y.section_id === x.id))
        });
        setEdit(true);
    };

    const handleView = (row) => {
        setUser({
            ...initialUserState,
            ...row,
            roles: roles.list.filter((x) => row.role.find((y) => y.id === x.id)),
            departments: departments.list.filter((x) => row.department_section.find((y) => y.department_id === x.id)),
            sections: sections.list.filter((x) => row.department_section.find((y) => y.section_id === x.id))
        });
        setView(true);
    };

    const handleDelete = (row, index) => {
        console.log(row, index);
        setDeleteModal(true);
    };

    const handlePageChange = (page) => {
        getUserData(page);
    };

    const handleAction = (actionId, r, i) => {
        switch (actionId) {
            case 1:
                handleEdit(r);
                break;
            case 2:
                handleDelete(r, i);
                break;
            case 3:
                handlePageChange(r);
                break;
            case 4:
                handleView(r);
                break;
            default:
                break;
        }
    };

    const getTitle = () => {
        let supscript = 'New';
        if (isEdit) {
            supscript = 'Edit';
        }
        if (isView) {
            supscript = 'View';
        }
        return `${supscript} User`;
    };

    const canDialogOpen = () => !!(isNew || isEdit || isView);

    const checkValidation = () => {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!user.email.match(validRegex)) {
            setFormError({
                ...formError,
                email: 'Please enter valid email'
            });
        } else {
            setFormError({
                ...intitalFormError
            });
        }
    };

    const userForm = () => (
        <Dialog open={canDialogOpen()} TransitionComponent={Transition} keepMounted onClose={handleCloseDialog} sx={composePosition}>
            {canDialogOpen() && (
                <DialogContent>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" spacing={0}>
                                <Grid item sm zeroMinWidth>
                                    <Typography component="div" align="left" variant="h4">
                                        {getTitle()}
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
                                name="first_name"
                                label="First Name"
                                value={user.first_name}
                                onChange={handleFormChange}
                                disabled={isView}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="last_name"
                                fullWidth
                                label="Last Name"
                                value={user.last_name}
                                onChange={handleFormChange}
                                disabled={isView}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="email"
                                fullWidth
                                label="Email"
                                type="email"
                                value={user.email}
                                onBlur={checkValidation}
                                onChange={handleFormChange}
                                disabled={isView}
                                error={formError?.email}
                                helperText={formError?.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                multiple
                                options={roles.list}
                                getOptionLabel={(role) => role.title}
                                defaultValue={user.roles}
                                onChange={(event, value) => handleAutocompleteChange('roles', value)}
                                renderInput={(params) => <TextField {...params} label="Role" />}
                                disabled={isView}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                multiple
                                options={departments.list}
                                getOptionLabel={(department) => department.department_name}
                                defaultValue={user.departments}
                                onChange={(event, value) => handleAutocompleteChange('departments', value)}
                                renderInput={(params) => <TextField {...params} label="Department" />}
                                disabled={isView}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                multiple
                                options={sections.list}
                                getOptionLabel={(section) => section.section_name}
                                defaultValue={user.sections}
                                onChange={(event, value) => handleAutocompleteChange('sections', value)}
                                renderInput={(params) => <TextField {...params} label="Section" />}
                                disabled={isView}
                            />
                        </Grid>
                        {!isView && (
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
                        )}
                    </Grid>
                </DialogContent>
            )}
        </Dialog>
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

    const handleFilter = (value) => {
        setFilter(value);
    };

    const handleDepartmentFilter = (value) => {
        console.log('department filter selected', value.id);
        setSelected(value);
    };

    const handleSectionFilter = (value) => {
        console.log('section filter selected', value.id);
        setSelected(value);
    };

    const handleResetFilter = () => {
        setFilter(null);
        setSelected(null);
        getUserData();
    };

    useEffect(() => {
        if (filter && selected) getUserData(null, filter.field, selected.id);
    }, [filter, selected]);

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
            <Grid container alignItems="center" justifyContent="space-between" spacing={4} padding="30px">
                <Grid item lg={3}>
                    <Autocomplete
                        options={filters}
                        getOptionLabel={(opt) => opt.name}
                        value={filter}
                        onChange={(event, value) => handleFilter(value)}
                        renderInput={(params) => <TextField {...params} label="Select Filter" />}
                    />
                </Grid>
                <Grid item lg={3}>
                    {filter?.field === 'department' && (
                        <Autocomplete
                            options={departments.list}
                            getOptionLabel={(department) => department.department_name}
                            onChange={(event, value) => handleDepartmentFilter(value)}
                            renderInput={(params) => <TextField {...params} label="Department" />}
                        />
                    )}
                    {filter?.field === 'section' && (
                        <Autocomplete
                            options={sections.list}
                            getOptionLabel={(section) => section.section_name}
                            onChange={(event, value) => handleSectionFilter(value)}
                            renderInput={(params) => <TextField {...params} label="Section" />}
                        />
                    )}
                </Grid>
                <Grid item lg={3}>
                    {filter && selected && (
                        <Button variant="text" color="secondary" onClick={() => handleResetFilter()}>
                            RESET
                        </Button>
                    )}
                </Grid>
                <Grid item lg={3} />
            </Grid>
            <TableComponent data={list} columns={column} action={handleAction} pagination={pagination} />
        </MainCard>
    );
};

export default UsersPage;
