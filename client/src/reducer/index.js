import {
    GET_DOGS,
    GET_DOGS_DETAIL,
    SEARCH_DOGS,
    TEMPERAMENTOS,
    CREATE_DOG,
    CREATE_TEMPERAMENTO,
} from '../actions/actionsConst';

const stateInitial = {
    dogs: [],
    dogsDetail: undefined,
    dogsSearch:undefined,
    temperamentos:undefined,
    dogsAdd:undefined,
}

function reducer (state=stateInitial, action) {
    //console.log('HOLA...SOY EL NUEVO TEMPERAMENTO CREADO',action.payload)
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload
            }
        case GET_DOGS_DETAIL:
            return {
                ...state,
                dogsDetail:action.payload
            }
        case SEARCH_DOGS:
            return {
                ...state,
                dogsSearch: action.payload
            }
        case TEMPERAMENTOS:
            return {
                ...state,
                temperamentos:action.payload
            }
        case CREATE_DOG:
            return{
                ...state,
                dogsAdd: action.payload

            }
        case CREATE_TEMPERAMENTO:
            return {
                ...state,
                temperamentos:[...state,action.payload]
            }
        default:
            return state;
    }
}

export default reducer;