// import PropTypes from 'prop-types';
import { Grid, Typography, CardContent, useTheme, useMediaQuery } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { dispatch } from 'store';
import actions from 'store/actions';
import { useSelector } from 'react-redux';

// ==============================|| MAIL DETAILS ||============================== //

const TicketView = (props) => {
    const theme = useTheme();
    const { id } = useParams();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const { ticket } = useSelector((state) => state.ticket);
    useEffect(() => {
        dispatch(actions.ticket.getTicketById(id));
    }, [id]);
    return (
        <MainCard sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.main' : 'grey.50' }} content={false}>
            <CardContent>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container alignItems="center" justifyContent="space-between" spacing={matchDownSM ? 1 : 0}>
                            <Grid item>
                                <Typography>WORK IN PROGRESS</Typography>
                            </Grid>
                            {/* <Grid item>
                                <Typography>Test2</Typography>
                            </Grid> */}
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </MainCard>
    );
};

// TicketView.propTypes = {
//     data: PropTypes.object,
//     handleUserDetails: PropTypes.func,
//     handleStarredChange: PropTypes.func,
//     handleImportantChange: PropTypes.func
// };

export default TicketView;
