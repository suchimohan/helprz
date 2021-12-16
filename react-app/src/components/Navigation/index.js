import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './Navigation.css';
import {useSelector} from 'react-redux';

const Navigation = () => {

    const sessionUser = useSelector(state=>state.session.user)

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
                    <button>
                        <NavLink to='/new-tasker' exact={true} activeClassName='active'>
                            Become A Tasker
                        </NavLink>
                    </button>
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
