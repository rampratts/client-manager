import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";


class Login extends Component {
    state = {
        email: "",
        password: ""
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    onSubmit = e => {
        e.preventDefault();

        const { firebase } = this.props;
        const { email, password } = this.state;

        firebase.login({
            email,
            password
        }).catch(err => alert("Invalid user"))
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="text-center pb-4 pt-3">
                                <i className="fas fa-lock text-primary mr-3"></i>
                                Login
                            </h1>

                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email"
                                        className="form-control"
                                        name="email"
                                        required
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password"
                                        className="form-control"
                                        name="password"
                                        required
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <input type="submit" value="Login"
                                        className="btn btn-primary btn-lg col-12 col-md-3" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    firebase: PropTypes.object.isRequired
}

export default firebaseConnect()(Login);
