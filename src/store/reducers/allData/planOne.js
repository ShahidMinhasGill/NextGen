import types from "../../types";

let initialState = {
    planOneAllData:[]
}


export const planOneAllData = (state=initialState, {type, payload}) => {

    switch(type){
        case types.planOneAllData:
            return{
                ...state,
                planOneAllData:payload
            }
        default : return {...state}
    }
}