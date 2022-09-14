import React, { useState, useEffect, useRef } from 'react'
import './HomePage.css';
import { ToastContainer, Toast } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import { getDailyValue, updateDailyValue } from '../../../store/actions/actions';
export default function HomePage() {
    let { daily1, daily2, daily3 } = useSelector(state => state.dailyDetail);
    let dailyOne = useRef();
    let dailyTwo = useRef();
    let dailyThree = useRef();
    const [isShow, setIsShow] = useState(false);
    const [message, setMessage] = useState("");
    const [btnText, setBtnText] = useState("Submit");
    const [bgToast, setBgToast] = useState("danger")

    const dispatch = useDispatch();

    useEffect(() => {
        dailyOne.current.value = daily1;
        dailyTwo.current.value = daily2;
        dailyThree.current.value = daily3;
    }, [daily1])
    const updateDailyDetail = async (e, plan) => {
        try {
            e.preventDefault();
            let data = {
                percentage: 0,
                plan
            }
            if (plan === 1) {
                if (dailyOne.current.value > 0) {
                    setBtnText("Requesting wait...")
                    data = {
                        percentage: dailyOne.current.value,
                        plan
                    }
                } else {
                    setMessage("Please Enter percentage value")
                    setIsShow(true)
                    return;
                }

            } else if (plan === 2) {
                setBtnText("Requesting wait...")
                if (dailyTwo.current.value > 0) {

                    data = {
                        percentage: dailyTwo.current.value,
                        plan
                    }
                } else {
                    setMessage("Please Enter percentage value")
                    setIsShow(true);
                    return;
                }
            } else if (plan === 3) {
                setBtnText("Requesting wait...")
                if (dailyThree.current.value > 0) {
                    data = {
                        percentage: dailyThree.current.value,
                        plan
                    }
                } else {
                    setMessage("Please Enter percentage value")
                    setIsShow(true);
                    return;
                }
            }
            dispatch(updateDailyValue(data))
            setBtnText("Submit")
            setMessage("Value updated successfully")
            setBgToast("success")
            setIsShow(true)
            dispatch(getDailyValue())

        } catch (error) {
            console.error("error while update daily value", error);
        }
    }
    useEffect(() => {
        dispatch(getDailyValue())
    }, [])


    let [changeColor, setChangeColor] = useState("transparent")
    return (
        <div className='homepage-color' style={{ backgroundColor: "#1B1E30", height: "auto" }}>
            <section className="pt-5 pb-5  " >
                <div className="">
                </div>
                <div className="">
                    <ToastContainer position="top-center" className="p-3 mt-5">
                        <Toast onClose={() => setIsShow(false)} show={isShow} delay={3000} autohide
                            bg={bgToast}
                        >
                            <Toast.Body>{message}</Toast.Body>
                        </Toast>
                    </ToastContainer>
                    <div className="row justify-content-center">
                        <div className=" col-lg-6 col-md-8">
                            <h2 className='text-white page-heading-style'>Daily</h2>
                            <ul className="nav nav-tabs mt-5" role="tablist">
                                <li className="nav-item  tab-heading " id="nav-link16" style={{ color: "white" }}>
                                    <a className="nav-link  active" data-toggle="tab" href="#tabs-1" role="tab">Poineer</a>
                                </li>
                                <li className="nav-item tab-heading " id="nav-link26">
                                    <a className="nav-link " data-toggle="tab" href="#tabs-2" role="tab">Advanced</a>
                                </li>
                                <li className="nav-item tab-heading " id="nav-link36">
                                    <a className="nav-link " data-toggle="tab" href="#tabs-3" role="tab">Hero</a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div className="tab-pane active " id="tabs-1" role="tabpanel">
                                    <div className="box-shadow " >
                                        <div className="card-body text-start " >
                                            <form onSubmit={(e) => updateDailyDetail(e, 1)}>

                                                <div className="mb-4 ">
                                                    <input type="text" ref={dailyOne} placeholder='Daily percentage' class="form-control admin-input" id="password"
                                                    />
                                                </div>

                                                <div className="d-grid btn-color ">
                                                    <button type="submit" className="btn text-light fs-5 pt-3    pb-3 fw-bold ">{btnText}</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane" id="tabs-2" role="tabpanel">

                                    <div className="box-shadow " >
                                        <div className="card-body text-start " >
                                            <form onSubmit={(e) => updateDailyDetail(e, 2)}>

                                                <div className="mb-4 ">
                                                    <input type="text" ref={dailyTwo} placeholder='Daily percentage' class="form-control admin-input" id="password"
                                                    />
                                                </div>

                                                <div className="d-grid btn-color ">
                                                    <button type="submit" className="btn text-light fs-5 pt-3    pb-3 fw-bold ">{btnText}</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane" id="tabs-3" role="tabpanel">
                                    <div className="box-shadow " >
                                        <div className="card-body text-start " >
                                            <form onSubmit={(e) => updateDailyDetail(e, 3)}>

                                                <div className="mb-4 ">
                                                    <input type="text" ref={dailyThree} placeholder='Daily percentage' class="form-control admin-input" id="password"
                                                    />
                                                </div>

                                                <div className="d-grid btn-color ">
                                                    <button type="submit" className="btn text-light fs-5 pt-3    pb-3 fw-bold ">{btnText}</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </section>
        </div>

    )
}
