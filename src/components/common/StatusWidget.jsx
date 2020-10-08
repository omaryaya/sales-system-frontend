import { Chip, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
    root: {
        fontWeight: "bold"

    },    
    red:{
        color: "#f44336",
        // color: "white"
    },
    yellow:{
        color: "darkYellow",
        // color: "white"
    },
    green:{
        color: "darkGreen",
        // color: "white"
    },
    blue:{
        color: "darkBlue",
        // color: "white"
    },
    gray:{
        color: "darkGray",
        // color: "white"
    },
    black:{
        color: "#f44336",
        // color: "white"
    },
}));

const determineWidgetColor = (status, classes) => {
    switch (status) {
        case "NEW":
            return classes.red;
        case "PENDING":
            return classes.yellow;
        case "RETURNED":
            return classes.blue;
        case "DELIVERED":
            return classes.green;
        case "CANCELLED":
            return classes.black;
        default:
            return classes.gray;
    }

};

const StatusWidget = (props) => {
    const { status } = props;
    
    const labelText = status ? status.toUpperCase() : "UNKNOWN";
    const classes = useStyles();
    const selectedClassName = classes.root + " "+ determineWidgetColor(status, classes);
    
    return (
        <div>
            <Chip className={selectedClassName} label={labelText} size="small" name="status" variant="outlined" /> 
        </div>
    );
};

export default StatusWidget;