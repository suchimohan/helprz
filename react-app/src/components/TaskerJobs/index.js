import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneTaskerByID } from '../../store/tasker';
import {useParams} from 'react-router-dom';
import {deleteTask} from '../../store/task';
import { Redirect } from 'react-router-dom';

function TaskerJobs() {

    const tasker = useSelector(state=>Object.values(state.taskers))
    const dispatch = useDispatch();
    const { taskerId }  = useParams();

    useEffect(()=>{
        dispatch(getOneTaskerByID(taskerId))
    },[dispatch,taskerId])

    const handleCancelBooking = async(taskId) => {
        let response = await dispatch(deleteTask(taskId));
        if(response){
            return <Redirect to={`/tasker/${taskerId}/tasks`} />
        }
    }

    let tasks = Object.values(tasker[0]?.tasks)

    if (!tasks.length){
        return (
            <h1>No jobs found</h1>
        )
    }
    return (
        <div>
            {tasks?.map(taskInfo => {
                return (
                    <ul key={'JobInfo-'+taskInfo.id}>
                        <li>Task Type : {taskInfo.taskType.name}</li>
                        <li>Task City: {taskInfo.city.name}</li>
                        <li>Task Status: {taskInfo.status}</li>
                        <li>User Name: {taskInfo.user.username}</li>
                        <li>User Email: {taskInfo.user.email}</li>
                        <li>User Photo: <img src={taskInfo.user.profilePhotoURL} alt=""/></li>
                        <li>Task Description: {taskInfo.taskDescription}</li>
                        <li>Task Date and Time: {taskInfo.dateTime}</li>
                        <li><button onClick={()=>handleCancelBooking(taskInfo.id)}>Cancel Booking</button></li>
                    </ul>
                )
            })}
        </div>
    )
}

export default TaskerJobs;
