import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasksOnUserID } from '../../store/task';
import { NavLink } from 'react-router-dom';
import {useParams} from 'react-router-dom';

function MyTasks() {

    const tasks = useSelector(state=>Object.values(state.tasks))
    const dispatch = useDispatch();
    const { userId }  = useParams();

    useEffect(()=>{
        dispatch(getTasksOnUserID(userId))
    },[dispatch,userId])

    if (!tasks.length){
        return (
            <h1>No tasks found</h1>
        )
    }
    return (
        <div>
            {tasks?.map(taskInfo => {
                return (
                    <ul key={'taskInfo-'+taskInfo.id}>
                        <li>Task Type : {taskInfo.taskType.name}</li>
                        <li>Task City: {taskInfo.city.name}</li>
                        <li>Tasker Name: {taskInfo.tasker.user.username}</li>
                        <li>Task Description: {taskInfo.taskDescription}</li>
                        <li>Task Date and Time: {taskInfo.dateTime}</li>
                        <li><button>
                                <NavLink to={`/users/${userId}/tasks/${taskInfo.id}/edit`} exact={true} activeClassName='active'>
                                    Edit Booking
                                </NavLink>
                            </button>
                        </li>
                        <li><button>Cancel Booking</button></li>
                    </ul>
                )
            })}
        </div>
    )
}

export default MyTasks
