import {useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from "react-router";
import './BecomeTaskerForm.css';
import { addOneTasker } from "../../store/tasker";

const BecomeTaskerForm = () => {
    const taskTypes = useSelector(state=>Object.values(state.taskTypes))
    const cities = useSelector(state=>Object.values(state.cities))


    // const [errors, setErrors] = useState([]);
    const [taskName, setTaskName] = useState(taskTypes[0].id);
    const [description, setDescription] = useState('')
    const [experience, setExperience] = useState('')
    const [city, setCity] = useState(cities[0].id)
    const [price, setPrice] = useState('')

    const dispatch = useDispatch();
    const history = useHistory();

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
    let createdTasker = await dispatch(addOneTasker(payload));
    if (createdTasker) {
    history.push(`/taskers/${createdTasker.id}`);
    }}

    return (
        <div className='add-tasker-Div'>
            <h2>Find local jobs that fit your skills. With Helprz, you have the freedom and support to be your own boss.</h2>
            <h2>Let's get started, tell us about yourself</h2>
                <form onSubmit={handleSubmit} className='add-tasker'>
                    <div>
                        <label>Choose A Task Category</label>
                        <select required onChange={(e)=>setTaskName(e.target.value)}>
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
                    <select required onChange={(e)=>setCity(e.target.value)}>
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
                        required
                        type="number"
                        min = "1"
                        max = "500"
                        Step = "0.01"
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
