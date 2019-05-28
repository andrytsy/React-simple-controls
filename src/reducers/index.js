import { ADD_TASK, GET_TASKS, SIGN_IN, LOGOUT, EDIT_TASK } from '../constants'

export default (state = {tasks: []}, action) => {
    const { type, data } = action

    switch (type) {
        case GET_TASKS:
            return data

        case ADD_TASK:
            return {
                ...state,
                needUpdate: true
            }

        case EDIT_TASK:
            return {
                ...state,
                needUpdate: true
            }
        
        case SIGN_IN:
            return {
                ...state,
                token: data.token
            }

        case LOGOUT:
            return {
                ...state,
                token: null
            }

        default:
            return state
    }
}