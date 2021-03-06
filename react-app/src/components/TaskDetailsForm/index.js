import {useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {useHistory} from "react-router";
import {get_cities} from "../../store/cities"
import {get_taskTypes} from "../../store/tasktypes"
import { addOneTask } from "../../store/task";
import { searchForTaskers } from "../../store/taskerList";
import ms from 'ms';
import moment from 'moment';
import './TaskDetailsForm.css'
import TaskerCard from "../TaskerCard"


const TaskDetailsForm = () => {

    const sessionUser = useSelector(state=>state.session.user)
    const cities = useSelector(state=>Object.values(state.cities))
    const taskTypes = useSelector(state=>Object.values(state.taskTypes))
    const taskerList = useSelector(state=>Object.values(state.taskerList))
    const { taskTypeId }  = useParams();

    const durationData = [
                            {"id" : 1, "displayValue" : "Small - Est. 1 hr" , "dbStoreValue" : "1 hr"},
                            {"id" : 2, "displayValue" : "Medium - Est. 2 hrs" , "dbStoreValue" : "2 hrs"},
                            {"id" : 3, "displayValue" : "Large - Est. 3 hrs" , "dbStoreValue" : "3 hrs"}
                        ]


    const timeDataToSelect = [
                                {"id":1, "dbValue":'08:00:00', "displayValue":"8:00 - 10:00 am"},
                                {"id":2, "dbValue":'10:00:00', "displayValue":"10:00 - 12:00 pm"},
                                {"id":3, "dbValue":'12:00:00', "displayValue":"12:00 - 2:00 pm"},
                                {"id":4, "dbValue":'14:00:00', "displayValue":"2:00 - 4:00 pm"},
                                {"id":5, "dbValue":'16:00:00', "displayValue":"4:00 - 6:00 pm"},
                                {"id":6, "dbValue":'18:00:00', "displayValue":"6:00 - 8:00 pm"},
                            ]


    const minday = ms('1d')
    const maxday = ms('90d')
    const minDate = new Date(+new Date() + minday);
    const maxDate = new Date(+new Date() + maxday);

    const [date,setDate] = useState(moment(minDate).format('YYYY-MM-DD'))
    const [time,setTime] = useState(timeDataToSelect[0].dbValue)
    const [city, setCity] = useState(cities[0]?.id)
    const [duration, setDuration] = useState(durationData[1].dbStoreValue)
    const [selectedTaskerId,setSelectedTaskerId] = useState()
    const [taskDescription, setTaskDescription] = useState('')
    const [formPhase,setFormPhase] = useState(1)
    const [filteredTaskerData, setFilteredTaskerData] = useState([])
    const [errors, setErrors] = useState([])

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>{
        dispatch(get_cities())
        dispatch(get_taskTypes())
        searchForTaskers(city,taskTypeId)
    },[dispatch,city,taskTypeId])

    //to update city after state loads
    useEffect(()=>{
        if(!city){
            setCity(cities[0]?.id)
        }
    },[cities,city])


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
        const oneTasker = taskerList.find((ele)=>+ele.id === +selectedTaskerId)
        return oneTasker.user.username
    }

    const ChoosenTaskerPhoto = () => {
        const oneTasker = taskerList.find((ele)=>+ele.id === +selectedTaskerId)
        return oneTasker.user?.profilePhotoURL
    }

    const handleSubmitPhase1 = async(e) => {
        e.preventDefault();
        setErrors([])
        if(!taskDescription){
            setErrors([
                "description:This field is required"
            ])
            return
        }
        let taskerData = await dispatch(searchForTaskers(city,taskTypeId,date,time));
        if (taskerData) {
            let data = Object.values(taskerData)
            setFilteredTaskerData(data)
            setFormPhase(2)
        } else {
            setErrors([
                "No taskers found for this city/date/time"
            ])
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
        let createdTask = await dispatch(addOneTask(payload))
        if (createdTask) {
            history.push(`/users/${sessionUser.id}/tasks`)
        }
    }

    let errordiv;
    if(errors.length){
        errordiv = (
            <div className="errors_div">
                {errors.map((error, ind) => (
                <div key={ind} className='errorItem'>{error}</div>
                ))}
            </div>
        )
    }


    return (
        <div>
            {formPhase===1 && (<div className='task-details-form-div'>
                <h3>Tell us about your task. We use these details to show Taskers in your area who fit your needs.</h3>
                <form onSubmit={handleSubmitPhase1} className='task-details-form'>
                    {errordiv}
                    <div>
                        <label> Choose a city</label>
                        <select required onChange={(e)=>setCity(e.target.value)} value={city}>
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
                            {(durationData.map(data => {
                                return (
                                    <option key={"newTaskFormDuration-"+data.id} value={data.dbStoreValue}>{data.displayValue}</option>
                                )
                            }))}
                        </select>
                    </div> */}
                    <div className="task_form_description_div">
                        <label>Tell us the details of your task</label>
                        <textarea
                            onChange={(e)=>setTaskDescription(e.target.value)}
                            value={taskDescription}
                        />
                    </div>
                    <div>
                        <label>Choose Date:</label>
                            <input required type="date"
                                onChange={(e) => setDate(e.target.value)}
                                value={date}
                                min = {moment(minDate).format('YYYY-MM-DD')}
                                max= {moment(maxDate).format('YYYY-MM-DD')}/>
                    </div>
                    <div>
                        <label>Choose Time</label>
                        <select required value={time} onChange={(e) => setTime(e.target.value)}>
                            {(timeDataToSelect.map(data => {
                                return (
                                    <option key={"newTaskFormTime-"+data.id} value={data.dbValue}>{data.displayValue}</option>
                                )
                            }))}
                        </select>
                    </div>
                    <div>Note: If you need two or more Taskers, please post additional tasks for each Tasker needed.</div>
                    <div className="task_form_button_div">
                        <button className='task_form_submit-button' type='submit'>
                            See Taskers & Prices
                        </button>
                        <button className='task_form_submit-button' type='submit' onClick={()=>{handleCancel()}}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
            )}
            {formPhase===2 && (
            <div className="phase2form">
            {filteredTaskerData?.map(taskerInfo => {
                return (
                <div key={'taskerInfo-'+taskerInfo.id} className="avlbTaskers">
                    <TaskerCard
                        key = {'taskerCard-'+taskerInfo.id}
                        name = {taskerInfo.user.username}
                        image = {taskerInfo.user.profilePhotoURL}
                        description = {taskerInfo.description}
                        price = {taskerInfo.price}
                        experience = {taskerInfo.experience}
                    />
                    <div className="tasker_select_button_div">
                        <button className='task_form_submit-button' type='submit' onClick={()=>{handleSubmitPhase2(taskerInfo.id)}}>Select</button>
                    </div>
                </div>
            )})}
            </div>
            )}
            {formPhase===3 && (
                <div className='phase3-form-div'>
                    <form onSubmit={handleSubmitPhase3} className='phase3-details-form'>
                        <div>
                            <strong>Choosen City :</strong>
                            <span>{ChoosenCity()}</span>
                        </div>
                        <div>
                            <strong>Choosen Task Type:</strong>
                            <span>{ChoosenTaskType()}</span>
                        </div>
                        <div>
                            <strong>Task Description:</strong>
                            <span>{taskDescription}</span>
                        </div>
                        <div>
                            <strong>Choosen Date:</strong>
                            <span>{date}</span>
                        </div>
                        <div>
                            <strong>Choosen Start Time: </strong>
                            <span>{time}</span>
                        </div>
                        <div className="tasker_inform_div">
                            <strong>Choosen Tasker:</strong>
                            <div className="tasker_image_name_div">
                                <img className="tasker_image" src={ChoosenTaskerPhoto()} alt="" />
                                <strong>Name: {ChoosenTasker()}</strong>
                            </div>
                        </div>
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



export default TaskDetailsForm
