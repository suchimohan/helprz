import SplashImageDiv from "../SplashImageDiv";
import {useSelector} from 'react-redux';

const SplashPage = () => {

    const sessionUser = useSelector(state=>state.session.user)

    let sessionLinks;
    if(sessionUser) {
        sessionLinks = (
            <h1>My home Page</h1>
        )
    } else {
        sessionLinks = (
            <SplashImageDiv />
        )
    }

    return (
        <div>
            {sessionLinks}
        </div>
    )
}

export default SplashPage
