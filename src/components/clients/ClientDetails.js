import React, { Component } from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";

class ClientDetails extends Component {
    state = {
        showBalanceUpdate: false,
        balanceUpdateAmount: ""
    }

    toggleForm = () => this.setState({ showBalanceUpdate: !this.state.showBalanceUpdate })


    balanceSubmit = e => {
        e.preventDefault();

        const { client, firestore } = this.props;
        const { balanceUpdateAmount } = this.state;

        const clientUpdate = {
            balance: parseFloat(balanceUpdateAmount)
        }

        firestore.update({ collection: "clients", doc: client.id }, clientUpdate);
    }

    onDeleteClick = e => {
        const { client, firestore, history } = this.props;

        firestore.delete({ collection: "clients", doc: client.id })
            .then(history.push("/"));
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value })

    render() {
        const { client } = this.props;
        const { showBalanceUpdate, balanceUpdateAmount } = this.state;

        let balanceForm = "";


        if (showBalanceUpdate) {
            balanceForm = (
                <form onSubmit={this.balanceSubmit}>
                    <div className="input-group">
                        <input type="number"
                            className="form-control"
                            name="balanceUpdateAmount"
                            placeholder="Add New Balance"
                            value={balanceUpdateAmount}
                            onChange={this.onChange}
                        />
                        <div className="input-group-append">
                            <input type="submit" value="Update"
                                className="btn btn-outline-primary"
                            />
                        </div>
                    </div>
                </form>
            )
        } else {
            balanceForm = null;
        }

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
                            <button onClick={this.onDeleteClick} className="btn btn-danger" type="button">Delete</button>
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
                                        <small>
                                            <a href="#!" onClick={this.toggleForm}>
                                                <i className="fas fa-pencil-alt ml-1"></i>
                                            </a>
                                        </small>
                                    </p>
                                    {balanceForm}
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

ClientDetails.propTypes = {
    firestore: PropTypes.object.isRequired
}


export default compose(
    firestoreConnect(props => [
        { collection: `clients`, storeAs: "client", doc: props.match.params.id }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
        client: ordered.client && ordered.client[0]
    }))
)(ClientDetails);
