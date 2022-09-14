import React,{useState} from 'react'
import axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { IoMdClose } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { Modal, Toast, ToastContainer } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
function ForgotPassword({ showForPass, setShowForPass, searchData }) {
    const naviage = useNavigate();
    const { t, i18n } = useTranslation();
    let [showData, setShowData]=useState("");
    let [show, setShow] = useState(false);
    const formSchema = Yup.object().shape({
        password: Yup.string()
        .required('Password is mandatory')
        .min(8, 'Password must be at 8 char long')
      .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          // /[0-9]/, /[a-z]/, /[A-Z]/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        )
        ,
      confirmPwd: Yup.string()
        .required('Password is mandatory')
        .oneOf([Yup.ref('password')], 'Passwords does not match'),
    })
    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit,resetField, watch, formState: { errors } } = useForm(formOptions);
    const onSubmit = async (data) => {
        console.log("data", data);
        let updateData = {
            email:searchData,
            password:data.password
        }
        let res = await axios.put(
            "https://next-app-server.herokuapp.com/api/user/updatePassword", updateData)
        console.log("responce", res);
        if(res.data.success){
            naviage("/login");
            setShowForPass(false)
            setShow(true);
            setShowData(res.data.message);
            resetField("password")
        resetField("confirmPwd")
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
            <Modal
                show={showForPass} onHide={() => {
                    setShowForPass(false)
                }}

                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                {/* <Modal.Header closeButton>
                </Modal.Header> */}
                <Modal.Body className='modal-color'>
                <div className="row d-flex justify-content-center">
                    <div className="col-12 d-flex- justify-content-end">
                      <IoMdClose
                        onClick={() => setShowForPass(false)}
                        size={28}
                        className="icon-color"
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </div>
                    <div class="row justify-content-center ">
                        <div class="col-lg-10 col-md-6 col-sm-6">
                            <div class="card-title text-center">
                                <h2 class=" login-main-heading">{t("NewPassword")}</h2>
                            </div>
                            <div className=" shadow">
                                <div class="card-body text-start ">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mb-4">
                                            <label for="pasword" className="form-label form-heading lable-text">{t('Password')}</label>
                                            <input type="password" placeholder={t("TypeNewPassword")} class="form-control input-color" id="username"
                                             {...register("password", { required: true })}
                                             />
                                             {errors.password &&<> &nbsp;<span style={{color:"red"}}>{errors.password.message}</span></>}
                                        </div>
                                        <div className="mb-4">
                                            <label for="pasword" className="form-label form-heading lable-text">{t('confirmPassword')}</label>
                                            <input type="password" placeholder={t("TypeConfirmPassword")} class="form-control input-color" id="username"
                                            {...register("confirmPwd", { required: true })}
                                            />
                                            {errors.confirmPwd &&<> &nbsp;<span style={{color:"red"}}>{errors.confirmPwd.message}</span></>}
                                        </div>


                                        <div class="d-grid btn-color">
                                            <button type="submit"  class="btn text-light">{t("Submit")}</button>
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

export default ForgotPassword