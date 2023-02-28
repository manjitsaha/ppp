import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

// project imports
// import LAYOUT_CONST from 'constant';
// import useConfig from 'hooks/useConfig';
import SearchSection from './SearchSection';
import MobileSection from './MobileSection';
import ProfileSection from './ProfileSection';
import LocalizationSection from './LocalizationSection';
import MegaMenuSection from './MegaMenuSection';
import NotificationSection from './NotificationSection';
import LogoSection from '../LogoSection';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleDrawerToggle }) => {
    const theme = useTheme();

    // const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    // const { layout } = useConfig();

    return (
        <>
            {/* logo & toggler button */}
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1, textAlign: 'center' }}>
                    <LogoSection svg={false} />
                    <Typography variant="h4" align="center">
                        DFCCIL
                    </Typography>
                </Box>
            </Box>

            {/* header search */}
            {/* <SearchSection /> */}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />

            {/* mega-menu */}
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <MegaMenuSection />
            </Box>

            {/* live customization & localization */}
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <LocalizationSection />
            </Box>

            {/* notification & profile */}
            <NotificationSection />
            <ProfileSection />

            {/* mobile header */}
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <MobileSection />
            </Box>
        </>
    );
};

Header.propTypes = {
    handleDrawerToggle: PropTypes.func
};

export default Header;
