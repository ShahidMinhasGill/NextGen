import React, { useState } from 'react'
import axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useTranslation } from "react-i18next";
import { Modal, Toast, ToastContainer } from 'react-bootstrap';
import { IoMdClose } from "react-icons/io";

import ForgotPassword from './ForgotPassword';
function ForgotEmail({ modalShow, setModalShow }) {
    let [showForPass, setShowForPass] = useState(false);
    let [showData, setShowData] = useState("");
    let [show, setShow] = useState(false);
    let [searchData, setSearchData] = useState("")
    const { t, i18n } = useTranslation();
    const formSchema = Yup.object().shape({
        email: Yup.string()
            .required("Email is mandatory")
            .matches(
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Enter a valid email address"
            )
    })
    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, resetField, watch, formState: { errors } } = useForm(formOptions);
    const onSubmit = async (data) => {
        let res = await axios.get(
            `https://next-app-server.herokuapp.com/api/user/forgot?email=${data.email}`
        )
        console.log("responce", res.data);
        if (res.data.success) {
            setShowForPass(true);
            setModalShow(false);
            setSearchData(data.email)
            resetField("email");
        } else {
            setShow(true);
            setShowData(res.data.message)
        }

    }
    return (
        <div>
            <ToastContainer position="top-center" className="p-3">
                <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide
                    bg="info"
                >
                    <Toast.Body>{showData}</Toast.Body>
                </Toast>
            </ToastContainer>
            <ForgotPassword showForPass={showForPass} setShowForPass={setShowForPass} searchData={searchData} />
            <Modal
                show={modalShow} onHide={() => {
                    setModalShow(false)
                }}

                aria-labelledby="contained-modal-title-vcenter"
                centered
            >

                <Modal.Body className='modal-color'>
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 d-flex- justify-content-end">
                            <IoMdClose
                                onClick={() => setModalShow(false)}
                                size={28}
                                className="icon-color"
                                style={{ cursor: "pointer" }}
                            />
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-lg-9 col-md-6 col-sm-6">
                            <div class="card-title text-center">
                                <h2 class=" login-main-heading">{t("EnterEmail")}</h2>
                            </div>
                            <div className=" shadow">
                                <div class="card-body text-start ">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mb-4">
                                            <label for="username" className="form-label form-heading lable-text">{t('email')}</label>
                                            <input type="email" placeholder={t("Typeyouremailaddress")} class="form-control input-color" id="forgotEmail"
                                                {...register("email", { required: true })}
                                            />
                                            {errors.email && <> &nbsp;<span style={{ color: "red" }}>{errors.email.message}</span></>}
                                        </div>
                                        <div class="d-grid btn-color">
                                            <button type="submit" class="btn text-light">{t("Confirm")}</button>
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

export default ForgotEmail