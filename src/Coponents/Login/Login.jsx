import React, { useEffect, useState } from 'react';
import { Card, Toast, ToastContainer } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './Login.css';
import ForgotEmail from '../forgot/ForgotEmail';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { userLogin } from '../../store/actions/actions'
export default function Login({ setIsUser }) {

    let { success, isShow, message, userData, isAdmin } = useSelector(state => state.isAuth);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate()
    const [modalShow, setModalShow] = useState(false);
    let [showData, setShowData] = useState("");
    let [show, setShow] = useState(isShow)
    const formSchema = Yup.object().shape({
        email: Yup.string()
            .required("Email is mandatory")
            .matches(
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Enter a valid email address"
            ),
        password: Yup.string()
            .required('Password is mandatory')
            .min(8, 'Password must be at 8 char long')
            .matches(
                /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character (!@#$*)"
            ),

    })

    useEffect(() => {
        if (success) {
            navigate("/dashboard");

        }
    }, [success])
    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, reset, resetField, watch, formState: { errors } } = useForm(formOptions);
    const onSubmit = async (data) => {
        dispatch(userLogin(data));
        resetField("password")
    }

    return (
        <div className="fluid-container img-fluid bgimg1">
            <ToastContainer position="top-center" className="p-3">
                <Toast onClose={() => setShow(false)} show={isShow} delay={3000} autohide
                    bg="info"
                >
                    <Toast.Body>{message}</Toast.Body>
                </Toast>
            </ToastContainer>
            <div className="container">
                <div className="row justify-content-center mb-3">
                    <div className="col-lg-5 col-md-6 col-sm-6">
                        <div className="card-title text-center">
                            <h2 className="pb-2 login-main-heading">{t("loginAccount")}</h2>
                        </div>
                        <div className=" shadow">
                            <div className="card-body text-start ">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-4">
                                        <label for="username" className="form-label form-heading lable-text">{t('UsernameEmail')}</label>
                                        <input type="text" placeholder={t("Typeyouremailaddress")} class="form-control input-color" id="username"
                                            {...register("email", { required: true })}
                                        />
                                        {errors.email && <> &nbsp;<span style={{ color: "red" }}>{errors.email.message}</span></>}
                                    </div>
                                    <div className="mb-4">
                                        <div className='d-flex flex-row justify-content-between align-items-center'>

                                            <label for="password" class="form-label form-heading lable-text">{t("Password")}</label>
                                            <span className='forget ' data-bs-toggle="modal" onClick={() => setModalShow(true)}>{t("Forget")}</span>
                                        </div>

                                        <input type="password" placeholder={t("TypePassword")} class="form-control input-color" id="password"
                                            {...register("password", { required: true })}
                                        />
                                        {errors.password && <> &nbsp;<span style={{ color: "red" }}>{errors.password.message}</span></>}
                                    </div>

                                    <div className="d-grid btn-color">
                                        <button type="submit" className="btn text-light fs-5 pt-3    pb-3 fw-bold ">{t("navbar.2")}</button>
                                    </div>
                                    <div className="mb-4 mt-3">
                                        {/* <span className='form-span lable-text form-label' for="remember" >{t('DontHaveAccount')}?&nbsp;   */}
                                        <Link to='/register'><a className='register' style={{ color: "#4EC04F", fontSize: "17px", fontWeight: "bold" }}>{t('RegisterHere')}</a></Link>
                                        {/* </span> */}
                                    </div>
                                </form>

                                <div >
                                    <ForgotEmail modalShow={modalShow} setModalShow={setModalShow} />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
