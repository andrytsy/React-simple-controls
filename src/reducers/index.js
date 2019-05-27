import { ADD_TASK, GET_TASKS, SIGN_IN, LOGOUT, EDIT_TASK } from '../constants'

export default (state = {tasks: []}, action) => {
    const { type, data } = action

    switch (type) {
        case GET_TASKS:
            return data

        case ADD_TASK:
            return {
                tasks: [],
                needUpdate: true
            }

        case EDIT_TASK:
            return {
                tasks: [],
                needUpdate: true
            }
        
        case SIGN_IN:
            return {
                tasks: state.tasks.slice(),
                total_task_count: state.total_task_count,
                token: data.token
            }

        case LOGOUT:
            return {
                tasks: state.tasks.slice(),
                total_task_count: state.total_task_count,
                token: null
            }

        default:
            return state
    }
}