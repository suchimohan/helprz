import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './Navigation.css';
import {useDispatch, useSelector} from 'react-redux';
import { searchOneTaskerOnUserId } from '../../store/tasker';

const Navigation = () => {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state=>state.session.user)
    const tasker = useSelector(state=>Object.values(state.taskers))

    useEffect(()=>{
        if (!sessionUser) {
            return;
        }
        dispatch(searchOneTaskerOnUserId(sessionUser?.id))
      },[dispatch,sessionUser])

    // console.log('-------------',tasker)

    let taskerButton;
      if(tasker[0] === 'Not Found') {
        taskerButton = (
            <button>
                <NavLink to='/new-tasker' exact={true} activeClassName='active'>
                    Become A Tasker
                </NavLink>
            </button>
        )
    }

    let sessionLinks;
    if(sessionUser) {
        sessionLinks = (
            <ul className="nav2">
                <li>
                    <button>
                        <NavLink to={`/users/${sessionUser.id}`} exact={true} activeClassName='active'>
                            Account
                        </NavLink>
                    </button>
                </li>
                <li>
                    {taskerButton}
                </li>
                 <li>
                    <LogoutButton />
                </li>
            </ul>
        )
    } else {
        sessionLinks = (
            <ul className="nav2">
              <li>
                <NavLink to='/login' exact={true} activeClassName='active'>
                    Login
                </NavLink>
              </li>
              <li>
                <NavLink to='/sign-up' exact={true} activeClassName='active'>
                    Sign Up
                </NavLink>
              </li>
            </ul>
        )
    }


  return (
    <div className="headerDiv">
        <nav>
            <ul className="navigation">
                <li>
                    <div>
                        <NavLink to='/' exact={true} activeClassName='active'>
                            <ul className="nav3">
                                <li>
                                    <img className="icon" src="https://i.pinimg.com/originals/29/41/d1/2941d1ebc6d7f882e2b6f569c6129d34.png" alt=""></img>
                                </li>
                                <li className='helprz'> Helprz </li>
                            </ul>
                        </NavLink>
                    </div>
                </li>
                <li>
                    {sessionLinks}
                </li>
            </ul>
        </nav>
    </div>
  );
}

export default Navigation;
