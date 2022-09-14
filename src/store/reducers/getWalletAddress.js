import types from '../types';

let initialState = {
    acc:"Connect Wallet",
    netId:""
};

export const getWalletAddress = (state=initialState, {type, payload}) => {

    switch(type){
        case types.connectWallet :
            return {
                ...state,
                acc:payload.accounts,
                netId:payload.netId
            }
        default : return{...state}
    }

}