import { Chip/* , Typography */ } from '@material-ui/core';
import { makeStyles/* , useTheme */ } from '@material-ui/core/styles';
import React from 'react';

const StatusWidget = (props) => {
    const { status } = props;
    const labelText = status ? status.toUpperCase() : "UNKNOWN";
    const color = (status === "NEW" || status === "PENDING") ? "secondary" : "primary";
    
    return (
        <Chip label={labelText} color={color} size="small" name="status" variant="outlined" /> 
    );
};

export default StatusWidget;