// import React, { useEffect, useState } from 'react';
// import { PropTypes } from 'prop-types';

// // material-ui
// import { useTheme } from '@mui/material/styles';
// import { Chip, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';

// import { useDispatch, useSelector } from 'store';
// import { action } from 'store/actions';

// // assets
// import { ModeEditOutline, DeleteOutline } from '@mui/icons-material';

// // ==============================|| USER LIST ||============================== //

// const UserList = (props) => {
//     const theme = useTheme();
//     const dispatch = useDispatch();

//     const { action } = props;
//     const [data, setData] = useState([]);
//     const { users } = useSelector((state) => state.user);

//     useEffect(() => {
//         setData(users);
//     }, [users]);

//     useEffect(() => {
//         dispatch(getUsers());
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);
//     console.log('Row', data);

//     const handleEdit = (row, index) => {
//         action(1, row, index);
//     };

//     const handleDelete = (row, index) => {
//         action(2, row, index);
//     };

//     return (
//         <TableContainer>
//             <Table>
//                 <TableHead>
//                     <TableRow>
//                         <TableCell sx={{ pl: 3 }}>#</TableCell>
//                         <TableCell>First Name</TableCell>
//                         <TableCell>Last Name</TableCell>
//                         <TableCell>Email</TableCell>
//                         <TableCell>Status</TableCell>
//                         <TableCell align="center" sx={{ pr: 3 }}>
//                             Actions
//                         </TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {data &&
//                         data.map((row, index) => (
//                             <TableRow hover key={index}>
//                                 <TableCell sx={{ pl: 3 }}>{row.id}</TableCell>
//                                 <TableCell>{row.first_name}</TableCell>
//                                 <TableCell>{row.last_name}</TableCell>
//                                 <TableCell>{row.email}</TableCell>
//                                 <TableCell>
//                                     {row.status === 'Active' && (
//                                         <Chip
//                                             label="Active"
//                                             size="small"
//                                             sx={{
//                                                 background:
//                                                     theme.palette.mode === 'dark'
//                                                         ? theme.palette.dark.main
//                                                         : theme.palette.success.light + 60,
//                                                 color: theme.palette.success.dark
//                                             }}
//                                         />
//                                     )}
//                                     {row.status === 'Rejected' && (
//                                         <Chip
//                                             label="Rejected"
//                                             size="small"
//                                             sx={{
//                                                 background:
//                                                     theme.palette.mode === 'dark'
//                                                         ? theme.palette.dark.main
//                                                         : theme.palette.orange.light + 80,
//                                                 color: theme.palette.orange.dark
//                                             }}
//                                         />
//                                     )}
//                                     {row.status === 'Pending' && (
//                                         <Chip
//                                             label="Pending"
//                                             size="small"
//                                             sx={{
//                                                 background:
//                                                     theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.warning.light,
//                                                 color: theme.palette.warning.dark
//                                             }}
//                                         />
//                                     )}
//                                 </TableCell>
//                                 <TableCell align="center" sx={{ pr: 3 }}>
//                                     <Stack direction="row" justifyContent="center" alignItems="center">
//                                         <Tooltip placement="top" title="Edit">
//                                             <IconButton
//                                                 color="success"
//                                                 aria-label="success"
//                                                 size="large"
//                                                 onClick={() => handleEdit(row, index)}
//                                             >
//                                                 <ModeEditOutline sx={{ fontSize: '1.1rem' }} />
//                                             </IconButton>
//                                         </Tooltip>
//                                         <Tooltip placement="top" title="Delete">
//                                             <IconButton
//                                                 color="primary"
//                                                 sx={{
//                                                     color: theme.palette.orange.dark,
//                                                     borderColor: theme.palette.orange.main,
//                                                     '&:hover ': { background: theme.palette.orange.light }
//                                                 }}
//                                                 size="large"
//                                                 onClick={() => handleDelete(row, index)}
//                                             >
//                                                 <DeleteOutline sx={{ fontSize: '1.1rem' }} />
//                                             </IconButton>
//                                         </Tooltip>
//                                     </Stack>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     );
// };

// UserList.propTypes = {
//     action: PropTypes.func
// };

// export default UserList;
