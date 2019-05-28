import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getTasks, saveEdit } from '../../ac'
import Pagination from '../pagination'
import './styles.scss'

class TaskList extends Component {
    static propTypes = {
        tasks: PropTypes.array.isRequired
    }

    state = {
        currentPage: 1,
        sortBy: 'id',
        sortDir: 'asc',
        editableTaskId: null,
        editableTaskStatus: null,
        editableTaskText: null
    }

    componentDidMount() {
        const { fetchData } = this.props

        if (fetchData)
            fetchData(this.state.sortBy, this.state.sortDir, this.state.currentPage)   
    }
    
    componentDidUpdate() {
        const { fetchData, isNeedUpdate } = this.props
        
        if (isNeedUpdate)
            fetchData(this.state.sortBy, this.state.sortDir, this.state.currentPage)
    }

    changePageHandler = currentPage => {
        if (this.state.editableTaskId) return

        const { fetchData } = this.props

        this.setState({ currentPage })
        fetchData(this.state.sortBy, this.state.sortDir, currentPage)
    }

    sortHandler(event) {
        if (this.state.editableTaskId) return

        const { fetchData } = this.props
        let sortBy = event.target.innerText.toLowerCase()
        var sortDir = this.state.sortDir

        if (sortBy === this.state.sortBy) {
            sortDir = sortDir === 'asc' ? 'desc' : 'asc'
            this.setState({ sortDir })
        } else {
            this.setState({ sortBy })
        }
        
        fetchData(sortBy, sortDir, this.state.currentPage)
    }

    taskStatusHandler(event) {
        let editableTaskStatus = event.target.value
        this.setState({ editableTaskStatus })
    }

    taskTextHandler(event) {
        let editableTaskText = event.target.value
        this.setState({ editableTaskText })
    }

    editTaskHandler(task) {
        const { token } = this.props

        if (token) {
            this.setState({ editableTaskId: task.id })
            this.setState({ editableTaskStatus: !!task.status })
            this.setState({ editableTaskText: task.text })
        }
    }

    saveChangeHandler() {
        const { token, saveEdit } = this.props

        if (token) {
            let task = {
                id: this.state.editableTaskId,
                status: this.state.editableTaskStatus,
                text: this.state.editableTaskText
            }

            saveEdit(token, task)
            this.clearEditState()
        }
    }

    clearEditState() {
        this.setState({ editableTaskId: null })
        this.setState({ editableTaskStatus: null })
        this.setState({ editableTaskText: null })
    }

    render() {
        const { tasks, count } = this.props
        const pages = this.getPagesQuantity(count)

        return (
            <div>
                <h4>Task list</h4>
                {
                    tasks.length
                        ? this.getTasksTable()
                        : this.getEmptyListMessage()
                }
                <Pagination 
                    pages = { pages } 
                    currentPage = { this.state.currentPage } 
                    callback = { this.changePageHandler } 
                />
            </div>
        )
    }

    getPagesQuantity(count) {
        return Math.ceil(Number(count) / 3)
    }

    getTasksTable() {
        return (
            <table className="tasks-list" cellSpacing="0" cellPadding="0">
                <thead>
                    <tr className="tasks-list__header-item" onClick = { this.sortHandler.bind(this) }>
                        <td>Status</td>
                        <td>Username</td>
                        <td>Email</td>
                        <td>Task</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    { this.getTaskList() }
                </tbody>
            </table>
        )
    }

    getEmptyListMessage() {
        return <h5>You haven't tasks.</h5>
    }

    getTaskList() {
        const { tasks, token } = this.props
        
        return tasks.map(task => {
            return token && this.state.editableTaskId === task.id 
                ? this.getEditTaskElement(task) 
                : this.getTaskElements(task)
        })
    }
    
    getEditTaskElement(task) {
        return (
            <tr className="tasks-list__item_active" key = { task.id }>
                <td>
                    <input type="checkbox" 
                        defaultChecked = { this.state.editableTaskStatus } 
                        onChange = { this.taskStatusHandler.bind(this) } 
                    />
                </td>
                <td>{ task.username }</td>
                <td>{ task.email }</td>
                <td>
                    <textarea 
                        value = { this.state.editableTaskText } 
                        onChange = { this.taskTextHandler.bind(this) } 
                    />
                </td>
                <td>
                    <input type="button" value="Save" onClick = { this.saveChangeHandler.bind(this) } />
                </td>
            </tr>
        )
    }

    getTaskElements(task) {
        const { token } = this.props
        let doneClass = 'tasks-list__status-item tasks-list__status-item_done'
        let activeClass = 'tasks-list__status-item tasks-list__status-item_active'

        return (
            <tr className="tasks-list__item" key = { task.id } >
                <td>
                    <span className = { task.status ? doneClass : activeClass }></span>
                </td>
                <td>{ task.username }</td>
                <td>{ task.email }</td>
                <td title = { task.text }>{ task.text }</td>
                <td>
                    { 
                        token 
                            ? <input type="button" value="Edit" onClick = { this.editTaskHandler.bind(this, task) } />  
                            : null 
                    }
                </td>
            </tr>
        )
    }
}

function mapStateToProps(state) {
    return { 
        tasks: state.tasks, 
        count: state.total_task_count,
        isNeedUpdate: !!state.needUpdate,
        token: state.token
    }
}

export default connect(mapStateToProps, { fetchData: getTasks, saveEdit })(TaskList)
