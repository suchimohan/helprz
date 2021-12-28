import {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from "react-router";
import {useParams} from 'react-router-dom'
import './EditTaskerDetailsForm.css';
import { editTasker } from "../../store/tasker";
import {get_taskTypes} from "../../store/tasktypes"
import {get_cities} from "../../store/cities"
import { getOneTaskerByID } from '../../store/tasker';

const EditTaskerDetailsForm = () => {
    const taskTypes = useSelector(state=>Object.values(state.taskTypes))
    const cities = useSelector(state=>Object.values(state.cities))

    const { taskerId }  = useParams();
    const tasker = useSelector((state)=>state?.taskers[taskerId])

    const [taskName, setTaskName] = useState(tasker?.taskType?.id);
    const [description, setDescription] = useState(tasker?.description)
    const [experience, setExperience] = useState(tasker?.experience)
    const [city, setCity] = useState(tasker?.city?.id)
    const [price, setPrice] = useState(tasker?.price)
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();


    useEffect(()=>{
        dispatch(get_taskTypes())
        dispatch(get_cities())
        dispatch(getOneTaskerByID(taskerId))
    },[dispatch,taskerId])

    useEffect(()=>{
        if(tasker){
            setTaskName(tasker.taskType.id)
            setDescription(tasker.description)
            setExperience(tasker.experience)
            setPrice(tasker.price)
            setCity(tasker.city.id)
        }
    },[tasker])

    const handleCancel = () => {
        history.push(`/taskers/${taskerId}`)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            taskName,
            description,
            experience,
            city,
            price,
        }
    let response = await dispatch(editTasker(payload,taskerId));
    if (response.tasker) {
    history.push(`/taskers/${taskerId}`);
    }
    if(response.errors.length){
        setErrors(response.errors)
    }
}

    if (!tasker) {
        return null
    } else {
        return (
            <div className='edit-tasker-Div'>
                <h3>Edit your Tasker profile details</h3>
                    <form onSubmit={handleSubmit} className='edit-tasker'>
                        <div className="errors_div">
                            {errors.map((error, ind) => (
                            <div key={ind} className='errorItem'>{error}</div>
                            ))}
                        </div>
                        <div>
                            <label>Choose A Task Category</label>
                            <select onChange={(e)=>setTaskName(e.target.value)} value={taskName}>
                            {(taskTypes?.map(type => {
                                return (
                                    <option key={"editTaskerDetailsFormCategory-"+type.id} value={type.id}>{type.name}</option>
                                )
                            }))}
                            </select>
                        </div>
                        <div className="edit_description_div">
                            <label>Short description about your skills</label>
                            <textarea
                            onChange={(e)=>setDescription(e.target.value)}
                            value={description}
                            />
                        </div>
                        <div>
                            <label>Years of experience</label>
                            <input
                            onChange={(e)=>setExperience(e.target.value)}
                            value={experience}
                            type="number"
                            />
                        </div>
                        <div>
                        <label> Choose City </label>
                        <select onChange={(e)=>setCity(e.target.value)} value={city}>
                            {(cities?.map(city => {
                                return (
                                    <option key={"editTaskerDetailsFormCity-"+city.id} value={city.id}>{city.name}</option>
                                )
                            }))}
                        </select>
                        </div>
                        <div>
                            <label>Price Per Hour</label>
                            <input
                            onChange={(e)=>setPrice(e.target.value)}
                            value={price}
                            type="number"
                            />
                        </div>
                        <div className="edit_button_div">
                            <button className='edit_submit-button' type='submit'>
                                Submit
                            </button>
                            <button className='edit_submit-button' type='submit' onClick={()=>{handleCancel()}}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
        )
    }
}


export default EditTaskerDetailsForm;
