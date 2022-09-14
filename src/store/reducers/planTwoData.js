import types from "../types";

let initialState = {
    depositedPlanTwo:0,
    balancePlanTwo:0
}

export const planTwoData = (state = initialState, {type, payload}) => {
    switch(type){
        case types.planTwoData:
            return {
                ...state,
                depositedPlanTwo:payload?.amount,
                balancePlanTwo:parseFloat(payload?.balance).toFixed(2)
            };
        default : return {...state}
    }
}