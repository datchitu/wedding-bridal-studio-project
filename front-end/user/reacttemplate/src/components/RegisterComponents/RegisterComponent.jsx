import React from 'react'
import { useState} from 'react';
import userApi from '../../api/userApi';
import { useNavigate,Link} from 'react-router-dom';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import InputForm from '../InputForm/InputForm';
import Swal from "sweetalert2";


function Register() {
    let history = useNavigate();
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [ConfirmPasswordError, setConfirmPasswordError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [inputRegister, setInputRegister] = useState({
        "firstName": '',
        "lastName": '',
        "email": '',
        "password": '',
        "phone": '',
        "user_role": "USER"
    })

    const loginSubmit = (e) => {
        e.preventDefault();
        handleValidation().then(r => {});
    }

    const register = async (jsonData) => {
        return await userApi.register(jsonData);
    }

    const handleValidation = async ()  => {
        // console.log('=============== CHECK');
        let formIsValid = true;
        if (!inputRegister.firstName.match(/^[A-Za-z\s_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]{1,30}$/)) {
            formIsValid = false;
            setFirstNameError(
                "Họ phải là kiểu chữ có độ dài từ 1 đến 30 ký tự"
            );
            // console.log("First name phải là kiểu chữ có độ dài từ 1 đến 30 ký tự");
            return false;
        } else {
            // console.log('----------- firstName: ', inputRegister.firstName);
            setFirstNameError("");
            formIsValid = true;
        }

        if (!inputRegister.lastName.match(/^[A-Za-z\s_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]{1,30}$/)) {
            formIsValid = false;
            setLastNameError(
                "Tên phải là kiểu chữ có độ dài từ 1 đến 30 ký tự"
            );
            // console.log("Last name phải là kiểu chữ có độ dài từ 1 đến 30 ký tự");
            return false;
        } else {
            // console.log('----------- lastName: ', inputRegister.lastName);
            setLastNameError("");
            formIsValid = true;
        }

        if (!inputRegister.email.toLowerCase().match(
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

        if (!inputRegister.phone.match(
            /^(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})$/)) {
            formIsValid = false;
            setPhoneError(
                "Không đúng định dạng số điện thoại"
            );
            // console.log("Không đúng định dạng số điện thoại");
            return false;
        } else {
            // console.log('----------- phone: ', inputRegister.phone);
            setPhoneError("");
            formIsValid = true;
        }

        if (!inputRegister.password.match(
            /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{6,30}$/)) {
            formIsValid = false;
            setPasswordError(
                "Mật khẩu phải chứa 1 chữ cái, 1 số, 1 ký tự đặc biệt và độ dài từ 6-30 ký tự !"
            );
            // console.log("Mật khẩu phải chứa 1 chữ cái, 1 số, 1 ký tự đặc biệt và độ dài từ 6-30 ký tự !");
            return false;
        } else {
            // console.log('----------- password: ', inputRegister.password);
            setPasswordError("");
            formIsValid = true;
        }

        if (confirmPassword != inputRegister.password) {
            formIsValid = false;
            setConfirmPasswordError(
                "Xác nhận mật khẩu không khớp"
            );
            // console.log("Xác nhận mật khẩu không khớp");
            return false;
        } else {
            // console.log('Mật khẩu xác nhận khớp với mật khẩu: ', confirmPassword);
            setConfirmPasswordError("");
            formIsValid = true;
        }
        // console.log('----------- PASS');
        if (formIsValid === true) {
            const response = await register(inputRegister);
            const promise = Promise.resolve(response);
            promise.then(data => {
                console.log(data);
                if (data.code == 200) {
                    // localStorage.setItem("user", JSON.stringify(results.data.user));
                    // localStorage.setItem("accessToken", results.data.token_info.accessToken);
                    // dispatch(setTokenLogin(results.data));
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Đăng ký thành công',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    // console.log('------------- REGISTER@results => ', results);
                    setTimeout(function() {window.location.href = '/login'}, 1500);
                } else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Email đã tồn tại',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
              }).catch(err => {
                console.log(err);
              });
        }
    }
    
    const handleOnclickLogin = (e) => {
        history(`/login`);
    }
    const handleOnchangeFirstName = (e) => {
        setInputRegister({...inputRegister,"firstName":e})
    }
    const handleOnchangeLastName = (e) => {
        setInputRegister({...inputRegister,"lastName":e})
    }
    const handleOnchangeEmail = (e) => {
        setInputRegister({...inputRegister,"email":e})
    }
    const handleOnchangePhone = (e) => {
        setInputRegister({...inputRegister,"phone":e})
    }
    const handleOnchangePassword = (e) => {
        setInputRegister({...inputRegister,"password":e})
    }
    const handleOnchangeConfirmPassword = (e) => {
        setConfirmPassword(e);
    }

    return (
        <>
            <div className="container-fluid container-fluid_body">
            <div className="row row_main">
                <div className="col-sm-12 row_auth-col">
                    <form  onSubmit={loginSubmit} className="mb-5">
                        <h1 className="header_auth">Đăng ký</h1>
                        <div className="auth-form__form">
                            <div className="auth-form__group">
                                <InputForm placeholder="Nhập họ" type="text"
                                            value={inputRegister.firstName} onChange={handleOnchangeFirstName} 
                                            errorMessage={firstNameError}
                                />
                            </div>
                            <div className="auth-form__group">
                                <InputForm placeholder="Nhập tên" type="text"
                                            value={inputRegister.lastName} onChange={handleOnchangeLastName} 
                                            errorMessage={lastNameError}
                                />
                            </div>
                            <div className="auth-form__group">
                                <InputForm placeholder="Nhập email" type="email"
                                            value={inputRegister.email} onChange={handleOnchangeEmail} 
                                            errorMessage={emailError}
                                />
                            </div>
                            <div className="auth-form__group">
                                <InputForm placeholder="Nhập số điện thoại" type="text"
                                            value={inputRegister.phone} onChange={handleOnchangePhone}
                                            errorMessage={phoneError}
                                />
                            </div>
                            <div className="auth-form__group">
                                <span
                                    onClick={() => setIsShowPassword(!isShowPassword)}
                                    style={{ 
                                        zIndex: 0,
                                        position: 'absolute',
                                        right: '10px',
                                        fontSize: '2.2rem',
                                        cursor:'pointer'
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
                                        value={inputRegister.password} onChange={handleOnchangePassword}
                                        errorMessage={passwordError}
                                />
                            </div>
                            <div className="auth-form__group">
                            <span
                                    onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                                    style={{ 
                                        zIndex: 0,
                                        position: 'absolute',
                                        right: '10px',
                                        fontSize: '2.2rem',
                                        cursor:'pointer'
                                    }}
                                >{
                                        isShowConfirmPassword ? (
                                            <EyeFilled />
                                        ) : (
                                            <EyeInvisibleFilled />
                                        )
                                    }
                                </span>
                            <InputForm placeholder="Nhập lại mật khẩu" type={isShowConfirmPassword ? "text" : "password"}
                                value={confirmPassword} onChange={handleOnchangeConfirmPassword}
                                errorMessage={ConfirmPasswordError}
                            />
                            </div>
                        </div>
                        <div className="auth-form__aside">
                            <p className="auth-form__policy-text">
                                Bằng việc đăng ký, bạn đã đồng ý với Eco Garden về 
                                <a href="" className="auth-form__text-link">Điều khoản dịch vụ</a> &
                                <a href="" className="auth-form__text-link">Chính sách bảo mật</a>
                            </p>
                        </div>
                        <div className="auth-form__controls">
                            <button className="btn_cus btn--normal" onClick={handleOnclickLogin}>Đăng nhập</button>
                            {!inputRegister.firstName.length || !inputRegister.lastName.length || !inputRegister.email.length 
                                || !inputRegister.phone.length || !inputRegister.password.length || !confirmPassword.length ? (
                                    <>
                                        <button 
                                        className="btn_cus btn_cus.btn--disable"
                                        >Đăng ký</button>
                                    </>
                                ) : (
                                    <>
                                        <button 
                                        type="submit"
                                        className="btn_cus btn-primary"
                                        >Đăng ký</button>
                                    </>
                                )}
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}
export default Register