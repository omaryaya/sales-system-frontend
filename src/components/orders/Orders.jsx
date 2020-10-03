import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOrders, deleteOrder, getProductsByOrderId } from '../../actions/orders';
import OrdersTable from './OrdersTable';

class Orders extends Component {

    static propTypes = {

        content: PropTypes.array.isRequired,
        last: PropTypes.bool,
        page: PropTypes.number.isRequired,
        size: PropTypes.number,
        totalElements: PropTypes.number.isRequired,
        totalPages: PropTypes.number.isRequired,
    }

    componentDidMount() {
        this.props.getOrders();
    }

    componentDidUpdate() {
        
    }

    render() {
        return (
            <div>
                <h1>Orders</h1>
                <OrdersTable props={this.props} />
            </div>
        );
    }
}

const mapStateToProps = state => ({

    content: state.orders.content,
    last: state.orders.last,
    page: state.orders.page,
    size: state.orders.size,
    totalElements: state.orders.totalElements,
    totalPages: state.orders.totalPages,
})

export default connect(mapStateToProps, { getOrders, deleteOrder, getProductsByOrderId })(Orders);