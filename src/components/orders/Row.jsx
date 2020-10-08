import React, { useState } from 'react';
import { Button, TableCell, TableRow, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Delete, Edit, KeyboardArrowRight } from '@material-ui/icons';
import PropTypes from 'prop-types';
import * as Utils from '../../util';
import StatusWidget from '../common/StatusWidget';

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

const formatOrderDate = orderDate => {
    return Utils.formatDate(orderDate);
};

export default function Row(props) {
    const { order } = props;
    // const { classes } = props;
    const classes = useRowStyles();




    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell className={classes.tableCell}>
                    <Button onClick={(event) => {
                        props.deleteOrder(order.id);
                    }}>
                        <Delete fontSize="small" role="button" color="secondary" />
                    </Button>
                    <Button onClick={(event) => {
                        console.debug("Editing", order.referenceNumber);
                        props.setIsEditing(order.id);
                        props.setOrderBeingEdited(order);
                    }}>
                        <Edit fontSize="small" role="button" />
                    </Button>
                </TableCell>

                <TableCell>{order.id}</TableCell>
                <TableCell>{order.referenceNumber} <StatusWidget status={order.status}/> </TableCell>
                <TableCell>{order.currency}</TableCell>
                <TableCell>{formatOrderDate(order.date)}</TableCell>
                <TableCell className={classes.tableCell}>
                    <Button onClick={(event) => {
                        // TODO: Implement
                        props.setCurrentOrder(order);
                    }}>
                        <KeyboardArrowRight fontSize="small" role="button" />
                    </Button>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}