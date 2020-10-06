import { Button, Grid, TextField, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Add from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createOrder, getCurrencies } from '../../actions/orders';
import { getProductsList } from '../../actions/products';
import SelectComponent from '../common/SelectComponent';
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
    const { currentOrder } = props;

    const [order, setOrder] = useState({
        ...currentOrder
    });

    const [orderItems, setOrderItems] = useState(currentOrder?.items)

    useEffect(() => {
        props.getProductsList();
        props.getCurrencies();
        setOrder({ ...currentOrder })
    }, []);

    const headCells = [
        { id: 'product', numeric: false, disablePadding: true, label: 'Product' },

        { id: 'quantity', numeric: false, disablePadding: true, label: 'Quantity' },

    ];


    return (
        <div className={classes.tableDivContainer} component={Paper}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} lg={7}>
                    <Typography >{currentOrder.referenceNumber}</Typography>
                </Grid>
                <Grid item xs={12} sm={4} lg={3}>
                    <Typography>{currentOrder.currency}</Typography>
                    {/* <SelectComponent label="Currency" onChange={onChangeOrder} name="currency" choices={props.currencies} useObjectAsValue={true} /> */}
                </Grid>

                {
                    currentOrder?.items && (
                        <TableContainer component={Paper}>
                            <Table className={classes.table} >
                                <TableHeader headCells={headCells} classes={classes} />
                                <TableBody>
                                    {currentOrder.items?.map((item, i) => {
                                        console.debug("item", item)
                                        return (
                                            <TableRow key={i}>
                                                <TableCell>{item.product.name}</TableCell>
                                                <TableCell>{item.quantity}</TableCell>
                                                {/* <TableCell><SelectComponent label="Products" onChange={(e) => onChangeItem(e, i)} choices={props.productsList} name="productId" /></TableCell>
                                        <TableCell><TextField label="quantity" id="quantity" onChange={(e) => onChangeItem(e, i)} name="quantity" value={item.quantity} /></TableCell> */}
                                            </TableRow>
                                        );
                                    }
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    )
                }

            </Grid>
        </div>
    );
};

OrderDetails.propTypes = {
    productsList: PropTypes.array.isRequired,
    currencies: PropTypes.array.isRequired,
    currentOrder: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    productsList: state.products.productsList,
    currencies: state.orders.currencies
})

export default connect(mapStateToProps, { getCurrencies, getProductsList, createOrder })(OrderDetails);