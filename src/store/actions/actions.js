import axios from 'axios';
import types from '../types';
import {
  loadWeb3
} from '../../Coponents/api'
const baseUrl = process.env.REACT_APP_BASE_URL;
export const userLogin = (user) => async (dispatch) => {
  let {
    data
  } = await axios.post(`${baseUrl}/login`, user);
  console.log("login Action call", data);
  dispatch({
    type: types.login,
    payload: data,
  });
};

export const connectWallet = (op) => async (dispatch) => {
  let address = await loadWeb3(op);
  dispatch({
    type: types.connectWallet,
    payload: address
  })
}

export const getDailyValue = () => async (dispatch) => {
  let {
    data
  } = await axios.get(`${baseUrl}/detail`);

  dispatch({
    type: types.detail,
    payload: data.data[0]
  })
}

export const updateDailyValue = (data) => async (dispatch) => {
  await axios.put(`${baseUrl}/updateDetail`, data);
  getDailyValue()
}

export const updateTVL = (data) => async (dispatch) => {
  await axios.put(`${baseUrl}/updateTVL`, data);
  getDailyValue();
}
export const getAllUsers = () => async (dispatch) => {
  let res =await axios.get(`${baseUrl}/getAllUsers`);
  dispatch({
    type:types.allUsers,
    payload:res.data.data
  })
}

export const investPlanOne = (data) => async (dispatch) => {
  let res = await axios.post(`${baseUrl}/depositPlanOne`, data);
  dispatch({
    type: types.depositResponse,
    payload: res.data
  })
}

export const investPlanTwo = (data) => async (dispatch) => {
  let res = await axios.post(`${baseUrl}/depositPlanTwo`, data)
  dispatch({
    type: types.depositResponse,
    payload: res.data
  })
}
export const investPlanThree = (data) => async (dispatch) => {
  let res = await axios.post(`${baseUrl}/depositPlanThree`, data)
  dispatch({
    type: types.depositResponse,
    payload: res.data
  })
}

export const getDepositPlanOne = (data) => async (dispatch) => {

  let res = await axios.get(`${baseUrl}/planone?email=${data.email}`);
  console.log("res", res);
  dispatch({
    type: types.planOneData,
    payload: res.data.data,
  })
}
export const allDepositsPlanOne = () => async (dispatch) => {
  let res = await axios.get(`${baseUrl}/getAllDepositPlanOne`);
  dispatch({
    type:types.planOneAllData,
    payload:res.data.data
  })
}

export const getDepositPlanTwo = (data) => async (dispatch) => {

  let res = await axios.get(`${baseUrl}/plantwo?email=${data.email}`);
  dispatch({
    type: types.planTwoData,
    payload: res.data.data,
  })
}

export const allDepositsPlanTwo = () => async (dispatch) => {
  let res = await axios.get(`${baseUrl}/getDeposistsPlanTwoAll`);
  dispatch({
    type:types.planTwoAllData,
    payload:res.data.data
  })
}

export const getDepositPlanThree = (data) => async (dispatch) => {

  let res = await axios.get(`${baseUrl}/planthree?email=${data.email}`);
  dispatch({
    type: types.planThreeData,
    payload: res.data.data,
  })
}

export const allDepositsPlanThree = () => async (dispatch) => {
  let res = await axios.get(`${baseUrl}/getDeposistsPlanThreeAll`);
  dispatch({
    type:types.planThreeAllData,
    payload:res.data.data
  })
}

export const requestPlanOne = (data) => async (dispatch) => {
 let res = await axios.patch(`${baseUrl}/requestplanone`, data)
  dispatch({
    type:types.requestResponse,
    payload:res.data
  })
}

export const requestPlanTwo = (data) => async (dispatch) => {
  let res = await axios.patch(`${baseUrl}/requestplantwo`, data)
  dispatch({
    type:types.requestResponse,
    payload:res.data
  })
}

export const requestPlanThree = (data) => async (dispatch) => {
  // console.log("data in reques", data);
 let res = await axios.patch(`${baseUrl}/requestplanthree`, data);
 dispatch({
  type:types.requestResponse,
  payload:res.data
})
}

export const allRequestsPlanOne = () => async (dispatch) => {
  let res = await axios.get(`${baseUrl}/getPlanOneRequests`)
  dispatch({
    type:types.planOneAllRequest,
    payload:res.data.data
  })
}

export const allRequestsPlanTwo = () => async (dispatch) => {
  let res = await axios.get(`${baseUrl}/getPlanTwoRequests`)
  dispatch({
    type:types.planTwoAllRequest,
    payload:res.data.data
  })
}

export const allRequestsPlanThree = () => async (dispatch) => {
  let res = await axios.get(`${baseUrl}/getPlanThreeRequests`)
  dispatch({
    type:types.planThreeAllRequest,
    payload:res.data.data
  })
}

export const sendBackAmountPlanOne = (data) => async () => {
  let res = await axios.patch(`${baseUrl}/withdrawplanone`, data)
}

export const sendBackAmountPlanTwo = (data) => async () => {
  let res = await axios.patch(`${baseUrl}/withdrawplantwo`, data)
}

export const sendBackAmountPlanThree = (data) => async () => {
  let res = await axios.patch(`${baseUrl}/withdrawplanthree`, data)
}

export const sendData = (data) => (dispatch) => {

  dispatch({
    type:types.sendData,
    payload:data
  })
}

export const changeAdminAddrss = (data) => async (dispatch) =>{
  let res =await axios.post(`${baseUrl}/changeAdminAddress`, data);
}
export const getAdminAddress = () => async (dispatch) => {
  let res =await axios.get(`${baseUrl}/getAdminAddress`);
  dispatch({
    type:types.getAdminAddress,
    payload:res.data?.data[0].address
  })
}


export const adminUpdateUserPlanOne = (data) => async (dispatch) => {
  let res = await axios.patch(`${baseUrl}/adminUpdateUserPlanOne`, data);
  dispatch({
    type: types.depositResponse,
    payload: res.data
  })
}

export const adminUpdateUserPlanTwo = (data) => async (dispatch) => {
  let res = await axios.patch(`${baseUrl}/adminUpdateUserPlanTwo`, data);
  dispatch({
    type: types.depositResponse,
    payload: res.data
  })
}

export const adminUpdateUserPlanThree = (data) => async (dispatch) => {
  let res = await axios.patch(`${baseUrl}/adminUpdateUserPlanThree`, data);
  dispatch({
    type: types.depositResponse,
    payload: res.data
  })
}