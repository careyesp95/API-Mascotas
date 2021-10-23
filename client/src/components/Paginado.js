import React from 'react'
import './Paginado.css'

function Paginado(props) {
    const pageNumber = []

    for(let i = 1; i <= Math.ceil(props.dogs/props.dogForPage); i++){
        pageNumber.push(i)
    }
    return (
        <nav>
            <ul className='container__page'>
                {
                    pageNumber && pageNumber.map(elem => {
                        return (
                            <div key={elem}> 
                            <button className='container__btn' onClick={() => props.page(elem)}>{elem}</button>
                            </div>
                        )
                    })
                }
            </ul>
        </nav>
    )
}

export default Paginado
