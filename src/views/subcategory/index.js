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
// import { saveUsers } from 'store/slices/user';

// assets
import { IconSearch } from '@tabler/icons';
import { Add, HighlightOffTwoTone } from '@mui/icons-material';
import TableComponent from 'components/grid';

// ==============================|| Sub Category Page ||============================== //
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
const initialSubCategoryState = {
    name: '',
    color: '',
    category_id: null
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
        name: 'Category',
        field: 'category_name'
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

const SubCategoryPage = () => {
    let composePosition = {};
    const dispatch = useDispatch();
    const [isNew, setNew] = useState(false);
    const [subcategory, setSubCategory] = useState({ ...initialSubCategoryState });
    const [categories, setCategories] = useState([]);
    const [isEdit, setEdit] = useState(false);
    const [position, setPosition] = useState(true);
    const [isDeleteModal, setDeleteModal] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const { list, isSaved, loading, error, isDeleted } = useSelector((state) => state.config.subcategories);
    const categoryData = useSelector((state) => state.config.categories);

    const getSubCategoryData = () => {
        dispatch(actions.config.getsubcategory());
    };

    const getCategoryData = () => {
        dispatch(actions.config.getcategory());
    };

    const setInitialState = () => {
        setSubCategory({
            ...initialSubCategoryState
        });

        setNew(false);
        setEdit(false);
    };

    useEffect(() => {
        getSubCategoryData();
        getCategoryData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (isSaved) {
            setInitialState();
            getSubCategoryData();
        }
    }, [isSaved, subcategory]);

    useEffect(() => {
        setDeleteItemId(null);
        setDeleteModal(false);
        getSubCategoryData();
    }, [isDeleted]);

    useEffect(() => {
        setCategories(categoryData.list);
    }, [categoryData.list]);

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
        const subcategoryObj = {
            ...subcategory,
            [event.target.name]: event.target.value
        };
        console.log('section 78', subcategoryObj);
        setSubCategory(subcategoryObj);
    };

    const handleAutocompleteChange = (name, value) => {
        const subcategoryObj = {
            ...subcategory,
            [name]: value
        };
        console.log('106', subcategoryObj);
        setSubCategory(subcategoryObj);
    };

    const handleCreate = () => {
        console.log('subcategory', subcategory);
        const subCategoryData = {
            ...subcategory
        };
        if (Object.keys(subCategoryData).includes('category')) {
            subCategoryData.category_id = subcategory.category.id;
        }
        dispatch(actions.config.saveSubCategory(subCategoryData, isEdit));
    };

    const handleEdit = (row, index) => {
        console.log(row, index);
        setSubCategory({
            ...initialSubCategoryState,
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

    const setSelection = (catId) => (catId ? categories.find((x) => x.id === catId) : null);

    const subcategoryForm = () => (
        <Dialog open={canDialogOpen()} TransitionComponent={Transition} keepMounted onClose={handleCloseDialog} sx={composePosition}>
            {canDialogOpen() && (
                <DialogContent>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" spacing={0}>
                                <Grid item sm zeroMinWidth>
                                    <Typography component="div" align="left" variant="h4">
                                        {`${isNew ? 'New' : 'Edit'} Sub Category`}
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
                            <TextField fullWidth name="name" label="Name" value={subcategory.name} onChange={handleFormChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="color" fullWidth label="Color" value={subcategory.color} onChange={handleFormChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                options={categories}
                                getOptionLabel={(category) => category.name}
                                defaultValue={setSelection(subcategory.category_id)}
                                onChange={(event, value) => handleAutocompleteChange('category', value)}
                                renderInput={(params) => <TextField {...params} label="Category" />}
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
        dispatch(actions.config.deleteSubCategory(deleteItemId));
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
            {subcategoryForm()}
            {confirmationDialog()}
            <TableComponent action={handleAction} data={list} columns={columns} />
        </MainCard>
    );
};

export default SubCategoryPage;
