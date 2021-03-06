const ADD_TASK = 'tasks/ADD_TASK';
const GET_TASKS = 'tasks/GET_TASKS';
const EDIT_TASK = 'tasks/EDIT_TASK';
const USER_DELETE_TASK = 'tasks/USER_DELETE_TASK';
const TASKER_DELETE_TASK = 'tasks/TASKER_DELETE_TASK';
const GET_TASKS_ON_TASKERID = 'tasks/GET_TASKS_ON_TASKERID';
const STATUS_COMPLETED = 'tasks/STATUS_COMPLETED'
const CLEAR = 'tasks/CLEAR'

const addTask = payload => ({
    type:ADD_TASK,
    payload
})

const getTasks = payload => ({
    type:GET_TASKS,
    payload
})

const editOneTask = payload => ({
    type: EDIT_TASK,
    payload
})

const deleteOneTaskUser = payload => ({
    type: USER_DELETE_TASK,
    payload
})

const deleteOneTaskTasker = payload => ({
    type: TASKER_DELETE_TASK,
    payload
})

const setStatusCompleted = payload => ({
    type: TASKER_DELETE_TASK,
    payload
})

const getTasksTaskerID = payload => ({
    type:GET_TASKS_ON_TASKERID,
    payload
})

export const clearTasks = () => ({
    type: CLEAR
})

export const addOneTask = (payload) => async(dispatch) => {
    const response = await fetch('/api/tasks/new', {
        method: "POST",
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(payload)
    })
    if(response.ok) {
        const newTask = await response.json();
        dispatch(addTask(newTask))
        return newTask;
    }
}

export const getTasksOnUserID = (userId) => async(dispatch) => {
    const response = await fetch(`/api/tasks/${userId}`)
    if (response.ok) {
        const tasks = await response.json();
        dispatch(getTasks(tasks))
        return tasks
    }
}

export const editTask = (payload, taskId) => async (dispatch) => {
    const response = await fetch(`/api/tasks/${taskId}/edit`,{
        method: "PUT",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
    })
    if(response.ok) {
        const editedTask = await response.json();
        dispatch(editOneTask(editedTask))
        return {
            task: editedTask,
            errors: []
        }
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return {
                errors: data.errors
            }
        }
      } else {
        return {
            errors: ['An error occurred. Please try again.']
        }
    }
}

export const deleteTaskUser = (taskId) => async (dispatch) => {
    const response = await fetch(`/api/tasks/${taskId}/user-delete`, {
        method: 'DELETE',
    });
    if (response.ok) {
        const task = await response.json();
        dispatch(deleteOneTaskUser(task))
        return task
    }
}

export const deleteTaskTasker = (taskId) => async (dispatch) => {
    const response = await fetch(`/api/tasks/${taskId}/tasker-delete`, {
        method: 'DELETE',
    });
    if (response.ok) {
        const task = await response.json();
        dispatch(deleteOneTaskTasker(task))
        return task
    }
}

export const statusCompletedTasker = (taskId) => async (dispatch) => {
    const response = await fetch(`/api/tasks/${taskId}/edit-task-status`,{
        method: "PATCH",
    });
    if (response.ok) {
        const task = await response.json();
        dispatch(setStatusCompleted(task))
        return task
    }
}


export const getTasksOnTaskerID = (taskerId) => async(dispatch) => {
    const response = await fetch(`/api/tasks/tasker/${taskerId}`)
    if (response.ok) {
        const tasks = await response.json();
        dispatch(getTasksTaskerID(tasks))
        return tasks
    }
}

const taskReducer = (state={},action) =>{
    switch(action.type){
        case ADD_TASK:{
            const newState = {}
            newState[action.payload.id] = action.payload
            return newState
        }
        case GET_TASKS:{
            const newState = action.payload
            return newState
        }
        case EDIT_TASK: {
            const newState = {}
            newState[action.payload.id] = action.payload
            return newState
        }
        case USER_DELETE_TASK : {
            const oldState = {...state};
            const newState = {};
            for (const[key, value] of Object.entries(oldState)) {
                if(value.id === action.payload.id)
                    newState[key] = action.payload;
                else
                    newState[key] = value;
            }
            return newState;
        }
        case TASKER_DELETE_TASK : {
            const oldState = {...state};
            const newState = {};
            for (const[key, value] of Object.entries(oldState)) {
                if(value.id === action.payload.id)
                    newState[key] = action.payload;
                else
                    newState[key] = value;
            }
            return newState;
        }
        case STATUS_COMPLETED : {
            const oldState = {...state};
            const newState = {};
            for (const[key, value] of Object.entries(oldState)) {
                if(value.id === action.payload.id)
                    newState[key] = action.payload;
                else
                    newState[key] = value;
            }
            return newState;
        }
        case GET_TASKS_ON_TASKERID:{
            const newState = action.payload
            return newState
        }
        case CLEAR:{
            return {}
        }
        default:
            return state
    }
}

export default taskReducer
