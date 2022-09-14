import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'
import { Badge, ToastContainer, Toast } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import SelectCrruncy from '../withdrawRequest/SelectCrruncy';
import { useSelector, useDispatch } from 'react-redux';
import Hero from '../../Docoments/Hero.pdf';
import Pioneer from '../../Docoments/Pioneer.pdf';
import Advanced from '../../Docoments/Advanced.pdf';
import { getDailyValue, getDepositPlanOne, getDepositPlanTwo, getDepositPlanThree } from '../../store/actions/actions';
export default function Dashboard() {
    let { userData } = useSelector(state => state.isAuth)
    let { acc } = useSelector(state => state.wallletAddress);
    let { daily1, daily2, daily3 } = useSelector(state => state.dailyDetail);
    let { depositedPlanOne, balancePlanOne } = useSelector(state => state.planOneData);
    let { depositedPlanTwo, balancePlanTwo } = useSelector(state => state.planTwoData);
    let { depositedPlanThree, balancePlanThree } = useSelector(state => state.planThreeData);
    let { requestMessage, requestSuccess } = useSelector(state => state.requestResponse);
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation();
    const [modalShow, setModalShow] = useState(false);
    const [plan, setPlan] = useState(null);
    const [message, setMessage] = useState("")
    const deposit = () => {
        window.open(
            "https://global.transak.com/", "_blank");
    }

    const planUserData = async () => {
        let data = {
            email: userData[0].email
        }
        dispatch(getDepositPlanOne(data))
        dispatch(getDepositPlanTwo(data));
        dispatch(getDepositPlanThree(data));

    }
    useEffect(() => {
        setInterval(() => {
            planUserData()
        }, 5000)
        planUserData()
    }, [])

    useEffect(() => {
        dispatch(getDailyValue())
    }, [])
    return (
        <div className="fluid-container img-fluid bgimg1">
            <div className="container">

                <div className='row d-flex justify-content-center mb-3'>
                    <div className="col-md-12  col-10 pb-3  dashboard-border shadow">
                        <div className='row d-flex justify-content-center pt-3 pb-3'>
                            <div className="col-lg-2 col-11">
                                <div>
                                    <SelectCrruncy modalShow={modalShow} setModalShow={setModalShow} plan={plan}

                                    />
                                </div>
                                <img role='button' onClick={() => {
                                    setModalShow(true)
                                    setPlan(1)
                                }} src="next-gem-logo.png" alt="" className='next-gem-logo' />
                            </div>
                            <div className="col-lg-2 col-10 flex-column text-lg-start media-query " >
                                <span id='dashboard-heading'>{t("Pioneer")}</span><br />

                                {/* <span id=' dashboard-heading' style={{border: "2px solid red"}}>{t("Pioneer")}</span><br /> */}
                                <Badge className='deposit' onClick={deposit}>{t("depositNow")}</Badge>
                            </div>
                            <div className="col-lg-2 col-10  flex-column  ">
                                <div className='media-query fw-bold'>
                                    <span className='span1' id='span1' style={{ fontSize: "13px" }}>{t('daily')}&nbsp;
                                        <img src="info.png" role='button' alt="" data-bs-toggle="modal" width="23px" data-bs-target="#exampleModal" />
                                    </span><br />
                                    <span className='span2' id='span1'>{daily1}%</span>

                                </div>
                            </div>
                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"

                            >
                                <div class="modal-dialog modal-xl">
                                    <div class="modal-content" style={{ height: "600px" }}>
                                        <div class="modal-header">
                                            <h5 class="modal-title text-danger" id="exampleModalLabel">Pioneer</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            {/* <iframe
                                                src={Pioneer}
                                                frameBorder="0"
                                                scrolling="auto"
                                                height="100%"
                                                width="100%"
                                            ></iframe> */}
                                            <object
                                                data={Pioneer} type="application/pdf"
                                                frameBorder="0"
                                                scrolling="auto"
                                                height="100%"
                                                width="100%"
                                            ></object>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-10  ">
                                <div className='media-query'>
                                    <span className='span1' id='span1' style={{ fontSize: "14px" }}>{t("deposited")}
                                        <img src="carbon_piggy-bank.png" alt="" width="23px" /></span><br />
                                    <span className='span2' id='span1'>{depositedPlanOne}$</span>
                                </div>
                            </div>
                            <div className="col-lg-2 col-10 d-flex justify-content-center">
                                <div className='media-query'>
                                    <span className='span1' id='span1' style={{ fontSize: "14px" }}>{t("increased")} <img src="bx_trending-up.png" alt="" width="22px" /></span><br />
                                    <span className='span2' id='span1'>{depositedPlanOne && parseFloat((daily1 / 100) * depositedPlanOne).toFixed(2)}$</span>
                                </div>
                            </div>
                            <div className="col-lg-2 col-10 d-flex justify-content-center">
                                <div className='media-query'>
                                    <span className='span1' id='span1' style={{ fontSize: "14px" }}>{t("Balance")} <img src="ant-design_dollar-circle-outlined.png" alt="" width="23px" /></span><br />
                                    <span className='span2' id='span1'>{balancePlanOne}$</span>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-md-12  col-10 pb-3 dashboard-border2 shadow">
                        <div className='row d-flex justify-content-center pt-3 pb-3'>
                            <div className="col-lg-2 col-11">
                                <img role='button' onClick={() => {
                                    setModalShow(true)
                                    setPlan(2)

                                }} src="next-gem-green-logo.png" alt="" className='next-gem-logo' />
                            </div>
                            <div className="col-lg-2 col-10  flex-column text-lg-start  media-query ">
                                <span id='dashboard-heading'>{t('advanced')}</span><br />
                                <Badge className='deposit' onClick={deposit}>{t("depositNow")}</Badge>
                            </div>
                            <div className="col-lg-2 col-10  flex-column ">
                                <div className='media-query'>
                                    <span className='span1' id='span1' style={{ fontSize: "14px" }}>{t('daily')}
                                        <img src="info.png" alt="" role='button' data-bs-toggle="modal" data-bs-target="#advanced" width="23px" /></span><br />
                                    <span className='span2' id='span1'>{daily2}%</span>
                                </div>
                            </div>
                            <div class="modal fade" id="advanced" tabindex="-1" aria-labelledby="advancedLabel" aria-hidden="true"

                            >
                                <div class="modal-dialog modal-xl">
                                    <div class="modal-content" style={{ height: "600px" }}>
                                        <div class="modal-header">
                                            <h5 class="modal-title text-danger" id="advancedLabel">Advanced</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            {/* <iframe
                                                src={Advanced}
                                                frameBorder="0"
                                                scrolling="auto"
                                                height="100%"
                                                width="100%"
                                            ></iframe> */}
                                            <object
                                                data={Advanced} type="application/pdf"
                                                frameBorder="0"
                                                scrolling="auto"
                                                height="100%"
                                                width="100%"
                                            ></object>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-10  ">
                                <div className='media-query'>
                                    <span className='span1' id='span1' style={{ fontSize: "14px" }}>{t("deposited")} <img src="carbon_piggy-bank.png" alt="" width="23px" /></span><br />
                                    <span className='span2' id='span1'>{depositedPlanTwo}$</span>
                                </div>
                            </div>
                            <div className="col-lg-2 col-10 d-flex justify-content-center">
                                <div className='media-query'>
                                    <span className='span1' id='span1' style={{ fontSize: "14px" }}>{t("increased")} <img src="bx_trending-up.png" alt="" width="24px" /></span><br />
                                    <span className='span2' id='span1'>{depositedPlanTwo && parseFloat((daily2 / 100) * depositedPlanTwo).toFixed(2)}$</span>
                                </div>
                            </div>
                            <div className="col-lg-2 col-10 d-flex justify-content-center">
                                <div className='media-query'>
                                    <span className='span1' id='span1' style={{ fontSize: "14px" }}>{t("Balance")} <img src="ant-design_dollar-circle-outlined.png" alt="" width="23px" /></span><br />
                                    <span className='span2' id='span1'>{balancePlanTwo}$</span>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-md-12  col-10 pb-3 dashboard-border2 shadow">
                        <div className='row d-flex justify-content-center pt-3 pb-3'>
                            <div className="col-lg-2 col-11">
                                <img role='button' onClick={() => {
                                    setModalShow(true)
                                    setPlan(3)
                                }} src="next-gem-blue-logo.png" alt="" className='next-gem-logo' />
                            </div>
                            <div className="col-lg-2 col-10  flex-column text-lg-start  media-query ">
                                <span id='dashboard-heading'>{t("hero")}</span><br />
                                <Badge className='deposit' onClick={deposit}>{t("depositNow")}</Badge>
                            </div>
                            <div className="col-lg-2 col-10  flex-column ">
                                <div className='media-query'>
                                    <span className='span1' id='span1' style={{ fontSize: "14px" }}>{t('daily')}
                                        <img src="info.png" role='button' data-bs-toggle="modal" data-bs-target="#hero" width="23px" /></span><br />
                                    <span className='span2' id='span1'>{daily3}%</span>
                                </div>
                            </div>
                            <div class="modal fade" id="hero" tabindex="-1" aria-labelledby="heroLabel" aria-hidden="true"

                            >
                                <div class="modal-dialog modal-xl">
                                    <div class="modal-content" style={{ height: "600px" }}>
                                        <div class="modal-header">
                                            <h5 class="modal-title text-danger" id="heroLabel">Hero</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            {/* <iframe
                                                src={Hero}
                                                frameBorder="0"
                                                scrolling="auto"
                                                height="100%"
                                                width="100%"
                                            ></iframe> */}
                                            <object
                                                data={Hero} type="application/pdf"
                                                frameBorder="0"
                                                scrolling="auto"
                                                height="100%"
                                                width="100%"
                                            ></object>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-10  ">
                                <div className='media-query'>
                                    <span className='span1' id='span1' style={{ fontSize: "14px" }}>{t("deposited")} <img src="carbon_piggy-bank.png" alt="" width="23px" /></span><br />
                                    <span className='span2' id='span1' >{depositedPlanThree}$</span>
                                </div>
                            </div>
                            <div className="col-lg-2 col-10 d-flex justify-content-center">
                                <div className='media-query'>
                                    <span className='span1' id='span1' style={{ fontSize: "14px" }}>{t("increased")} <img src="bx_trending-up.png" alt="" width="24px" /></span><br />
                                    <span className='span2' id='span1'>{depositedPlanThree && parseFloat((daily3 / 100) * depositedPlanThree).toFixed(2)}$</span>
                                </div>
                            </div>
                            <div className="col-lg-2 col-10 d-flex justify-content-center">
                                <div className='media-query'>
                                    <span className='span1' id='span1' style={{ fontSize: "14px" }}>{t("Balance")} <img src="ant-design_dollar-circle-outlined.png" alt="" width="23px" /></span><br />
                                    <span className='span2' id='span1'>{balancePlanThree}$</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
