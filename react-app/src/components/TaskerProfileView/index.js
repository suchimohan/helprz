import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneTaskerByID } from '../../store/tasker';
import './TaskerProfile.css'
import { useParams} from 'react-router-dom';
import HideReviewForm from '../Reviews/HideReviewForm';
import {getReviews} from '../../store/review'

function TaskerProfileView() {

    const tasker = useSelector(state=>Object.values(state.taskers))
    // const sessionUser = useSelector(state=>state.session.user)
    const { taskerId }  = useParams();
    // const {userId} = useParams();
    const dispatch = useDispatch();
    // const history = useHistory();

    useEffect(()=>{
        dispatch(getOneTaskerByID(taskerId))
        dispatch(getReviews(taskerId))
    },[dispatch,taskerId])


    if (!tasker[0]) {
        return null;
    }
    return (
        <div className='taskerview'>
            <div className='taskerprofile'>
                <div>
                    <strong>Name:</strong>
                    <span>{tasker[0].user.username}</span>
                </div>
                <div>
                    <strong>City:</strong>
                    <span>{tasker[0].city.name}</span>
                </div>
                <div>
                    <img src="tasker[0].user.profilePhotoURL" />
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
            <div className='reviewsAndDescriptionsDiv'>
                <div className='reviewsDiv'>
                    <HideReviewForm />
                </div>
            </div>
        </div>
    )
}

export default TaskerProfileView;
