import React,{useEffect, useState} from 'react'
import { FiSend } from "react-icons/fi";
import Badge from '@mui/material/Badge';
import SendBackAmount from './SendBackAmount';
import {allRequestsPlanThree, connectWallet, sendData} from '../../../store/actions/actions';
import {useSelector, useDispatch} from 'react-redux';
export default function Hero() {
    let {planThreeRequest} = useSelector(state=> state.planThreeWithdrawRequests);
    let [userData, setUserData]=useState([]);
    useEffect(()=>{
        setUserData(planThreeRequest)
    },[planThreeRequest]);
    const filterSearch = (e) => {
        let filterData = planThreeRequest?.filter((item)=>item.email.includes(e.target.value))
        if(filterData.length){
            setUserData(filterData)
        }else{
            setUserData([])
        }
    }
    const {acc} = useSelector(state => state.wallletAddress)
    let [modalShow, setModalShow]=useState(false);
    const dispatch = useDispatch();
    let [isShow, setIsShow]=useState(false);
    let [message, setMessage]=useState("")
    useEffect(()=>{
        dispatch(allRequestsPlanThree())
    },[planThreeRequest])
    const getWallet = () => {
        dispatch(connectWallet())
    }
    return (
        <div className=''>
            {
                modalShow && <SendBackAmount setModalShow={setModalShow} modalShow={modalShow}  plan={3} />
            }

            <div className="row d-flex justify-content-end">
                <div className="col-lg-12 " >

                    <div className="" >
                        <div className="row d-flex justify-content-end" >
                            <div className="col-lg-3 d-flex justify-content-end">
                                {/* <input type="text" placeholder="Search" class="form-control " /> */}
                                {/* <button class="button-1 btn-size" role="button">Search</button> */}
                                <input type="text" class="searchTerm" placeholder="Search"></input>
                                <button type="submit" class="searchButton">
                                    <i class="fa fa-search"></i>
                                </button>
                            </div>
                        </div>
                        <div className="row justify-content-center" >
                            <div className=" col-lg-10 col-md-5 mt-5" >


                                <div className="tab-content mt-5" >
                                    <h1 className='text-white page-heading-style'>Hero
                                        <Badge style={{ padding: '20px 3px', height: '17px' }} badgeContent={planThreeRequest.length} color={"success"}>
                                        </Badge>
                                    </h1>
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
                                                    userData.map((item, i)=>{
                                                        return <tr key={i}>
                                                        <th className='text-white' scope="row">{i + 1}</th>
                                                        <td className='text-white'>{item.email}</td>
                                                        <td className='text-white'>{item.walletAddress.substring(0, 5) + "..." + item.walletAddress.substring(item.walletAddress.length - 5)}</td>
                                                        <td className='text-white'>{item.balance}</td>
                                                        <td className='text-white'>{item.currencyType}</td>
                                                        <td className=' text-center'><button class="btn-size  " role="button" onClick={()=>{
                                                           dispatch(sendData(item))
                                                           setModalShow(true)
                                                            }}>Send <FiSend /></button></td>
    
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
