import axios from 'axios';
import * as Constants from '../constants';
import {GET_PRODUCTS} from './types';

// Get Products

export const getProducts = (page=0, size=Constants.DEFAULT_PAGE_SIZE) => dispatch => {
    axios.get(Constants.APP_BACKEND_URL+"/products/all", {params: {page: page, size: size}})
    .then(res => {
        dispatch({
            type: GET_PRODUCTS,
            payload: res.data
        });
    }).catch(err => console.error(err));
}