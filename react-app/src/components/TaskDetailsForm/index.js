import {useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {useHistory} from "react-router";
import {get_cities} from "../../store/cities"
import { searchForTaskers } from "../../store/tasker";

const TaskDetailsForm = () => {

    const sessionUser = useSelector(state=>state.session.user)
    const cities = useSelector(state=>Object.values(state.cities))
    const { taskTypeId }  = useParams();

    const durationData = [
                            {"id" : 1, "displayValue" : "Small - Est. 1 hr" , "dbStoreValue" : "1 hr"},
                            {"id" : 2, "displayValue" : "Medium - Est. 2-3 hrs" , "dbStoreValue" : "2-3 hrs"},
                            {"id" : 3, "displayValue" : "Large - Est. 4+ hrs" , "dbStoreValue" : "4+ hrs"}
                        ]


    let current = new Date();
    let future = current.setMonth(current.getMonth() + 3)
    const [time,setTime] = useState()
    const [date,setDate] = useState(current)


    const [city, setCity] = useState(cities[0]?.id)
    const [duration, setDuration] = useState(durationData[0].dbStoreValue)
    const [taskDescription, setTaskDescription] = useState('')
    const [showForm, setShowForm] = useState(true)
    const [showTaskers, setShowTaskers] = useState(false)
    const [showDateTime, setShowDateTime] = useState(false)
    const [filteredTaskerData, setFilteredTaskerData] = useState([])

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>{
        dispatch(get_cities())
        searchForTaskers(city,taskTypeId)
    },[dispatch,city,taskTypeId])

    const handleCancel = () => {
        history.push('/')
    }

    const requestUserId = sessionUser?.id
    const payload = {
        city,
        duration,
        taskDescription,
        taskTypeId,
        requestUserId
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!sessionUser){
            history.push('/login');
        }
        let taskerData = await dispatch(searchForTaskers(city,taskTypeId));
        if (taskerData) {
            setShowForm(false)
            let data = Object.values(taskerData)
            setFilteredTaskerData(data)
            setShowTaskers(true)
        }
    }

    const handleClick = () => {
        // console.log(taskerInfo.id)
        // payload["taskerId"] = taskerId
        // console.log(payload)
        setShowTaskers(false)
        setShowDateTime(true)
    }

    return (
        <div>
            {showForm && (<div>
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
            )}
            {showTaskers && filteredTaskerData.map(taskerInfo => {
                return (
                <div key={'taskerInfo-'+taskerInfo.id}>
                    <ul>
                        <li>{taskerInfo.user.username}</li>
                        <li>{taskerInfo.description}</li>
                    <button type='submit' onClick={handleClick()}>Select</button>
                    </ul>
                </div>
            )})}
            {showDateTime && (
                <div>
                    <form>
                        <label>Choose Date:</label>
                        <input type="date"
                            onChange={(e) => setDate(e.target.value)}
                            value={date}
                            min={current}
                            max={future}/>
                        <label>choose Time</label>
                        <select value={time} onChange={(e) => setTime(e.target.value)}>
                            <option value="08:00">8:00 am - 11:00 am</option>
                            <option value="11:00">11:00 am - 2:00 pm</option>
                            <option value="14:00">2:00 pm - 5:00 pm</option>
                            <option value="17:00">5:00 pm - 8:00 pm</option>
                        </select>
                    </form>
                </div>
            )}
        </div>
    )
}






// const taskerId = taskerInfo.id





export default TaskDetailsForm
