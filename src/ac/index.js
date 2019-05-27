import { GET_TASKS, ADD_TASK, EDIT_TASK, SIGN_IN, LOGOUT, SERVER_URL, DEVELOPER_LOGIN } from '../constants'

export function getTasks(sortBy = 'id', sortDir = 'asc', page = 0) {
    return {
        type: GET_TASKS,
        url: SERVER_URL + '/?developer=' + DEVELOPER_LOGIN 
                        + '&sort_field=' + sortBy
                        + '&sort_direction=' + sortDir
                        + '&page=' + page,
        header: {
            method: 'GET'
        }
    }
}

export function addTask(newTask) {
    let form = new FormData();
    form.append("username", newTask.username);
    form.append("email", newTask.email);
    form.append("text", newTask.text);

    return { 
        type: ADD_TASK,
        url: SERVER_URL + '/create?developer=' + DEVELOPER_LOGIN,
        header: {
            crossDomain: true,
            method: 'POST',
            mimeType: "multipart/form-data",
            contentType: false,
            processData: false,
            body: form,
            dataType: "json"
        }
    }
}

export function saveEdit(token, item) {
    let form = new FormData();
    form.append("token", token);
    form.append("status", item.status);
    form.append("text", item.text);
    
    return {
        type: EDIT_TASK,
        url: SERVER_URL + '/edit/' + item.id + '/?developer=' + DEVELOPER_LOGIN,
        header: {
            crossDomain: true,
            method: 'POST',
            mimeType: "multipart/form-data",
            contentType: false,
            processData: false,
            body: form,
            dataType: "json"
        }
    }
}

export function signIn(username, password) {
    let form = new FormData();
    form.append("username", username);
    form.append("password", password);
    
    return {
        type: SIGN_IN,
        url: SERVER_URL + '/login?developer=' + DEVELOPER_LOGIN,
        header: {
            crossDomain: true,
            method: 'POST',
            mimeType: "multipart/form-data",
            contentType: false,
            processData: false,
            body: form,
            dataType: "json"
        }
    }
}

export function logout() {
    return {
        type: LOGOUT
    }
}