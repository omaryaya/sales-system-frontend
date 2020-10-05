import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, Toolbar, Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';
import { Button, CssBaseline } from '@material-ui/core';
// import * as jetbrains_logo from '../resources/jetbrains_logo.png';
import * as jetbrains_logo from '../resources/jb_logo_2.png';


const useStyles = makeStyles(theme => ({
    root: {
        font: "Gotham",
    },
    logo: {
        maxHeight: 64,
        maxWidth: 64,
    },    
    toolbar: {
        minHeight: 128,
        font: "Gotham",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: theme.spacing(3),
        marginBottom: theme.spacing(3),
        backgroundColor: "#520314",
        color: "white",
        [theme.breakpoints.up("md")]: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: theme.spacing(9),
        },
    },
    toolbarTitle: {
        letterSpacing: 1.25,
        fontWeight: "bold",
        color: "white",
    },
    menuButtons: {
        display: "flex",
        flexDirection: "column",
        [theme.breakpoints.up("md")]: {
            flexDirection: "row",
        },
        color: "white",
    },
    item: {
        padding: theme.spacing(1),
        [theme.breakpoints.up("md")]: {
            paddingLeft: theme.spacing(3),
        },
        color: "white",
    },
}));

const NavbarContent = (props) => {
    const [activeBtn, setActiveBtn] = useState("products");
    const { classes } = props;

    if (props.isAuthenticated === true) {
        return (

            <Box className={classes.menuButtons}>
                {["products", "orders"].map(item => (
                    <Link
                        to={`/${item}`}
                        // component="button"
                        variant="body2"
                        onClick={() => setActiveBtn(item)}
                        color={activeBtn === item ? "textPrimary" : "textSecondary"}
                        className={classes.item}
                        key={item}
                    >
                        {item.toUpperCase()}
                    </Link>
                ))
                }
                <Button className={classes.item} onClick={props.logout} >Logout</Button>
            </Box>

        );

    } else {
        return (
            <Box className={classes.menuButtons}>
                {["register", "login"].map(item => (
                    <Link
                        to={`/${item}`}
                        // component="button"
                        variant="body2"
                        onClick={() => setActiveBtn(item)}
                        color={activeBtn === item ? "textPrimary" : "textSecondary"}
                        className={classes.item}
                        key={item}
                    >
                        {item.toUpperCase()}
                    </Link>
                ))
                }
            </Box>
        );
    }
}
NavbarContent.propTypes = {
    isAuthenticated: PropTypes.bool,
    logout: PropTypes.func.isRequired,
}


function Navbar(props) {
    const classes = useStyles();


    return (
        <Container className={classes.root}>
            <CssBaseline />
            <Toolbar className={classes.toolbar}>
                
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="left"
                    noWrap
                    className={classes.toolbarTitle}
                >
                    <Link to="/orders">
                        <img src={jetbrains_logo} alt="jetbrains logo" className={classes.logo} />
                    </Link>
                    
          </Typography>
                <NavbarContent classes={classes} {...props} />
            </Toolbar>
        </Container>
    );
}

Navbar.propTypes = {
    isAuthenticated: PropTypes.bool,
    logout: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
})


export default connect(mapStateToProps, { logout })(Navbar);