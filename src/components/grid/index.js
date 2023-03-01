import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Menu,
    MenuItem,
    Pagination,
    Grid,
    Button
} from '@mui/material';

// assets
import { ExpandMoreRounded, ModeEditOutline, DeleteOutline, Visibility } from '@mui/icons-material';

import { gridSpacing } from 'store/constant';

// ==============================|| List ||============================== //

const TableComponent = (props) => {
    const theme = useTheme();

    const { action, data, columns, pagination } = props;
    const [anchorEl, setAnchorEl] = useState(null);

    const handleEdit = (row, index) => {
        action(1, row, index);
    };

    const handleDelete = (row, index) => {
        action(2, row, index);
    };

    const onPageChange = (event, page) => {
        console.log('pagination click', page);
        action(3, page);
    };

    const handleView = (row, index) => {
        action(4, row, index);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    console.log('count', pagination ? pagination.count : data.length);
    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((col, index) =>
                                col.name === 'Action' || col.name === '#' ? (
                                    <TableCell key={`${col.name}-${index}`} sx={col.name === '#' ? { pl: 3 } : { pr: 3 }} align="center">
                                        {col.name}
                                    </TableCell>
                                ) : (
                                    <TableCell key={`${col.name}-${index}`}>{col.name}</TableCell>
                                )
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data &&
                            data.map((row, index) => (
                                <TableRow hover key={index}>
                                    {columns.map((col, ind) =>
                                        col.name === 'Action' || col.name === '#' ? (
                                            <TableCell
                                                sx={col.name === '#' ? { pl: 3 } : { pr: 3 }}
                                                key={`${col.name}-${ind}`}
                                                align="center"
                                            >
                                                {col.name === '#' ? (
                                                    row[col.field]
                                                ) : (
                                                    <Stack direction="row" justifyContent="center" alignItems="center">
                                                        {col.option.edit && (
                                                            <Tooltip placement="top" title="Edit">
                                                                <IconButton
                                                                    color="success"
                                                                    aria-label="success"
                                                                    size="large"
                                                                    onClick={() => handleEdit(row, ind)}
                                                                >
                                                                    <ModeEditOutline sx={{ fontSize: '1.1rem' }} />
                                                                </IconButton>
                                                            </Tooltip>
                                                        )}
                                                        {col.option.view && (
                                                            <Tooltip placement="top" title="View">
                                                                <IconButton
                                                                    color="primary"
                                                                    size="large"
                                                                    onClick={() => handleView(row, ind)}
                                                                >
                                                                    <Visibility sx={{ fontSize: '1.1rem' }} />
                                                                </IconButton>
                                                            </Tooltip>
                                                        )}
                                                        {col.option.delete && (
                                                            <Tooltip placement="top" title="Delete">
                                                                <IconButton
                                                                    color="primary"
                                                                    sx={{
                                                                        color: theme.palette.orange.dark,
                                                                        borderColor: theme.palette.orange.main,
                                                                        '&:hover ': { background: theme.palette.orange.light }
                                                                    }}
                                                                    size="large"
                                                                    onClick={() => handleDelete(row, ind)}
                                                                >
                                                                    <DeleteOutline sx={{ fontSize: '1.1rem' }} />
                                                                </IconButton>
                                                            </Tooltip>
                                                        )}
                                                    </Stack>
                                                )}
                                            </TableCell>
                                        ) : (
                                            <TableCell key={`${col.name}-${ind}`}>
                                                {col.renderer ? col.renderer(row) : row[col.field]}
                                            </TableCell>
                                        )
                                    )}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {pagination && (
                <Grid item xs={12} sx={{ p: 3 }}>
                    <Grid container justifyContent="space-between" spacing={gridSpacing}>
                        <Grid item>
                            <Pagination
                                count={pagination?.count || 10}
                                page={pagination?.pageno || 1}
                                color="secondary"
                                onChange={onPageChange}
                            />
                        </Grid>
                        <Grid item>
                            <Button size="large" sx={{ color: theme.palette.grey[900] }} color="secondary">
                                {pagination?.perpage} Rows
                            </Button>
                            {anchorEl && (
                                <Menu
                                    id="menu-user-list-style1"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    variant="selectedMenu"
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right'
                                    }}
                                    transformOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right'
                                    }}
                                >
                                    <MenuItem onClick={handleClose}> 10 Rows</MenuItem>
                                    <MenuItem onClick={handleClose}> 20 Rows</MenuItem>
                                    <MenuItem onClick={handleClose}> 30 Rows </MenuItem>
                                </Menu>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </>
    );
};

TableComponent.propTypes = {
    action: PropTypes.func,
    data: PropTypes.array,
    columns: PropTypes.array,
    pagination: PropTypes.object
};

export default TableComponent;
