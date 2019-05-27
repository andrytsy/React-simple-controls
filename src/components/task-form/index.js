import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addTask } from '../../ac'
import './styles.scss'

class TaskForm extends Component {
    state = {
        username: '',
        email: '',
        text: '',
        warning: false
    }

    render() {
        return (
            <div className="task-form">
                <h4>Add new task</h4>
                <div className="task-form__row">
                    <span className="task-form__row-name">Name: </span>
                    <input required 
                        className="task-form__row-input"
                        value = { this.state.username } 
                        onChange = { this.inputHandler.bind(this, 'username') } />
                </div>
                <div className="task-form__row">
                    <span className="task-form__row-name">Email: </span>
                    <input required 
                        className="task-form__row-input"
                        value = { this.state.email } 
                        onChange = { this.inputHandler.bind(this, 'email') } />
                </div>
                <div className="task-form__row">
                    <span className="task-form__row-name">Task: </span>
                    <textarea required 
                        className="task-form__row-input"
                        value = { this.state.text } 
                        onChange = { this.inputHandler.bind(this, 'text') } />
                </div>
                <div className = { this.state.warning ? 'task-form__wraning_show' : 'task-form__wraning_hide' } >
                    Please, fill all fields.
                </div>
                <input type="button" value="Add" onClick = {this.clickHandler.bind(this)}/>
            </div>
        )
    }

    inputHandler(field, event) {
        this.setState({[field]: event.target.value})
    }

    clickHandler() {
        const { addTask } = this.props
        let newTaskData = {
            username: this.state.username,
            email: this.state.email,
            text: this.state.text
        }

        let valid = this.isValidTask(newTaskData)

        if (valid) {
            addTask(newTaskData)
            this.clearInputsData()
            this.hideWarning()
        } else {
            this.showWarning()
        }
    }

    isValidTask(item) {
        if (!item.username.trim() || !item.email.trim() || !item.text.trim()) 
            return false
        return true
    }

    clearInputsData() {
        for (let key in this.state) {
            this.setState({[key]: ''})
        }
    }

    hideWarning() {
        this.setState({ warning: false })
    }

    showWarning() {
        this.setState({ warning: true })
    }
}

export default connect(null, { addTask })(TaskForm)