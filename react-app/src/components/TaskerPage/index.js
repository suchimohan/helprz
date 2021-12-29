import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneTaskerByID } from '../../store/tasker';
import { NavLink } from 'react-router-dom';
import './TaskerPage.css'
import {useHistory} from "react-router";
import { deleteTasker } from '../../store/tasker';

function TaskerPage() {

    const tasker = useSelector(state=>Object.values(state.taskers))
    const sessionUser = useSelector(state=>state.session.user)
    const { taskerId }  = useParams();
    const {userId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>{
        dispatch(getOneTaskerByID(taskerId))
    },[dispatch,taskerId])

    const handleDelete = async(taskerId) => {
        let response = await dispatch(deleteTasker(taskerId));
        if(response){
            history.push(`/users/${userId}`)
        }
    }

    let sessionLinks;
    if(sessionUser.id === tasker[0]?.user.id) {
        sessionLinks = (
            <div className='tasker_button_div'>
                <button className='taskerProfileButton'>
                    <NavLink to={`/taskers/${taskerId}/tasks`} exact={true} activeClassName='active'>
                        View Tasks
                    </NavLink>
                </button>
                <button className='taskerProfileButton'>
                    <NavLink to={`/taskers/${taskerId}/edit`} exact={true} activeClassName='active'>
                        Edit Tasker Profile Details
                    </NavLink>
                </button>
                <button className='taskerProfileButton' onClick={()=>handleDelete(taskerId)}>
                    Delete Tasker Profile
                </button>
            </div>
        )
    }

    if (!tasker[0]) {
        return null;
    }
    return (
        <div className='taskerProfile'>
            <div className='taskerTag'>Your Tasker Profile Details</div>
            <div className='tasker_account_div'>
                {sessionLinks}
            </div>
            <div className='taskerDetails'>
                <div>
                    <strong>Name:</strong>
                    <span>{tasker[0].user.username}</span>
                </div>
                <div>
                    <strong>City:</strong>
                    <span>{tasker[0].city.name}</span>
                </div>
                <div>
                    <strong>Task Type:</strong>
                    <span>{tasker[0].taskType.name}</span>
                </div>
                <div>
                    <strong>Experience:</strong>
                    <span>{tasker[0].experience} yrs</span>
                </div>
                <div>
                    <strong>Description:</strong>
                    <span>{tasker[0].description}</span>
                </div>
                <div>
                    <strong>Price:</strong>
                    <span>${tasker[0].price}</span>
                </div>
            </div>
        </div>
    )
}

export default TaskerPage;
