import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasksOnUserID } from '../../store/task';
import { editTask } from '../../store/task';
import {useParams} from 'react-router-dom';
import {useHistory} from "react-router";
import './EditBookingForm.css'

const EditBookingForm = () =>{

    const { userId }  = useParams();
    const { taskId }  = useParams();
    const task = useSelector((state)=>{
        for (const[key, value] of Object.entries(state?.tasks)) {
            if(value.id === parseInt(taskId))
                return value;
        }
        return null;
    })
    const dispatch = useDispatch();
    const history = useHistory();

    const [editedTaskDescription, seteditedTaskDescription] = useState(task?.taskDescription)
    const [errors, setErrors] = useState([]);

    useEffect(()=>{
        dispatch(getTasksOnUserID(userId))
    },[dispatch,userId])

    useEffect(()=>{
        if(task){
            seteditedTaskDescription(task.taskDescription)
        }
    },[task])

    const handleCancel = () => {
        history.push(`/users/${userId}/tasks`)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            editedTaskDescription
        }
        let response = await dispatch(editTask(payload,taskId));
        if (response.task) {
        history.push(`/users/${userId}/tasks`);
        }
        if(response.errors.length){
            setErrors(response.errors)
        }
    }

    if (!task){
        return (
            <h1> Task not found</h1>
        )
    }
    return (
        <div className='edit-task-Div'>
            <h2>Edit your Task Description</h2>
            <form onSubmit={handleSubmit} className='edit-task'>
                <div className="errors_div">
                    {errors.map((error, ind) => (
                    <div key={ind} className='errorItem'>{error}</div>
                    ))}
                </div>
                <div className="edit_description_div">
                    <label>Task Description</label>
                    <textarea
                        onChange={(e)=>seteditedTaskDescription(e.target.value)}
                        value={editedTaskDescription}
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
