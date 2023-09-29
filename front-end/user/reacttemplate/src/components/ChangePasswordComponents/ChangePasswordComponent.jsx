import React from 'react'
import { useState, useEffect} from 'react';
import userApi from '../../api/userApi';
import InputForm from '../InputForm/InputForm';
import { useNavigate,Link} from 'react-router-dom';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import Swal from "sweetalert2";

const ChangePasswordComponent = () => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowNewPassword, setIsShowNewPassword] = useState(false)
    const [isShowConfirmNewPassword, setIsShowConfirmNewPassword] = useState(false)
    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmNewPasswordError, setConfirmNewPasswordError] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    let history = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleInfomation = () => {
        history(`/infomation-user`)
        // console.log(">>> test click change password")
    }

    const changePasswordSubmit = (e) => {
        e.preventDefault();
        handleValidation().then(r => {});
    }

    const handleOnChangePassword = (e) => {
        setPassword(e)
    }
    const handleOnChangeNewPassword = (e) => {
        setNewPassword(e);
    }
    const handleOnChangeConfirmNewPassword = (e) => {
        setConfirmNewPassword(e);
    }
    const handleChangePassword = async (password, newPassword) => {
        return await userApi.changePassword(password, newPassword);
    }
    const handleValidation = async ()  => {
        // console.log('=============== CHECK');
        let formIsValid = true;
        if (!newPassword.match(
            /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{6,30}$/)) {
            formIsValid = false;
            setNewPasswordError(
                "Mật khẩu phải chứa 1 chữ cái, 1 số, 1 ký tự đặc biệt và độ dài từ 6-30 ký tự !"
            );
            // console.log("Mật khẩu phải chứa 1 chữ cái, 1 số, 1 ký tự đặc biệt và độ dài từ 6-30 ký tự !");
            return false;
        } else {
            // console.log('----------- password: ', inputRegister.password);
            setNewPasswordError("");
            formIsValid = true;
        }

        if (confirmNewPassword != newPassword) {
            formIsValid = false;
            setConfirmNewPasswordError(
                "Xác nhận mật khẩu không khớp"
            );
            // console.log("Xác nhận mật khẩu không khớp");
            return false;
        } else {
            // console.log('Mật khẩu xác nhận khớp với mật khẩu: ', confirmPassword);
            setConfirmNewPasswordError("");
            formIsValid = true;
        }
        // console.log('----------- PASS');
        if (formIsValid === true) {
            Swal.fire({
                title: 'Bạn có muốn cập nhật tài khoản ?',
                showDenyButton: true,
                // showCancelButton: true,
                confirmButtonText: 'Có',
                denyButtonText: `Không`,
              }).then(async(result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    const response = await handleChangePassword(password, newPassword);
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
                                title: 'Thay đổi mật khẩu thành công',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            // console.log('------------- REGISTER@results => ', results);
                            setTimeout(function() {history(`/infomation-user`)}, 1500);
                        } else if(data.code == 4016){
                            Swal.fire({
                                position: 'top-end',
                                icon: 'error',
                                title: 'Mật khẩu cũ không khớp',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'error',
                                title: 'Mật khẩu trùng mặt khẩu cũ',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                      }).catch(err => {
                        console.log(err);
                      });
                } else if (result.isDenied) {
                }
              })
        }
    }

  return (
    <>
        <div className="container-fluid container-fluid__main">
            <row className="row_colection">
                <div className="col-sm-12 row_auth-col">
                    <form  onSubmit={changePasswordSubmit} className="mb-5">
                        <h1 className="header_auth">Thay đổi mật khẩu</h1>
                        <div className="auth-form__form">
                            <div className="auth-form__group">
                                {/* <input type="password" className="auth-form__input" placeholder="Nhập mật khẩu cũ"/> */}
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
                                <InputForm placeholder="Nhập mật khẩu cũ" type={isShowPassword ? "text" : "password"}
                                                value={password} onChange={handleOnChangePassword}
                                    />
                            </div>
                            <div className="auth-form__group">
                                {/* <input type="password" className="auth-form__input" placeholder="Nhập mật khẩu mới"/> */}
                                <span
                                        onClick={() => setIsShowNewPassword(!isShowNewPassword)}
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
                                <InputForm placeholder="Nhập mật khẩu mới" type={isShowNewPassword ? "text" : "password"}
                                                value={newPassword} onChange={handleOnChangeNewPassword}
                                                errorMessage={newPasswordError}
                                    />
                            </div>
                            <div className="auth-form__group">
                                {/* <input type="password" className="auth-form__input" placeholder="Nhập lại mật khẩu"/> */}
                                <span
                                        onClick={() => setIsShowConfirmNewPassword(!isShowConfirmNewPassword)}
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
                                <InputForm placeholder="Nhập lại mật khẩu mới" type={isShowConfirmNewPassword ? "text" : "password"}
                                                value={confirmNewPassword} onChange={handleOnChangeConfirmNewPassword}
                                                errorMessage={confirmNewPasswordError}
                                    />
                            </div>
                        </div>
                        <div className="auth-form__controls">
                            <button className="btn_cus btn--normal" onClick={handleInfomation}>Thông tin tài khoản</button>
                            {!password || !newPassword || !confirmNewPassword ? (
                                <button className="btn_cus btn_cus.btn--disable">Đổi mật khẩu</button>
                            ) : (
                                <button type="submit" className="btn_cus btn-primary" >Đổi mật khẩu</button>
                            )}
                        </div>
                    </form>
                </div>  
            </row>
        </div>
    </>
  )
}

export default ChangePasswordComponent