import { /* Button, */
    Grid,
    //   TextField,
    Typography
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
// import Add from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import React, { useEffect }/* , { useEffect, useState } */ from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { getOrder } from '../../actions/orders';


import TableHeader from '../common/TableHeader';



const useStyles = makeStyles({
    table: {
        minWidth: 500,
    },
    tableCell: {
        maxWidth: "5px",
    },
    tableDivContainer: {
        display: "flexShrink",
        flexShring: 0,
        padding: "5vh"
    }
});


const OrderDetails = (props) => {

    const classes = useStyles();
    const oId = props.match?.params?.id;
    const [currentOrder, setCurrentOrder] = useState({});

    const headCells = [
        { id: 'product', numeric: false, disablePadding: true, label: 'Product' },
        { id: 'quantity', numeric: false, disablePadding: true, label: 'Quantity' },
    ];

    useEffect(() => {
        props.getOrder(oId);
        setCurrentOrder(props.orders.find((o) => o.id == oId));
    }, []);


    return (
        <div className={classes.tableDivContainer} component={Paper}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Typography variant="h5">Ref #: {currentOrder.referenceNumber}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography variant="h5">Cost: {currentOrder.cost + "("+currentOrder.currency+")"}</Typography>
                </Grid>
                {currentOrder.customer?.name && <Grid item xs={12} sm={4}>
                    <Typography variant="h5">Customer: {currentOrder.customer.name}</Typography>
                </Grid>}

                <TableContainer component={Paper}>
                    <Table className={classes.table} >
                        {currentOrder?.items?.length > 0 && <TableHeader headCells={headCells} classes={classes} />}
                        <TableBody>
                            {currentOrder.items?.map((item, i) => {
                                return (
                                    <TableRow key={i}>
                                        <TableCell>{item.product.name}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                    </TableRow>
                                );
                            }
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </div>
    );
};

OrderDetails.propTypes = {
    productsList: PropTypes.array.isRequired,
    currencies: PropTypes.array.isRequired,
    orders: PropTypes.array.isRequired
}


const mapStateToProps = state => ({
    productsList: state.products.productsList,
    currencies: state.orders.currencies,
    orders: state.orders.orders
})

export default connect(mapStateToProps, { getOrder })(OrderDetails);