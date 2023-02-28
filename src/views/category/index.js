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
// // import { saveUsers } from 'store/slices/user';

// assets
import { IconSearch } from '@tabler/icons';
import { Add, HighlightOffTwoTone } from '@mui/icons-material';
import TableComponent from 'components/grid';

// ==============================|| USER PAGE ||============================== //
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
const initialCategorytate = {
    name: '',
    color: ''
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
        field: 'color'
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
        name: 'Category A',
        color: 'Blue'
    },
    {
        id: 2,
        name: 'Category B',
        color: 'Green'
    },
    {
        id: 3,
        name: 'Category C',
        color: 'Red'
    },
    {
        id: 4,
        name: 'Category D',
        color: 'Voilet'
    },
    {
        id: 5,
        name: 'Category E',
        color: 'Brown'
    }
];

const CategoryPage = () => {
    let composePosition = {};
    const dispatch = useDispatch();
    const [isNew, setNew] = useState(false);
    const [category, setCategory] = useState({ ...initialCategorytate });
    const [isEdit, setEdit] = useState(false);
    const [position, setPosition] = useState(true);
    const [isDeleteModal, setDeleteModal] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const { list, isSaved, error, loading, isDeleted } = useSelector((state) => state.config.categories);

    const getCategoryData = () => {
        dispatch(actions.config.getcategory());
    };

    const setInitialState = () => {
        setCategory({
            ...initialCategorytate
        });

        setNew(false);
        setEdit(false);
    };

    useEffect(() => {
        getCategoryData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (isSaved) {
            setInitialState();
            getCategoryData();
        }
    }, [isSaved, category]);

    useEffect(() => {
        setDeleteItemId(null);
        setDeleteModal(false);
        getCategoryData();
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
        const categoryObj = {
            ...category,
            [event.target.name]: event.target.value
        };
        console.log('section 78', categoryObj);
        setCategory(categoryObj);
    };

    const handleCreate = () => {
        console.log('category', category);
        dispatch(actions.config.saveCategory(category, isEdit));
    };

    const handleEdit = (row, index) => {
        console.log(row, index);
        setCategory({
            ...initialCategorytate,
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

    const categoryForm = () => (
        <Dialog open={canDialogOpen()} TransitionComponent={Transition} keepMounted onClose={handleCloseDialog} sx={composePosition}>
            {canDialogOpen() && (
                <DialogContent>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" spacing={0}>
                                <Grid item sm zeroMinWidth>
                                    <Typography component="div" align="left" variant="h4">
                                        {`${isNew ? 'New' : 'Edit'} Category`}
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
                            <TextField fullWidth name="name" label="Name" value={category.name} onChange={handleFormChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="color" fullWidth label="Color" value={category.color} onChange={handleFormChange} />
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
        dispatch(actions.config.deleteCategory(deleteItemId));
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
            {categoryForm()}
            {confirmationDialog()}
            <TableComponent action={handleAction} data={list} columns={columns} />
        </MainCard>
    );
};

export default CategoryPage;
