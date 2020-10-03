import axios from 'axios';
import * as Constants from '../constants';
import * as TYPES from './types';

// Get Products

export const getProducts = (page=0, size=Constants.DEFAULT_PAGE_SIZE) => dispatch => {
    axios.get(Constants.APP_BACKEND_URL+"/products/all", {params: {page: page, size: size}})
    .then(res => {
        dispatch({
            type: TYPES.GET_PRODUCTS,
            payload: res.data
        });
    }).catch(err => console.error(err));
}

// Delete Product
export const deleteProduct = (id) => dispatch => {
    axios.delete(Constants.APP_BACKEND_URL+`/products/product/${id}/`)
    .then(res => {
        console.log("res", res);
        dispatch({
            type: TYPES.DELETE_PRODUCT,
            payload: id
        });
    }).catch(err => console.error(err));
}

