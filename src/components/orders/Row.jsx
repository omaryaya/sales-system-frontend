import { Button, IconButton, TableCell, TableRow, Collapse } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ProductsTable from '../products/ProductsTable';

Row.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.number.isRequired,
        referenceNumber: PropTypes.string,
        currency: PropTypes.string,
        products: PropTypes.array,
        price: PropTypes.number,
    }),
    handleExpand: PropTypes.func,
};

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

export default function Row(props) {
    const { order } = props;
    // const { classes } = props;
    const [open, setOpen] = useState(false);
    const classes = useRowStyles();
    const [products, setProducts] = useState({});

    const handleExpand = (page, size) => {
        setProducts(props.handleExpand(order.id, page, size));
        console.debug("Row/Products", products)
    }

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => {
                        setOpen(!open);
                        if(open === false) {
                            handleExpand(0);
                        }

                    }}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>

                <TableCell className={classes.tableCell}>
                    <Button onClick={(event) => {
                        console.debug("Deleting", order.referenceNumber)
                        // props.deleteProduct(order.id);
                    }}>
                        <DeleteIcon fontSize="small" role="button" color="secondary" />
                    </Button>
                </TableCell>
                <TableCell className={classes.tableCell}>
                    <Button onClick={(event) => {
                        console.debug("Editing", order.referenceNumber);
                        // setIsEditing(row.id);
                        // setOrderBeingEdited(row);
                    }}>
                        <EditIcon fontSize="small" role="button" />
                    </Button>
                </TableCell>

                <TableCell>{order.id}</TableCell>
                <TableCell>{order.referenceNumber}</TableCell>
                <TableCell>{order.currency}</TableCell>
            </TableRow>


            <TableRow>
                <TableCell colSpan={6}>
                    <Collapse in={open} unmountOnExit timeout="auto">
                        <Box margin={1}>
                            <ProductsTable {...products} getProducts={handleExpand} />
                            
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}