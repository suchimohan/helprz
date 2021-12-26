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
    const tasker = useSelector(state=>Object.values(state.taskers))

    const { taskerId }  = useParams();
    // const [errors, setErrors] = useState([]);
    const [taskName, setTaskName] = useState(tasker[0]?.taskType.id);
    const [description, setDescription] = useState(tasker[0]?.description)
    const [experience, setExperience] = useState(tasker[0]?.experience)
    const [city, setCity] = useState(tasker[0]?.city.id)
    const [price, setPrice] = useState(tasker[0]?.price)

    const dispatch = useDispatch();
    const history = useHistory();


    useEffect(()=>{
        dispatch(get_taskTypes())
        dispatch(get_cities())
        dispatch(getOneTaskerByID(taskerId))
    },[dispatch,taskerId])

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
    // console.log("the new payload is",payload)
    let editedTasker = await dispatch(editTasker(payload,taskerId));
    if (editedTasker) {
    history.push(`/taskers/${taskerId}`);
    }}


    if (!tasker[0]) {
        return null
    } else {
        return (
            <div className='edit-tasker-Div'>
                <h2>Edit your Tasker profile details</h2>
                    <form onSubmit={handleSubmit} className='edit-tasker'>
                        <div>
                            <label>Choose A Task Category</label>
                            <select required onChange={(e)=>setTaskName(e.target.value)} value={taskName}>
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
                            required
                            />
                        </div>
                        <div>
                            <label>Years of experience</label>
                            <input
                            onChange={(e)=>setExperience(e.target.value)}
                            value={experience}
                            required
                            type="number"
                            min = "0"
                            max = "50"
                            />
                        </div>
                        <div>
                        <label> Choose City </label>
                        <select required onChange={(e)=>setCity(e.target.value)} value={city}>
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
                            required
                            type="number"
                            min = "1"
                            max = "500"
                            step = "0.01"
                            />
                        </div>
                        <div className="button_div">
                            <button className='submit-button' type='submit'>
                                Submit
                            </button>
                            <button className='submit-button' type='submit' onClick={()=>{handleCancel()}}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
        )
    }
}


export default EditTaskerDetailsForm;
