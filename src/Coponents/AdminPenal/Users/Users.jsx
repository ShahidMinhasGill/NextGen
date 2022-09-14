import React, { useEffect, useState } from 'react'
import './Users.css';
import { useSelector, useDispatch } from 'react-redux';
import { allDepositsPlanOne, allDepositsPlanTwo, allDepositsPlanThree } from '../../../store/actions/actions';
export default function Request() {
    let { planOneAllData } = useSelector(state => state.planOneAllData);
    let [user1, setUser1] = useState([])
    useEffect(() => {
        setUser1(planOneAllData)
    }, [planOneAllData])
    let { planTwoAllData } = useSelector(state => state.planTwoAllData);
    let [user2, setUser2] = useState([])
    useEffect(() => {
        setUser2(planTwoAllData)
    }, [planTwoAllData])
    let [user3, setUser3] = useState([])
    let { planThreeAllData } = useSelector(state => state.planThreeAllData);
    useEffect(() => {
        setUser3(planThreeAllData)
    }, [planThreeAllData])
    const dispatch = useDispatch()
    let [tab, setTab] = useState("tab1")



    const searchFilter = (e) => {
        if (tab == "tab1") {

            let filter = planOneAllData?.filter((item) => item.email.includes(e.target.value));

            if (filter.length) {

                setUser1(filter)
            } else {
                console.log("f.no")
                setUser1([])
            }
        } else if (tab == "tab2") {


            let filter = planTwoAllData?.filter((item) => item.email.includes(e.target.value));

            if (filter.length) {

                setUser1(filter)
            } else {
                console.log("f.no")
                setUser1([])
            }

        } else if (tab == "tab3") {

            let filter = planThreeAllData?.filter((item) => item.email.includes(e.target.value));

            if (filter.length) {

                setUser1(filter)
            } else {
                console.log("f.no")
                setUser1([])
            }
        }

    }
    useEffect(() => {
        dispatch(allDepositsPlanOne());
        dispatch(allDepositsPlanTwo());
        dispatch(allDepositsPlanThree());
    }, [])
    return (
        <div className=''>

            <div className="row d-flex justify-content-end align-items-center" style={{ height: "500px" }}>
                <div className="col-lg-12  " >

                    <div className="" >
                        <div className="row d-flex justify-content-end" >
                            <div className="col-lg-3 d-flex justify-content-end">
                                {/* <input type="text" placeholder="Search" class="form-control " /> */}
                                {/* <button class="button-1 btn-size" role="button">Search</button> */}
                                <input type="text" className="searchTerm admin-input" placeholder="Search"
                                    onChange={(e) => { searchFilter(e) }}
                                />
                                <button type="submit" className="searchButton">
                                    <i className="fa fa-search"></i>
                                </button>
                            </div>
                        </div>
                        <div className="row justify-content-center" >
                            <div className=" col-lg-10  mt-5 col-10" >
                                {/* <h2 className='text-start'>Daily</h2> */}
                                <ul className="nav nav-tabs" role="tablist" >
                                    <li className="nav-item  tab-heading" id="nav-link16">
                                        <a className="nav-link active nav-link1" data-toggle="tab" href="#tabs-1" id='tab1' role="tab"
                                            onClick={(e) => setTab(e.target.id)}
                                        >Poineer</a>
                                    </li>
                                    <li className="nav-item tab-heading" id="nav-link26">
                                        <a className="nav-link nav-link2" data-toggle="tab" id='tab2' href="#tabs-2" role="tab"
                                            onClick={(e) => setTab(e.target.id)}
                                        >Advanced</a>
                                    </li>
                                    <li className="nav-item tab-heading" id="nav-link36">
                                        <a className="nav-link nav-link3" data-toggle="tab" id='tab3' href="#tabs-3" role="tab"
                                            onClick={(e) => setTab(e.target.id)}
                                        >Hero</a>
                                    </li>


                                </ul>

                                <div className="tab-content" >
                                    <div className="tab-pane active scroll-tab" id="tabs-1" role="tabpanel" >
                                        <table class="table table-striped   table-bordered" >
                                            <thead className='th-style'>
                                                <tr className='fixed'>
                                                    <th scope="col">#</th>
                                                    <th scope="col" colspan="2">Name</th>
                                                    <th scope="col" colspan="2">Email</th>
                                                    <th scope="col">Deposited</th>
                                                    <th scope="col">Balance</th>

                                                </tr>
                                            </thead>
                                            <tbody >
                                                {

                                                    user1?.map((item, i) => {
                                                        return <tr>
                                                            <th className='text-white' scope="row">{i + 1}</th>
                                                            <td className='text-white' colspan="2">{item.fullName}</td>
                                                            <td className='text-white' colspan="2">{item.email}</td>
                                                            <td className='text-white'>{item.amount}</td>
                                                            <td className='text-white'>{item.balance}</td>
                                                        </tr>
                                                    })
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="tab-pane scroll-tab" id="tabs-2" role="tabpanel">
                                        <table class="table table-striped   table-bordered" >
                                            <thead className='th-style'>
                                                <tr className='fixed'>
                                                    <th scope="col">#</th>
                                                    <th scope="col" colspan="2">Name</th>
                                                    <th scope="col" colspan="2">Email</th>
                                                    <th scope="col">Deposited</th>
                                                    <th scope="col">Balance</th>
                                                </tr>
                                            </thead>
                                            <tbody >
                                                {
                                                    user2?.map((item, i) => {
                                                        return <tr>
                                                            <th className='text-white' scope="row">{i + 1}</th>
                                                            <td className='text-white' colspan="2">{item.fullName}</td>
                                                            <td className='text-white' colspan="2">{item.email}</td>
                                                            <td className='text-white'>{item.amount}</td>
                                                            <td className='text-white'>{item.balance}</td>
                                                        </tr>
                                                    })
                                                }

                                            </tbody>
                                        </table>

                                    </div>
                                    <div className="tab-pane scroll-tab" id="tabs-3" role="tabpanel">

                                        <table class="table table-striped   table-bordered" >
                                            <thead className='th-style'>
                                                <tr className='fixed'>
                                                    <th scope="col">#</th>
                                                    <th scope="col" colspan="2">Name</th>
                                                    <th scope="col" colspan="2">Email</th>
                                                    <th scope="col">Deposited</th>
                                                    <th scope="col">Balance</th>
                                                    {/* <th scope="col">Update</th> */}

                                                </tr>
                                            </thead>
                                            <tbody >
                                                {
                                                    user3?.map((item, i) => {
                                                        return <tr>
                                                            <th className='text-white' scope="row">{i + 1}</th>
                                                            <td className='text-white' colspan="2">{item.fullName}</td>
                                                            <td className='text-white' colspan="2">{item.email}</td>
                                                            <td className='text-white'>{item.amount}</td>
                                                            <td className='text-white'>{item.balance}</td>
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
    )
}