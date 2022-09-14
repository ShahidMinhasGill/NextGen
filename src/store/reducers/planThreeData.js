import types from "../types";

let initialState = {
    depositedPlanThree:0,
    balancePlanThree:0
}

export const planThreeData = (state = initialState, {type, payload}) => {
    switch(type){
        case types.planThreeData:
            return {
                ...state,
                depositedPlanThree:payload?.amount,
                balancePlanThree:parseFloat(payload?.balance).toFixed(2)
            };
        default : return {...state}
    }
}