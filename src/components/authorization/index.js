import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../ac'
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
        return (
            <div className="authorization">
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
                <span className="authorization__field">
                    <input type="button" 
                    value="sign in" 
                    onClick = { this.submitHandler.bind(this) }/>
                </span>
            </div>
        )
    }

    submitHandler() {
        const { signIn } = this.props
        signIn(this.state.login, this.state.pwd)
    }
}

export default connect(state => (state), { signIn })(Authorization)