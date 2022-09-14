import React, { useState, useEffect } from 'react'
import { Nav, Container, NavDropdown, Navbar, Button, Modal, Dropdown } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import "./Navbar.css";
import { GlobalStyles } from "./globalStyles"
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import english from "../../Asset/english.png"
import france from "../../Asset/france-flag.png"
import italy from "../../Asset/italy-flag.png"
import { MdOutlineArrowDropDown } from 'react-icons/md';
import spain from "../../Asset/spain-flag.png"
import { useTranslation } from "react-i18next";
import { RiWallet3Line } from 'react-icons/ri';
import { loadWeb3 } from '../api';
import { red } from '@mui/material/colors';
import ForgotEmail from '../forgot/ForgotEmail';
import WitdhrawRequest from '../withdrawRequest/WitdhrawRequest';
import { useDispatch, useSelector } from 'react-redux';
import { getDailyValue, connectWallet } from '../../store/actions/actions';
import { IoMdClose } from 'react-icons/io';
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 77,
  height: 44,
  // padding: 7,

  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        // backgroundColor: "${({ theme }) => theme.body}",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 42,
    height: 42,
    marginRight: -8,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

export default function Navbars({ toggleTheme, logos, shieldLogo, isUser, theme }) {
  let { TVL } = useSelector(state => state.dailyDetail);
  let { acc } = useSelector(state => state.wallletAddress);
  let { depositedPlanOne, balancePlanOne } = useSelector(state => state.planOneData);
  let { depositedPlanTwo, balancePlanTwo } = useSelector(state => state.planTwoData);
  let { depositedPlanThree, balancePlanThree } = useSelector(state => state.planThreeData);
  let { requestMessage, requestSuccess } = useSelector(state => state.requestResponse);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  function handleClicks(lang) {
    i18n.changeLanguage(lang);
  }
  let [account, setAccount] = useState("Connect Wallet");
  let [ImgModalShow, setImgModalShow] = useState(false);
  const getWallet = (op) => {
    dispatch(connectWallet(op))
  }

  let [dropdown, setDropDown] = useState(false)
  let [updateDropDown, setUpdateDropDown] = useState({
    name: "English",
    image: english
  })

  let countrylist = [
    {
      name: "English",
      image: english
    },
    {
      name: "French",
      image: france
    },
    {
      name: "Spain",
      image: spain
    },
    {
      name: "Italian",
      image: italy
    }
  ]


  const changeNavigate = (image, name) => {

    setUpdateDropDown({
      name: name,
      image: image
    })
    if (name == "English") {
      handleClicks("en")
    } else if (name == "French") {
      handleClicks("fr")
    } else if (name == "Spain") {
      handleClicks("sp")
    } else if (name == "Italian") {
      handleClicks("it")
    }
  }
  const chnageDropdrwonLanguage = () => {
    if (i18n.language == "en") {
      setUpdateDropDown({
        name: "English",
        image: english
      })
    } else if (i18n.language == "fr") {
      setUpdateDropDown({
        name: "French",
        image: france
      })
    } else if (i18n.language == "sp") {
      setUpdateDropDown({
        name: "Spain",
        image: spain
      })
    } else if (i18n.language == "it") {
      setUpdateDropDown({
        name: "Italian",
        image: italy
      })
    }
  }
  useEffect(() => {
    chnageDropdrwonLanguage();
    getDailyValue();
  }, [])
  const [modalShow, setModalShow] = useState(false);
  useEffect(() => {
    setModalShow(false)
  }, [requestSuccess])
  return (
    <div className='nav-color' >
      <Navbar collapseOnSelect expand="lg" variant={theme} className='border-botto'>
        <Container className='d-flex align-items-start' style={{ padding: "0px 15px" }}>
          {/* <NavLink href="#x"><Link to="/"><img src="logo.png" alt="" /></Link></NavLink> */}

          <Navbar.Brand href="#home" className=''>
            <Link to='/'><img src={logos} alt="" className='logo-img logo-width' /></Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" className='my-3' />
          <Navbar.Collapse id="responsive-navbar-nav" >

            <div className='d-flex align-items-start justify-content-center texttop'  >
              {
                isUser && depositedPlanOne || depositedPlanTwo || depositedPlanThree ?
                  <span className=' ps-md-5 mt-4' onClick={() => setModalShow(true)} style={{ color: "#8A8EA8", fontSize: "17px", marginTop: '30px' }} role='button'>{t("navbar.3")}</span>
                  :
                  <span className=' ps-md-5'></span>

              }

              {/* <span className=' ps-md-5' role='button' onClick={() => setImgModalShow(true)} style={{ color: "#8A8EA8", fontSize: "17px" }}>{t("navbar.1")}</span> */}
              <Navbar.Brand href="#home" className=''>
                <Link to='/'><img src={shieldLogo} width='228px' alt="" className='logo-img mt-3 logo-width ps-md-5' /></Link>
              </Navbar.Brand>

            </div>

            <Modal
              show={ImgModalShow} onHide={() => {
                setImgModalShow(false)
              }}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >

              <Modal.Body className='modal-color' style={{ backgroundColor: "black", border: 'red 2px red' }}>
                <div className="row d-flex justify-content-center">
                  <div className="col-12 d-flex- justify-content-end">
                    <IoMdClose
                      onClick={() => setImgModalShow(false)}
                      size={28}
                      className="icon-color"
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
                <div class="row justify-content-center">

                  <div class="col-lg-9 col-md-6 col-sm-6">

                    <div className=" shado">
                      <div class="card-body text-start ">
                        <form >
                          <img className='HowItworksImg' src="HowItworks.jpeg" alt="" />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal.Body>
            </Modal>

            <Nav className="ms-auto" >


              <div>
                <div className="lang-select " id="newlocale"
                  onClick={() => setDropDown(!dropdown)}

                >

                  <button className="btn-select" ><ul><li><img src={updateDropDown.image} width="17px" /> <span className='ms-sm-1 mt-4'>{updateDropDown.name}</span> <MdOutlineArrowDropDown size={40} className="react-iconss me-4" style={{ color: "#8A8EA8" }} /></li></ul> </button>
                  <div className={dropdown ? "b shadow" : "b1"}>
                    <ul id="a">
                      {countrylist.map((item, index) => {
                        return <>
                          <li className=''
                            onClick={() => changeNavigate(item.image, item.name)}
                          ><img src={item.image} /> {item.name}</li>
                        </>
                      })}

                    </ul>
                  </div>
                </div>

                <div >

                  <WitdhrawRequest modalShow={modalShow} setModalShow={setModalShow} />
                </div>
              </div>

              <div >
                <div className='d-flex align-items-center justify-content-center ' >
                  {
                    !isUser &&
                    <>
                      <Link to="/login">
                        <button className='btn login-btn mx-2'>{t("navbar.2")}</button>
                      </Link>
                      <Link to={'/register'}>
                        <button className='btn register-btn pb-2 mx-2'>{t('register')}</button>
                      </Link>
                    </>
                  }

                  {
                    isUser && (
                      <Dropdown>
                        <Dropdown.Toggle variant="" id="dropdown-basic" className='btn connect-btn mx-3'>
                          {/* Connect Wallet*/}
                          {
                            acc === "No Wallet"
                              ? "Connect Wallet"
                              : acc === "Connect Wallet"
                                ? "Connect Wallet"
                                : acc === "Wrong Network"
                                  ? "Wrong Network"
                                  : acc === undefined ?
                                    "Wrong Network"
                                    : acc?.substring(0, 3) + "..." + acc?.substring(acc?.length - 3)
                          }
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='bg-transparent ms-3'>
                          <Dropdown.Item className='btn connect-btn ms-3' onClick={() => getWallet("56")}>Binance Smart Chain</Dropdown.Item>
                          <Dropdown.Item className='btn connect-btn mt-1 ms-3 ' onClick={() => getWallet("25")}>Cronos Chain</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      // <select name="" id="" className='btn connect-btn mx-3 fs-5'
                      // onChange={getWallet}
                      // >
                      //   <option value="" selected disabled hidden>Connect Wallet</option>
                      //   <option value="56" className='btn connect-btn mx-3 fs-5'>Binance Samrt Chain</option>
                      //   <option value="25" className='btn connect-btn mx-3 fs-5'>Cronos</option>
                      // </select>

                      // <button className='btn connect-btn mx-3'
                      //   onClick={getWallet}
                      // ><RiWallet3Line />&nbsp;{
                      //     acc === "No Wallet"
                      //     ? "Connect Wallet"
                      //     : acc === "Connect Wallet"
                      //     ? "Connect Wallet"
                      //     : acc === "Wrong Network"
                      //     ? "Wrong Network"
                      //     : acc === undefined ?
                      //       "Connect Wallet"
                      //       :acc?.substring(0, 3) + "..." + acc?.substring(acc?.length - 3)
                      //   }</button>
                    )
                  }
                </div>
                <br />

                <div className='ps-md-5 tvl-setting'>
                  <p className='mb-0  text-cl'>TVL</p>
                  <span className='mb-0 ps-md-4 text-cl1'>${TVL}K</span>
                </div>
              </div>
              <div className='d-flex justify-content-center align-items-start tvl-setting1' style={{ marginTop: "-8px" }}>
                <FormGroup className=''>
                  <FormControlLabel
                    onClick={toggleTheme}
                    control={
                      <MaterialUISwitch sx={{ m: 1 }} defaultChecked />
                    }
                    label=""
                  />
                  <GlobalStyles />
                </FormGroup>
              </div>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>

    </div>
  )
}
