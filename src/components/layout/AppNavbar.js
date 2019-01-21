import React, { Component } from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";

class AppNavbar extends Component {
    onLogoutClick = (e) => {
        e.preventDefault();

        const { firebase } = this.props;
        firebase.logout();
    }

    render() {
        const { auth } = this.props;

        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        ClientPanel
                    </Link>
                    <button className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarMain"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarMain">
                        <ul className="navbar-nav">
                            {auth.uid ? (
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">Dashboard</Link>
                                </li>
                            ) : null}
                        </ul>

                        {auth.uid ? (
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        {auth.email}
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link" onClick={this.onLogoutClick}>
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        ) : null}
                    </div>
                </div>
            </nav>
        )
    }
}


AppNavbar.propTypes = {
    firebase: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}


export default compose(
    firebaseConnect(),
    connect((state, props) => ({
        auth: state.firebase.auth
    }))
)(AppNavbar);