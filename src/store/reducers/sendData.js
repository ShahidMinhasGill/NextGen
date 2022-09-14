import types from "../types";

let initialSatate = {

        email:"",
        walletAddress:"",
        balance:"",
        currencyType:""

}


export const setSendData = (state = initialSatate, { type,  payload}) => {

    switch (type) {
        case types.sendData:
            // console.log("payload", payload.email);
         return{
            ...state,
                email:payload.email,
        walletAddress:payload.walletAddress,
        balance:payload.balance,
        currencyType:payload.currencyType
         }
    
        default:
            return{...state};
    }
}