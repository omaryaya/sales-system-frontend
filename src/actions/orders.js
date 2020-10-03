import axios from 'axios';
import * as Constants from '../constants';
import * as TYPES from './types';

// Get Orders

export const getOrders = (page=0, size=Constants.DEFAULT_PAGE_SIZE) => dispatch => {
    axios.get(Constants.APP_BACKEND_URL+"/orders/all", {params: {page: page, size: size}})
    .then(res => {
        dispatch({
            type: TYPES.GET_ORDERS,
            payload: res.data
        });
    }).catch(err => console.error(err));
}

// Delete Order
export const deleteOrder = (id) => dispatch => {
    axios.delete(Constants.APP_BACKEND_URL+`/orders/${id}/`)
    .then(res => {
        dispatch({
            type: TYPES.DELETE_ORDER,
            payload: id
        });
    }).catch(err => console.error(err));
}

// Get Products for Order
export const getProductsByOrderId = (orderId, page=0, size=Constants.DEFAULT_PAGE_SIZE) => dispatch => {
    axios.get(Constants.APP_BACKEND_URL+`/orders/order/${orderId}/products/`)
    .then(res => {
        const products = res.data;
        dispatch({
            type: TYPES.GET_PRODUCTS_BY_ORDER_ID,
            payload: {products, orderId}
        });
    }).catch(err => console.error(err));
}
