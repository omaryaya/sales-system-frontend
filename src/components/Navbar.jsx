import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const NavbarContent = ({isAuthenticated}) => {
    console.debug("navbarcontent", isAuthenticated)
    if (isAuthenticated === true) {
        return (
            <div className="navLinks">
                <Link to="/products">Products</Link>
                <Link to="/orders">Orders</Link>
            </div>
        );

    } else {
        return (
            <div className="navLinks">
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
            </div>
        );
    }
}


const Navbar = (props) => {
    console.debug("navbar props", props)
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <section>
                <h1>JET <br />BRAINS</h1>

                <div className="navContent">
                    <NavbarContent isAuthenticated={props.isAuthenticated} />
                </div>
            </section>

        </nav>
    );
};

Navbar.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Navbar);