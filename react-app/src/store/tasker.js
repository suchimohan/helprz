const ADD_TASKER = 'tasker/ADD_TASKER';
const SEARCH_TASKER_ON_USERID = 'tasker/SEARCH_TASKER_ON_USERID'
const GET_ONE_TASKER = 'tasker/GET_ONETASKER'

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
        return newTasker;
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

export const getOneTaskerByID = (taskerId) => async(dispatch) => {
    const response = await fetch(`/api/taskers/${taskerId}`)
    if (response.ok) {
        const tasker = await response.json()
        dispatch(getOneTasker(tasker))
        return tasker
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
        case GET_ONE_TASKER: {
            const newState = {}
            newState[action.payload.id] = action.payload
            return newState
        }
        default:
            return state
    }
}

export default taskerReducer
