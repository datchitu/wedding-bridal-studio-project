import React from 'react'
import { useState, useEffect, useRef} from 'react';
import userApi from '../../api/userApi';
import InputForm from '../InputForm/InputForm';
import logo from '../../assets/images/logo.jpg';
import { useNavigate,Link} from 'react-router-dom';
import Swal from "sweetalert2";

const InfomationUserComponent = () => {
    const [user, setUser] = useState({});
    let history = useNavigate();
    const [firstNameError, setFirstNameError] = useState('');
    const [avatarError, setAvatarError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [identityCardError, setIdentityCardError] = useState('');
    const [addressError, setAddrressError] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        handleGetDetailsUser().then(r => {});
        window.scrollTo(0, 0);
    }, []);

    const updateSubmit = (e) => {
        e.preventDefault();
        handleValidation().then(r => {});
    }
    const handleValidation = async ()  => {
        console.log('=============== CHECK');
        let formIsValid = true;
        if (!user.avatar) {
            formIsValid = false;
            setAvatarError(
                "Avatar bị trống"
            );
            console.log("Avatar bị trống !!!");
            return false;
        } else {
            // console.log('----------- firstName: ', inputRegister.firstName);
            setAvatarError("");
            formIsValid = true;
        }

        if (!user.firstName.match(/^[A-Za-z\s_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]{1,30}$/)) {
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

        if (!user.lastName.match(/^[A-Za-z\s_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]{1,30}$/)) {
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

        if (!user.identityCard.match(/^[0-9]{9,12}$/)) {
            formIsValid = false;
            setIdentityCardError(
                "CMND/CCCD phải là kiểu số có độ dài từ 9 đến 12 ký tự"
            );
            // console.log("Last name phải là kiểu chữ có độ dài từ 1 đến 30 ký tự");
            return false;
        } else {
            // console.log('----------- lastName: ', inputRegister.lastName);
            setIdentityCardError("");
            formIsValid = true;
        }

        if (!user.address.match(/^[A-Za-z0-9\s_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]{1,200}$/)) {
            formIsValid = false;
            setAddrressError(
                "Địa chỉ phải là kiểu chữ và số có độ dài từ 1 đến 200 ký tự"
            );
            // console.log("Last name phải là kiểu chữ có độ dài từ 1 đến 30 ký tự");
            return false;
        } else {
            // console.log('----------- lastName: ', inputRegister.lastName);
            setAddrressError("");
            formIsValid = true;
        }
        

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
                    const response = await updateUser(user);
                    const promise = Promise.resolve(response);
                    promise.then(data => {
                        console.log(data);
                        if (data.code == 200) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Cập nhật thành công',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            if (data.data) {
                                // console.log(">>> check token decoded: ", decoded.sub)
                                setTimeout(function() {window.location.href = '/page/0';}, 1500)
                            }
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'error',
                                title: 'Cập nhật không thành công. Vui lòng kiểm tra lại thông tin !!!',
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
    const handleGetDetailsUser = async () => {
        try {
            let response = await userApi.getDeltailUserByDeleted(0);
            // console.log('----------- response:getProfile ', response);
            if(response.message === 'OK'){
                setUser(response.data);
                // console.log(">>> set user success")
            }
        } catch (e) {
            console.log("-----Expired");
        }
    }
    const updateUser = async (user) => {
        try {
            return await userApi.updateUser(user);
        } catch (e) {
            console.log("-----error");
        }
    };
    
    const handleImageClick = (e) => {
        inputRef.current.click();
    }

    const handleOnchangeAvatar = (e) => {
        const image = e.target.files[0];
        console.log(">>> check image: ", image);
        setUser({...user,"avatar": "./images/" + e.target.files[0].name})
    }

    const handleOnchangeFirstName = (e) => {
        setUser({...user,"firstName":e})
    }

    const handleOnchangeLastName = (e) => {
        setUser({...user,"lastName":e})
    }
    const handleOnchangeIdentityCard = (e) => {
        setUser({...user,"identityCard":e})
    }
    const handleOnchangeGender = (e) => {
        let gender;
        if (e.target.value === 'Nam') {
            gender = false;
        } else {
            gender = true;
        }
        setUser({...user,"gender":gender})
    }
    const handleOnchangeAddress = (e) => {
        setUser({...user,"address":e})
    }
    const handleChangePassword = () => {
        history(`/change-password`)
        // console.log("check user change: ", user);
    }

  return (
    <>
        <div className="container-fluid container-fluid__main">
            <row className="row_colection">
                <div className="col-sm-12 row_auth-col">
                    <form  onSubmit={updateSubmit} className="mb-5">
                        <h1 className="header_auth">Thông tin tài khoản</h1>
                        <div className="auth-form__form">
                            <div className="auth-form__group" onClick={handleImageClick}>
                                <div className="auth-form__avt" >
                                    <div className="auth-form__avt-icon" >
                                        <i className="fa-solid fa-circle-plus btn-icon"></i>
                                    </div>
                                    {user.avatar ? (
                                        <img src={user.avatar} alt={user.firstName}/>
                                    ) : (
                                        <img src={logo} alt={user.firstName}/>
                                    )}
                                    <input type="file" ref={inputRef} onChange={handleOnchangeAvatar} style={{ display: "none" }} />
                                </div>
                            </div>
                            <div className="auth-form__group">
                                {/* <input type="text" className="auth-form__input" placeholder="Họ"> */}
                                <InputForm placeholder="Họ" type="text"
                                                value={user.firstName} onChange={handleOnchangeFirstName} 
                                                errorMessage={firstNameError}
                                />
                            </div>
                            <div className="auth-form__group">
                                {/* <input type="text" className="auth-form__input" placeholder="Tên"> */}
                                <InputForm placeholder="Tên" type="text"
                                                value={user.lastName} onChange={handleOnchangeLastName} 
                                                errorMessage={lastNameError}
                                />
                            </div>
                            <div className="auth-form__group">
                                <p className="auth-form__input">{user.email}</p>
                                
                            </div>
                            <div className="auth-form__group">
                                <p className="auth-form__input">{user.phone}</p>
                            </div>
                            <div className="auth-form__group">
                                <InputForm placeholder="CMND/CCCD" type="text"
                                                value={user.identityCard} onChange={handleOnchangeIdentityCard} 
                                                errorMessage={identityCardError}
                                />
                            </div>
                            <div className="auth-form__group">
                                {/* <InputForm placeholder="Giới tính" type="text"
                                                value={user.gender === false ? 'Nam' : 'Nữ'} onChange={handleOnchangeGender} 
                                                errorMessage={genderError}
                                /> */}
                                <select className="auth-form__group_select" value={user.gender} name='gender' onChange={handleOnchangeGender}>
                                        <option> {user.gender === false ? 'Nam' : 'Nữ'}</option>
                                        <option> {user.gender === false ? 'Nữ' : 'Nam'}</option>
                            </select>
                            </div>
                            <div className="auth-form__group">
                                {/* <input type="text" className="auth-form__input" placeholder="CMND/CCCD"> */}
                                <InputForm placeholder="Địa chỉ" type="text"
                                                value={user.address} onChange={handleOnchangeAddress} 
                                                errorMessage={addressError}
                                />
                            </div>
                        </div>
                        <div className="auth-form__controls">
                            <button type="button" className="btn_cus btn--normal" onClick={handleChangePassword}>Thay đổi mật khẩu</button>
                            {!user.lastName || !user.firstName || !user.gender || !user.address || !user.identityCard ? (
                                <>
                                    <button 
                                    className="btn_cus btn_cus.btn--disable"> Cập nhật</button>
                                </>
                            ) : (
                                <>
                                    <button type="submit" className="btn_cus btn-primary">Cập nhật</button>
                                </>
                            )}
                            
                        </div>
                    </form>   
                </div>
            </row>
        </div>
    </>
  )
}

export default InfomationUserComponent