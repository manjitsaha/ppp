import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Link } from '@mui/material';

// project imports
import { DASHBOARD_PATH } from 'config';
import Logo from 'ui-component/Logo';
import logoImage from 'assets/images/auth/logo.png';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = (props) => {
    const { svg } = props;
    return (
        <Link component={RouterLink} to={DASHBOARD_PATH}>
            {svg ? <Logo /> : <img src={logoImage} alt="logo" height="50px" />}
        </Link>
    );
};

export default LogoSection;
