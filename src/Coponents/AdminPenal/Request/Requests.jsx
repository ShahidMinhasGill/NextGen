import React, {useState, useEffect } from 'react'
import { FiSend } from "react-icons/fi";
import {ToastContainer, Toast} from 'react-bootstrap'
import Badge from '@mui/material/Badge';
// import SendBackAmount from "./SendBackAmount";
import SendBackAmount from './SendBackAmount';
import { allRequestsPlanOne, connectWallet, sendData } from '../../../store/actions/actions';
import { useSelector, useDispatch } from 'react-redux'
export default function Requests() {
    let { planOneRequest } = useSelector(state => state.planOneWithdrawRequests);
    let [userData, setUserData]=useState([]);
    useEffect(()=>{
        setUserData(planOneRequest)
    },[planOneRequest]);
    const filterSearch = (e) => {
        let filterData = planOneRequest?.filter((item)=>item.email.includes(e.target.value))
        if(filterData.length){
            setUserData(filterData)
        }else{
            setUserData([])
        }
    }
    let dispatch = useDispatch();
    const [modalShow, setModalShow] = useState(false);
    const {acc} = useSelector(state => state.wallletAddress)
    
    let [isShow, setIsShow]=useState(false);
    let [message, setMessage]=useState("")
    useEffect(() => {
        dispatch(allRequestsPlanOne())
    }, [planOneRequest])

    const getWallet = () => {
        dispatch(connectWallet())
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
            {
                modalShow && <SendBackAmount setModalShow={setModalShow} modalShow={modalShow} plan={1} />
            }


            <div className="row d-flex justify-content-end">
                <div className="col-lg-12 " >

                    <div className="" >
                        <div className="row d-flex justify-content-end" >
                            <div className="col-lg-3 d-flex justify-content-end">
                                {/* <input type="text" placeholder="Search" class="form-control " /> */}
                                {/* <button class="button-1 btn-size" role="button">Search</button> */}
                                <input type="text" className="searchTerm" placeholder="Search" 
                                onChange={filterSearch}
                                />
                                <button type="submit" className="searchButton">
                                    <i className="fa fa-search"></i>
                                </button>
                            </div>
                        </div>
                        <div className="row justify-content-center" >
                            <div className=" col-lg-10 col-md-5 mt-5" >


                                <div className="tab-content mt-5" >
                                    <h2 className='text-white page-heading-style'>Poineer
                                        <Badge style={{ padding: '20px 5px' }} badgeContent={planOneRequest.length} color={"success"}>
                                        </Badge>
                                    </h2>
                                    <button
                                    className='btn btn-success'
                                    onClick={getWallet}
                                    >
                                    {
                          acc === "No Wallet"
                            ? "No Wallet"
                            : acc === "Connect Wallet"
                              ? "Connect Wallet"
                              : acc === "Wrong Network"
                                ? acc
                                : acc.substring(0, 5) + "..." + acc.substring(acc.length - 5)
                        }
                                    </button>
                                    <div className="tab-pane active" id="tabs-1" role="tabpanel" >
                                        <div class=" table-responsive py-5">
                                            <table class="table table-bordered ">
                                                <thead class="th-style">
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Email</th>
                                                        <th scope="col">Adress</th>
                                                        <th scope="col">Amount</th>
                                                        <th scope="col">Currency</th>
                                                        <th scope="col">Send</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
             
                                                {
                                                    userData?.map((item, i)=>{
                                                        return <tr key={i}>
                                                            <th className='text-white' scope="row">{i + 1}</th>
                                                            <td className='text-white'>{item.email}</td>
                                                            <td className='text-white'>{item.walletAddress.substring(0, 5) + "..." + item.walletAddress.substring(item.walletAddress.length - 5)}</td>
                                                            <td className='text-white'>{item.balance}</td>
                                                            <td className='text-white'>{item.currencyType}</td>
                                                            <td className=' text-center'><button class="btn-size  " role="button"
                                                            onClick={()=>{
                                                                dispatch(sendData(item))
                                                                setModalShow(true)
                                                            }}
                                                            >Send <FiSend /></button></td>

                                                        </tr>
                                                        })
                                                }
                                                    </tbody>
     
                                            </table>
                                        </div>

                                    </div>


                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
