const SEARCH_AVAILABLE_TASKERS = 'taskers/SEARCH_AVAILABLE_TASKERS'

const searchAvailableTaskers = payload => ({
    type: SEARCH_AVAILABLE_TASKERS,
    payload
})

export const searchForTaskers = (cityId,taskTypeId,date,time) => async(dispatch) => {
    const response = await fetch(`/api/taskers/filter?cityId=${cityId}&taskTypeId=${taskTypeId}&date=${date}&time=${time}`)
    if (response.ok) {
        const searchResults = await response.json();
        dispatch(searchAvailableTaskers(searchResults))
        return searchResults
    }
    return null
}

const taskerListReducer = (state={}, action) => {
    switch(action.type){
        case SEARCH_AVAILABLE_TASKERS: {
            const newState = action.payload
            return newState
        }
        default:
            return state
    }
}

export default taskerListReducer
