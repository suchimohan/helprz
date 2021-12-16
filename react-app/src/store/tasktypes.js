const TASKTYPES = 'get/TASKTYPES'

export const all_taskTypes = (taskTypes) => ({
    type: TASKTYPES,
    taskTypes
})

export const get_taskTypes = () => async(dispatch) => {
    const response = await fetch(`/api/tasktypes/`)
    if (response.ok) {
        const taskTypes = await response.json();
        dispatch(all_taskTypes(taskTypes))
        return taskTypes
    }
}

const taskTypesReducer = (state={}, action) => {
    switch(action.type){
        case TASKTYPES:{
            const newState = action.taskTypes
            return newState
        }
        default:
            return state
    }
}

export default taskTypesReducer
