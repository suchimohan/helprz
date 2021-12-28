import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasksOnUserID } from '../../store/task';
import { NavLink } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import {deleteTask} from '../../store/task';
import { Redirect } from 'react-router-dom';
import './MyTasks.css'

function MyTasks() {

    const tasks = useSelector(state=>Object.values(state.tasks))
    const dispatch = useDispatch();
    const { userId }  = useParams();

    useEffect(()=>{
        dispatch(getTasksOnUserID(userId))
    },[dispatch,userId])

    const handleCancelBooking = async(taskId) => {
        let response = await dispatch(deleteTask(taskId));
        if(response){
            return <Redirect to={`/users/${userId}/tasks`} />
        }
    }

    if (!tasks.length || tasks[0] === "Not Found"){
        return (
            <h1>No tasks found</h1>
        )
    }
    return (
        <div>
            {tasks?.map(taskInfo => {
                return (
                    <div key={'taskInfo-'+taskInfo.id}>
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
                            <strong>Task Description: </strong>
                            <span>{taskInfo.taskDescription}</span>
                        </div>
                        <div>
                            <strong>Task Date and Time: </strong>
                            <span>{taskInfo.dateTime}</span>
                        </div>
                        <div>
                            <button>
                                <NavLink to={`/users/${userId}/tasks/${taskInfo.id}/edit`} exact={true} activeClassName='active'>
                                    Edit Booking
                                </NavLink>
                            </button>
                            <button onClick={()=>handleCancelBooking(taskInfo.id)}>Cancel Booking</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default MyTasks
