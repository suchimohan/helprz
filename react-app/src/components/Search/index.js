import './Search.css';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {search} from '../../store/search';
import {useHistory} from "react-router";

const Search = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [searchKeyWord,setSearchKeyWord] = useState('')

    const handleKeyPress = async (e) =>{
        if (e.charCode === 13) {
            e.preventDefault();
            let resultFromSearch = await dispatch(search(searchKeyWord));
            if (resultFromSearch) {
                history.push(`/search/${searchKeyWord}`)
            }
        }
    }

    return (
        <div className="search_div">
            <span className="tagLine">Help when you need it, at your fingertips</span>
            <span>Get help around the house from a trusted Tasker. From handyman work and furniture assembly to moving, yardwork, and more.</span>
            <form className="searchForm">
                <input className = "search_field"
                    type="text"
                    value={searchKeyWord}
                    onChange={(e)=>setSearchKeyWord(e.target.value)}
                    onKeyPress={(e)=> handleKeyPress(e)}
                    placeholder="Search Tasks" />
                <button className="search_button" >
                <i class="fa fa-search" aria-hidden="true"></i>
                Get Help
                </button>
            </form>
        </div>
    )
}

export default Search;
