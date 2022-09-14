import types from "../../types";

let initialState = {
    planThreeAllData:[]
}


export const planThreeAllData = (state=initialState, {type, payload}) => {

    switch(type){
        case types.planThreeAllData:
            return{
                ...state,
                planThreeAllData:payload
            }
        default : return {...state}
    }
}