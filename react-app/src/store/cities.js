const CITIES = 'get/CITIES'

export const all_cities = (cities) => ({
    type:CITIES,
    cities
})

export const get_cities = () => async(dispatch) => {
    const response = await fetch(`/api/cities/`)
    if (response.ok) {
        const cities = await response.json();
        dispatch(all_cities(cities))
        return cities
    }
}

const citiesReducer = (state={}, action) => {
    switch(action.type){
        case CITIES:{
            const newState = action.cities
            return newState
        }
        default:
            return state
    }
}

export default citiesReducer
