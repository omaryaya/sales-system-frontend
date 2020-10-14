import { Button } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/CloseSharp';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
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
    const { orders } = props;


    const headCells = [

        { id: 'actions', numeric: false, disablePadding: true, label: 'Actions' },

        { id: 'ref', numeric: false, disablePadding: false, label: 'Reference #' },
        { id: 'customer', numeric: false, disablePadding: false, label: 'Customer' },
        { id: 'status', numeric: false, disablePadding: true, label: 'Status' },

        { id: 'cost', numeric: false, disablePadding: false, label: 'Cost' },
        { id: 'date', numeric: false, disablePadding: false, label: 'Date' }

    ];


    return (
        <div className={classes.tableDivContainer}>
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHeader headCells={headCells} classes={classes} />
                    <TableBody>
                        {orders?.map((order, i) => {
                            return (
                                <Row key={order.id} {...props} order={order} />
                            )    
                        }
                        )}
                    </TableBody>

                </Table>
            </TableContainer>
        </div>
    );
}
