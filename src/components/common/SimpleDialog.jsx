import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

const useStyles = makeStyles({
    dialog: {
        minWidth: "80vh",
    },

});

export default function SimpleDialog({ component: Component, ...rest }) {
    const classes = useStyles();
    const { onClose, open, title } = rest;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog fullWidth maxWidth="md" className={classes.dialog} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
            <Component className={classes.dialog} {...rest} />
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
};

