import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Toast, ToastContainer } from 'react-bootstrap';
// import Toast from 'react-bootstrap/Toast'
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
export default function SignUp() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate()
    let [showData, setShowData] = useState("");
    let [show, setShow] = useState(false)
    const formSchema = Yup.object().shape({
        fullName: Yup.string()
            .required("Full name is mandatory"),
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
            )
        ,
        confirmPwd: Yup.string()
            .required('Password is mandatory')
            .oneOf([Yup.ref('password')], 'Passwords does not match'),
    })
    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, resetField, watch, formState: { errors } } = useForm(formOptions);
    const onSubmit = async (data) => {
        // https://next-app-server.herokuapp.com/api/user/signup
        let res = await axios.post(
            "https://next-server.nextgencrypto.org/api/user/signup",
            data
        )
        if (res.data.success) {
            navigate("/login")
        }
        setShowData(res.data.message)
        setShow(true)
        resetField("fullName");
        resetField("email");
        resetField("password")
        resetField("confirmPwd")
    };

    //   console.log(watch("example"));
    return (
        <div className="fluid-container img-fluid bgimg" >
            <ToastContainer position="top-center" className="p-3">
                <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide
                    bg="info"
                >
                    <Toast.Body>{showData}</Toast.Body>
                </Toast>
            </ToastContainer>
            <div class="container" >
                <div class="row justify-content-center mb-3" >
                    <div class="col-lg-6 col-md-6 col-sm-6">
                        <div class="card-title text-center">
                            <h2 class="pb-2 login-main-heading ">{t("createAccount")}</h2>
                        </div>
                        <div class=" shadow">
                            {/* <Card> */}
                            <div class="card-body text-start  ">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div class="mb-4">
                                        <label for="fullName" class="form-label form-heading lable-text">{t("fullName")}</label>
                                        <input type="text" placeholder={t("Typefullname")} class="form-control input-color"
                                            {...register("fullName", { required: true })}
                                        />
                                        {errors.fullName && <> &nbsp;<span style={{ color: "red" }}>{errors.fullName.message}</span></>}
                                    </div>
                                    <div class="mb-4">
                                        <label for="username" class="form-label form-heading lable-text">{t("email")}</label>
                                        <input type="text" placeholder={t("Typeyouremailaddress")} class="form-control input-color"
                                            {...register("email", { required: true })}
                                        />
                                        {errors.email && <> &nbsp;<span style={{ color: "red" }}>{errors.email.message}</span></>}
                                    </div>
                                    <div class="mb-4">
                                        <label for="password" class="form-label form-heading lable-text">{t("Password")} *</label>
                                        <input type="password" placeholder={t("TypePassword")} class="form-control input-color"
                                            {...register("password", { required: true })}
                                        />
                                        {errors.password && <> &nbsp;<span style={{ color: "red" }}>{errors.password.message}</span></>}
                                    </div>
                                    <div class="mb-4">
                                        <label for="confirmPassword" class="form-label form-heading lable-text">{t("confirmPassword")} *</label>
                                        <input type="password" placeholder={t("TypeConfirmPassword")} class="form-control input-color" id="password"
                                            {...register("confirmPwd", { required: true })}
                                        />
                                        {errors.confirmPwd && <> &nbsp;<span style={{ color: "red" }}>{errors.confirmPwd.message}</span></>}
                                    </div>

                                    <div class="d-grid btn-color">
                                        <button type="submit" class="btn text-light fs-5 pt-3 pb-3 fw-bold ">{t("signUp")}</button>
                                    </div>
                                    <div class="mb-4 mt-3">
                                        <span className='form-span lable-text form-label' for="remember" style={{ fontSize: "17px", fontWeight: "bold" }}>{t("Alreadyhaveaccount")} <Link to='/login'><a className='register' style={{ color: "#4EC04F", fontSize: "17px", fontWeight: "bold" }}>{t("loginHere")}</a></Link> </span>
                                    </div>
                                </form>
                            </div>
                            {/* </Card> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
