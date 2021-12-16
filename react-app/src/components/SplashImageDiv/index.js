import './SplashImageDiv.css'
import Search from '../Search';

const SplashImageDiv = () => {
    return(
        <div className='splash_img_div'>
            <div className="splash_bgImg_div">
                <img className="splashImg" src="https://assets.taskrabbit.com/v3/assets/homepage/hero-img-desktop.jpg" alt=""/>
            </div>
            <div className="splash_search">
                <Search />
            </div>
        </div>
    )
}

export default SplashImageDiv;
