import {useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {useHistory} from "react-router";
import {get_cities} from "../../store/cities"

const TaskDetailsForm = () => {

    const sessionUser = useSelector(state=>state.session.user)
    const cities = useSelector(state=>Object.values(state.cities))
    const { taskTypeId }  = useParams();

    const durationData = [
                            {"id" : 1, "displayValue" : "Small - Est. 1 hr" , "dbStoreValue" : "1 hr"},
                            {"id" : 2, "displayValue" : "Medium - Est. 2-3 hrs" , "dbStoreValue" : "2-3 hrs"},
                            {"id" : 3, "displayValue" : "Large - Est. 4+ hrs" , "dbStoreValue" : "4+ hrs"}
                        ]

    const [city, setCity] = useState(cities[0]?.id)
    const [duration, setDuration] = useState(durationData[0].dbStoreValue)
    const [taskDescription, setTaskDescription] = useState('')

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>{
        dispatch(get_cities())
    },[dispatch])

    const handleCancel = () => {
        history.push('/')
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!sessionUser){
            history.push('/login');
        }
        const requestUserId = sessionUser?.id
        const payload = {
            city,
            duration,
            taskDescription,
            taskTypeId,
            requestUserId
        }
    // let createdTasker = await dispatch(addOneTasker(payload));
    // if (createdTasker) {
    // history.push(`/taskers/${createdTasker.id}`);
    }

    return (
        <div>
            <span>Tell us about your task. We use these details to show Taskers in your area who fit your needs.</span>
            <form onSubmit={handleSubmit}>
                <div>
                    <label> Choose a city</label>
                    <select required onChange={(e)=>setCity(e.target.value)}>
                        {(cities?.map(city => {
                            return (
                                <option key={"newTaskFormCity-"+city.id} value={city.id}>{city.name}</option>
                            )
                        }))}
                    </select>
                </div>
                <div>
                    <label>How big is your task?</label>
                    <select required onChange={(e)=>setDuration(e.target.value)}>
                        {(durationData?.map(data => {
                            return (
                                <option key={"newTaskFormDuration-"+data.id} value={data.dbStoreValue}>{data.displayValue}</option>
                            )
                        }))}
                    </select>
                </div>
                <div>
                    <label>Tell us the details of your task</label>
                    <textarea
                        onChange={(e)=>setTaskDescription(e.target.value)}
                        value={taskDescription}
                        required
                    />
                </div>
                <div>If you need two or more Taskers, please post additional tasks for each Tasker needed.</div>
                <div className="button_div">
                    <button className='submit-button' type='submit'>
                        See Taskers & Prices
                    </button>
                    <button className='submit-button' type='submit' onClick={()=>{handleCancel()}}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}


export default TaskDetailsForm
