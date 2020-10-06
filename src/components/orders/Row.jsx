import React, { useState } from 'react';
import { Button, TableCell, TableRow } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import PropTypes from 'prop-types';

Row.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.number.isRequired,
        referenceNumber: PropTypes.string,
        currency: PropTypes.string,
        products: PropTypes.array,
        price: PropTypes.number,
    }),
    handleExpand: PropTypes.func,
};

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

export default function Row(props) {
    const { order } = props;
    // const { classes } = props;
    const classes = useRowStyles();

    const formatOrderDate = orderDate => {
        //  "numeric", "2-digit", "narrow", "short", "long"
        var options = {
            weekday: 'short',
            year: '2-digit',
            month: 'short',
            day: 'numeric'
        };
        return new Date(orderDate).toLocaleDateString('en-US', options);
    }


    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell className={classes.tableCell}>
                    <Button onClick={(event) => {
                        props.deleteOrder(order.id);
                    }}>
                        <DeleteIcon fontSize="small" role="button" color="secondary" />
                    </Button>
                </TableCell>
                <TableCell className={classes.tableCell}>
                    <Button onClick={(event) => {
                        console.debug("Editing", order.referenceNumber);
                        props.setIsEditing(order.id);
                        props.setOrderBeingEdited(order);
                    }}>
                        <EditIcon fontSize="small" role="button" />
                    </Button>
                </TableCell>

                <TableCell>{order.id}</TableCell>
                <TableCell>{order.referenceNumber}</TableCell>
                <TableCell>{order.currency}</TableCell>
                <TableCell>{formatOrderDate(order.date)}</TableCell>
                <TableCell className={classes.tableCell}>
                    <Button onClick={(event) => {
                        // TODO: Implement
                        props.setCurrentOrder(order);
                        props.getOrderItems(order.id);
                    }}>
                        <KeyboardArrowRight fontSize="small" role="button" />
                    </Button>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}