import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { signIn, logout } from '../../ac'
import './styles.scss'

class Authorization extends Component {
    state = {
        login: '',
        pwd: ''
    }

    inputHandler(field, event) {
        this.setState({[field]: event.target.value})
    }

    render() {
        const { token } = this.props

        return (
            <div className="authorization">
                { token ? this.getGreeting() : this.getAuthForm()}
                <span className="authorization__field">
                    <input type="button" 
                        value = { this.getBtnText() } 
                        onClick = { this.submitHandler.bind(this) }
                    />
                </span>
            </div>
        )
    }

    getGreeting() {
        return 'Hi, Admin!'
    }

    getAuthForm() {
        return (
            <Fragment>
                <span className="authorization__field">
                    Login: 
                </span>
                <input type="text" 
                    value = { this.state.login } 
                    onChange = { this.inputHandler.bind(this, 'login') }
                />
                <span className="authorization__field">
                    Password: 
                </span>
                <input type="password" 
                    value = { this.state.pwd }
                    onChange = { this.inputHandler.bind(this, 'pwd') }
                />
            </Fragment>
        )
    }

    getBtnText() {
        const { token } = this.props

        return token ? 'Logout' : 'Sign in'
    }

    submitHandler() {
        const { signIn, logout, token } = this.props

        if (!token) {
            signIn(this.state.login, this.state.pwd)
            this.clearStateFields()
        } else {
            logout()
        }
    }

    clearStateFields() {
        for (let key in this.state) {
            this.setState({[key]: ''})
        }
    }
}

export default connect(state => (state), { signIn, logout })(Authorization)