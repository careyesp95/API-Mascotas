import React,{useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import Dog from '../components/Dog';
import Card from '../components/Card'
import {getDogs,ordenarByName} from '../actions/index'
import '../components/Dog.css';
import SearchBar from '../components/SearchBar';
import Paginado from '../components/Paginado';



function Home() {
    const dogs = useSelector(state => state.dogs) 
    const  dispatch = useDispatch()
    //paginado
    const [orden, setOrden] = useState('');
    const[currentPage, setCurrentPage] = useState(1);
    const[dogForPage, setDogForPage] = useState(8);
    const positionLastDogPage = currentPage * dogForPage;
    const positionFirstDogPage = positionLastDogPage - dogForPage;
    const currentDog = dogs.slice(positionFirstDogPage,positionLastDogPage)
    
    const page = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    useEffect(() => {
        dispatch(getDogs())
    },[dispatch])

    var dogsSearch = useSelector(state => state.dogsSearch)
    if (typeof dogsSearch === 'object') return <Card />

    function onOrderHandleChange(e) {
        e.preventDefault();
        dispatch(ordenarByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado${e.target.value}`)
    }

    
    
    return (
        <div className='container'>
            <SearchBar />
            <div>
                <div>
                    <select  onChange={(e) => onOrderHandleChange(e)}>
                        <option value='asc'>ASC</option>
                        <option value='des'>DES</option>
                    </select>
                    <select>
                        <option value='creados'>Creados</option>
                        <option value='Todos'>Todos</option>
                    </select>
                    {/* <select
                        onChange={(e) => handleStatusTemperament(e)}
                    >
                        {
                            dogsTemp?.map((temp,i) => (
                                <option 
                                key={i} 
                                value={temp}>{temp}</option>
                            ))
                        
                        }  
                    </select>    */}
                </div>
            </div>
            <Paginado
                dogs={dogs.length}
                dogForPage={dogForPage}
                page={page}
            />
            <div className ='container__dog'>
                    {   
                     currentDog?.map(dog => {
                         return <Dog 
                             key={dog.id}
                             id={dog.id}
                             name={dog.name} 
                             image={dog.image}
                             temperament={dog.temperamento}
                         />
                     })   
                    }
            </div>
        </div>
    )
}

export default Home
