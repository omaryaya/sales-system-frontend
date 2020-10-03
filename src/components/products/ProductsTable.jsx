import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { Button } from '@material-ui/core';
import TableHeader from '../common/TableHeader';
import * as Constants from '../../constants';
import PaginationTableFooter from '../common/PaginationTableFooter';



const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
    tableCell: {
        maxWidth: "10px",
    },
    tableDivContainer: {
        display: "flexShrink",
        flexShring: 0,
        padding: "5vh"
    }
});

export default function ProductsTable({ props, getProducts }) {
    const classes = useStyles2();
    const [page, setPage] = useState(props.page || 0);
    const [rowsPerPage, setRowsPerPage] = useState((props?.size > 0) ? props.size : 0);
    const [isEditing, setIsEditing] = useState(-1);
    const [productBeingEdited, setProductBeingEdited] = useState({});

    const headCells = [
        { id: 'delete', numeric: false, disablePadding: false, label: 'Delete' },
        { id: 'edit', numeric: false, disablePadding: false, label: 'Edit' },
        { id: 'ID', numeric: false, disablePadding: true, label: 'ID' },
        { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
        { id: 'category', numeric: false, disablePadding: false, label: 'Category' },
        { id: 'SKU', numeric: false, disablePadding: false, label: 'SKU' },
        { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
        { id: 'order', numeric: false, disablePadding: false, label: 'Order' },
    ];


    const emptyRows = (props.content) ? rowsPerPage - Math.min(rowsPerPage, props?.content?.length - page * rowsPerPage) : Constants.DEFAULT_PAGE_SIZE;

    const handleChangePage = (event, newPage) => {
        console.debug("handle change page/event", event)
        console.debug("handle change page/newPage", newPage)
        setPage(newPage);
        // props.getProducts(newPage, props.size);
        getProducts(newPage, props.size);
    };

    const handleChangeRowsPerPage = (event) => {

        const newSize = parseInt(event.target.value, 10);
        setPage(0);
        setRowsPerPage(newSize);
        // props.getProducts(page, newSize);
        getProducts(page, newSize);
    };

    const handleUpdateProduct = (event) => {
        console.debug("updateProduct/event", event)
        console.debug("updateProduct/event.name", event.name)

    }

    return (
        <div className={classes.tableDivContainer}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="custom pagination table">
                    <TableHeader headCells={headCells} classes={classes} />
                    
                    <TableBody>
                        {(rowsPerPage > 0
                            ? props.content?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : props.content
                        )?.map((product) => {
                            if (isEditing === product.id) {
                                console.debug("productBeingEdited", productBeingEdited)
                                return (
                                    <TableRow key={product.id}>
                                        <TableCell />
                                        <TableCell>
                                            <Button onClick={(event) => {
                                                console.debug("Saving", product.name);
                                                setIsEditing(-1);
                                                setProductBeingEdited({});
                                            }}>
                                                <SaveIcon fontSize="small" />
                                            </Button>
                                        </TableCell>
                                        <TableCell>{productBeingEdited.id}</TableCell>
                                        <TableCell><input onChange={handleUpdateProduct} name="name" value={productBeingEdited.name} /></TableCell>
                                        <TableCell><input onChange={handleUpdateProduct} name="id" value={productBeingEdited.category?.name} /></TableCell>
                                        <TableCell><input onChange={handleUpdateProduct} name="sku" value={productBeingEdited.sku} /></TableCell>
                                        <TableCell><input onChange={handleUpdateProduct} name="price" value={productBeingEdited.price} /></TableCell>
                                        <TableCell><input onChange={handleUpdateProduct} name="order" value={productBeingEdited.order?.referenceNumber} /></TableCell>
                                    </TableRow>
                                );
                            } else {
                                return (
                                    <TableRow key={product.id} >
                                        <TableCell className={classes.tableCell}>
                                            <Button onClick={(event) => {
                                                console.debug("Deleting", product.name)
                                                props.deleteProduct(product.id);
                                            }}>
                                                <DeleteIcon fontSize="small" role="button" color="secondary" />
                                            </Button>
                                        </TableCell>
                                        <TableCell className={classes.tableCell}>
                                            <Button onClick={(event) => {
                                                console.debug("Editing", product.name);
                                                setIsEditing(product.id);
                                                setProductBeingEdited(product);
                                            }}>
                                                <EditIcon fontSize="small" role="button" />
                                            </Button>
                                        </TableCell>


                                        <TableCell>{product.id}</TableCell>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{product.category?.name}</TableCell>
                                        <TableCell>{product.sku}</TableCell>
                                        <TableCell>{product.price}</TableCell>
                                        <TableCell>{product.order}</TableCell>

                                    </TableRow>
                                )
                            }
                        }
                        )}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={headCells.length} />
                            </TableRow>
                        )}
                    </TableBody>
                    
                    <PaginationTableFooter {...props} page={page} handleChangePage={handleChangePage} rowsPerPage={rowsPerPage} />
                </Table>
            </TableContainer >

        </div>

    );
}