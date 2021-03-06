import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import { subscribeToTimer, desuscribeToTimer } from "../../sockets/socket-try";


class Home extends Component {

  state = {
    timestamp: 'no timestamp yet'
  };

  componentDidMount() {
    
  }

  
  clickSuscribeToTimer =  subscribeToTimer((err, timestamp) => this.setState({
    timestamp
  }));

  componentWillUnmount() {
    desuscribeToTimer();
  }


  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Holaaa</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                Estas logueado en mi {" "}
                <span style={{ fontFamily: "monospace" }}>TFG</span> WebApp 👏
              </p>
            </h4>
            <p className="flow-text grey-text text-darken-1" >
              Timer value: {this.state.timestamp}
            </p>

            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.clickSuscribeToTimer}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Suscribirse al socket timer
            </button>

            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}
Home.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Home);