import {
    GET_DOGS,
    GET_DOGS_DETAIL,
    SEARCH_DOGS,
    TEMPERAMENTOS,
    CREATE_DOG,
    CREATE_TEMPERAMENTO,
    ORDENAR_ASC,
    ORDENAR_DESC,
    ORDENAR_MAS_PESADO,
    ORDENAR_MAS_LIVIANO
} from './actionsConst';
import axios from 'axios';


export function getDogs () {
    return function(dispatch){
        return axios.get('http://localhost:3001/api/dogs')
        .then(response => {
            dispatch({
                type:GET_DOGS,
                payload:response.data
            })
        })
    }
}

export function removeSearchDogs(){
    return {
        type:SEARCH_DOGS,
        payload:undefined
    }
}

export function clearDog(){
    return {
        type:CREATE_DOG,
        payload:undefined
    }
}

export function getDogsDetail (id){
    return function(dispatch){
        return axios.get(`http://localhost:3001/api/dogs/${id}`)
        .then(response => {
            dispatch({
                type:GET_DOGS_DETAIL,
                payload:response.data,
            })
        }).catch(err => {
            if(err.response?.status !== 404) alert(`No existe una raza de perro asignado al id: ${id} `)
        })
    }
}

export function searchDogs(name){
    return function(dispatch){
        return axios.get(`http://localhost:3001/api/dogs-name?name=${name}`)
        .then(response => {
            dispatch({
                type:SEARCH_DOGS,
                payload:response.data
            })
        }).catch(err => {
            if(err.response?.status !== 404) alert(`No existe una raza de perro llamada: ${name}`)
        })
    }
}

export function temperamentosDogs(){
    return function(dispatch){
        return axios.get('http://localhost:3001/api/temperament')
        .then(response => {
            dispatch({
                type:TEMPERAMENTOS,
                payload:response.data
            })
        }).catch(err => {
            if(err.response?.status !== 404) alert('No se cargaron los temperamentos')
        })
    }
}

export function createDog(datos){
    return function(dispatch){
        return axios.post('http://localhost:3001/api/dog',datos)
        .then(response => {
            dispatch({
                type:CREATE_DOG,
                payload:response.data
            })
        })
    }
}

export function createTemp(name){
    console.log('soy lo que llega del dispatch de crear nuevo temp',name)
    return function(dispatch){
        return axios.post('http://localhost:3001/api/createmperamento',name)
        .then(response => {
            dispatch({
                type:CREATE_TEMPERAMENTO,
                payload:response.data
            })
        })
    }
}

// export function getDogsDetail(idRaza){
//     return function(dispatch){
//         return axios.get(`http://localhost:3001/api/dogs/${idRaza}`)
//         .then(response => {
//             dispatch({
//                 type:GET_DOGS_DETAIL,
//                 payload:response.data
//             })
//         })
//     }
// }

