import React,{useEffect, useRef, useState} from 'react';
import {Toast, ToastContainer} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux';
import {getAdminAddress, changeAdminAddrss} from '../../../store/actions/actions';

function AdminAddress() {
    const {adminAddress} = useSelector(state=> state.adminAddress)
    const dispatch = useDispatch();
    let address = useRef()
    useEffect(()=>{
        dispatch(getAdminAddress())
        address.current.value = adminAddress;
    },[adminAddress]);
    const [isShow, setIsShow]=useState(false);
const [message, setMessage]=useState("");
const [bgToast, setBgToast]=useState("danger")
    const changeAdminAddress = (e) => {
        e.preventDefault()
        console.log("addres",  address.current.value);
        let add = address.current.value;
        if(!add && add == "" && add== undefined && add == null){
            setMessage("Enter correct address");
            setIsShow(true);
            
        }else{
            let data = {address:add}
            dispatch(changeAdminAddrss(data));
            setMessage("Address add successfully");
            setIsShow(true);
            setBgToast("success")
        }
    }
  return (
    <div>
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
                            <h2 className='text-white page-heading-style'>Address</h2>
                        </div>
                        <div className="box-shadow " >
                            <div className="card-body text-start " >
                                <form onSubmit={changeAdminAddress}>
                                    <div className="mb-4 ">
                                        <input type="text" ref={address} placeholder="Address" className="form-control admin-input" />
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
    </div>
  )
}

export default AdminAddress