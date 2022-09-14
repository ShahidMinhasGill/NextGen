import types from "../types";
let initialSatate={
    adminAddress:null
}
export const adminAddress = (state=initialSatate, {type, payload}) => {

    switch (type) {
        case types.getAdminAddress:
        
          return {
            ...state,
            adminAddress:payload
          }
    
        default:
           return{...state}
    }
}