import React, { useState, useEffect } from 'react'

import { useTranslation } from "react-i18next";
import { Modal, Toast, ToastContainer, Form } from 'react-bootstrap';
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import {sendBackAmountPlanOne, sendBackAmountPlanTwo, sendBackAmountPlanThree,
    allRequestsPlanOne, allRequestsPlanTwo, allRequestsPlanThree,
    getAdminAddress
} from '../../../store/actions/actions';
import {usdtAbi, usdtAddress} from '../../../contracts/usdt';
import {usdcAbi, usdcAddress} from '../../../contracts/usdc';
import {cronosUsdtAbi, cronosUsdtAddress} from '../../../contracts/cronos/usdt';
import {cronosUsdcAbi, cronosUsdcAddress} from '../../../contracts/cronos/usdc';
export default function SendBackAmount({ modalShow, setModalShow, plan}) {
    const { t, i18n } = useTranslation();
    let { userData } = useSelector(state => state.isAuth);
    let { acc,netId } = useSelector(state => state.wallletAddress);
    let {resMessage} = useSelector(state => state.depRes);
    let {email, walletAddress, balance, currencyType} = useSelector(state => state.setSendData);
    const {adminAddress} = useSelector(state=> state.adminAddress);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAdminAddress())
    },[])
    const [message, setMessage]=useState("")
    const [isShow, setIsShow]=useState(false);
    let netWorkIds = {
        bsc:"56",
        cronos:"97"
    }
const sendAmount = async (e) => {
    try {
        e.preventDefault();
        if (acc == "No Wallet" || acc == "Wrong Network" || acc == "Connect Wallet") {
            console.log("acc", acc);
            setMessage("Wallet not connected");
            setIsShow(true)
        }else{
            let contract;
            const web3 = window.web3;
            if(adminAddress != acc){
                console.log("adminAddress", adminAddress);
                console.log("adminAddress", acc);

           
                    if(currencyType === "USDC"){
                        let selectContract ;
                        let sendAmount ;
                        if(netId == netWorkIds.bsc){
                            sendAmount = web3.utils.toWei((balance).toString())
                            selectContract = new web3.eth.Contract(usdcAbi, usdcAddress);
                        }else if(netId == netWorkIds.cronos){
                            sendAmount = (balance).toString() * 1000000;
                            selectContract = new web3.eth.Contract(cronosUsdcAbi, cronosUsdcAddress);
                        }
                        let bal = await selectContract.methods.balanceOf(acc).call();
                        bal = web3.utils.fromWei(bal.toString());
                        if(bal <= 0) {
                            setMessage("Please recharege balance");
                            setIsShow(true)
                            // setWait(null);
                            return;
                        }else{
                            contract = selectContract;
                        }
                    }else if(currencyType === "USDT"){
                        let selectContract ;
                        if(netId == netWorkIds.bsc){

                            selectContract = new web3.eth.Contract(usdtAbi, usdtAddress);
                        }else if(netId == netWorkIds.cronos){
                            selectContract = new web3.eth.Contract(cronosUsdtAbi, cronosUsdtAddress);
                        }
                  
                        let bal = await selectContract.methods.balanceOf(acc).call();
                        bal = web3.utils.fromWei(bal.toString());
                        if(bal <= 0) {
                            setMessage("Please recharege balance");
                            setIsShow(true)
                            // setWait(null);
                            return;
                        }else{
                            contract = selectContract;
                        }
                    }
                    let data = {
                        email:email,
                        walletAddress:walletAddress
                    }

                    if (plan == 1) {
                        await contract.methods.transfer(walletAddress, sendAmount).send({
                            from:acc
                        }).on("receipt",(receipt)=>{
                            console.log("receipt", receipt);
                            dispatch(sendBackAmountPlanOne(data))
                        })
                        dispatch(allRequestsPlanOne())
                        await setModalShow(false)
                    } else if (plan == 2) {
                        console.log("plan 2");
                        await contract.methods.transfer(walletAddress, sendAmount).send({
                            from:acc
                        }).on("receipt",(receipt)=>{
                            console.log("receipt", receipt);
                            dispatch(sendBackAmountPlanTwo(data))
                        })
                        dispatch(allRequestsPlanTwo())
                        await setModalShow(false)
                    } else if (plan == 3) {
                        await contract.methods.transfer(walletAddress,sendAmount).send({
                            from:acc
                        }).on("receipt",(receipt)=>{
                            console.log("receipt", receipt);
                            dispatch(sendBackAmountPlanThree(data))
                        })
                        dispatch(allRequestsPlanThree())
                        await setModalShow(false)
                    }
                }else{
                    alert("same address not accepted")
                }
        }
    } catch (error) {
        setModalShow(false)
        console.error("error while send amout", error);
    }
}


    return (
        <div>
            <ToastContainer position="top-center" className="p-3">
                <Toast onClose={() => setIsShow(false)} show={isShow} delay={3000} autohide
                    bg="danger"
                >
                    <Toast.Body>{message}</Toast.Body>
                </Toast>
            </ToastContainer>
            <Modal
                show={modalShow} onHide={() => {
                    setModalShow(false)
                }}

                aria-labelledby="contained-modal-title-vcenter"
                centered
            >

                <Modal.Body className='modal-color' style={{ backgroundColor:"#1B1E30"}}>
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 d-flex- justify-content-end">
                            <IoMdClose
                                onClick={() => setModalShow(false)}
                                size={28}
                                className="icon-color"
                                style={{ cursor: "pointer", color: "white" }}
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div class="col-lg-9 col-md-6 col-sm-6">
                            <div className="card-title text-center">
                                <h2 className=" login-main-heading text-white">Send Amount</h2>
                            </div>
                            <div className=" shadow" style={{backgroundColor: "#2D3252"}}>
                                <div className="card-body text-start ">
                                    <form
                                        onSubmit={sendAmount}
                                    >
                                        
                                            
                                        <div className="mb-4">
                                        <label for="email" className="form-label form-heading lable-text text-white">User Email</label>
                                        <input type="text" disabled value={email}  className="form-control input-color" id="username" style={{backgroundColor: "#1B1E30"}}/>
                                        </div>
                                        <div className="mb-4">
                                        <label for="Wallet Address" className="form-label form-heading lable-text text-white">Wallet Address</label>
                                        <input type="text" disabled value={walletAddress.substring(0, 5) + "..." + walletAddress.substring(walletAddress.length - 5)}  className="form-control input-color" id="username" style={{backgroundColor: "#1B1E30"}}
                                        />
                                        </div>
                                        <div className="mb-4">
                                        <label for="balance" className="form-label form-heading lable-text text-white">Balance</label>
                                        <input type="text" disabled value={balance}  className="form-control input-color" id="username" style={{backgroundColor: "#1B1E30"}}
                                        />
                                        </div>
                                        
                                        <div class="d-grid btn-color">
                                            <button type="submit" class="btn text-light"

                                            >{t("Request")}</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
