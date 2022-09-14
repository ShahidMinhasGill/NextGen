import types from "../types";
let initialState = {
    success: false,
    message: "",
    isShow: false,
    isAdmin:false,
    isUser:false,
    userData: []
}

export const isAuth = (state = initialState, {
    type,
    payload
}) => {

    switch (type) {
        case types.login:
            if (payload.success) {
                return {
                    ...state,
                    success:payload.success,
                    isUser:payload.success,
                    isShow:true,
                    message:payload.message,
                    isAdmin:payload.isAdmin,
                    userData:payload.user,
                }
            } else {
                return {
                    ...state,
                    success:payload.success,
                    isShow:true,
                    message:payload.message
                }
            }
            default:
                return {
                    ...state
                }
    }
}