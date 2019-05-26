import React, { Component } from 'react'

export default class index extends Component {
    render() {
        return (
            <div>
                Login: <input type="text"/>
                Password: <input type="text"/>
                <input type="button" value="sign in"/>
            </div>
        )
    }
}
