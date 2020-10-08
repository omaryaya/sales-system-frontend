import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';


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
            <TableCell><Button onClick={(event) => {
                    console.debug("Adding", newProduct.name);
                    handleAddNewProduct(event);
                }}>
                    Create
                    <AddIcon fontSize="small" /> 
                </Button></TableCell>
            
            {<TableCell /> /* ID */ }
            <TableCell><input placeholder={"Product Name"} onChange={handleUpdateNewProduct} name="name" value={newProduct.name} /></TableCell>
            <TableCell><input placeholder={"Product SKU"} onChange={handleUpdateNewProduct} name="sku" value={newProduct.sku} /></TableCell>
            <TableCell className={priceStyle}><input placeholder={"Price"} onChange={handleUpdateNewProduct} key="price" name="price" value={newProduct.price} /></TableCell>

        </TableRow>
    );

}

export default NewProduct;