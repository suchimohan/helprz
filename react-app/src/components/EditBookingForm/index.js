import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasksOnUserID } from '../../store/task';
import { editTask } from '../../store/task';
import {useParams} from 'react-router-dom';
import {useHistory} from "react-router";

const EditBookingForm = () =>{

    const tasks = useSelector(state=>Object.values(state.tasks))
    const dispatch = useDispatch();
    const history = useHistory();
    const { userId }  = useParams();
    const { taskId }  = useParams();

    const onetask = tasks.find((ele)=>+ele.id === +taskId)

    const [editedTaskDescription, seteditedTaskDescription] = useState(onetask?.taskDescription)

    useEffect(()=>{
        dispatch(getTasksOnUserID(userId))
    },[dispatch,userId])

    const handleCancel = () => {
        history.push(`/users/${userId}/tasks`)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            editedTaskDescription
        }
        let editedTask = await dispatch(editTask(payload,taskId));
        if (editedTask) {
        history.push(`/users/${userId}/tasks`);
        }}

    if (!onetask){
        return null
    }
    return (
        <div className='edit-task-Div'>
            <h2>Edit your Task Description</h2>
            <form onSubmit={handleSubmit} className='edit-task'>
                <div className="edit_description_div">
                    <textarea
                        onChange={(e)=>seteditedTaskDescription(e.target.value)}
                        value={editedTaskDescription}
                        required
                    />
                </div>
                <div> Note: If you want to edit the city or date/time please cancel the current booking and book a new task.</div>
                <div className="button_div">
                    <button className='submit-button' type='submit'>
                        Submit
                    </button>
                    <button className='submit-button' type='submit' onClick={()=>{handleCancel()}}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditBookingForm
