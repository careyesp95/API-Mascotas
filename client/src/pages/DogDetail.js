import React from 'react';
import {useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import {getDogsDetail} from '../actions/index';
import DogDetailCard from '../components/DogDetailCard';
import Loader from '../components/Loader';
//import Message from '../components/Message';
import '../components/DogDetail.css';


function DogDetail() { 
    var dog = useSelector(state => state.dogsDetail)
    
    const dispatch = useDispatch();
    const {id} =useParams();
    
    useEffect(() => {
        dispatch(getDogsDetail(id))
    },[dispatch,id])

    return (
            <div className='container__detail'>
                    <div className='container__blur' /> 
                    <div className='container__back'>
                        <div> 
                            {
                                dog === undefined ? 
                                <Loader />
                                :<DogDetailCard 
                                image={dog.image}
                                name = {dog.name}
                                temperamento={dog.temperamento}
                                altura={dog.altura}
                                peso={dog.peso}
                                años={dog.años}
                            />
                            }
                        </div>
                    </div>
            </div> 
    )
}

export default DogDetail
