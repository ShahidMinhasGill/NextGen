import types from '../types';

let initialState = {
    daily1: 0,
    daily2: 0,
    daily3: 0,
    TVL: 0,
}

export const setDailyDetail = (state = initialState, {
    type,
    payload
}) => {
    switch (type) {
        case types.detail:
            return {
                ...state,
                TVL: payload?.TVL,
                    daily1: payload?.daily1,
                    daily2: payload?.daily2,
                    daily3: payload?.daily3
            }
            default:
                return {
                    ...state
                }
    }
}