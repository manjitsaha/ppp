import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Grid } from '@mui/material';

// third-party
import OtpInput from 'react18-input-otp';
import { openSnackbar } from 'store/slices/snackbar';
import { dispatch, useSelector } from 'store';
import actions from 'store/actions';

// ============================|| STATIC - CODE VERIFICATION ||============================ //

const AuthCodeVerification = () => {
    const theme = useTheme();
    const [otp, setOtp] = useState();
    const navigate = useNavigate();
    const borderColor = theme.palette.mode === 'dark' ? theme.palette.grey[200] : theme.palette.grey[300];
    const { verifyotp, sendotp } = useSelector((state) => state.auth);

    const submitVerificationCode = () => {
        dispatch(actions.auth.verifyOTP(sendotp.email, otp));
    };

    useEffect(() => {
        if (verifyotp.isOTPVerified) {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'The OTP provided is correct. Now set your password',
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: false
                })
            );
            setTimeout(() => {
                navigate('/reset-password', { replace: true });
            }, 1500);
        } else if (verifyotp.error) {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Incorrect OTP. Please try again',
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: false
                })
            );
        }
    }, [verifyotp, navigate]);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <OtpInput
                    value={otp}
                    onChange={(otpNumber) => setOtp(otpNumber)}
                    numInputs={6}
                    containerStyle={{ justifyContent: 'space-between' }}
                    inputStyle={{
                        width: '100%',
                        margin: '8px',
                        padding: '10px',
                        border: `1px solid ${borderColor}`,
                        borderRadius: 4,
                        ':hover': {
                            borderColor: theme.palette.primary.main
                        }
                    }}
                    focusStyle={{
                        outline: 'none',
                        border: `2px solid ${theme.palette.primary.main}`
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <Button disableElevation fullWidth size="large" type="submit" variant="contained" onClick={() => submitVerificationCode()}>
                    Continue
                </Button>
            </Grid>
            {/* <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                    <Typography>Did not receive the email? Check your spam filter, or</Typography>
                    <Typography variant="body1" sx={{ minWidth: 85, ml: 2, textDecoration: 'none', cursor: 'pointer' }} color="primary">
                        Resend code
                    </Typography>
                </Stack>
            </Grid> */}
        </Grid>
    );
};
export default AuthCodeVerification;
