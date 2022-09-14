import {combineReducers} from 'redux';
import { isAuth } from './reducers/auth';
import {setDailyDetail} from './reducers/setDailyDetial';
import {getWalletAddress} from './reducers/getWalletAddress'
import {depositRes} from './reducers/depositResponse'
import {planOneData} from './reducers/planOneData';
import {planTwoData} from './reducers/planTwoData';
import {planThreeData} from './reducers/planThreeData';
import {planOneAllData} from './reducers/allData/planOne';
import {planTwoAllData} from './reducers/allData/planTwo';
import {planThreeAllData} from './reducers/allData/planThree';
import {requestResponse} from './reducers/requestsData/requestReponse';
import {planOneWithdrawRequests,
    planTwoWithdrawRequests,
    planThreeWithdrawRequests
} from './reducers/requestsData/withdrawRequests';
import {setSendData} from './reducers/sendData';
import {adminAddress} from './reducers/adminAddress';
import {allUsersData} from './reducers/allData/allusers'
const allReducer = combineReducers({
    isAuth : isAuth,
    dailyDetail:setDailyDetail,
    wallletAddress:getWalletAddress,
    depRes:depositRes,
    planOneData:planOneData,
    planTwoData:planTwoData,
    planThreeData:planThreeData,
    planOneAllData:planOneAllData,
    planTwoAllData:planTwoAllData,
    planThreeAllData:planThreeAllData,
    requestResponse:requestResponse,
    planOneWithdrawRequests:planOneWithdrawRequests,
    planTwoWithdrawRequests:planTwoWithdrawRequests,
    planThreeWithdrawRequests:planThreeWithdrawRequests,
    setSendData:setSendData,
    adminAddress:adminAddress,
    allUsers:allUsersData

});

export default allReducer