import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route {...rest}
    render={props => {
        if(auth.isLoading === true) {
            return <CircularProgress color="secondary" />

        } else if (auth.isAuthenticated === false) {
            return <Redirect to="/" />
        } else {
            return <Component {...props} />;
        }
        
    }}
    />
);

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute);