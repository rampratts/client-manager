import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class Clients extends Component {
    render() {
        const clients = [{
            id: "12312541",
            firstName: "Mauricio",
            lastName: "Grillo",
            email: "maugrillo@gmail.com",
            phone: "8217321",
            balance: "30"
        }]

        if (clients) {
            return (
                <div>
                    <div className="col-md-6">
                        <h2><i className="fas fa-users"></i> Clients</h2>
                    </div>


                    <table className="table table-stripped">
                        <thead className="thead-inverse">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map(client => (
                                <tr key={client.id}>
                                    <td>{client.firstName} {client.lastName}</td>
                                    <td>{client.email}</td>
                                    <td>${parseFloat(client.balance).toFixed(2)}</td>
                                    <td>
                                        <Link to={`/client/${client.id}`}
                                            className="btn btn-secondary btn-sm"
                                        >
                                            <i className="fas fa-arrow-circle-right"></i>
                                            Details
                                            </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return <h1>Loading clients.</h1>
        }

    }
}
