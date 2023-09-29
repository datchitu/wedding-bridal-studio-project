import React, { useEffect } from 'react'
import { useState} from 'react';
import userApi from '../../src/api/userApi';
import { useNavigate,Link} from 'react-router-dom';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import InputForm from './InputForm/InputForm';
import Swal from "sweetalert2";
import jwt_decode from 'jwt-decode';


function Login() {
    let history = useNavigate();
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [ inputLogin, setInputLogin] = useState({
        "email": '',
        "password": '',
    })
    // const [ detailsUser, setDetailsUser] = useState({});
    // const [ userData, setUserData] = useState({});
    const [emailError, setEmailError] = useState('');
    function handleOnchangeEmail(e) {
        setInputLogin({...inputLogin,"email":e})
    }
    function handleOnchangePassword(e) {
        setInputLogin({...inputLogin,"password":e})
    }
    const loginSubmit = (e) => {
        e.preventDefault();
        handleValidation().then(r => {});
    }

    const handleValidation = async ()  => {
        console.log('=============== CHECK');
        let formIsValid = true;
        if (!inputLogin.email.toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            formIsValid = false;
            setEmailError(
                "Không đúng định dạng email"
            );
            // console.log("Không đúng định dạng email");
            return false;
        } else {
            // console.log('----------- email: ', inputRegister.email);
            setEmailError("");
            formIsValid = true;
        }

        if (formIsValid === true) {
            const response = await login(inputLogin);
            const promise = Promise.resolve(response);
            promise.then(data => {
                console.log(data);
                if (data.code == 200) {
                    
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Đăng nhập thành công',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    if (data.data.token) {
                        const decoded = jwt_decode(data.data.token);
                        // console.log(">>> check token decoded: ", decoded.sub)
                        localStorage.setItem("accessToken", data.data.token);
                        localStorage.setItem("email", decoded.sub)
                        setTimeout(function() {window.location.href = '/page/0';}, 1500)
                    }
                } else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Email hoặc mật khẩu không khớp',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
              }).catch(err => {
                console.log(err);
              });
        }
    }
    const login = async (jsonData) => {
        return await userApi.login(jsonData);
    }

    const handleRegister = async(e) => {
        // console.log(">>> check user data response:", userData);
        history(`/register`);
    }

    const handleForget = async(e) => {
        // console.log(">>> check user data response:", userData);
        console.log(">>> check detail user:", handleGetDetailsUser());

    }

    const handleGetDetailsUser = async () => {
        return await userApi.getDeltailUserByDeleted(0);
    }
    
  return (
    <>
        <div className="container-fluid container-fluid_body">
            <div className="row row_main">
                <div className="col-sm-12 row_auth-col">
                    <form  onSubmit={loginSubmit} className="mb-5">
                        <h1 className="header_auth">Đăng nhập</h1>
                        <div className="auth-form__form">
                            <div className="auth-form__group">
                                <InputForm placeholder="Nhập email" type="email"
                                            value={inputLogin.email} onChange={handleOnchangeEmail}
                                            errorMessage={emailError}
                                />
                            </div>
                            <div className="auth-form__group">
                                <span
                                    onClick={() => setIsShowPassword(!isShowPassword)}
                                    style={{ 
                                        zIndex: 10,
                                        position: 'absolute',
                                        right: '10px',
                                        fontSize: '2.2rem'
                                    }}
                                >{
                                        isShowPassword ? (
                                            <EyeFilled />
                                        ) : (
                                            <EyeInvisibleFilled />
                                        )
                                    }
                                </span>
                                <InputForm placeholder="Nhập mật khẩu" type={isShowPassword ? "text" : "password"}
                                            value={inputLogin.password} onChange={handleOnchangePassword}
                                />
                            </div>
                        </div>
                        <div className="auth-form__aside">
                            <p className="auth-form__policy-text">
                                <a className="auth-form__text-link" onClick={(e) => handleForget(e)}>Quên mật khẩu?</a> hoặc
                                <a className="auth-form__text-link" onClick={(e) => handleRegister(e)}>Đăng ký</a>
                            </p>
                        </div>
                        <div className="auth-form__controls-login " style={{ margin: '50px 40%' }}>
                            {!inputLogin.email.length || !inputLogin.password ? (
                                <>
                                    <button 
                                    className="btn_cus btn_cus.btn--disable"> Đăng nhập</button>
                                </>
                            ) : (
                                <>
                                    <button 
                                    type="submit"
                                    className="btn_cus btn-primary"> Đăng nhập</button>
                                </>
                            )}
                            
                        </div>
                    </form>
                </div>
                {/* <div className="auth-form__socials">
                    <a href="" className="auth-form__socials--fb btn_cus btn--size-s">
                        <i className="auth-form__socials-icon fab fa-facebook-square"></i>
                        <span className="auth-form__socials-title">
                            Kết nối với Facebook
                        </span>
                    </a>
                    <a href="" className="auth-form__socials--gg btn_cus btn--size-s">
                        <i className="auth-form__socials-icon fab fa-google"></i>
                        <span className="auth-form__socials-title">
                            Kết nối với Google 
                        </span>
                    </a>
                </div> */}
            </div>
        </div>
    </>
  )
}

export default Login