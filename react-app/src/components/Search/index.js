import './Search.css';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from "react";
import { NavLink } from 'react-router-dom';
import {get_taskTypes} from "../../store/tasktypes"
import {useHistory} from "react-router";

const Search = () => {

    const taskTypes = useSelector(state=>Object.values(state.taskTypes))
    const dispatch = useDispatch();
    const history = useHistory();

    const [filteredData,setFilteredData] = useState([]);

    useEffect(()=>{
        dispatch(get_taskTypes())
    },[dispatch])

    const handleFilter = (e) => {
        const searchKeyWord = e.target.value
        const newFilter = taskTypes.filter((value)=>{
            return value.name.toLowerCase().includes(searchKeyWord.toLowerCase());
        })
        if (searchKeyWord === ""){
            setFilteredData([]);
        } else {
            setFilteredData(newFilter)
        }
    }

    const handleEnter = (e) =>{
        const searchKeyWord = e.target.value
        if (e.charCode === 13) {
            e.preventDefault();
            const newFilter = taskTypes.filter((value)=>{
                return (value.name.toLowerCase() === searchKeyWord.toLowerCase());
            })
            if (newFilter.length) {
                history.push(`/task-new/${newFilter[0].id}`)
            }
        }
    }

    return (
        <div className="search_div">
            <span className="tagLine">Help when you need it, at your fingertips</span>
            <span>Get help around the house from a trusted Tasker. From handyman work and furniture assembly to moving, yardwork, and more.</span>
            <div className="search">
                <div className="searchInputs">
                    <input className = "search_field"
                        type="text"
                        onChange={handleFilter}
                        onKeyPress={handleEnter}
                        placeholder="Search Tasks" />
                </div>
                { filteredData.length !== 0 && (
                <div className="dataResult">
                    {filteredData.map(type => {
                        return (
                            <div key={'linktoform-'+ type.id} className='dataItem'>
                                <NavLink to={`/task-new/${type.id}`} exact={true} activeClassName='active'>
                                    <p>{type.name}</p>
                                </NavLink>
                            </div>
                        )
                    })}
                </div>
                )}
            </div>
        </div>
    )
}

export default Search;
