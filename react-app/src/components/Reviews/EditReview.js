import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useHistory } from 'react-router';
import { getReviews } from '../../store/review';
import { editOneReview } from '../../store/review';


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


    useEffect(() => {
        const validationErrors = [];
        if(!rating) validationErrors.push("Rating is required")
        if(rating > 5 || rating < 1) validationErrors.push("Rating must be between 1-5")
        if(!content) validationErrors.push("Please write a review!")

        setErrors(validationErrors)

    },[content,rating])


  const handleSubmit = async(e) => {
    e.preventDefault();
    const editReview = {
      content,rating,taskerId,userId
    }
    let editedReview = await dispatch(editOneReview(editReview,id))
    if(editedReview) {
      history.push(`/taskerProfile/${taskerId}`)
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
  <>
    <div>
      <div>Edit Review</div>
    </div>
    <form className="submit-review" onSubmit={handleSubmit}>
          <label>
              Rating
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
              </input>
          </label>
          <label>
              Content
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              >
              </input>
          </label>
          <ul className="error">
          {errors.map((error) => <li key={error}>{error}</li>)}
          </ul>
          <span className="submit-review">
          <button className="submit-cancel-review-button" type="submit" disabled={errors.length>0} >Submit Review</button>
          </span>
          <button className="submit-cancel-review-button" type="button" onClick={handleCancelReviewFormClick}>Cancel</button>
        </form>
    </>
  )
  }
}


export default EditReview
