import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { Button, TableHead } from '@material-ui/core';

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
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
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
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
    tableDivContainer: {
        display: "flexShrink",
        flexShring: 0,
        maxWidth: "100%"
    }
});

export default function ProductsTable({ products, pagination }) {
    const classes = useStyles2();
    const [page, setPage] = useState(products.page);
    const [rowsPerPage, setRowsPerPage] = useState(products.size);
    const [isEditing, setIsEditing] = useState(-1);
    const [productBeingEdited, setProductBeingEdited] = useState({});
    
    useEffect( () => {
        function setEditingProduct(product) {
            setProductBeingEdited(product);
        }
        // return () => {
        //     ProductsTable.handleUpdateProduct(product, setEditingProduct);
        // };

    }, [isEditing]);


    const headCells = [
        { id: 'ID', numeric: false, disablePadding: true, label: 'ID' },
        { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
        { id: 'category', numeric: false, disablePadding: false, label: 'Category' },
        { id: 'SKU', numeric: false, disablePadding: false, label: 'SKU' },
        { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
        { id: 'order', numeric: false, disablePadding: false, label: 'Order' },
        { id: 'edit', numeric: false, disablePadding: false, label: 'Edit' },
        { id: 'delete', numeric: false, disablePadding: false, label: 'Delete' },
    ];

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, products.content.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        pagination(newPage, rowsPerPage);

    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        pagination(0, parseInt(event.target.value, 10));


    };

    const handleUpdateProduct = (event) => {
        console.debug("updateProduct/event",event)
        // console.debug("updateProduct/product",product)
        console.debug("updateProduct/event.name",event.name)

    }

    return (
        <div className={classes.tableDivContainer}>
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="custom pagination table">
                <TableHead>
                    <TableRow key={"head"}>
                        {headCells.map(head => (
                            <TableCell key={head.id}>{head.label}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? products.content.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : products.content
                    ).map((product) => {
                        if (isEditing === product.id) {
                            // setProductBeingEdited(product);
                            console.debug("productBeingEdited", productBeingEdited)
                            return (
                                <TableRow key={product.id}>
                                    
                                    <TableCell>{productBeingEdited.id}</TableCell>
                                    <TableCell><input onChange={handleUpdateProduct} name="name" value={productBeingEdited.name} /></TableCell>
                                    {/* <TableCell><input onChange={handleUpdateProduct} name="id"  value={productBeingEdited.category.name} /></TableCell> */}
                                    <TableCell><input onChange={handleUpdateProduct} name="sku"  value={productBeingEdited.sku} /></TableCell>
                                    <TableCell><input onChange={handleUpdateProduct} name="price"  value={productBeingEdited.price} /></TableCell>
                                    <TableCell><input onChange={handleUpdateProduct} name="order"  value={productBeingEdited.order} /></TableCell>
                                    <TableCell>
                                        <Button onClick={(event) => {
                                            console.debug("Saving", product.name);
                                            setIsEditing(-1);
                                        }}>
                                            <SaveIcon fontSize="small" />
                                        </Button>
                                        </TableCell>

                                    
                                    
                                </TableRow>
                            );
                        } else {
                            return (
                                <TableRow key={product.id} >
                                    <TableCell>{product.id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.category.name}</TableCell>
                                    <TableCell>{product.sku}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.order}</TableCell>
                                    <TableCell>
                                        <Button onClick={(event) => {
                                            console.debug("Editing", product.name);
                                            setIsEditing(product.id);
                                            setProductBeingEdited(product);
                                        } }>
                                            <EditIcon fontSize="small" role="button"/>
                                            </Button>
                                        </TableCell>
                                    <TableCell><Button><DeleteIcon fontSize="small" role="button" color="secondary" onClick={(event) => console.debug("Deleting", product.name)} /></Button></TableCell>
                                </TableRow>
                            )
                        }
                    }
                        /* (
                            (
                            
                            )
                            ((isEditing === -1) && <h1>IsEditing</h1>)
                        ) */






                    )}

                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            colSpan={3}
                            count={products.totalElements}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer >

        </div>
        
    );
}