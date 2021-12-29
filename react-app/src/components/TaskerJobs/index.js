import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasksOnTaskerID } from '../../store/task';
import {deleteTaskTasker} from '../../store/task';
import {statusCompletedTasker} from '../../store/task';
import {useParams} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import './TaskerJobs.css';

function TaskerJobs() {

    const tasks = useSelector(state=>Object.values(state.tasks))
    const dispatch = useDispatch();
    const { taskerId }  = useParams();

    let today = new Date()

    useEffect(()=>{
        dispatch(getTasksOnTaskerID(taskerId))
    },[dispatch,taskerId])

    const handleCancelBooking = async(taskId) => {
        let response = await dispatch(deleteTaskTasker(taskId));
        if(response){
            return <Redirect to={`/tasker/${taskerId}/tasks`} />
        }
    }

    const handleCompleteBooking = async(taskId) => {
        let response = await dispatch(statusCompletedTasker(taskId));
        if (response) {
            return <Redirect to={`/tasker/${taskerId}/tasks`} />
        }
    }

    if(!tasks.length){
        return null
    }
    if (tasks[0] === "Not Found"){
        return (
            <h1>No jobs found</h1>
        )
    }
    return (
        <div className='taskerJobList'>
            <div className='taskerJobTag'>Your Jobs List</div>
            {tasks?.map(taskInfo => {
                let taskDate = new Date(taskInfo.dateTime)
                let cancelJobButton;
                if(taskInfo.status === "created" && today.getTime() < taskDate.getTime()){
                    cancelJobButton = (
                        <button className='jobListButton' onClick={()=>handleCancelBooking(taskInfo.id)}>Cancel Job</button>
                    )
                }
                let completeJobButton;
                if(taskInfo.status === "created" && today.getTime() > taskDate.getTime()){
                    completeJobButton = (
                    <button className='jobListButton' onClick={()=>handleCompleteBooking(taskInfo.id)}>Job Completed</button>
                    )
                }
                return (
                    <div key={'JobInfo-'+taskInfo.id} className='jobListDetails'>
                        <div>
                            <strong>Task Type : </strong>
                            <span>{taskInfo.taskType.name}</span>
                        </div>
                        <div>
                            <strong>Task City: </strong>
                            <span>{taskInfo.city.name}</span>
                        </div>
                        <div>
                            <strong>Task Status: </strong>
                            <span>{taskInfo.status}</span>
                        </div>
                        <div>
                            <strong>User Name: </strong>
                            <span>{taskInfo.user.username}</span>
                        </div>
                        <div>
                            <strong>User Email: </strong>
                            <span>{taskInfo.user.email}</span>
                        </div>
                        {/* <div>
                            <strong>User Photo:</strong>
                            <span><img src={taskInfo.user.profilePhotoURL} alt=""/></span>
                        </div> */}
                        <div>
                            <strong>Task Description: </strong>
                            <span>{taskInfo.taskDescription}</span>
                        </div>
                        <div>
                            <strong>Task Date and Time: </strong>
                            <span>{taskInfo.dateTime}</span>
                        </div>
                        <div className='job_list_button_div'>
                            {completeJobButton}
                            {cancelJobButton}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default TaskerJobs;
