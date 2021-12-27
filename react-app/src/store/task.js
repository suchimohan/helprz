const ADD_TASK = 'tasks/ADD_TASK';

const addTask = payload => ({
    type:ADD_TASK,
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

const taskReducer = (state={},action) =>{
    switch(action.type){
        case ADD_TASK:{
            const newState = {...state,[action.payload.id]:action.payload}
            return newState
        }
        default:
            return state
    }
}

export default taskReducer
