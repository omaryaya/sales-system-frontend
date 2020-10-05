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

    const [newProduct, setNewProduct] = useState({
        name: "",
        categoryId: 0,
        sku: "",
        price: "",
        order: {}
    });

    const handleUpdateNewProduct = e => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
        console.debug(newProduct)
    }
    const handleSelectCategory = category => {
        setNewProduct({ ...newProduct, categoryId: category })
    }

    const handleAddNewProduct = e => {
        props.createProduct(newProduct);
        setNewProduct({
            name: "",
            categoryId: 0,
            sku: "",
            price: "",
            order: {}
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
            <TableCell><SelectComponent {...props} onChange={handleSelectCategory} /></TableCell>
            <TableCell><input placeholder={"Product SKU"} onChange={handleUpdateNewProduct} name="sku" value={newProduct.sku} /></TableCell>
            <TableCell><input placeholder={"Price"} onChange={handleUpdateNewProduct} key="price" name="price" value={newProduct.price} /></TableCell>
            <TableCell><input onChange={handleUpdateNewProduct} name="order" value={newProduct.order?.referenceNumber} /></TableCell>

        </TableRow>
    );

}

export default NewProduct;