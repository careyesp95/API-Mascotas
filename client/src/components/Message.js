import React from 'react';
// import {Link} from 'react-router-dom';
// import {Button} from './Button';
import { removeSearchDogs } from '../actions';
import {useDispatch } from 'react-redux';


function Message(props) {
    const dispatch = useDispatch()
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(removeSearchDogs())
    }

    return (
        <div>
            <h2>No se completo la busqueda. La raza No existe</h2>
            <button type='button' onClick={(e) => handleSubmit(e)}>Ver otras Razas</button> 
        </div>
    )
}

export default Message
