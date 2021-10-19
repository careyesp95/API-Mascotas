import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {searchDogs} from '../actions/index'


function SearchBar() {
    const [state,setState] = useState({
        title:'',
    })
    //var dogsdb = useSelector(state => state.dogsSearch);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        event.preventDefault();
        setState({[event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(searchDogs(state.title))
        setState({title:""})
    }

    return (
        <div>
            <form className='form__container' onSubmit={(event) => handleSubmit(event)}>
                <div>
                    <label className='label' htmlFor='name'>Buscar Raza: </label>
                    <input 
                    className='input__raza'
                    name='title'
                    autoComplete='off'
                    value={state.title}
                    onChange={(event) => handleChange(event)}
                    />
                </div>
                <button type='submit'>Buscar</button>
            </form>
        </div>
    )
}

export default SearchBar

