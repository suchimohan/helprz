import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasksOnUserID } from '../../store/task';
import { NavLink } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import {deleteTaskUser} from '../../store/task';
import { Redirect } from 'react-router-dom';
import './MyTasks.css'
import {clearTasks} from '../../store/task';

function MyTasks() {

    const tasks = useSelector(state=>Object.values(state.tasks))
    const dispatch = useDispatch();
    const { userId }  = useParams();

    let today = new Date();

    useEffect(()=>{
        dispatch(clearTasks())
        dispatch(getTasksOnUserID(userId))
    },[dispatch,userId])

    const handleCancelBooking = async(taskId) => {
        let response = await dispatch(deleteTaskUser(taskId));
        if(response){
            return <Redirect to={`/users/${userId}/tasks`} />
        }
    }

    if(!tasks.length) {
        return null
    }
    if (tasks[0] === "Not Found"){
        return (
            <div className='taskList'>
                <h1>No tasks found</h1>
            </div>
        )
    }
    return (
        <div className='taskList'>
            <div className='yourTaskTag'>Your Tasks</div>
            {tasks?.map(taskInfo => {
                let taskDate = new Date(taskInfo.dateTime)
                let editDeleteButton;
                if(taskInfo.status === "created" && today.getTime() < taskDate.getTime()) {
                    editDeleteButton = (
                        <div className='task_list_button_div'>
                            <button className='taskListButton'>
                                <NavLink to={`/users/${userId}/tasks/${taskInfo.id}/edit`} exact={true} activeClassName='active'>
                                    Edit Booking
                                </NavLink>
                            </button>
                            <button className='taskListButton' onClick={()=>handleCancelBooking(taskInfo.id)}>Cancel Booking</button>
                        </div>
                    )
                }
                return (
                    <div key={'taskInfo-'+taskInfo.id} className='taskListDetails'>
                        <div>
                            <strong>Task Type :</strong>
                            <span>{taskInfo.taskType.name}</span>
                        </div>
                        <div>
                            <strong>Task City:</strong>
                            <span>{taskInfo.city.name}</span>
                        </div>
                        <div>
                            <strong>Task Status:</strong>
                            <span>{taskInfo.status}</span>
                        </div>
                        <div>
                            <strong>Tasker Name:</strong>
                            <span>{taskInfo.tasker.user?.username}</span>
                        </div>
                        <div>
                            <NavLink to={`/taskerprofile/${taskInfo.tasker.id}`} exact={true} activeClassName='active'>
                                    View/Add Reviews and Ratings
                            </NavLink>
                        </div>
                        <div>
                            <strong>Tasker Email:</strong>
                            <span>{taskInfo.tasker.user?.email}</span>
                        </div>
                        <div>
                            <strong>Task Description: </strong>
                            <span>{taskInfo.taskDescription}</span>
                        </div>
                        <div>
                            <strong>Task Date and Time: </strong>
                            <span>{taskInfo.dateTime}</span>
                        </div>
                        {editDeleteButton}
                    </div>
                )
            })}
        </div>
    )
}

export default MyTasks
