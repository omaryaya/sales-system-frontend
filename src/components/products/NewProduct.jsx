import React, { useState } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SelectComponent from '../common/SelectComponent';
/* import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'; */

const NewProduct = (props) => {

    const {priceStyle} = props;

    const [newProduct, setNewProduct] = useState({
        name: "",
        sku: "",
        price: "",
    });

    const handleUpdateNewProduct = e => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
    }

    const handleAddNewProduct = e => {
        props.createProduct(newProduct);
        setNewProduct({
            name: "",
            sku: "",
            price: "",
        })
    }

    return (

        <TableRow >
            <TableCell />
            <TableCell>
                <Button onClick={(event) => {
                    console.debug("Adding", newProduct.name);
                    handleAddNewProduct(event);
                }}>
                    <AddIcon fontSize="small" />
                    Add
                </Button>
            </TableCell>
            
            <TableCell><input disabled placeholder={"ID"} name="id" /></TableCell>
            <TableCell><input placeholder={"Product Name"} onChange={handleUpdateNewProduct} name="name" value={newProduct.name} /></TableCell>
            <TableCell><input placeholder={"Product SKU"} onChange={handleUpdateNewProduct} name="sku" value={newProduct.sku} /></TableCell>
            <TableCell className={priceStyle}><input placeholder={"Price"} onChange={handleUpdateNewProduct} key="price" name="price" value={newProduct.price} /></TableCell>

        </TableRow>
    );

}

export default NewProduct;