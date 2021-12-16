import './Search.css';

const Search = () => {
    return (
        <div className="search_div">
            <span className="tagLine">Help when you need it, at your fingertips</span>
            <span>Get help around the house from a trusted Tasker. From handyman work and furniture assembly to moving, yardwork, and more.</span>
            <form className="searchForm">
                <input className = "search_field"
                type="text"
                placeholder="Search Tasks" />
                <button className="search_button">
                <i class="fa fa-search" aria-hidden="true"></i>
                Get Help
                </button>
            </form>
        </div>
    )
}

export default Search;

// value={searchKeyWord}
// onChange={(e)=>setSearchKeyWord(e.target.value)}
// onKeyPress={(e)=> handleKeyPress(e)}/>
