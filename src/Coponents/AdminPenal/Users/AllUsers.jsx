import React, { useEffect, useState } from 'react'
import './Users.css';
import { GrDocumentUpdate } from "react-icons/gr";
import EditModal from './EditModal';
import ForgotEmail from '../../forgot/ForgotEmail';
import { getAllUsers } from '../../../store/actions/actions';
import { useSelector, useDispatch } from "react-redux";
export default function AllUsers() {
    const dispatch = useDispatch();
    let { allUsers } = useSelector(state => state.allUsers);
    let [showUser, setShowUser] = useState([])
    let [modalShow, setModalShow] = useState(false);
    let [sendUserData, setSendUserData] = useState({})
    useEffect(() => {
        setShowUser(allUsers)
    }, [allUsers])
    const filterSearch = (e) => {
        let filterData = allUsers?.filter((item) => item.email.includes(e.target.value))
        if (filterData.length) {
            setShowUser(filterData)
        } else {
            setShowUser([])
        }
    }
    useEffect(() => {
        dispatch(getAllUsers())
    }, [])
    return (
        <div className=''>

            <div className="row d-flex justify-content-end align-items-center" style={{ paddingBottom: "20px" }}>
                <div className="col-lg-12  " >

                    <div className="" >
                        <div className="row d-flex justify-content-end" >
                            <div className="col-lg-3 d-flex justify-content-end">
                                {/* <input type="text" placeholder="Search" class="form-control " /> */}
                                {/* <button class="button-1 btn-size" role="button">Search</button> */}
                                <input type="text" className="searchTerm admin-input" placeholder="Search"
                                    onChange={filterSearch}
                                />
                                <button type="submit" className="searchButton">
                                    <i className="fa fa-search"></i>
                                </button>
                            </div>
                        </div>
                        <div className="row justify-content-center" >
                            <div className=" col-lg-10  mt-5 col-10" >
                                <div className="tab-content" >

                                    {/* <table class="table table-bordered table-responsive">
                                                        <thead class="th-style">
                                                            <tr>
                                                                <th scope="col">#</th>
                                                                <th scope="col">Name</th>
                                                                <th scope="col">Email</th>
                                                                <th scope="col">Edit</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                showUser?.map((item, i)=>{
                                                                    return (
                                                                        <>
                                                                        <tr key={i}>
                                                                        <th className='text-white' scope="row">{i+1}</th>
                                                                        <td className='text-white'>{item.fullName}</td>
                                                                        <td className='text-white'>{item.email}</td>
                                                                        <td className=' text-center'>
                                                                            <button class="btn-size  " onClick={() =>{
                                                                                setSendUserData(item)
                                                                                setModalShow(true)
                                                                                
                                                                                }} role="button">Update <GrDocumentUpdate /></button>
                                                                        </td>

                                                                    </tr>
                                                                    
                                                                    
                                                                                </>
                                                                    )
                                                                })
                                                            }
                                                           
                                                        </tbody>
                                                    </table> */}
                                    <div className="tab-pane active scroll-tab" id="tabs-1" role="tabpanel" >
                                        <table class="table table-striped   table-bordered" >
                                            <thead className='th-style'>
                                                <tr className='fixed'>
                                                    <th scope="col">#</th>
                                                    <th scope="col" colspan="2">Name</th>
                                                    <th scope="col" colspan="2">Email</th>
                                                    <th scope="col">Edit</th>

                                                </tr>
                                            </thead>
                                            <tbody >
                                                {
                                                    showUser?.map((item, i) => {
                                                        return (
                                                            <>
                                                                <tr key={i}>
                                                                    <th className='text-white' scope="row">{i + 1}</th>
                                                                    <td className='text-white' colspan="2">{item.fullName}</td>
                                                                    <td className='text-white' colspan="2">{item.email}</td>
                                                                    <td className=' text-center'>
                                                                        <button class="btn-size  " onClick={() => {
                                                                            setSendUserData(item)
                                                                            setModalShow(true)

                                                                        }} role="button">Update <GrDocumentUpdate /></button>
                                                                    </td>

                                                                </tr>


                                                            </>
                                                        )
                                                    })
                                                }

                                            </tbody>
                                        </table>
                                        {modalShow && (<EditModal modalShow={modalShow} setModalShow={setModalShow} user={sendUserData} />)}
                                    </div>
                                    <div >
                                        {/* <ForgotEmail modalShow={modalShow} setModalShow={setModalShow} /> */}


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
