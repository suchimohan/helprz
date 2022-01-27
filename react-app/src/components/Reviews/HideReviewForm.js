import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams} from 'react-router-dom';
import { getReviews } from '../../store/review';
import Reviews from './index'
import ReviewForm from './CreateReviewForm';
import "./Reviews.css"


function HideReviewForm(){
    const dispatch = useDispatch()

    const {taskerId} = useParams()

    const sessionUser = useSelector((state) => state.session.user);
    const user_id = sessionUser?.id

    const [showReviewForm, setShowReviewForm] = useState(false)
    const [hideReviewButton, setHideReviewButton] = useState(false)

    useEffect(()=> {
        dispatch(getReviews(taskerId))
      }, [dispatch,taskerId])

    const reviews = useSelector(state => Object.values(state.reviews))
console.log("hidereview",reviews)

    // hide create a review button
    useEffect(() => {
        setHideReviewButton(false)
    },[dispatch, reviews.length])

    //trying to hide review form
    useEffect(() => {
        setShowReviewForm(false)
    },[dispatch,taskerId])


    if(!reviews) {
      return null;
    }

    let writeReviewButton = null;

    if(user_id) {
      writeReviewButton = (
        !hideReviewButton &&
          <button className="add-review-button"
          onClick={() => {setShowReviewForm(true);  setHideReviewButton(true)
          }}>
          <i className="fas fa-star"></i>&nbsp;&nbsp;Write a Review &nbsp;&nbsp;<i className="fas fa-star"></i></button>
      )

    } else {
      return <Reviews taskerId={taskerId}/>
    }


  let reviewContent = null;

    if(showReviewForm && reviews) {
      reviewContent = (
        <>
          <ReviewForm reviews={reviews} hideForm={() => setShowReviewForm(false)} hideButton={() => setHideReviewButton(false)}/>
        </>
      )
    }

    return(
      <>
        <div className="all-review-container">
          {writeReviewButton}
          <div>
          {reviewContent}
          <Reviews taskerId={taskerId}/>
          </div>
        </div>
        </>
    )
}

export default  HideReviewForm
