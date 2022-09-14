import types from '../../types';

let initialState = {
    planOneRequest:[],
    planTwoRequest:[],
    planThreeRequest:[]
}

export const planOneWithdrawRequests = (state=initialState, {type, payload}) => {

    switch (type) {
        case types.planOneAllRequest:
         return {
            ...state,
            planOneRequest:payload
         }
    
        default:
            return { ...state};
    }    
}

export const planTwoWithdrawRequests = (state=initialState, {type, payload}) => {

    switch (type) {
        case types.planTwoAllRequest:
         return {
            ...state,
            planTwoRequest:payload
         }
    
        default:
            return { ...state};
    }    
}

export const planThreeWithdrawRequests = (state=initialState, {type, payload}) => {

    switch (type) {
        case types.planThreeAllRequest:
         return {
            ...state,
            planThreeRequest:payload
         }
    
        default:
            return { ...state};
    }    
}