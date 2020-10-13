import React from 'react';
import PropTypes from 'prop-types';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from '@material-ui/core';
import TableHeader from '../common/TableHeader';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCustomers, createCustomer, deleteCustomer } from '../../actions/customers';
import AddIcon from '@material-ui/icons/Add';
import { Delete } from '@material-ui/icons';

const DEFAULT_NEW_CUSTOMER = {
    name: "",
    address: ""
}

const Customers = props => {
    const { customers } = props;
    const [newCustomer, setNewCustomer] = useState(DEFAULT_NEW_CUSTOMER);

    const headCells = [

        { id: 'actions', numeric: false, disablePadding: true, label: 'Actions' },

        { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
        { id: 'address', numeric: false, disablePadding: false, label: 'Address' },
        { id: 'details', numeric: false, disablePadding: false, label: 'Details' },

    ];

    useEffect(() => {
        getCustomers();
    })

    const onChangeNewCustomer = e => {
        setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
    };

    const handleAddCustomer = () => {

        props.createCustomer(newCustomer);
        setNewCustomer(DEFAULT_NEW_CUSTOMER);
    };

    return (
        <div>
            <h1>Customers</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHeader headCells={headCells} />
                    <TableBody>
                        <TableRow key="new-customer">
                            <TableCell><Button onClick={handleAddCustomer}>
                                Create
                                <AddIcon fontSize="small" />
                            </Button></TableCell>
                            <TableCell>
                                <TextField
                                    value={newCustomer.name}
                                    onChange={onChangeNewCustomer}
                                    name="name"
                                    label="Name">

                                </TextField>
                            </TableCell>
                            <TableCell>
                                <TextField
                                    value={newCustomer.address}
                                    onChange={onChangeNewCustomer}
                                    name="address"
                                    label="Address">
                                </TextField>
                            </TableCell>
                            <TableCell />
                        </TableRow>
                        {
                            customers?.map((customer, i) => {
                                return (
                                    <TableRow key={i}>
                                        <TableCell>
                                            <Button onClick={() => {
                                                props.deleteCustomer(customer.id);
                                            }}>
                                                <Delete fontSize="small" role="button" color="secondary" />
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>{customer.name}</Typography>

                                        </TableCell>
                                        <TableCell>
                                            <Typography>{customer.address}</Typography>
                                        </TableCell>
                                    </TableRow>

                                );

                            })
                        }

                    </TableBody>
                </Table>

            </TableContainer>


        </div>
    );
};

Customers.propTypes = {
    customers: PropTypes.array
};

const mapStateToProps = state => ({
    customers: state.customers.customers
});

export default connect(mapStateToProps, { getCustomers, createCustomer, deleteCustomer })(Customers);