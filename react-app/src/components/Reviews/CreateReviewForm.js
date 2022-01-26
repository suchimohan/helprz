import { useEffect, useState } from "react"
import { useDispatch} from 'react-redux';
import { createOneReview } from "../../store/review";
import { useSelector } from "react-redux";
import {useParams} from 'react-router-dom';


const ReviewForm = ({hideForm, hideButton}) => {

  const [content, setContent] = useState('');
  const [rating, setRating] = useState('');
  const [errors, setErrors] = useState([])
  const dispatch = useDispatch();

  const {taskerId} = useParams();

  const sessionUser = useSelector((state) => state.session.user);

  const userId = sessionUser.id

  useEffect(() => {
    const validationErrors = [];
    if(!rating) validationErrors.push("Rating is required")
    if(rating > 5 || rating < 1) validationErrors.push("Rating must be between 1-5")
    if(!content) validationErrors.push("Please write a review!")
    setErrors(validationErrors)
  },[content,rating])


  const handleSubmit = async(e) => {
    e.preventDefault();
    const newReview = {
      content,rating,taskerId,userId
    }
    let createdReview = await dispatch(createOneReview(newReview))
    if (createdReview) {
      hideForm();
    }
  }

  const handleCancelReviewFormClick = (e) => {
    e.preventDefault();
    hideForm();
    hideButton();
  }


  return (
    <>
        <form className="submit-review" onSubmit={handleSubmit}>
          <label>
              <input
                type="number"
                placeholder="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
              </input>
          </label>
          <label>
              <input
                placeholder="content"
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
          <span>
          <button className="submit-cancel-review-button" type="button" onClick={handleCancelReviewFormClick}>Cancel</button>
          </span>
        </form>
        </>
      )

    }


    export default ReviewForm
