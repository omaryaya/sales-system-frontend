import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOrders, deleteOrder } from '../../actions/orders';
import OrdersTable from './OrdersTable';
import { Grid } from '@material-ui/core';
import AddOrder from './AddOrder';


const Orders = props => {

    const [currentOrder, setCurrentOrder] = useState({});

    useEffect(() => {
        props.getOrders();
    }, []);

    return (
        <div>
            
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <h1>Orders</h1>
                    <OrdersTable {...props} setCurrentOrder={setCurrentOrder} />
                </Grid>
                <Grid item xs={12} md={2}>
                    <h1>Order Details</h1>
                    <p>{currentOrder.referenceNumber}</p>
                    {/* <AddOrder {...props} /> */}
                </Grid>
            </Grid>

        </div>
    );

}

Orders.propTypes = {
    orders: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    orders: state.orders.orders,
    /* content: state.orders.content,
    last: state.orders.last,
    page: state.orders.page,
    size: state.orders.size,
    totalElements: state.orders.totalElements,
    totalPages: state.orders.totalPages, */
})

export default connect(mapStateToProps, { getOrders, deleteOrder })(Orders);






/*static propTypes = {
    orders: PropTypes.array.isRequired,
    content: PropTypes.array.isRequired,
    last: PropTypes.bool,
    page: PropTypes.number.isRequired,
    size: PropTypes.number,
    totalElements: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
}

const mapStateToProps = state => ({
    orders: state.orders.orders,
    content: state.orders.content,
    last: state.orders.last,
    page: state.orders.page,
    size: state.orders.size,
    totalElements: state.orders.totalElements,
    totalPages: state.orders.totalPages,
}) */