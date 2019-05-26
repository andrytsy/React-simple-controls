import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './styles.scss'

class UsersList extends Component {
    static propTypes = {
        users: PropTypes.array.isRequired
    }
    
    render() {
        return (
            <table className="user-list">
                <tbody>
                    { this.getUsersList() }
                </tbody>
            </table>
        )
    }

    getUsersList() {
        const { users } = this.props
        return users.map(user => <tr key = { user.id }><td>{ user.name }</td><td>{ user.mail }</td><td>{ user.text }</td></tr>)
    }
}

function mapStateToProps(state) {
    return { users: state }
}

export default connect(mapStateToProps)(UsersList)
