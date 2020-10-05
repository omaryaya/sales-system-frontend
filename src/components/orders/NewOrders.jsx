import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOrders, deleteOrder, getProductsByOrderId } from '../../actions/orders';
import OrdersTable from './OrdersTable';
import Invoice from '../invoices/Invoice';

class NewOrders extends Component {

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
        console.debug("Orders/props", this.props)
    }

    componentDidUpdate() {
        console.debug("OrdersUpdated -> props", this.props)
    }

    render() {
        return (
            <div>
                <h1>Orders</h1>
                <Invoice />
                <OrdersTable {...this.props} />
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

export default connect(mapStateToProps, { getOrders, deleteOrder, getProductsByOrderId })(NewOrders);