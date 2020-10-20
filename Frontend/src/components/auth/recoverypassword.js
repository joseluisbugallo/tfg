import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { recoveryPassword } from "../../actions/authActions";

class Recovery extends Component {
  constructor() {
    super();
    this.state = {
      email: ""
    };
  }

  componentDidMount() {
    
    // If logged in and user navigates to Register page, should redirect them to home
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  }

 
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  
  onSubmit = e => {
    e.preventDefault();
    const email = {
        "email" : this.state.email
    };
    this.props.recoveryPassword(email, this.props.history)
  };
  render() {
   
    return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s12 m12 l10 xl8 offset-xl2 offset-l1">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Volver a Home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Recupera la contraeña</b>
              </h4>
              <p className="grey-text text-darken-1">
                ¿Recuerdas tu contraseña? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12 m12 l8 xl8 ">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  id="email"
                  type="text"
                  
                />
                <label htmlFor="email">Introduce el email asociado a tu cuenta</label>
                
              </div>
              
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { recoveryPassword }
)(withRouter(Recovery));