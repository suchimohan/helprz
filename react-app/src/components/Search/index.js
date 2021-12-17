import './Search.css';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from "react-router";
import { useEffect } from "react";

const Search = () => {

    const taskTypes = useSelector(state=>Object.values(state.taskTypes))
    const dispatch = useDispatch();
    const history = useHistory();

    const [searchKeyWord,setSearchKeyWord] = useState('')

    useEffect(()=>{
        dispatch(get_taskTypes())
    },[dispatch])

    // const handleKeyPress = async (e) =>{
    //     if (e.charCode === 13) {
    //         e.preventDefault();
    //         let resultFromSearch = await dispatch(search(searchKeyWord));
    //         if (resultFromSearch) {
    //             history.push(`/search/${searchKeyWord}`)
    //         }
    //     }
    // }

    return (
        <div className="search_div">
            <span className="tagLine">Help when you need it, at your fingertips</span>
            <span>Get help around the house from a trusted Tasker. From handyman work and furniture assembly to moving, yardwork, and more.</span>
            <div className="searchForm">
                <input className = "search_field"
                    type="text"
                    value={searchKeyWord}
                    onChange={(e)=>setSearchKeyWord(e.target.value)}
                    onKeyPress={(e)=> handleKeyPress(e)}
                    placeholder="Search Tasks" />
                {taskTypes?.map(type => {
                    return (<div key={"tasktype-"+type.id} className='taskTypes_Div'>
                                <p>{type.name}</p>
                            </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Search;

{/* <button className="search_button" >
                <i className="fa fa-search" aria-hidden="true"></i>
                Get Help
                </button> */}
