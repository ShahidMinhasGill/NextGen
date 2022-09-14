import types from "../../types";

let initialState = {
    requestMessage:"",
    requestSuccess:false
}

export const requestResponse = (state=initialState, {type, payload}) => {

switch (type) {
    case types.requestResponse:
        return {
            ...state,
            requestMessage:payload?.message,
            requestSuccess:payload?.success

        }
    default:
        return{...state};
}
}