import React, { Component } from "react";
import { connect } from "react-redux";
//import PropTypes from "prop-types";

class Dashboard extends Component {
  componentDidMount() {
    
  }

  render() {
    

    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Dashboard</h1>
              <br />
             
             This page is secured (visible only to authenticated users)

              <br />
              <hr />
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
 
});

export default connect(
  mapStateToProps,
  null
)(Dashboard);