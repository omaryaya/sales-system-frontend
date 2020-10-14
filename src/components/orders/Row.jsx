import React, { useState } from 'react';
import { Button, TableCell, TableRow, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Delete, Edit, KeyboardArrowRight } from '@material-ui/icons';
import PropTypes from 'prop-types';
import * as Utils from '../../util';
import StatusWidget from '../common/StatusWidget';
import { Link } from 'react-router-dom';

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
    referenceNumber: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cost: {
        fontWeight: "bold",
        color: "green"
    }
});

const formatOrderDate = orderDate => {
    return Utils.formatDate(orderDate);
};

export default function Row(props) {
    const { order } = props;
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
                </TableCell>

                <TableCell><Link to={`/orders/order/${order.id}`}>{order.referenceNumber}</Link></TableCell>
                <TableCell>{order.customer?.name}</TableCell>
                <TableCell><StatusWidget status={order.status}/></TableCell>
                <TableCell className={classes.cost}>{(order.cost) ? order.cost : "Unknown" } ({order.currency})</TableCell>
                <TableCell>{formatOrderDate(order.date)}</TableCell>
            </TableRow>
        </React.Fragment>
    );
}