import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./LanddingPage.css"
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from 'react-redux'
import { getDailyValue } from '../../store/actions/actions';
import Pioneer from '../../Docoments/Pioneer.pdf';
import Advanced from '../../Docoments/Advanced.pdf';
import Hero from '../../Docoments/Hero.pdf';

export default function LanddingPage() {
    let { daily1, daily2, daily3 } = useSelector(state => state.dailyDetail);
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation();
    let [pioneer, setPioneer] = useState(false);

    const openInNewTabPoineer = url => {
        // window.open(Pioneer, '_blank');
        setPioneer(true)
    };
    const openInNewTabAdvanced = url => {
        window.open(Advanced, '_blank');
    };
    const openInNewTabHero = url => {
        window.open(Hero, '_blank');
    };
    useEffect(() => {
        dispatch(getDailyValue())
    }, [])
    return (
        <div className=" img-fluid bgimg1">
            <div className="container">
                <div className="row d-flex  justify-content-center">
                    {/* <Link to='/dashboard' className='d-flex  justify-content-center link-landing-page '>
                        <div className="col-lg-9 col-11 d-flex align-items-center pb-4 text-start ps-md-4 ps-2 listborder1 shadow">
                            <img src="next-gem-logo.png" alt="" className='next-gem-logo ' />
                            <h3 className='heading mt-md-2 mt-3'>{t("Pioneer")}</h3>
                            <div className='ms-auto me-3 text-center'>
                                <span className='span1 ' style={{ fontSize: "13px" }} >{t('daily')} <img src="info.png" alt="" width="17px" /></span><br />
                                <span className='span2' >0.03 - 0.05%</span>
                            </div>
                        </div>
                    </Link> */}
                    {/* <Link to='/dashboard' className='d-flex  justify-content-center link-landing-page'>

                        <div className="col-lg-9 col-11 d-flex align-items-center pb-4 text-start ps-md-4 ps-2 listborder2 shadow">
                            <img src="next-gem-green-logo.png" alt="" className='next-gem-logo ' />
                            <h3 className='heading mt-md-2 mt-3' >{t('advanced')}</h3>
                            <div className='ms-auto me-3 text-center'>
                                <span className='span1' style={{ fontSize: "13px" }}>{t('daily')}&nbsp;<img src="info.png" alt="" width="17px" /></span><br />
                                <span className='span2' >0.3 - 0.05%</span>
                            </div>
                        </div>
                    </Link> */}
                    {/* <Link to='/dashboard' className='d-flex align-items-center justify-content-center link-landing-page'>
                        <div className="col-lg-9 col-11 d-flex align-items-center pb-4  text-start ps-md-4 ps-2 listborder2 shadow">
                            <img src="next-gem-blue-logo.png" alt="" className='next-gem-logo ' />

                            <h3 className='heading mt-md-2 mt-3'>{t("hero")}</h3>
                            <div className='ms-auto me-3 text-start'>
                                <span className='span1' style={{ fontSize: "13px" }}>{t('daily')}&nbsp;<img src="info.png" alt="" width="17px" /></span><br />
                                <span className='span2' >2% - 4%</span>
                            </div>


                        </div>
                    </Link> */}
                    {/* <Link to='/dashboard' className='d-flex align-items-center justify-content-center link-landing-page'> */}

                    <div className="col-md-9  col-10 pb-3 dashboard-border2 shadow">
                        <div className='row d-flex justify-content-center pt-3 pb-3'>
                            <div className="col-lg-2  col-11">
                                <Link to='/dashboard' >
                                    <img src="next-gem-logo.png" alt="" className='next-gem-logo ' />
                                </Link>
                            </div>
                            <div className="col-lg-2 col-10  flex-column   ">
                                <Link to='/dashboard' >
                                    <span className='heading mt-md-2 mt-3'>{t("Pioneer")}</span><br />
                                </Link>
                            </div>
                            <div className="col-lg-8 col-10  flex-column  ">
                                <div className='media-query1'>
                                    <span className='span1' id='span1' style={{ fontSize: "13px" }}>{t('daily')}&nbsp;
                                        <img src="info.png" role='button' alt="" data-bs-toggle="modal" width="17px" data-bs-target="#exampleModal" onClick={() => openInNewTabPoineer()} />
                                    </span><br />

                                    <span className='span2' id='span1'>{daily1}%</span>
                                </div>
                            </div>
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
                                    {Pioneer && <object
                                        data={Pioneer} type="application/pdf"
                                        frameBorder="0"
                                        scrolling="auto"
                                        height="100%"
                                        width="100%" />}

                                    {/* <iframe id="pdf-js-viewer"
                                        src={Pioneer}
                                        frameBorder="0"
                                        scrolling="auto"
                                        height="100%"
                                        width="100%"
                                    ></iframe> */}
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* </Link> */}
                    {/* <Link to='/dashboard' className='d-flex align-items-center justify-content-center link-landing-page'> */}

                    <div className="col-md-9  col-10 pb-3 dashboard-border2 shadow">
                        <div className='row d-flex justify-content-center pt-3 pb-3'>
                            <div className="col-lg-2 col-11">
                                <Link to='/dashboard' >
                                    <img src="next-gem-green-logo.png" alt="" className='next-gem-logo ' />
                                </Link>
                            </div>
                            <div className="col-lg-2 col-10  flex-column   ">
                                <Link to='/dashboard' >
                                    <span className='heading mt-md-2 mt-3'>{t('advanced')}</span><br />
                                </Link>
                            </div>
                            <div className="col-lg-8 col-10  flex-column  ">
                                <div className='media-query1'>
                                    <span className='span1' id='span1' style={{ fontSize: "13px" }}>{t('daily')}&nbsp;
                                        <img src="info.png" alt="" role='button' data-bs-toggle="modal" data-bs-target="#advanced" width="17px" /></span><br />
                                    <span className='span2' id='span1'>{daily2}%</span>
                                </div>
                            </div>
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
                    {/* </Link> */}
                    {/* <Link to='/dashboard' className='d-flex align-items-center justify-content-center link-landing-page'> */}

                    <div className="col-md-9  col-10 pb-3 dashboard-border2 shadow">
                        <div className='row d-flex justify-content-center pt-3 pb-3'>
                            <div className="col-lg-2 col-11">
                                <Link to='/dashboard' >
                                    <img src="next-gem-blue-logo.png" alt="" className='next-gem-logo ' />
                                </Link>
                            </div>
                            <div className="col-lg-2 col-10  flex-column   ">
                                <Link to='/dashboard' >
                                    <span className='heading mt-md-2 mt-3'>{t("hero")}</span><br />
                                </Link>
                            </div>
                            <div className="col-lg-8 col-10  flex-column  ">
                                <div className='media-query1'>
                                    <span className='span1' id='span1' style={{ fontSize: "13px" }}>{t('daily')}&nbsp;
                                        <img src="info.png" role='button' data-bs-toggle="modal" data-bs-target="#hero" width="17px" /></span><br />
                                    <span className='span2' id='span1'>{daily3}%</span>
                                </div>
                            </div>
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
                    {/* </Link> */}
                </div>

            </div>
        </div>
    )
}
