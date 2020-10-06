import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrencies, createOrder } from '../../actions/orders';
import { getProductsList } from '../../actions/products';

import { Grid, TextField, Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import Add from '@material-ui/icons/Add';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/CloseSharp';
import TableHeader from '../common/TableHeader';
import SelectComponent from '../common/SelectComponent';

const useStyles = makeStyles({
    table: {
        minWidth: 500,
    },
    tableCell: {
        maxWidth: "10px",
    },
    tableDivContainer: {
        display: "flexShrink",
        flexShring: 0,
        padding: "5vh"
    }
});


const AddOrder = (props) => {

    const classes = useStyles();

    const [order, setOrder] = useState({
        referenceNumber: "",
        currency: "",
        items: [{
            productId: "",
            quantity: ""
        }]

    });

    const [orderItems, setOrderItems] = useState([
        {
            productId: "",
            quantity: ""
        }
    ])

    useEffect(() => {
        props.getProductsList();
        props.getCurrencies();
    }, []);

    const headCells = [
        { id: 'product', numeric: false, disablePadding: true, label: 'Product' },

        { id: 'quantity', numeric: false, disablePadding: true, label: 'Quantity' },

    ];

    // Changing order fields
    const onChangeOrder = e => {
        setOrder({ ...order, [e.target.name]: e.target.value });
    }

    // Changing order items fields
    const onChangeItem = (e, i) => {
        var tempItems = [...orderItems];
        tempItems[i][e.target.name] = e.target.value;
        setOrderItems(tempItems);
    }


    const onAddExtraItem = (e, i) => {
        var tempItems = [...orderItems];
        tempItems.push({
        });
        setOrderItems(tempItems);
    }

    const createNewOrder = () => {
        setOrder({ ...order, items: [...orderItems] });
        props.createOrder(order);
    }


    return (
        <div className={classes.tableDivContainer}>
            <Grid container spacing={2}>
                
                    
                        <Grid item xs={12} sm={6} lg={7}>
                            <TextField required label="Reference #" onChange={onChangeOrder} id="referenceNumber" name="referenceNumber" value={order.referenceNumber} />
                        </Grid>
                        <Grid item xs={12} sm={4} lg={3}>
                            <SelectComponent label="Currency" onChange={onChangeOrder} name="currency" choices={props.currencies} useObjectAsValue={true} />
                        </Grid>
                    
                    <TableContainer component={Paper}>
                    <Table className={classes.table} >
                        <TableHeader headCells={headCells} classes={classes} />
                        <TableBody>
                            {orderItems?.map((item, i) => {
                                return (
                                    <TableRow key={i}>
                                        <TableCell><SelectComponent label="Products" onChange={(e) => onChangeItem(e, i)} choices={props.productsList} name="productId" /></TableCell>
                                        <TableCell><TextField label="quantity" id="quantity" onChange={(e) => onChangeItem(e, i)} name="quantity" value={item.quantity} /></TableCell>
                                    </TableRow>
                                );
                            }
                            )}
                            <TableRow key="extra">
                                <TableCell>
                                    <Button onClick={onAddExtraItem}>
                                        ADD ITEM
                            </Button>
                                </TableCell>
                                <TableCell />
                            </TableRow>
                        </TableBody>
                    </Table>

                    <Button fullWidth variant="contained" onClick={createNewOrder}>
                        <Add />CREATE NEW ORDER
                    </Button>
                </TableContainer>
            </Grid>
        </div>
    );
};

AddOrder.propTypes = {
    productsList: PropTypes.array.isRequired,
    currencies: PropTypes.array.isRequired
}


const mapStateToProps = state => ({
    productsList: state.products.productsList,
    currencies: state.orders.currencies
})

export default connect(mapStateToProps, { getCurrencies, getProductsList, createOrder })(AddOrder);