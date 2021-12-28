const ADD_TASK = 'tasks/ADD_TASK';
const GET_TASKS = 'tasks/GET_TASKS';
const EDIT_TASK = 'tasks/EDIT_TASK';
const DELETE_TASK = 'tasks/DELETE_TASK';

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

const deleteOneTask = payload => ({
    type: DELETE_TASK,
    payload
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

export const deleteTask = (taskId) => async (dispatch) => {
    const response = await fetch(`/api/tasks/${taskId}/delete`, {
        method: 'DELETE',
    });
    if (response.ok) {
        const task = await response.json();
        dispatch(deleteOneTask(task))
        return task
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
        case DELETE_TASK : {
            const newState = {...state};
            newState[action.payload.id] = action.payload
            return newState;
        }
        default:
            return state
    }
}

export default taskReducer
