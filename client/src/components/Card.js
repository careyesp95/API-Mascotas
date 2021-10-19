import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import SearchBar from './SearchBar';
import Dog from './Dog';
import { removeSearchDogs } from '../actions';
import Message from './Message';
// import {Button} from './Button';
// import {Link} from 'react-router-dom';
import './Card.css'

function Card() {
    var dogsSearch = useSelector(state => state.dogsSearch)
    const dispatch = useDispatch()
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(removeSearchDogs())
    }

    return (
        <div className= 'container__card'>
            <SearchBar />
            {
                dogsSearch.mesagge ? 
                <Message />
                
                :
                <div className='container__card__item'>
                    <h1 className='card__item__name'>Raza Encontrada {dogsSearch.name}</h1>
                        {
                            <Dog
                                name={dogsSearch.name}
                                Id={dogsSearch.id}
                                image={dogsSearch.image}
                            />
                            
                        }
                        <button className='card__item__btn'  type='button' onClick={(e) => handleSubmit(e)}>Ver otras Razas</button>
                </div>
            }
        
        </div>    
        
    )
}

export default Card
