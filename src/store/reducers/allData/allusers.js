import types from "../../types";

let initialState = {
    allUsers:[]
}

export const allUsersData = (state= initialState, {type, payload})=>{

    switch (type) {
        case types.allUsers:
            return{
                ...state,
                allUsers:payload
            }
    
        default:
            return{
                ...state
            }
    }
}