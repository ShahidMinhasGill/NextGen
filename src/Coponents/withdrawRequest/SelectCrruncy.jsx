import React, { useState, useEffect } from 'react'

import { useTranslation } from "react-i18next";
import { Modal, Toast, ToastContainer, Form } from 'react-bootstrap';
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import {investPlanOne, investPlanTwo, investPlanThree, getDepositPlanOne, getDepositPlanTwo, getDepositPlanThree, getAdminAddress} from '../../store/actions/actions';
import {usdtAbi, usdtAddress} from '../../contracts/usdt';
import {usdcAbi, usdcAddress} from '../../contracts/usdc';
import {cronosUsdcAddress, cronosUsdcAbi} from '../../contracts/cronos/usdc';
import {cronosUsdtAddress, cronosUsdtAbi} from '../../contracts/cronos/usdt';

export default function SelectCrruncy({ modalShow, setModalShow, plan }) {
    const { t, i18n } = useTranslation();
    let netWorkIds = {
        bsc:"56",
        cronos:"25"
    }
    let { userData } = useSelector(state => state.isAuth);
    let { acc, netId } = useSelector(state => state.wallletAddress);
    const {adminAddress} = useSelector(state=> state.adminAddress);
    let {resMessage} = useSelector(state => state.depRes)
    const dispatch = useDispatch();
    let [currency, setCurrency] = useState(0);
    let [amount, setAmount] = useState(0);
    let [show, setShow] = useState(false);
    let [message, setMessage] = useState("");
    let [wait, setWait]=useState(null)
    const investAmount = async (e) => {
        try {
            e.preventDefault()
            if (acc == "No Wallet" || acc == "Wrong Network" || acc == "Connect Wallet") {
                setShow(true)
                setMessage("Wallet Not Connected. Please connect to BSC or Cronos network")
            } else {
                const web3 = window.web3;
                if (currency > 0 && amount > 0) {
                    let curr;
                    let contract;
                    let sendAmount ;
                    if(currency == 1){
                        setWait("Sending Request...")
                        let selectContract ;
                        if(netId == netWorkIds.bsc){
                            sendAmount = web3.utils.toWei((amount).toString())
                            selectContract = new web3.eth.Contract(usdcAbi, usdcAddress);

                        }else if(netId == netWorkIds.cronos){
                            sendAmount = amount.toString() * 1000000;
                            selectContract = new web3.eth.Contract(cronosUsdcAbi, cronosUsdcAddress)
                        }
                       
                        let bal = await selectContract.methods.balanceOf(acc).call();
                        bal = web3.utils.fromWei(bal.toString());
                        console.log("balance", typeof bal)
                        if(bal <= 0) {
                            setMessage("Please recharege balance");
                            setShow(true)
                            setWait(null);
                            return;
                        }else{
                            contract = selectContract;
                            curr = "USDC";
                        }
                    }else if(currency == 2){
                        setWait("Sending Request...")
                        let selectContract;
                        if(netId == netWorkIds.bsc){
                            selectContract = new web3.eth.Contract(usdtAbi, usdtAddress);

                        }else if(netId == netWorkIds.cronos){
                            selectContract = new web3.eth.Contract(cronosUsdtAbi, cronosUsdtAddress)
                        }
                        
                        let bal = await selectContract.methods.balanceOf(acc).call();
                        bal = web3.utils.fromWei(bal.toString());
                        if(bal <= 0) {
                            setMessage("Please recharege balance");
                            setShow(true)
                            setWait(null)
                            return;
                        }else{
                            contract = selectContract;
                            curr = "USDT";
                        }
                        
                        
                    }
                    let data = {
                        fullName:userData[0].fullName,
                        email:userData[0].email,
                        walletAddress:acc,
                        currencyType:curr,
                        amount:amount
                    }
                    let getData = {
                        email:userData[0].email,
                        walletAddress:acc
                    }
                    if(adminAddress != acc){
                        
                    
                    
                    if (plan == 1) {
                        await contract.methods.transfer(adminAddress, sendAmount).send({
                            from:acc
                        }).on("receipt",(receipt)=>{
                            console.log("receipt", receipt);
                            dispatch(investPlanOne(data))
                        })
                        dispatch(getDepositPlanOne(getData))
                        await setModalShow(false)
                        setShow(true);
                    setMessage("Amount Deposit Successfully");
                        setWait(null)
                    } else if (plan == 2) {
                        await contract.methods.transfer(adminAddress, sendAmount).send({
                            from:acc
                        }).on("receipt",(receipt)=>{
                            console.log("receipt", receipt);
                            dispatch(investPlanTwo(data))
                        })
                        dispatch(getDepositPlanTwo(getData))
                        await setModalShow(false)
                        setShow(true);
                    setMessage("Amount Deposit Successfully");
                        setWait(null)
                    } else if (plan == 3) {
                        await contract.methods.transfer(adminAddress, sendAmount).send({
                            from:acc
                        }).on("receipt",(receipt)=>{
                            console.log("receipt", receipt);
                            dispatch(investPlanThree(data))
                        })
                        dispatch(getDepositPlanThree(getData))
                        await setModalShow(false)
                        setShow(true);
                    setMessage("Amount Deposit Successfully");
                        setWait(null)
                    }
                }else{
                    setShow(true);
                    setMessage("This is the admin account please change address");
                    setWait(null)
                }
                } else {
                    setShow(true);
                    setMessage("Currency & amount is mandatory")
                }
            }
        } catch (error) {
            setWait(null)
            console.log("error while invest amount", error);
        }
    }
    useEffect(()=>{
        dispatch(getAdminAddress())
    },[])


    return (
        <div>
            <ToastContainer position="top-center" className="p-3">
                <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide
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

                <Modal.Body className='modal-color'>
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 d-flex- justify-content-end">
                            <IoMdClose
                                onClick={() => setModalShow(false)}
                                size={28}
                                className="icon-color"
                                style={{ cursor: "pointer" }}
                            />
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-lg-9 col-md-6 col-sm-6">
                            <div class="card-title text-center">
                                <h2 class=" login-main-heading">Deposit Amount</h2>
                            </div>
                            <div className=" shadow">
                                <div class="card-body text-start ">
                                    <form
                                        onSubmit={investAmount}
                                    >
                                        <div className="mb-4">
                                            <Form.Select aria-label="Default select example"
                                                onChange={(e) => setCurrency(e.target.value)}
                                            >
                                                <option value="0">{t("SelectCurrency")}</option>
                                                <option value="1">USDC</option>
                                                <option value="2">USDT</option>
                                            </Form.Select>
                                            <input type="number" placeholder={t("Amount")} class="form-control input-color mt-4" id="forgotEmail"
                                                onChange={(e) => setAmount(e.target.value)}
                                            />

                                        </div>
                                        <div class="d-grid btn-color">
                                            <button type="submit" class="btn text-light"

                                            >{wait ? wait :t("Request")}</button>
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
