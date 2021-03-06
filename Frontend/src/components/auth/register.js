import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      nombre: "",
      usuario: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    
    // If logged in and user navigates to Register page, should redirect them to home
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      nombre: this.state.nombre,
      usuario: this.state.usuario,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s12 m12 l10 xl8 offset-xl2 offset-l1">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Volver a Home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Registrate</b>
              </h4>
              <p className="grey-text text-darken-1">
                ¿Ya tienes una cuenta? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12 m12 l8 xl8 ">
                <input
                  onChange={this.onChange}
                  value={this.state.nombre}
                  error={errors.nombre}
                  id="nombre"
                  type="text"
                  className={classnames("", {
                    invalid: errors.nombre
                  })}
                />
                <label htmlFor="nombre">Nombre</label>
                <span className="red-text">{errors.nombre}</span>
              </div>
              <div className="input-field col s12 m12 l8 xl8 ">
                <input
                  onChange={this.onChange}
                  value={this.state.usuario}
                  error={errors.usuario}
                  id="usuario"
                  type="text"
                  className={classnames("", {
                    invalid: errors.usuario
                  })}
                />
                <label htmlFor="usuario">Usuario</label>
                <span className="red-text">{errors.usuario}</span>
              </div>
              <div className="input-field col s12 m12 l8 xl8 ">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <label htmlFor="password">Contraseña</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col s12 m12 l8 xl8 ">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <label htmlFor="password2">Confirma Contraseña</label>
                <span className="red-text">{errors.password2}</span>
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
                  Registro
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));