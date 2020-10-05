import { Button } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import SaveIcon from '@material-ui/icons/Save';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import PaginationTableFooter from '../common/PaginationTableFooter';
import TableHeader from '../common/TableHeader';
import Row from './Row';



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
    tableCell: {
        maxWidth: "10px",
    },
    tableDivContainer: {
        display: "flexShrink",
        flexShring: 0,
        padding: "5vh"
    }
});



export default function OrdersTable(props) {
    const classes = useStyles2();
    const [page, setPage] = useState(props.page);
    const [rowsPerPage, setRowsPerPage] = useState(props.size);
    const [isEditing, setIsEditing] = useState(-1);
    const [orderBeingEdited, setOrderBeingEdited] = useState({});


    const headCells = [
        { id: 'collapse', numeric: false, disablePadding: true, label: '   ' },
        { id: 'delete', numeric: false, disablePadding: true, label: 'Delete' },
        { id: 'edit', numeric: false, disablePadding: false, label: 'Edit' },

        { id: 'ID', numeric: false, disablePadding: true, label: 'ID' },
        { id: 'ref', numeric: false, disablePadding: false, label: 'Reference #' },

        { id: 'currency', numeric: false, disablePadding: false, label: 'Currency' },

    ];

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.content.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        props.getOrders(newPage, props.size);
    };

    const handleChangeRowsPerPage = (event) => {

        const newSize = parseInt(event.target.value, 10);
        setPage(0);
        setRowsPerPage(newSize);
        props.getOrders(page, newSize);
    };

    const handleUpdateOrder = (event) => {
        console.debug("updateOrder/event", event)
        console.debug("updateOrder/event.name", event.name)

    };

    const EditableRow = (order) => {
        return (
            <TableRow key={order.id}>
                <TableCell />
                <TableCell>
                    <Button onClick={(event) => {
                        console.debug("Saving", order.name);
                        setIsEditing(-1);
                        setOrderBeingEdited({});
                    }}>
                        <SaveIcon fontSize="small" />
                    </Button>
                </TableCell>
                <TableCell>{orderBeingEdited.id}</TableCell>
                <TableCell><input onChange={handleUpdateOrder} name="name" value={orderBeingEdited.referenceNumber} /></TableCell>
                <TableCell><input onChange={handleUpdateOrder} name="id" value={orderBeingEdited.currency} /></TableCell>
            </TableRow>
        );
    }


    return (
        <div className={classes.tableDivContainer}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="collapsible table">
                    <TableHeader headCells={headCells} classes={classes} />
                    <TableBody>
                        {(rowsPerPage > 0
                            ? props.content.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : props.content
                        ).map((order, i) => {
                            if (isEditing === order.id) {
                                console.debug("orderBeingEdited", orderBeingEdited)
                                return (
                                    <EditableRow key={i} order={order} />
                                );
                            } else {
                                return (
                                    <Row {...props} key={i} order={order} handleExpand={props.getProductsByOrderId} />
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
            </TableContainer>
        </div>
    );
}
