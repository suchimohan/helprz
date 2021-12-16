import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneTaskerByID } from '../../store/tasker';


function TaskerPage() {

    const tasker = useSelector(state=>Object.values(state.taskers))
    const sessionUser = useSelector(state=>state.session.user)
    // console.log('$$$$$$$$$$$$$$$$$$', tasker)
    const { taskerId }  = useParams();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getOneTaskerByID(taskerId))
    },[dispatch,taskerId])

    let sessionLinks;
    if(sessionUser.id === tasker[0]?.user.id) {
        sessionLinks = (
            <div>
                <button>
                    Edit Tasker Profile Details
                </button>
                <button>
                    Delete Tasker Profile
                </button>
            </div>
        )
    }

    if (!tasker[0]) {
        return null;
    }
    return (
        <ul>
            <li>
                <strong>Name:</strong> {tasker[0].user.username}
            </li>
            <li>
                <strong>Photo:</strong>
                <img src={tasker[0].user.profilePhotoURL} alt="Profile Pic"></img>
            </li>
            <li>
                <strong>Description:</strong> {tasker[0].description}
            </li>
            <li>
                <strong>Price:</strong> ${tasker[0].price}
            </li>
            <li>
                <strong>Experience:</strong> {tasker[0].experience} yr
            </li>
            <li>
                <strong>Task Type:</strong> {tasker[0].taskType.name}
            </li>
            <li>
                <strong>City:</strong> {tasker[0].city.name}
            </li>
            <li>
                {sessionLinks}
            </li>
        </ul>
    )
}

export default TaskerPage;
