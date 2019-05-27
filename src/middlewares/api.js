import { ADD_TASK, GET_TASKS, FAIL } from '../constants'
import { getTasks } from '../ac'

export default store => next => action => {
    const { url, header, type } = action

    if (!url) return next(action)

    fetch(url, header)
        .then((res) => res.json())
        .then(response => {
            if (response.status === 'ok') {
                return next({ type: type, data: response.message })
            }
        })
        .catch(error => next({ type: type + FAIL, error }))
}