import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { searchOneTaskerOnUserId } from '../../store/tasker';
import { useDispatch, useSelector } from 'react-redux';
import './User.css';

function User() {

  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  useEffect(()=>{
    dispatch(searchOneTaskerOnUserId(userId))
  },[dispatch,userId])

  const tasker = useSelector(state=>Object.values(state.taskers))

  let sessionLinks;
  if(tasker[0]?.id) {
    sessionLinks = (
      <button className='userButton'>
        <NavLink to={`/taskers/${tasker[0].id}`} exact={true} activeClassName='active'>
          Tasker profile <i className="fa fa-gavel" aria-hidden="true"></i>
        </NavLink>
      </button>
    )
  }

  if (!user) {
    return null;
  }
  return (
    <div className='userPlacement'>
      <div className='accountTag'>Your Account</div>
      <div className='userButton_div'>
        {sessionLinks}
        <button className='userButton'>
          <NavLink to={`/users/${userId}/tasks`} exact={true} activeClassName='active'>
            My Tasks
          </NavLink>
        </button>
      </div>
      <div className='userDetails'>
        <div className='userImage_div'>
          <img className='userImage' src={user?.profilePhotoURL} alt="ProfilePic" />
        </div>
        <div className='userName_div'>
          <div>
            <strong>Username: </strong>{user.username}
          </div>
          <div>
            <strong>Email: </strong>{user.email}
          </div>
          </div>
        </div>
    </div>
  );
}
export default User;
