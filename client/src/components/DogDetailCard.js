import React from 'react'
import './DogDetail.css'

function DogDetailCard(props) {
    return (
        <>
            <img
            className ='cards__img'
            src={props?.image} 
            alt='Loading...'
            />
            <div>
                <h5 
                className='cards__item__name'
                >{`Nombre: ${props?.name}`}</h5>
                <p
                className='cards__item__temp'
                >{`Temp: ${props?.temperamento}`}</p>
                <p 
                className='cards__item__altura'
                >{`Altura(cm): ${props?.altura}`}</p>

                <p 
                className='cards__item__peso'
                >{`Peso(kg): ${props?.peso}`}</p>

                <p 
                className='cards__item__life'
                >{`Años: ${props?.años}`}</p>
            </div>    
        </>
    )
}

export default DogDetailCard
