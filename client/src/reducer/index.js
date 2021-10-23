import {
    GET_DOGS,
    GET_DOGS_DETAIL,
    SEARCH_DOGS,
    TEMPERAMENTOS,
    CREATE_DOG,
    CREATE_TEMPERAMENTO,
    ORDENAR_NAME,
} from '../actions/actionsConst';

const stateInitial = {
    allDogs:[],
    dogs: [],
    dogsDetail: undefined,
    dogsSearch:undefined,
    temperamentos:undefined,
    dogsAdd:undefined,
}

function reducer (state=stateInitial, action) {
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                allDogs:action.payload
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
                temperamentos:action.payload
            }
        case ORDENAR_NAME:
            let sortedArray = action.payload === 'asc' ?
            state.dogs.sort(function(a,b){
                if(a.name > b.name){
                    return 1;
                }
                if(b.name > a.name){
                    return -1;
                }
                return 0;
            })
            : state.dogs.sort(function(a,b){
                if(a.name > b.name){
                    return -1;
                }
                if(b.name > a.name){
                    return 1;
                }
                return 0;
            })

            return {
                ...state,
                dogs:sortedArray
            }
            
            
        default:
            return state;
    }
}

export default reducer;