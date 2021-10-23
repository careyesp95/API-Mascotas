import React from 'react';
import {Link} from 'react-router-dom'
// import Message from '../components/Message';
import './Dog.css';

function Dog(props) {
    return (  
        <>
        {
            <figure className='cards__item' data-category={props.name} >
                <Link to={`/home/dogdetail/${props.id}`}>
                    <img
                    className ='cards__item__img'
                    src={props.image} 
                    alt='Loading...'
                    />
                </Link>
            </figure>
        }
        </>  
    )
}
export default Dog
