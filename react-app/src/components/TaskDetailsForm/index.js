import {useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {useHistory} from "react-router";
import {get_cities} from "../../store/cities"
import {get_taskTypes} from "../../store/tasktypes"
import { searchForTaskers } from "../../store/tasker";
import ms from 'ms';
import moment from 'moment';

const TaskDetailsForm = () => {

    const sessionUser = useSelector(state=>state.session.user)
    const cities = useSelector(state=>Object.values(state.cities))
    const taskTypes = useSelector(state=>Object.values(state.taskTypes))
    const taskers = useSelector(state=>Object.values(state.taskers))
    const { taskTypeId }  = useParams();

    const durationData = [
                            {"id" : 1, "displayValue" : "Small - Est. 1 hr" , "dbStoreValue" : "1 hr"},
                            {"id" : 2, "displayValue" : "Medium - Est. 2-3 hrs" , "dbStoreValue" : "2-3 hrs"},
                            {"id" : 3, "displayValue" : "Large - Est. 4+ hrs" , "dbStoreValue" : "4+ hrs"}
                        ]

    const today = new Date()

    const [time,setTime] = useState()
    const [date,setDate] = useState(moment(today).format('YYYY-MM-DD'))

    const minday = ms('90d')
    const minDate = new Date();
    const maxDate = new Date(+new Date() + minday)


    const [city, setCity] = useState(cities[0]?.id)
    const [duration, setDuration] = useState(durationData[0].dbStoreValue)
    const [selectedTaskerId,setSelectedTaskerId] = useState()
    const [taskDescription, setTaskDescription] = useState('')
    const [formPhase,setFormPhase] = useState(1)
    const [filteredTaskerData, setFilteredTaskerData] = useState([])

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>{
        dispatch(get_cities())
        dispatch(get_taskTypes())
        searchForTaskers(city,taskTypeId)
    },[dispatch,city,taskTypeId])


    const handleCancel = () => {
        history.push('/')
    }

    const requestUserId = sessionUser?.id

    const ChoosenCity = () => {
        const oneCity = cities.find((ele)=>+ele.id === +city)
        return oneCity.name
    }

    const ChoosenTaskType = () => {
        const oneTaskType = taskTypes.find((ele)=>+ele.id === +taskTypeId)
        return oneTaskType.name
    }

    const ChoosenTasker = () => {
        const oneTasker = taskers.find((ele)=>+ele.id === +selectedTaskerId)
        return oneTasker.user.username
    }

    const ChoosenTime = () => {
        if(time === "8:00" || time === "10:00"){
            return "am"
        }
        else {
            return "pm"
        }
    }

    const handleSubmitPhase1 = async(e) => {
        e.preventDefault();
        let taskerData = await dispatch(searchForTaskers(city,taskTypeId));
        // console.log("the tasker details",taskerData)
        if (taskerData) {
            let data = Object.values(taskerData)
            setFilteredTaskerData(data)
            setFormPhase(2)
        }
    }

    const handleSubmitPhase2 = (taskerId) => {
        setSelectedTaskerId(taskerId)
        setFormPhase(3)
    }

    const handleSubmitPhase3 = async(e) => {
        e.preventDefault();
        let payload = {};
        payload['city']  = city
        payload['duration']=duration
        payload['taskDescription']=taskDescription
        payload['taskTypeId']=taskTypeId
        payload['requestUserId']=requestUserId
        payload["taskerId"] = selectedTaskerId
        payload["date"] = date
        payload["time"] = time
        console.log('handle duration submit payload',payload)
    }

    return (
        <div>
            {formPhase===1 && (<div>
                <span>Tell us about your task. We use these details to show Taskers in your area who fit your needs.</span>
                <form onSubmit={handleSubmitPhase1}>
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
                    {/* <div>
                        <label>How big is your task?</label>
                        <select required onChange={(e)=>setDuration(e.target.value)}>
                            {(durationData?.map(data => {
                                return (
                                    <option key={"newTaskFormDuration-"+data.id} value={data.dbStoreValue}>{data.displayValue}</option>
                                )
                            }))}
                        </select>
                    </div> */}
                    <div>
                        <label>Tell us the details of your task</label>
                        <textarea
                            onChange={(e)=>setTaskDescription(e.target.value)}
                            value={taskDescription}
                            required
                        />
                    </div>
                    <div>
                        <label>Choose Date:</label>
                            <input type="date"
                                onChange={(e) => setDate(e.target.value)}
                                value={date}
                                min = {moment(minDate).format('YYYY-MM-DD')}
                                max= {moment(maxDate).format('YYYY-MM-DD')}/>
                    </div>
                    <div>
                        <label>choose Time</label>
                        <select value={time} onChange={(e) => setTime(e.target.value)}>
                            <option value="08:00">8:00 - 10:00 am</option>
                            <option value="10:00">10:00 - 12:00 pm</option>
                            <option value="12:00">12:00 - 2:00 pm</option>
                            <option value="14:00">2:00 - 4:00 pm</option>
                            <option value="16:00">4:00 - 6:00 pm</option>
                            <option value="18:00">6:00 - 8:00 pm</option>
                        </select>
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
            {formPhase===2 && filteredTaskerData?.map(taskerInfo => {
                return (
                <div key={'taskerInfo-'+taskerInfo.id}>
                    <ul>
                        <li>{taskerInfo.user.username}</li>
                        <li>{taskerInfo.description}</li>
                        <li><button type='submit' onClick={()=>{handleSubmitPhase2(taskerInfo.id)}}>Select</button></li>
                    </ul>
                </div>
            )})}
            {formPhase===3 && (
                <div>
                    <form onSubmit={handleSubmitPhase3}>
                        <div>Choosen City : {ChoosenCity()}</div>
                        <div>Choosen Task Type:{ChoosenTaskType()} </div>
                        <div>Task Description:{taskDescription}</div>
                        <div>Date: {date}</div>
                        <div>Start Time: {time} {ChoosenTime()}</div>
                        <div>Choosen Tasker Name:{ChoosenTasker()}</div>
                        <div className="button_div">
                            <button className='submit-button' type='submit'>
                                Confirm Booking
                            </button>
                            <button className='submit-button' type='submit' onClick={()=>{handleCancel()}}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}






// const taskerId = taskerInfo.id





export default TaskDetailsForm
