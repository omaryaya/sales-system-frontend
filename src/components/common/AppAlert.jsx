import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from '@material-ui/lab';
import {connect} from 'react-redux';

const AppAlert = (props) => {
    
    const {visible, severity, message} = props;
        
    return (
        <>
            {visible === true && <Alert variant="filled" severity={severity}>{message || severity}</Alert>}
        </>
    );
};

AppAlert.propTypes = {
    visible: PropTypes.bool,
    severity: PropTypes.string,
    // message: PropTypes.string
}

const mapStateToProps = state => ({
    visible: state.alerts.visible,
    severity: state.alerts.severity,
    message: state.alerts.message
});

export default connect(mapStateToProps)(AppAlert);