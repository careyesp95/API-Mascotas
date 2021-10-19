import React,{useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import Dog from '../components/Dog';
import Card from '../components/Card'
import {getDogs} from '../actions/index'
import '../components/Dog.css';
import SearchBar from '../components/SearchBar'


function Home() {
    var dogs = useSelector(state => state.dogs) // api externa
    const dispatch = useDispatch()
    const [current, SetCurrent] = useState(0)
    const value = dogs.length - 4;

    useEffect(() => {
        dispatch(getDogs())
    },[])
    
    const pageDog = () => dogs.slice(current, current + 8)        
    

    const nextPage = () => {
        if(current < value)
        SetCurrent(current + 8);
    }
    const lastPage = () => {
        if(current > 0) 
        SetCurrent(current - 8);
    }

    var dogsSearch = useSelector(state => state.dogsSearch)
    if (typeof dogsSearch === 'object') return <Card />
    
    return (
        <div className='container'>
            <SearchBar />
            <div>
                <button
                onClick={lastPage}
                >
                Anterior
                </button>
                &nbsp;
                <button
                onClick={nextPage}
                >Siguiente
                </button>
            </div>
            <div className ='container__dog'>
                    {   
                        // dogsSearch.length !== 0 ? (
                        //     <Dog
                        //     Id={dogsSearch.id}
                        //     name={dogsSearch.name} 
                        //     image={dogsSearch.image}
                        //     />
                        // ):
                        pageDog() && pageDog().map(dog => {
                            return <Dog 
                                    key={dog.id}
                                    Id={dog.id}
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
