import types from "../types";

let initialState = {
    depositedPlanOne:0,
    balancePlanOne:0
}

export const planOneData = (state = initialState, {type, payload}) => {
    switch(type){
        case types.planOneData:
            return {
                ...state,
                depositedPlanOne:payload?.amount,
                balancePlanOne:parseFloat(payload?.balance).toFixed(2)
            };
        default : return {...state}
    }
}

