const ADD_TASKER = 'tasker/ADD_TASKER';
const SEARCH_TASKER_ON_USERID = 'tasker/SEARCH_TASKER_ON_USERID'
const SEARCH_AVAILABLE_TASKERS = 'taskers/SEARCH_AVAILABLE_TASKERS'
const GET_ONE_TASKER = 'tasker/GET_ONETASKER'
const EDIT_TASKER = 'tasker/EDIT_TASKER'

//action creater
const addTasker = payload => ({
    type: ADD_TASKER,
    payload
})

const searchTaskerOnUserId = payload => ({
    type: SEARCH_TASKER_ON_USERID,
    payload
})

const searchAvailableTaskers = payload => ({
    type: SEARCH_AVAILABLE_TASKERS,
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
}

export const searchForTaskers = (cityId,taskTypeId,date,time) => async(dispatch) => {
    const response = await fetch(`/api/taskers/filter?cityId=${cityId}&taskTypeId=${taskTypeId}&date=${date}&time=${time}`)
    if (response.ok) {
        const searchResults = await response.json();
        dispatch(searchAvailableTaskers(searchResults))
        return searchResults
    }
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

//reducer

const taskerReducer = (state={}, action) => {
    switch(action.type){
        case ADD_TASKER:{
            const newState = {...state, [action.payload.id]:action.payload}
            return newState
        }
        case SEARCH_TASKER_ON_USERID: {
            const newState = action.payload
            return newState
        }
        case SEARCH_AVAILABLE_TASKERS: {
            const newState = action.payload
            return newState
        }
        case GET_ONE_TASKER: {
            const newState = {}
            newState[action.payload.id] = action.payload
            return newState
        }
        case EDIT_TASKER: {
            const newState = {}
            newState[action.payload.id] = action.payload
            return newState
        }
        default:
            return state
    }
}

export default taskerReducer
