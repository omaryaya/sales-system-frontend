import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrencies } from '../../actions/orders';
import { getProductsList } from '../../actions/products';

import { Grid, TextField } from '@material-ui/core';
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
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/CloseSharp';
import TableHeader from '../common/TableHeader';

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
        items: [
            {
                productId: "",
                quantity: ""
            }
        ]
    })

    useEffect(() => {
        props.getProductsList();
        props.getCurrencies();
    }, []);

    const headCells = [
        { id: 'product', numeric: false, disablePadding: false, label: 'Product' },

        { id: 'quantity', numeric: false, disablePadding: false, label: 'Quantity' },

    ];

    const onChange = e => {
        setOrder({ ...order, [e.target.name]: e.target.value })
    }

    return (
        <div className={classes.tableDivContainer}>

            <TableContainer component={Paper}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <TextField label="Reference Number" onChange={onChange} id="referenceNumber" name="referenceNumber" value={order.referenceNumber} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField label="Currency" onChange={onChange} id="currency" name="currency" value={order.currency} />
                    </Grid>
                </Grid>
                <Table className={classes.table} >
                    <TableHeader headCells={headCells} classes={classes} />
                    <TableBody>
                        {order.items?.map((item, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell><TextField label="productId" id="productId" onChange={onChange} name="productId" value={item.productId} /></TableCell>
                                    <TableCell><TextField label="quantity" id="quantity" onChange={onChange} name="quantity" value={item.quantity} /></TableCell>
                                </TableRow>
                            );
                        }
                        )}
                        <TableRow key="extra">
                            <TableCell>
                                <Button onClick={() =>{ 
                                    var tempOrder = {...order};
                                    tempOrder.items = tempOrder.items.push({});
                                    setOrder({ tempOrder }); 
                                }
                            }>ADD ITEM</Button>
                            </TableCell>
                            <TableCell />
                        </TableRow>
                    </TableBody>

                </Table>
            </TableContainer>
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

export default connect(mapStateToProps, { getCurrencies, getProductsList })(AddOrder);