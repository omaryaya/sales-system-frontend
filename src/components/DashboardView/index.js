import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
// import Page from 'src/components/Page';
import Budget from './Budget';
import LatestOrders from './LatestOrders';
import LatestProducts from './LatestProducts';
import Sales from './Sales';
import TasksProgress from './TasksProgress';
import TotalCustomers from './TotalCustomers';
import TotalProfit from './TotalProfit';
import TrafficByDevice from './TrafficByDevice';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getYearProfit } from '../../actions/dashboard';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = (props) => {
  // const classes = useStyles();
  useEffect(() => {
    props.getYearProfit();
  });

  return (
    // <Page className={classes.root} title="Dashboard" >
    <Container maxWidth={false}>
      <Grid
        container
        spacing={3}
      >
        {/* <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Budget />
        </Grid> */}
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalCustomers />
        </Grid>
        {/* <Grid item lg={3} sm={6} xl={3} xs={12} >
          <TasksProgress />
        </Grid> */}
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalProfit profit={props.yearProfit} />
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          <Sales />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <TrafficByDevice />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <LatestProducts />
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestOrders />
        </Grid>
      </Grid>
    </Container>
    // </Page>
  );
};

Dashboard.propTypes = {
  getYearProfit: PropTypes.func,
  yearProfit: PropTypes.number
}

const mapStateToProps = state => ({
    yearProfit : state.dashboard.yearProfit,
})
export default connect(mapStateToProps, { getYearProfit })(Dashboard);
