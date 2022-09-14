import React, { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDailyValue, updateTVL } from '../../../store/actions/actions';
import {Toast, ToastContainer} from 'react-bootstrap';
import './TVK.css'

export default function TVK() {
    let {TVL} = useSelector(state=>state.dailyDetail);
    let dispatch = useDispatch()
    const [isShow, setIsShow]=useState(false);
const [message, setMessage]=useState("");
const [bgToast, setBgToast]=useState("danger")
const [btnText, setBtnText]=useState("Submit");
    let tvlAmount = useRef();
    useEffect(()=>{
        tvlAmount.current.value = TVL;
    },[TVL])

    let upatetvl = async (e) => {
        e.preventDefault()
        let value = tvlAmount.current.value;
        if(value > 0){
            let data = {
                amount:value
            }
            dispatch(updateTVL(data)) 
            setMessage("Value updated successfully")
            setBgToast("success");
            setIsShow(true)
        }else{
            setMessage("please enter value")
            setBgToast("danger");
            setIsShow(true)
        }
    }
    return (


        <div className=' mt-5 ' >
            <div className="container">
            <ToastContainer position="top-center" className="p-3 mt-5">
                <Toast onClose={() => setIsShow(false)} show={isShow} delay={3000} autohide
                    bg={bgToast}
                >
                    <Toast.Body>{message}</Toast.Body>
                </Toast>
            </ToastContainer>
                <div className="row justify-content-center mb-3">
                    <div className="col-lg-5 col-md-6 col-sm-6">
                        <div className="card-title text-center">
                            <h2 className='text-white page-heading-style'>TVL</h2>
                        </div>
                        <div className="box-shadow " >
                            <div className="card-body text-start " >
                                <form onSubmit={upatetvl}>
                                    <div className="mb-4 ">
                                        <input type="number" ref={tvlAmount} placeholder="TVL" className="form-control admin-input" />
                                    </div>

                                    <div className="d-grid btn-color ">
                                        <button type="submit" className="btn text-light fs-5 pt-3    pb-3 fw-bold ">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
