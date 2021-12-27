import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { searchOneTaskerOnUserId } from '../store/tasker';
import { useDispatch, useSelector } from 'react-redux';

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
  // console.log("////////////////////////", tasker)

  let sessionLinks;
  if(tasker[0]?.id) {
    sessionLinks = (
      <button>
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
    <ul>
      <li>
        {sessionLinks}
      </li>
      <li>
        <strong>Username</strong> {user.username}
      </li>
      <li>
        <strong>Email</strong> {user.email}
      </li>
      <li>
        <img src={user?.profilePhotoURL} alt="ProfilePic" />
      </li>
      <li>
        <button>
        <NavLink to={`/users/${userId}/tasks`} exact={true} activeClassName='active'>
          My Tasks
        </NavLink>
        </button>
      </li>
    </ul>
  );
}
export default User;
