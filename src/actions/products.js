import axios from 'axios';
import * as Constants from '../constants';
import * as TYPES from './types';
import {tokenConfig} from './auth';

// Get Products

export const getProducts = (page=0, size=Constants.DEFAULT_PAGE_SIZE) => (dispatch, getState) => {
    
    const configuredToken = tokenConfig(getState);
    const requestConfiguration = {
        headers: configuredToken,
        params: {page: page, size: size}
    };
    axios.get(Constants.APP_BACKEND_URL+"/products/all", requestConfiguration)
    .then(res => {
        dispatch({
            type: TYPES.GET_PRODUCTS,
            payload: res.data
        });
        
    }).catch(err => console.error(err));
    dispatch(getCategories());
    
}

// Delete Product
export const deleteProduct = (id) => (dispatch, getState) => {
    const configuredToken = tokenConfig(getState);
    const requestConfiguration = {
        headers: configuredToken,
    };
    axios.delete(Constants.APP_BACKEND_URL+`/products/product/${id}/`, requestConfiguration)
    .then(res => {
        console.log("res", res);
        dispatch({
            type: TYPES.DELETE_PRODUCT,
            payload: id
        });
        dispatch(getProducts());
    }).catch(err => console.error(err));
}

// Create Product
export const createProduct = (productRequest) => (dispatch, getState) => {
    
    const configuredToken = tokenConfig(getState);
    
    const requestConfiguration = {
        headers: configuredToken,
    };
    
    axios.post(Constants.APP_BACKEND_URL+"/products/create/", productRequest, requestConfiguration)
    .then(res => {
        dispatch({
            type: TYPES.CREATE_PRODUCT_SUCCESS,
            payload: res.data
        });
        dispatch(getProducts());
    }).catch(err => {
        console.error(err);
        dispatch({
            type: TYPES.CREATE_PRODUCT_FAILED,
            payload: err
        })
    });
}

//          Categories
export const getCategories = () => (dispatch, getState) => {
    
    const configuredToken = tokenConfig(getState);
    const requestConfiguration = {
        headers: configuredToken,
    };
    
    axios.get(Constants.APP_BACKEND_URL+"/products/categories", requestConfiguration)
    .then(res => {
        dispatch({
            type: TYPES.GET_CATEGORIES,
            payload: res.data.object
        });
    }).catch(err => console.error(err));
}

