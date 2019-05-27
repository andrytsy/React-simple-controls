import { LOGOUT } from '../constants'

export default store => next => action => {
    const { data, type } = action

    if (data && data.token) {
        sessionStorage.setItem('token', data.token)
    } else if (type === LOGOUT) {
        sessionStorage.clear()
    } else if (data) {
        let token = sessionStorage.getItem('token')
        data.token = token
    } 

    return next(action)
}