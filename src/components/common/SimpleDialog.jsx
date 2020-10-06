import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles({
    dialog: {
        minWidth: "80vh",
    },
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});

export default function SimpleDialog({ component: Component, ...rest }) {
    const classes = useStyles();
    const { onClose, open, title } = rest;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog className={classes.dialog} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
            <Component className={classes.dialog} {...rest} />
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
};

