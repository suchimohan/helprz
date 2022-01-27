import { useEffect, useState } from "react"
import { useDispatch} from 'react-redux';
import { createOneReview } from "../../store/review";
import { useSelector } from "react-redux";
import {useParams} from 'react-router-dom';
import "./Reviews.css"

const ReviewForm = ({hideForm, hideButton}) => {

  const [content, setContent] = useState('');
  const [rating, setRating] = useState('');
  const [errors, setErrors] = useState([])
  const dispatch = useDispatch();

  const {taskerId} = useParams();

  const sessionUser = useSelector((state) => state.session.user);

  const userId = sessionUser.id

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newReview = {
      content,rating,taskerId,userId
    }
    let createdReview = await dispatch(createOneReview(newReview))
    if (createdReview.review) {
      hideForm();
    }
    if(createdReview.errors.length){
      setErrors(createdReview.errors)
    }
  }

  const handleCancelReviewFormClick = (e) => {
    e.preventDefault();
    hideForm();
    hideButton();
  }

  return (
    <>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="rating"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <input
            placeholder="content"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <ul className="error">
          {errors.map((error,idx) => <li key={idx}>{(error.split(':'))[1]}</li>)}
          </ul>
          <div className="reviewButtons">
            <button className="submit-cancel-review-button" type="submit">Submit Review</button>
            <button className="submit-cancel-review-button" type="button" onClick={handleCancelReviewFormClick}>Cancel</button>
          </div>
        </form>
        </>
      )
  }


    export default ReviewForm
