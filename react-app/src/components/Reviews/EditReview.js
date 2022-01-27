import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useHistory } from 'react-router';
import { getReviews } from '../../store/review';
import { editOneReview } from '../../store/review';
import "./Reviews.css"

const EditReview = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {taskerId} = useParams();
    const { id } = useParams();

    const review = useSelector((state)=>{
        for (const[key, value] of Object.entries(state?.reviews)) {
            if(value.id === parseInt(id))
            return value;
        }
        return null;
    })

    const [rating, setRating] = useState(review?.rating);
    const [content, setContent] = useState(review?.content);
    const [errors, setErrors] = useState([]);

    const sessionUser = useSelector((state) => state.session.user)
    const userId = sessionUser.id

    useEffect(()=> {
        dispatch(getReviews(taskerId))
    }, [dispatch,taskerId])


    useEffect(()=>{
        if(review){
        setRating(review?.rating)
        setContent(review?.content)
        }
    },[review])

  const handleSubmit = async(e) => {
    e.preventDefault();
    const editReview = {
      content,rating,taskerId,userId
    }
    let editedReview = await dispatch(editOneReview(editReview,id))
    if(editedReview.review) {
      history.push(`/taskerProfile/${taskerId}`)
    }
    if(editedReview.errors.length){
      setErrors(editedReview.errors)
    }
  }

  const handleCancelReviewFormClick = (e) => {
    e.preventDefault();
    history.push(`/taskerProfile/${taskerId}`)
  }

  if (!review || !review.id) {
    return null
    } else {
  return (
  <div className='editReviewDiv'>
      <h3>Edit Review</h3>
    <form className="submitreviewform" onSubmit={handleSubmit}>
          <label>Rating</label>
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                min="1"
                max="5"
              >
              </input>
          <label>Content </label>
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              >
              </input>
          <ul className="error">
          {errors.map((error,idx) => <li key={idx}>{(error.split(':'))[1]}</li>)}
          </ul>
          <div className="reviewButtons">
            <button className="submit-cancel-review-button" type="submit" >Submit Review</button>
            <button className="submit-cancel-review-button" type="button" onClick={handleCancelReviewFormClick}>Cancel</button>
          </div>
        </form>
    </div>
  )
  }
}


export default EditReview
