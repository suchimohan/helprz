import SplashImageDiv from "../SplashImageDiv";
import Footer from "../Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {get_taskTypes} from "../../store/tasktypes"
import {get_cities} from "../../store/cities"

const SplashPage = () => {

    const sessionUser = useSelector(state=>state.session.user)
    // let taskTypes = useSelector(state=>state.taskTypes)
    // taskTypes = Object.values(taskTypes)
    const taskTypes = useSelector(state=>Object.values(state.taskTypes))
    const cities = useSelector(state=>Object.values(state.cities))
    // console.log(taskTypes)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(get_taskTypes())
        dispatch(get_cities())
    },[dispatch])

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
        <>
            <div>
                {sessionLinks}
            </div>
            <Footer/>
        </>
    )
}

export default SplashPage
