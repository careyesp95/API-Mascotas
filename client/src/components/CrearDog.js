import React,{useEffect,useState} from 'react';
import {temperamentosDogs, createDog, clearDog} from '../actions/index';
import {useDispatch,useSelector} from 'react-redux';
import './CrearDog.css';
// let {name, altura, peso, años, image, temperamento } = req.body;

function CrearDog() {

    function validate(nuevodog){
        let error = {}
        if(!nuevodog.name){
            error.name ='El nombre es requerido'
        }else if(!/^\w{2,30}$/.test(nuevodog.name)){
            error.name = 'El nombre es invalido'
        }else if(!nuevodog.altura){
            error.altura = 'La altura es requerida'
        }else if(!/^\d{1,2}\ \-\ \d{1,2}$/.test(nuevodog.altura)){
            error.altura = 'La altura es invalida'
        }else if(!nuevodog.peso){
            error.peso = 'El peso es requerido'
        }else if(!/^\d{1,2}\ \-\ \d{1,2}$/.test(nuevodog.peso)){
            error.peso ='El peso es invalido'
        }
        return error;
    }

    const temperamentosdog = useSelector(state => state.temperamentos);

    console.log('HOLA SOY TEMPERAMENTOS',temperamentosdog)
    const [error, setError] = useState({})
    const [nuevodog, setNuevodog] = useState({
        name:'',
        altura:'', 
        peso:'',
        años:'',
        image:'',
        temperamento:'',
    })


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(temperamentosDogs())
    },[])

    function onInputChangeValidate(e){
        setError(validate({
            ...nuevodog,
            [e.target.name]: e.target.value
        }));
        setNuevodog((state) => {
            return {
                ...state,
                [e.target.name]:e.target.value
            }
        })

    }

    function onInputChange(e){
        e.preventDefault();
        setNuevodog((state) => {
            return {
                ...state,
                [e.target.name]:e.target.value
            }
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(createDog(nuevodog))
        alert(`se agrego el dog: ${nuevodog.name} con exito!`)
    }

    function clearDogForm(e){
        e.preventDefault();
        dispatch(clearDog());
    }
    
    console.log('Hola soy new Dog',nuevodog)
    return (
        <section>
            <div>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className='container__form'>
                        <p>
                            <label htmlFor=''>Name: </label>
                            <input
                            type='text'
                            name='name'
                            value={nuevodog.name}   
                            onChange={(e) => onInputChangeValidate(e),(e) => onInputChange(e)}     
                            />
                        </p>
                        <p>
                            <label htmlFor=''>Altura: </label>
                            <input
                            type='text'
                            name='altura'
                            value={nuevodog.altura}
                            onChange={(e) => onInputChangeValidate(e),(e) => onInputChange(e)}
                            
                            />
                        </p>
                        <p>
                            <label htmlFor=''>Peso: </label>
                            <input
                            type='text'
                            name='peso'
                            value={nuevodog.peso}
                            onChange={(e) => onInputChangeValidate(e),(e) => onInputChange(e)}
                            
                            />
                        </p>
                        <p>
                            <label htmlFor=''>Años: </label>
                            <input
                            type='text'
                            name='años'
                            value={nuevodog.años}
                            onChange={(e) => onInputChange(e)}
                            
                            />
                        </p>
                        <p>
                            <label htmlFor=''>Image: </label>
                            <input
                            type='text'
                            name='image'
                            value={nuevodog.image}
                            onChange={(e) => onInputChange(e)}
                            
                            />
                        </p>
                        <p>
                            <label htmlFor=''>Puedes incluir uno o mas temperamentos: </label>
                            <select
                                name='temperamento'
                                value={nuevodog.temperamento} 
                                onChange={(e) => onInputChange(e)}>
                                    {
                                        temperamentosdog?.map((temp,i) => (
                                            <option key={i} value={temp.id}>{temp.name}</option>
                                        ))
                                    }
                            </select>
                        </p>
                      </div>
                    <input type='submit' />
                </form>
            </div>
        </section>
    )
}

export default CrearDog
