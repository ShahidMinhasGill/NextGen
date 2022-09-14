import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';
import HomePage from "../HomePage/HomePage"
import TVK from "../TVK/TVK"
import { GoGitPullRequest } from "react-icons/go";
import { FaPen } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";

import Users from "../Users/Users"
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import TuneIcon from "@mui/icons-material/Tune";
import './SideBar.css'
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import { FaDiscord, FaUser } from "react-icons/fa";
import { DiGitPullRequest } from "react-icons/di";
import AdminAddress from '../address/AdminAddress'
import Requests from "../Request/Requests";
import Advanced from "../Request/Advanced";
import Hero from "../Request/Hero";
import Badge from '@mui/material/Badge';
import logo1 from '../../../Asset/logo1.png'

import { useSelector, useDispatch } from 'react-redux'
// import BondPopup from "../../BondPopup";
// import MyVerticallyCenteredModal from "../../BondPopup";
import { allRequestsPlanOne, allRequestsPlanTwo, allRequestsPlanThree } from '../../../store/actions/actions'
import AllUsers from "../Users/AllUsers";
const drawerWidth = 230;

function ResponsiveDrawer(props) {
    const { window } = props;
    const [show, setShow] = React.useState(false);
    const [showone, setshowone] = React.useState(false);
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const [Address, setAddress] = useState("CONNECT METAMASK");
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(allRequestsPlanOne());
        dispatch(allRequestsPlanTwo());
        dispatch(allRequestsPlanThree())
    }, [])
    let { planOneRequest } = useSelector(state => state.planOneWithdrawRequests);
    let { planTwoRequest } = useSelector(state => state.planTwoWithdrawRequests);
    let { planThreeRequest } = useSelector(state => state.planThreeWithdrawRequests);
    const drawer = (
        <div className="stakeNMSColor1" style={{ color: "white" }}>
            <div className="nav-side-menu">
                <div className="brand"><img src={logo1} alt="" /></div>

                <div className="menu-list mt-5">

                    <ul id="menu-content" className="menu-content ">


                        <li data-toggle="collapse" data-target="#products" className="collapsed active d-flex justify-content-between" >

                            <a href="#" className="heading-style"><FaPen icon="fa-regular fa-pen" style={{ margin: '8px' }} /> Update </a>
                            <span className="arrow"></span>
                        </li>

                        <ul className="sub-menu collapse" id="products">
                            <Link to='/admin/daily' className="sub-heading" style={{ textDecoration: 'none', color: 'white' }} ><li style={{ paddingTop: '15px', paddingBottom: "10px" }}>Daily</li></Link>

                            <Link to='/admin/tvl' className="sub-heading" style={{ textDecoration: 'none', color: 'white' }}><li style={{ paddingTop: '15px', paddingBottom: "10px" }}>TVL</li></Link>
                            <Link to='/admin/address' className="sub-heading" style={{ textDecoration: 'none', color: 'white' }}><li style={{ paddingTop: '15px', paddingBottom: "10px" }}>Address</li></Link>

                        </ul>
                        <li className="collapsed  d-flex justify-content-between  mt-4 " data-toggle="collapse" data-target="#users" >
                            <a href="#" className="heading-style"><HiUsers size={20} style={{ margin: '10px' }} /> Users</a>
                            <span className="arrow"></span>
                        </li>
                        <ul className="sub-menu collapse" id="users">
                            <Link to='/admin/users' className="sub-heading" style={{ textDecoration: 'none', color: 'white' }}>
                                <li style={{ paddingTop: '15px', paddingBottom: "10px" }}>All Users
                                </li>
                            </Link>
                            <Link to='/admin/depositeduser' className="sub-heading" style={{ textDecoration: 'none', color: 'white' }}>
                                <li style={{ paddingTop: '15px', paddingBottom: "10px" }}>Deposited List
                                    {/* <Badge style={{ padding: '14px 3px' }} badgeContent={4} color="success">
                                    </Badge> */}
                                </li>
                            </Link>
                        </ul>
                        <a href='#' style={{ textDecoration: 'none', color: 'white' }}>
                            <li data-toggle="collapse" data-target="#service" className="collapsed d-flex justify-content-between">
                                <a href="#" className="heading-style" ><GoGitPullRequest size={22} style={{ margin: '8px' }} /> Request
                                    <Badge style={{ padding: '14px 3px' }} badgeContent={planOneRequest.length + planTwoRequest.length + planThreeRequest.length}
                                        color="success">
                                    </Badge>
                                </a>

                                <span className="arrow"></span>
                            </li>
                        </a>

                        <ul className="sub-menu collapse" id="service">
                            <Link to='/admin/poineer' className="sub-heading" style={{ textDecoration: 'none', color: 'white' }}>
                                <li style={{ paddingTop: '15px', paddingBottom: "10px" }}>Poineer

                                </li>
                            </Link>
                            <Link to='/admin/advanced' className="sub-heading" style={{ textDecoration: 'none', color: 'white' }}>
                                <li style={{ paddingTop: '15px', paddingBottom: "10px" }}>Advanced
                                    {/* <Badge style={{ padding: '14px 3px' }} badgeContent={4} color="success">
                                    </Badge> */}
                                </li>
                            </Link>
                            <Link to='/admin/hero' className="sub-heading" style={{ textDecoration: 'none', color: 'white' }}>
                                <li style={{ paddingTop: '15px', paddingBottom: "10px" }}>Hero
                                    {/* <Badge style={{ padding: '14px 3px' }} badgeContent={4} color="success">
                                    </Badge> */}
                                </li>
                            </Link>
                        </ul>

                    </ul>
                </div>

            </div>


            <br />

        </div >
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;
    let { isAdmin, isUser } = useSelector(state => state.isAuth);

    const navigate = useNavigate()
    useEffect(() => {
        if (isAdmin) {
            navigate("/admin/daily")

        }
    }, [isAdmin])
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >

                <Toolbar style={{ backgroundColor: "rgb(30,35,43)", height: "auto   " }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography style={{ color: "white", display: "flex" }}>
                        <h1 className="admin-heading-style">Admin Panel</h1>

                    </Typography>
                </Toolbar>

            </AppBar>

            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
                style={{ backgroundColor: "rgb(23,25,27)" }}
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>

                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)`, },
                }}
            // style={{ backgroundColor: "#1B1E30", height: "auto" }}
            >
                <Toolbar />

                <Routes>
                    <Route path='/admin/daily' element={<HomePage />} />
                    <Route path='/admin/daily' element={<HomePage />} />
                    <Route path="/admin/address" element={<AdminAddress />} />
                    <Route path='/admin/tvl' element={<TVK />} />
                    <Route path='/admin/users' element={<AllUsers />} />
                    <Route path='/admin/depositeduser' element={<Users />} />
                    <Route path='/admin/poineer' element={<Requests />} />
                    <Route path='/admin/advanced' element={<Advanced />} />
                    <Route path='/admin/hero' element={<Hero />} />



                </Routes>
            </Box>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    /**
       * Injected by the documentation to work in an iframe.
       * You won't need it on your project.
       */
    window: PropTypes.func,
};

export default ResponsiveDrawer;