const SEARCH_TASKTYPE = 'search/SEARCH_TASKTYPE'

export const searchTaskType = (tasktype) => ({
    type: SEARCH_TASKTYPE,
    tasktype
})

export const search = (text) => async(dispatch) => {
    const response = await fetch(`/api/tasktypes/search/${text}`)
    if (response.ok) {
        const searchResults = await response.json();
        dispatch(searchTaskType(searchResults))
        return searchResults
    }
}

const searchReducer = (state={}, action) => {
    switch(action.type){
        case SEARCH_TASKTYPE:{
            const newState = action.tasktype
            return newState
        }
        default:
            return state
    }
}

export default searchReducer
