const ADD_TASKER = 'tasker/ADD_TASKER';
const SEARCH_TASKER_ON_USERID = 'tasker/SEARCH_TASKER_ON_USERID'
const GET_ONE_TASKER = 'tasker/GET_ONETASKER'
const EDIT_TASKER = 'tasker/EDIT_TASKER'
const DELETE_TASKER = 'tasker/DELETE_TASKER'

//action creater
const addTasker = payload => ({
    type: ADD_TASKER,
    payload
})

const searchTaskerOnUserId = payload => ({
    type: SEARCH_TASKER_ON_USERID,
    payload
})


const getOneTasker = payload => ({
    type: GET_ONE_TASKER,
    payload
})

const editOneTasker = payload => ({
    type: EDIT_TASKER,
    payload
})

const deleteOneTasker = (payload) => ({
    type: DELETE_TASKER,
    payload
})

//thunk

export const addOneTasker = (payload) => async(dispatch) => {
    const response = await fetch('/api/taskers/new',{
        method: "POST",
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(payload)
    })
    if(response.ok) {
        const newTasker = await response.json();
        dispatch(addTasker(newTasker))
        return {
            tasker: newTasker,
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

export const searchOneTaskerOnUserId = (userId) => async(dispatch) => {
    const response = await fetch(`/api/taskers/search/${userId}`)
    if (response.ok) {
        const resultTasker = await response.json();
        dispatch(searchTaskerOnUserId(resultTasker))
        return resultTasker
    }
    return null
}

export const getOneTaskerByID = (taskerId) => async(dispatch) => {
    const response = await fetch(`/api/taskers/${taskerId}`)
    if (response.ok) {
        const tasker = await response.json()
        dispatch(getOneTasker(tasker))
        return tasker
    }
}

export const editTasker = (payload,taskerId) => async (dispatch) => {
    const response = await fetch(`/api/taskers/${taskerId}/edit`,{
        method: "PUT",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
    })
    if(response.ok) {
        const editedTasker = await response.json();
        dispatch(editOneTasker(editedTasker))
        return {
            tasker: editedTasker,
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

export const deleteTasker = (taskerId) => async (dispatch) => {
    const response = await fetch(`/api/taskers/${taskerId}/delete`, {
        method: 'DELETE',
    });
    if (response.ok) {
        dispatch(deleteOneTasker(taskerId))
        return taskerId
    }
}

//reducer

const taskerReducer = (state={}, action) => {
    switch(action.type){
        case ADD_TASKER:{
            const newState = {...state, [action.payload.user.id]:action.payload}
            return newState
        }
        case SEARCH_TASKER_ON_USERID: {
            const newState = action.payload
            return newState
        }
        case GET_ONE_TASKER: {
            const newState = {}
            newState[action.payload.user.id] = action.payload
            return newState
        }
        case EDIT_TASKER: {
            const newState = {}
            newState[action.payload.user.id] = action.payload
            return newState
        }
        case DELETE_TASKER : {
            const newState = {...state};
            delete newState[action.payload];
            return newState;
        }
        default:
            return state
    }
}

export default taskerReducer
