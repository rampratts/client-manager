import React, { Component } from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";

class ClientDetails extends Component {
    render() {
        const { client } = this.props;

        if (client) {
            return (
                <div>
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <Link to="/" className="btn btn-link">
                                <i className="fas fa-arrow-circle-left"></i> Back
                            </Link>
                        </div>
                        <div className="col-md-2 btn-group ml-auto" role="group">
                            <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
                                Edit
                            </Link>
                            <button className="btn btn-danger" type="button">Delete</button>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <span className="h3">{client.firstName} {client.lastName}</span>
                        </div>
                        <div className="card-body">
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <p className="card-text h4">Client ID: <span className="text-secondary h4">{client.id}</span></p>
                                </div>
                                <div className="col-md-6">
                                    <p className="h4 float-md-right">
                                        Balance:
                                        <span className={parseFloat(client.balance) > 0 ? "text-danger" : "text-success"}>
                                            ${parseFloat(client.balance).toFixed(2)}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><strong>Contact Email:</strong> {client.email}</li>
                                <li className="list-group-item"><strong>Contact Phone:</strong> {client.phone}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Spinner />;
        }
    }
}


export default compose(
    firestoreConnect(props => [
        { collection: `clients`, storeAs: "client", doc: props.match.params.id }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
        client: ordered.client && ordered.client[0]
    }))
)(ClientDetails);
