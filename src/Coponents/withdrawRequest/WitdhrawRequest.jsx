import React, { useState, useRef, useEffect } from 'react'

import { useTranslation } from "react-i18next";
import { Modal, Toast, ToastContainer, Form } from 'react-bootstrap';
import { IoMdClose } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { requestPlanOne, requestPlanTwo, requestPlanThree } from '../../store/actions/actions'
export default function WitdhrawRequest({ modalShow, setModalShow }) {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch()
    let { depositedPlanOne, balancePlanOne } = useSelector(state => state.planOneData);
    let { depositedPlanTwo, balancePlanTwo } = useSelector(state => state.planTwoData);
    let { depositedPlanThree, balancePlanThree } = useSelector(state => state.planThreeData);
    let { userData } = useSelector(state => state.isAuth);
    let { acc } = useSelector(state => state.wallletAddress);
    let [isShow, setIsShow] = useState(false);
    let [message, setMessage] = useState("");
    let balValue = useRef()
    let address = useRef();
    let [plan, setPlan] = useState(0)
    const selectPlan = (e) => {
        if (e.target.value == 1) {
            setPlan(1)
            balValue.current.value = balancePlanOne;
        } else if (e.target.value == 2) {
            setPlan(2)
            balValue.current.value = balancePlanTwo;
        } else if (e.target.value == 3) {
            setPlan(3)
            balValue.current.value = balancePlanThree;
        }
    }

    const withRequest = (e) => {
        e.preventDefault()
        console.log("address", typeof address.current.value);
        let userAddress = address.current.value;
        if (plan > 0 && userAddress != "" && userAddress != undefined && userAddress != null) {
            let data = {
                email: userData[0].email,
                walletAddress: userAddress
            }
            if (plan == 1) {
                dispatch(requestPlanOne(data))
                setMessage("Request submitted successfully");
                setModalShow(false)
                setIsShow(true)
            } else if (plan == 2) {
                dispatch(requestPlanTwo(data))
                setMessage("Request submitted successfully");
                setModalShow(false)
                setIsShow(true)
            } else if (plan == 3) {
                dispatch(requestPlanThree(data))
                setMessage("Request submitted successfully");
                setModalShow(false)
                setIsShow(true)
            }
        } else {
            setMessage("Plan and wallet Address are mandatory");
            setIsShow(true)
        }
    }

    return (
        <div>
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
                        <ToastContainer position="top-center" className="p-3 mt-5">
                            <Toast onClose={() => setIsShow(false)} show={isShow} delay={3000} autohide
                                bg="info"
                            >
                                <Toast.Body>{message}</Toast.Body>
                            </Toast>
                        </ToastContainer>
                        <div class="col-lg-9 col-md-6 col-sm-6">
                            <div class="card-title text-center">
                                <h2 class=" login-main-heading">{t("withdrawRequest")}</h2>
                            </div>
                            <div className=" shadow">
                                <div class="card-body text-start ">
                                    <form onSubmit={withRequest}>
                                        <div className="mb-4">
                                            <Form.Select aria-label="Default select example"
                                                onChange={selectPlan}
                                            >
                                                <option value="0">Select Plan</option>
                                                {
                                                    depositedPlanOne && <option value="1">{t("Pioneer")}</option>
                                                }
                                                {
                                                    depositedPlanTwo && <option value="2">{t("advanced")}</option>
                                                }
                                                {
                                                    depositedPlanThree && <option value="3">{t("hero")}</option>
                                                }
                                            </Form.Select>
                                            {/* <label for="username" className="form-label form-heading lable-text">{t('email')}</label> */}
                                            <input type="number" ref={balValue} disabled placeholder={t("Amount")} class="form-control input-color mt-4" id="forgotEmail"

                                            />
                                            <input type="text" ref={address} placeholder="Enter Wallet Address" class="form-control input-color mt-4" id="forgotEmail" />

                                        </div>
                                        <div class="d-grid btn-color">
                                            <button type="submit" class="btn text-light">{t("Request")}</button>
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
