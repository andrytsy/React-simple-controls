import defaultUsers from '../users.js'

export default (users = defaultUsers, action) => {
    switch (action.type) {
        case 'test':
            return users
        default:
            return users
    }
}