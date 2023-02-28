import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Button, Grid, TextField, Typography, Slide, Autocomplete, Stack, Alert } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'store';
import actions from 'store/actions';
// import ImageUpload from 'components/upload';

// ==============================|| USER PAGE ||============================== //
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
const initialTicketState = {
    title: '',
    description: '',
    note: '',
    status: null,
    priority: null,
    category: null,
    sub_category: null,
    department: null,
    section: null,
    files: []
};

const CreateTicketPage = () => {
    let composePosition = {};
    const theme = useTheme();
    const dispatch = useDispatch();
    const [ticketdata, setTicketData] = useState({ ...initialTicketState });
    const [position, setPosition] = useState(true);
    const { departments, sections, categories, subcategories, status, priorities } = useSelector((state) => state.config);
    const { isSaved } = useSelector((state) => state.ticket);
    const [image, setImage] = useState('');

    const loadMetaData = () => {
        dispatch(actions.config.getDepartments());
        dispatch(actions.config.getSections());
        dispatch(actions.config.getcategory());
        dispatch(actions.config.getsubcategory());
        dispatch(actions.config.getStatus());
        dispatch(actions.config.getPriority());
    };
    useEffect(() => {
        loadMetaData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setTicketData({
            ...initialTicketState
        });
    }, [isSaved]);

    const handleResetForm = () => {
        setTicketData({
            ...initialTicketState,
            status: null,
            priority: null,
            category: null,
            sub_category: null,
            department: null,
            section: null,
            files: []
        });
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
        const ticket = {
            ...ticketdata,
            [event.target.name]: event.target.value
        };
        setTicketData(ticket);
    };

    const handleAutocompleteChange = (name, value) => {
        const ticket = {
            ...ticketdata,
            [name]: value
        };
        setTicketData(ticket);
    };

    const handleCreate = () => {
        console.log('user', ticketdata);
        const ticketData = {
            ...ticketdata,
            status_id: ticketdata.status.id,
            priority_id: ticketdata.priority.id,
            category_id: ticketdata.category.id,
            sub_category_id: ticketdata.sub_category.id,
            department_id: ticketdata.department.id,
            section_id: ticketdata.section.id
        };
        dispatch(actions.ticket.saveTickets(ticketData));
    };

    const alertNotification = () => (
        <Grid item xs={12}>
            <Alert severity="success" sx={{ color: theme.palette.success.dark }}>
                Ticket Created Successfully
            </Alert>
        </Grid>
    );

    const handleImageChange = (e) => {
        e.preventDefault();
        const reader = new FileReader();
        const files = e.target.files;
        // reader.onloadend = () => {
        //     // setFile(file);
        //     console.log(reader.result);
        // };
        // reader.readAsDataURL(files);
        setTicketData({
            ...ticketdata,
            files
        });
    };

    const ticketForm = () => (
        <Grid item xs={12} sx={{ p: 3 }}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <TextField name="title" fullWidth label="Title" value={ticketdata.title} onChange={handleFormChange} />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sx={{
                        '& .quill': {
                            bgcolor: theme.palette.mode === 'dark' ? 'dark.main' : 'grey.50',
                            borderRadius: '12px',
                            '& .ql-toolbar': {
                                bgcolor: theme.palette.mode === 'dark' ? 'dark.light' : 'grey.100',
                                borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 20 : 'grey.400',
                                borderTopLeftRadius: '12px',
                                borderTopRightRadius: '12px'
                            },
                            '& .ql-container': {
                                borderColor:
                                    theme.palette.mode === 'dark'
                                        ? `${theme.palette.dark.light + 20} !important`
                                        : `${theme.palette.grey[400]} !important`,
                                borderBottomLeftRadius: '12px',
                                borderBottomRightRadius: '12px',
                                '& .ql-editor': {
                                    minHeight: 125
                                }
                            }
                        }
                    }}
                >
                    <Stack spacing={gridSpacing}>
                        <Typography variant="subtitle1">Description</Typography>
                        <ReactQuill
                            theme="snow"
                            value={ticketdata.description}
                            onChange={(value) => handleAutocompleteChange('description', value)}
                        />
                    </Stack>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sx={{
                        '& .quill': {
                            bgcolor: theme.palette.mode === 'dark' ? 'dark.main' : 'grey.50',
                            borderRadius: '12px',
                            '& .ql-toolbar': {
                                bgcolor: theme.palette.mode === 'dark' ? 'dark.light' : 'grey.100',
                                borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 20 : 'grey.400',
                                borderTopLeftRadius: '12px',
                                borderTopRightRadius: '12px'
                            },
                            '& .ql-container': {
                                borderColor:
                                    theme.palette.mode === 'dark'
                                        ? `${theme.palette.dark.light + 20} !important`
                                        : `${theme.palette.grey[400]} !important`,
                                borderBottomLeftRadius: '12px',
                                borderBottomRightRadius: '12px',
                                '& .ql-editor': {
                                    minHeight: 125
                                }
                            }
                        }
                    }}
                >
                    <Stack spacing={gridSpacing}>
                        <Typography variant="subtitle1">Note</Typography>
                        <ReactQuill theme="snow" value={ticketdata.note} onChange={(value) => handleAutocompleteChange('note', value)} />
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Autocomplete
                        options={status.list}
                        getOptionLabel={(option) => option.name}
                        value={ticketdata.status}
                        onChange={(event, value) => handleAutocompleteChange('status', value)}
                        renderInput={(params) => <TextField {...params} label="Status" />}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Autocomplete
                        options={priorities.list}
                        getOptionLabel={(priority) => priority.name}
                        value={ticketdata.priority}
                        onChange={(event, value) => handleAutocompleteChange('priority', value)}
                        renderInput={(params) => <TextField {...params} label="Priority" />}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Autocomplete
                        options={categories.list}
                        getOptionLabel={(category) => category.name}
                        value={ticketdata.category}
                        onChange={(event, value) => handleAutocompleteChange('category', value)}
                        renderInput={(params) => <TextField {...params} label="Category" />}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Autocomplete
                        options={subcategories.list}
                        getOptionLabel={(subcat) => subcat.name}
                        value={ticketdata.sub_category}
                        onChange={(event, value) => handleAutocompleteChange('sub_category', value)}
                        renderInput={(params) => <TextField {...params} label="Sub Category" />}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Autocomplete
                        options={departments.list}
                        getOptionLabel={(department) => department.department_name}
                        value={ticketdata.department}
                        onChange={(event, value) => handleAutocompleteChange('department', value)}
                        renderInput={(params) => <TextField {...params} label="Department" />}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Autocomplete
                        options={sections.list}
                        getOptionLabel={(section) => section.section_name}
                        value={ticketdata.section}
                        onChange={(event, value) => handleAutocompleteChange('section', value)}
                        renderInput={(params) => <TextField {...params} label="Section" />}
                    />
                </Grid>
                <Grid item>
                    <input multiple type="file" onChange={handleImageChange} />
                    {Object.values(ticketdata.files).map((file, index) => (
                        <span key={`file${index + 1}`}> {file.name}</span>
                    ))}
                </Grid>
                {isSaved && alertNotification()}
                <Grid item xs={12}>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item sx={{ flexGrow: 1 }} />
                        <Grid item>
                            <Button variant="outlined" onClick={() => handleResetForm()}>
                                Reset Form
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="secondary" onClick={() => handleCreate()}>
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );

    return (
        <MainCard
            title={
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container alignItems="center" spacing={0}>
                            <Grid item sm zeroMinWidth>
                                <Typography component="div" align="left" variant="h4">
                                    New Ticket
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
};

export default CreateTicketPage;
