import React, {useState} from 'react'
import { IoMdClose } from "react-icons/io";
import { Modal, Toast, ToastContainer, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {adminUpdateUserPlanOne, adminUpdateUserPlanTwo, adminUpdateUserPlanThree} from '../../../store/actions/actions'
export default function EditModal({ modalShow, setModalShow, user }) {
    console.log("users", user);
   const dispatch = useDispatch();
   let [amount, setAmount]=useState(0);
   let [plan, setPlan]=useState(0);
   let [currency, setCurrency] = useState(0);
   let [walletAddress, setWalletAddress]=useState("");
   let [isShow, setIsShow]=useState(false);
   let[message, setMessage]=useState("")

   const updateUser = (e) => {
    try {
        e.preventDefault()
        if( 
        !plan || plan == "" || plan == undefined || plan == 0 ||
          !currency || currency == "" || currency == undefined || currency == 0 
          ){
            setMessage("All fields are mandatory");
            setIsShow(true);
            return;
          }else {
            let curr;
            if(currency == 1){
                curr = "USDC";
            } else if(currency == 2){
                curr = "USDT";
            }
            let amou =0;
            if(!amount || amount == undefined || amount == "" || amount == 0){
                amou = 0;
            }else{
                amou = amount
            }

            let data ={
                fullName:user?.fullName,
                email:user?.email,
                currencyType:curr,
                amount:amou
            }
            if(plan == 1){
                dispatch(adminUpdateUserPlanOne(data));
                
            }else if(plan == 2){
                dispatch(adminUpdateUserPlanTwo(data))
            }else if(plan == 3){
                dispatch(adminUpdateUserPlanThree(data))
            }
            setMessage("Data submited successfully");
                setIsShow(true);
                setModalShow(false)
                return;
        
          }
        
    } catch (error) {
        console.error("error while update user", error);
    }
   }
    return (
        <div className=''>
             <ToastContainer position="top-center" className="p-3 mt-5">
                <Toast onClose={() => setIsShow(false)} show={isShow} delay={3000} autohide
                    bg="danger"
                >
                    <Toast.Body>{message}</Toast.Body>
                </Toast>
            </ToastContainer>
            <Modal className='mt-4'
                show={modalShow} onHide={() => {
                    setModalShow(false)
                }}

                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                

                <Modal.Body className='modal-color ' style={{ backgroundColor: "#1B1E30" }}>
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 d-flex- justify-content-end">
                            <IoMdClose
                                onClick={() => setModalShow(false)}
                                size={25}
                                className="icon-color"
                                style={{ cursor: "pointer", color: "white" }}
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div class="col-lg-9 col-md-6 col-sm-6">
                            <div className="card-title text-center">
                                <h2 className=" login-main-heading text-white">Fill User Data</h2>
                            </div>
                            <div className=" shadow" style={{ backgroundColor: "#2D3252" }}>
                                <div className="card-body text-start ">
                                    <form
                                        onSubmit={updateUser}
                                    >


                                        <div className="mb-0">
                                            <label for="email" className="form-label form-heading lable-text text-white">Name</label>
                                            <input type="text" value={user?.fullName} disabled className="form-control input-color" id="username" style={{ backgroundColor: "#1B1E30" }} />
                                        </div>
                                        <div className="mb-0">
                                            <label for="email" className="form-label form-heading lable-text text-white">Email</label>
                                            <input type="text" value={user?.email} disabled className="form-control input-color" id="username" style={{ backgroundColor: "#1B1E30" }} />
                                        </div>
                                       
                                        <div className="mt-1">
                                        <label for="Wallet Address" className="form-label form-heading lable-text text-white">Currency type</label>
                                            <Form.Select aria-label="Default select example"
                                            className='input-color'
                                            onChange={(e)=>{setCurrency(e.target.value)}}
                                            >
                                                <option value="0">SelectCurrency</option>
                                                <option value="1">USDC</option>
                                                <option value="2">USDT</option>
                                            </Form.Select>
                                        </div>
                                        <div className="mt-1">
                                        <label for="Wallet Address" className="form-label form-heading lable-text text-white">Select Plan</label>
                                            <Form.Select aria-label="Default select example"
                                            className='input-color'
                                            onChange={(e)=>{setPlan(e.target.value)}}
                                            >
                                                <option value="0">Select Plan</option>
                                                <option value="1">Poineer</option>
                                                <option value="2">Advanced</option>
                                                <option value="3">Hero</option>
                                            </Form.Select>
                                        </div>
                                        <div className="mb-2 mt-2">
                                            <label for="balance" className="form-label form-heading lable-text text-white">Deposit Amount</label>
                                            <input type="text" className="form-control input-color" id="username" style={{ backgroundColor: "#1B1E30", color:"#fff" }}
                                           onChange={(e)=>{setAmount(e.target.value)}}
                                           />
                                        </div>


                                        <div class="d-grid btn-color">
                                            <button type="submit" class="btn text-light"

                                            >Submit</button>
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
