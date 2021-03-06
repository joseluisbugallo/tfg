import React, { Component } from "react";
import { Link } from "react-router-dom";
class Landing extends Component {

    render() {
        return (
            <div style={{ height: "30vh" }} className="container valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">
                        <h4>
                            WebApp de visualización de videos sincronizados con otros usuarios
            </h4>

                        <br />
                        <div className="col s6">
                            <Link
                                to="/register"
                                style={{
                                    width: "140px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px"
                                }}
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                                Registro
              </Link>
                        </div>

                        
                        <div className="col s6">
                            
                                <Link
                                    to="/login"
                                    style={{
                                        width: "140px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px"
                                    }}
                                    className="btn btn-large btn-flat waves-effect white black-text"
                                >
                                    Log In
              </Link>
                            
                        </div>

                        <div className="col s6">
                            <Link
                                to="/recoverypassword"
                                style={{
                                    width: "140px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px"
                                }}
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                                Recuperar contraseña
              </Link>
                        </div>


                    </div>
                </div>
            </div>
        );
    }
}
export default Landing;