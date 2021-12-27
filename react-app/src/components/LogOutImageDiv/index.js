import './LogOutImageDiv.css'
import { NavLink } from 'react-router-dom';

const LogOutImageDiv = () => {
    return(
        <div className='logOut_img_div'>
            <div className="logOut_bgImg_div">
                <img className="logOutImg" src="https://assets.taskrabbit.com/v3/assets/homepage/hero-img-desktop.jpg" alt=""/>
            </div>
            <div className="logOut_search">
                <button className='searchTaskButton'>
                    <NavLink to='/login' exact={true} activeClassName='active'>
                        Start Searching For Tasks
                    </NavLink>
                </button>
            </div>
        </div>
    )
}

export default LogOutImageDiv;
