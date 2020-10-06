import axios from 'axios';
import * as Constants from '../constants';
import * as TYPES from './types';
import {tokenConfig} from './auth';

// Create Order

export const createOrder = (orderRequest) => (dispatch, getState) => {
    
    const configuredToken = tokenConfig(getState);
    
    const requestConfiguration = {
        headers: configuredToken,
    };
    
    axios.post(Constants.APP_BACKEND_URL+"/orders/create/", orderRequest, requestConfiguration)
    .then(res => {
        dispatch({
            type: TYPES.CREATE_ORDER_SUCCESS,
            payload: res.data
        });
        dispatch(getOrders());
    }).catch(err => {
        console.error(err);
        dispatch({
            type: TYPES.CREATE_ORDER_FAILED,
            payload: err
        })
    });
}


// Get Orders

export const getOrders = (page=0, size=Constants.DEFAULT_PAGE_SIZE) => (dispatch, getState) => {
    
    const configuredToken = tokenConfig(getState);
    const requestConfiguration = {
        headers: configuredToken,
        params: {page: page, size: size}
    };

    axios.get(Constants.APP_BACKEND_URL+"/orders/all", requestConfiguration)
    .then(res => {
        dispatch({
            type: TYPES.GET_ORDERS,
            payload: res.data
        });
    }).catch(err => console.error(err));
}

// Delete Order
export const deleteOrder = (id) => (dispatch, getState) => {
    const configuredToken = tokenConfig(getState);
    const requestConfiguration = {
        headers: configuredToken,
    };

    axios.delete(Constants.APP_BACKEND_URL+`/orders/${id}/`, requestConfiguration)
    .then(res => {
        dispatch({
            type: TYPES.DELETE_ORDER,
            payload: id
        });
    }).catch(err => console.error(err));
}





// currencies
export const getCurrencies = () => (dispatch, getState) => {
    
    const configuredToken = tokenConfig(getState);
    const requestConfiguration = {
        headers: configuredToken,
    };

    axios.get(Constants.APP_BACKEND_URL+"/orders/currencies", requestConfiguration)
    .then(res => {
        dispatch({
            type: TYPES.GET_CURRENCIES,
            payload: res.data
        });
    }).catch(err => console.error(err));
}

// Items
export const getOrderItems = (id) => (dispatch, getState) => {
    
    const configuredToken = tokenConfig(getState);
    const requestConfiguration = {
        headers: configuredToken,
    };

    axios.get(Constants.APP_BACKEND_URL+`/orders/order/${id}/items`, requestConfiguration)
    .then(res => {
        const payload = {orderId: id, items: res.data};
        dispatch({
            type: TYPES.GET_ORDER_ITEMS,
            payload,
        });
    }).catch(err => console.error(err));
}
