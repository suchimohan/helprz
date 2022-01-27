const GET_REVIEWS = "review/GET_REVIEWS";
const ADD_ONE_REVIEW = "review/ADD_ONE_REVIEW";
const DELETE_REVIEW = "review/DELETE_REVIEW";
const EDIT_ONE_REVIEW = "review/EDIT_ONE_REVIEW"

const loadAllReviews = (reviews) => ({
    type: GET_REVIEWS,
    reviews,
});

const addOneReview = (review) => ({
  type: ADD_ONE_REVIEW,
  review
})

const removeOneReview = (id) => ({
  type: DELETE_REVIEW,
  id
})

export const editReviewAction = (review) => ({
  type: EDIT_ONE_REVIEW,
  review
})


export const getReviews = (taskerId) => async(dispatch) => {
      const response = await fetch(`/api/reviews/${taskerId}`)
      if(response.ok){
      const reviews = await response.json();
      dispatch(loadAllReviews(reviews))
      return reviews
    }
  }

  export const createOneReview = (payload) => async (dispatch) => {
    const response = await fetch('/api/reviews/new', {
      method: 'POST',
      headers : {'Content-Type': 'application/json',},
      body: JSON.stringify(payload)
    });
    if(response.ok) {
      const newReview = await response.json();
      dispatch(addOneReview(newReview))
      return {review: newReview,
        errors:[]
    }
  } else if (response.status < 500){
    const data = await response.json();
    if(data.errors){
      return {
        errors: data.errors
      }
    }
  } else {
    return {
      errors: ['An error occurred. Please try again.']
    }
  }
}

  export const deleteReview = (id) => async dispatch => {
    const response = await fetch(`/api/reviews/${id}/delete`, {
      method: 'DELETE',
    });
    if(response.ok) {
      dispatch(removeOneReview(id))
    }
  };

  export const editOneReview = (payload, id) => async dispatch => {
    const response = await fetch(`/api/reviews/${id}/edit`, {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });
    if(response.ok) {
      const review = await response.json();
      dispatch(editReviewAction(review))
      return { review : review,
        errors: []
      }
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return {
                errors: data.errors
            }
        }
      } else {
        return {
            errors: ['An error occurred. Please try again.']
        }
      }
    }


  const reviewReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_REVIEWS: {
        const newState = action.reviews;
        return newState
      }
      case ADD_ONE_REVIEW:{
        const newState = {...state,[action.review.id]:action.review}
        return newState;
      }
      case DELETE_REVIEW : {
        const newState = {...state};
        delete newState[action.id];
        return newState
      }
      case EDIT_ONE_REVIEW: {
        const newState = {...state};
        newState[action.review.id] = action.review
        return newState
      }
      default:
        return state;
    }
  }

  export default reviewReducer
