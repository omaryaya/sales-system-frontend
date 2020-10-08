import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOrders, deleteOrder, getOrderItems } from '../../actions/orders';
import OrdersTable from './OrdersTable';
import { Grid, Button } from '@material-ui/core';
import SimpleDialog from '../common/SimpleDialog';
import AddOrder from './AddOrder';
import OrderDetails from './OrderDetails';


const Orders = props => {

    const [currentOrder, setCurrentOrder] = useState({});

    const [isCreateOrderDialogOpen, setIsCreateOrderDialogOpen] = useState(false);

    useEffect(() => {
        props.getOrders();
    }, []);

    useEffect(() => {
        currentOrder.id && props.getOrderItems(currentOrder.id);
    }, [currentOrder.id])

    return (
        <div>
            
            <SimpleDialog component={AddOrder} open={isCreateOrderDialogOpen} title="Create Order" onClose={() => setIsCreateOrderDialogOpen(false)} />
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <h1>Orders</h1>
                    <Button variant="outlined" onClick={() => setIsCreateOrderDialogOpen(!isCreateOrderDialogOpen)}>
                        Create New Order
                    </Button>
                    <OrdersTable {...props} setCurrentOrder={setCurrentOrder} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <h1>Order Details</h1>
                    <p>{currentOrder.referenceNumber}</p>
                    {currentOrder.id && <OrderDetails currentOrder={currentOrder} {...props} />}

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

export default connect(mapStateToProps, { getOrders, deleteOrder, getOrderItems })(Orders);






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