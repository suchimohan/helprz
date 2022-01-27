import {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from "react-router";
import './BecomeTaskerForm.css';
import { addOneTasker } from "../../store/tasker";
import {get_taskTypes} from "../../store/tasktypes"
import {get_cities} from "../../store/cities"

const BecomeTaskerForm = () => {
    const taskTypes = useSelector(state=>Object.values(state.taskTypes))
    const cities = useSelector(state=>Object.values(state.cities))
    const sessionUser = useSelector(state=>state.session.user)

    const [taskName, setTaskName] = useState(taskTypes[0]?.id);
    const [description, setDescription] = useState('')
    const [experience, setExperience] = useState('')
    const [city, setCity] = useState(cities[0]?.id)
    const [price, setPrice] = useState('')
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();


    useEffect(()=>{
        dispatch(get_taskTypes())
        dispatch(get_cities())
    },[dispatch])


//to update taskName & city after state loads
    useEffect(()=>{
        if(!taskName){
            setTaskName(taskTypes[0]?.id)
        }
        if(!city){
            setCity(cities[0]?.id)
        }
    },[taskTypes,cities,city,taskName])


    const handleCancel = () => {
        history.push('/')
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
        // console.log(payload)
    let response = await dispatch(addOneTasker(payload));
    if (response.tasker) {
        history.push(`/users/${sessionUser.id}/taskers/${response.tasker.id}`);
    }
    if(response.errors.length){
        setErrors(response.errors)
    }
    }

    return (
        <div className='add-tasker-Div'>
            <h3>Find local jobs that fit your skills. With Helprz, you have the freedom and support to be your own boss.</h3>
            <h3>Let's get started, tell us about yourself</h3>
                <form onSubmit={handleSubmit} className='add-tasker'>
                    <div className="errors_div">
                        {errors.map((error, ind) => (
                        <div key={ind} className='errorItem'>{(error.split(':'))[1]}</div>
                        ))}
                    </div>
                    <div>
                        <label>Choose A Task Category</label>
                        <select onChange={(e)=>setTaskName(e.target.value)} value={taskName}>
                        {(taskTypes?.map(type => {
                            return (
                                <option key={"newTaskerFormCategory-"+type.id} value={type.id}>{type.name}</option>
                            )
                        }))}
                        </select>
                    </div>
                    <div className="description_div">
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
                                <option key={"newTaskerFormCity-"+city.id} value={city.id}>{city.name}</option>
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



export default BecomeTaskerForm;
