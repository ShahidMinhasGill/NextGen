import types from "../../types";

let initialState = {
    planTwoAllData:[]
}


export const planTwoAllData = (state=initialState, {type, payload}) => {

    switch(type){
        case types.planTwoAllData:
            return{
                ...state,
                planTwoAllData:payload
            }
        default : return {...state}
    }
}