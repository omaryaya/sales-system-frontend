import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Button,
    Table,
    TableHead,
    TableBody,
    TableContainer,
    TableCell,
    TableRow,
    TablePagination,
    Paper,
    // TextField,
    TableFooter,
    IconButton

} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {
    FirstPage,
    KeyboardArrowLeft,
    KeyboardArrowRight,
    LastPage,
    Save
} from '@material-ui/icons';
// import TableHeader from '../common/TableHeader';
import * as Constants from '../../constants';
// import PaginationTableFooter from '../common/PaginationTableFooter';
import NewProduct from './NewProduct';

// #//#region  Footer

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        console.debug("TablePaginationActions/next", event)
        console.debug("TablePaginationActions/page", page)
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    // count: PropTypes.number.isRequired,
    // onChangePage: PropTypes.func.isRequired,
    // page: PropTypes.number.isRequired,
    // rowsPerPage: PropTypes.number.isRequired,
    count: PropTypes.number,
    onChangePage: PropTypes.func,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
};

// //#endregion Footer

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
    },
    price: {
        fontWeight: "bold",
        color: "green"
    }
});

export default function ProductsTable(props) {
    const classes = useStyles2();
    const { getProducts, totalElements, size } = props;
    const [page, setPage] = useState(props.page);
    const [rowsPerPage, setRowsPerPage] = useState((props?.size > 0) ? props.size : 0);
    const [isEditing, setIsEditing] = useState(-1);
    const [productBeingEdited, setProductBeingEdited] = useState({});


    const headCells = [
        // { id: 'delete', numeric: false, disablePadding: true, label: 'Delete' },
        // { id: 'edit', numeric: false, disablePadding: true, label: 'Edit' },
        { id: 'actions', numeric: false, disablePadding: true, label: 'Actions' },
        { id: 'ID', numeric: false, disablePadding: true, label: 'ID' },
        { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
        { id: 'SKU', numeric: false, disablePadding: false, label: 'SKU' },
        { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
    ];


    const emptyRows = (props.content) ? rowsPerPage - Math.min(rowsPerPage, props?.content?.length - page * rowsPerPage) : Constants.DEFAULT_PAGE_SIZE;

    const handleUpdateProductBeingEdited = e => {
        console.debug("update product being edited", e);
    }

    const handleChangePage = (event, newPage) => {
        console.debug("handling change page/newPage", newPage)
        setPage(newPage);

        getProducts(newPage, props.size);
    };

    /* const handleChangeRowsPerPage = (event) => {

        const newSize = parseInt(event.target.value, 10);
        setPage(0);
        setRowsPerPage(newSize);
        // props.getProducts(page, newSize);
        getProducts(page, newSize);
    }; */



    return (
        <div className={classes.tableDivContainer}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow key={"head"}>
                            {headCells.map(head => (
                                <TableCell className={classes.tableCell} key={head.id}>{head.label}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <NewProduct {...props} priceStyle={classes.price} />
                        {(rowsPerPage > 0
                            ? props.content?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : props.content
                        )?.map((product) => {
                            if (isEditing === product.id) {
                                console.debug("productBeingEdited", productBeingEdited)
                                return (
                                    <TableRow key={product.id}>

                                        <TableCell>
                                            <Button onClick={(event) => {
                                                console.debug("Saving", product.name);
                                                setIsEditing(-1);
                                                setProductBeingEdited({});
                                            }}>
                                                <Save fontSize="small" />
                                            </Button>
                                        </TableCell>
                                        <TableCell>{productBeingEdited.id}</TableCell>
                                        <TableCell><input onChange={handleUpdateProductBeingEdited} name="name" value={productBeingEdited.name} /></TableCell>
                                        <TableCell><input onChange={handleUpdateProductBeingEdited} name="sku" value={productBeingEdited.sku} /></TableCell>
                                        <TableCell className={classes.price}><input onChange={handleUpdateProductBeingEdited} name="price" value={productBeingEdited.price} /></TableCell>
                                    </TableRow>
                                );
                            } else {
                                return (
                                    <TableRow key={product.id} >
                                        {/* Actions */}
                                        <TableCell className={classes.tableCell}>
                                            <Button onClick={(event) => {
                                                console.debug("Deleting", product.name)
                                                props.deleteProduct(product.id);
                                            }}>
                                                <DeleteIcon fontSize="small" role="button" color="secondary" />
                                            </Button>
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
                                        <TableCell>{product.sku}</TableCell>
                                        <TableCell className={classes.price}>{product.price}</TableCell>

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


                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[props.size]}
                                colSpan={3}
                                count={totalElements}
                                rowsPerPage={size}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onChangePage={handleChangePage}
                                // onChangeRowsPerPage={() => handleChangeRowsPerPage(rowsPerPage)}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>

                </Table>
            </TableContainer >

        </div>

    );
}