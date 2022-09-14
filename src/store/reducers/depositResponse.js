import types from '../types';

let initialState = {
    resMessage:""
}

export const depositRes = (state=initialState, {type, payload}) => {

    switch (type) {
        case types.depositResponse:
            return {
                ...state,
                resMessage:payload?.message
            }
    
        default:
            return{
                ...state
            }
    }
}