import SplashImageDiv from "../SplashImageDiv";
import LogOutImageDiv from "../LogOutImageDiv";
import Footer from "../Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {get_taskTypes} from "../../store/tasktypes"
import {get_cities} from "../../store/cities"
import TaskTypesCard from "../TaskTypesCard"
import './SplashPage.css'

const SplashPage = () => {

    const sessionUser = useSelector(state=>state.session.user)
    const taskTypes = useSelector(state=>Object.values(state.taskTypes))
    const cities = useSelector(state=>Object.values(state.cities))

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(get_taskTypes())
        dispatch(get_cities())
    },[dispatch])

    let sessionLinks;
    if(sessionUser) {
        sessionLinks = (
            <SplashImageDiv />
        )
    } else {
        sessionLinks = (
            <LogOutImageDiv />
        )
    }

    return (
        <div className="splash_page">
            <div>{sessionLinks}</div>
            <div>
            <div className="nameTag">Available Tasks</div>
            <div className="avlbTask">
                    {taskTypes?.map(({id,name,taskImageURL,avgPrice})=>(
                        <TaskTypesCard
                            key={`tasktypecard-${id}`}
                            id={id}
                            name={name}
                            price={avgPrice}
                            image={taskImageURL}
                        />
                    ))}
            </div>
            </div>
            <div>
            <div className="nameTag">Cities where we work</div>
            <div className="avlbCity">
                    {cities?.map(({id,name})=>(
                        <div  key={`cityname-${id}`}>
                            {name}
                        </div>
                    ))}
            </div>
            </div>
            <Footer/>
        </div>
    )
}

export default SplashPage
