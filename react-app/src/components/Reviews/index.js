import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getReviews } from "../../store/review";
import './Reviews.css';
import MenuButton from "./MenuButton"


const Reviews = ({taskerId}) => {
  const dispatch = useDispatch()
  const reviewsObject = useSelector((state)=>state?.reviews)
  const reviews = Object?.values(reviewsObject)
console.log("index", reviews)

  const sessionUser = useSelector((state) => state.session);


    useEffect(()=>{
        dispatch(getReviews(taskerId))
    }, [dispatch, taskerId])


      let user_id;
      if(sessionUser) {
        user_id = sessionUser?.user?.id
      } else {
        return null
      }

    return(
    <div>
        {
          reviews.map((review) =>
          <div className="review-container" key={review.id}>
            <div className="userIcon-username-date">
              <div className="review-padding">
                <img src="review.user.profilePhotoURL" />
              </div>
              <div className="review-padding">
                {review.user.username}
              </div>
              <div>
                {review.created_at}
              </div>
            </div>
            <div className="star-dot-dot">
              <div>
                {Array(review.rating).fill(
                <span className="star-color-blue"><i className="fas fa-star fa-xs"></i></span>).map((ele, idx) => <span key={idx}>{ele}</span>)}
              </div>
              <div>
                {
                  user_id === review.user.id?
                <MenuButton taskerId={taskerId} id={review?.id}/>
                :
                null
                }
              </div>
            </div>
            <div>
              {review.content}
            </div>
          </div>
          )
        }
    </div>
  )
}

export default Reviews
