import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneTaskerByID } from '../../store/tasker';
import './TaskerProfile.css'
import { useParams} from 'react-router-dom';
import HideReviewForm from '../Reviews/HideReviewForm';
import {getReviews} from '../../store/review'

function TaskerProfileView() {

    const tasker = useSelector(state=>Object.values(state.taskers))
    const { taskerId }  = useParams();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getOneTaskerByID(taskerId))
        dispatch(getReviews(taskerId))
    },[dispatch,taskerId])


    if (!tasker[0]) {
        return null;
    }
    return (
        <div className='tasker_profile_view'>
            <div className='taskerview_div'>
                <div>
                    <img className="taskerpicture" src={tasker[0].user.profilePhotoURL} alt=""/>
                </div>
                <div className='taskerView_details'>
                    <div>
                        <strong>Name: </strong>
                        <span>{tasker[0].user.username}</span>
                    </div>
                    <div>
                        <strong>City: </strong>
                        <span>{tasker[0].city.name}</span>
                    </div>
                    <div>
                        <strong>Task Type: </strong>
                        <span>{tasker[0].taskType.name}</span>
                    </div>
                    <div>
                        <strong>Experience: </strong>
                        <span>{tasker[0].experience} yrs</span>
                    </div>
                    <div>
                        <strong>Description: </strong>
                        <span>{tasker[0].description}</span>
                    </div>
                    <div>
                        <strong>Price: </strong>
                        <span>${tasker[0].price}</span>
                    </div>
                </div>
            </div>
            <div className='reviewsAndDescriptionsDiv'>
                <div>
                    <HideReviewForm />
                </div>
            </div>
        </div>
    )
}

export default TaskerProfileView;
