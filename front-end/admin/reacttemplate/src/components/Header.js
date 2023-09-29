import React, { useEffect, useState } from 'react';
import { useNavigate,Link} from 'react-router-dom';
import logo from '../../src/assets/images/logo.jpg';
import userApi from '../../src/api/userApi';

// import axios from 'axios';
// import _ from "lodash";

const Header = () => {
    // const [keyword, setKeyword] = useState("");
    const [user, setUser] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    let history = useNavigate();

    useEffect(() => {
        handleGetDetailsUser().then(r => {});
    }, []);
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
    const handleInfomation = () => {
        history(`/infomation-user`);
        // window.location.reload(true);
    }
    const handleHistoryPayment= () => {
        history(`/history-payment`);
        // window.location.reload(true);
    }
    const handleLogOut = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("email");
        window.location.href = ('/');
    }
    const handleListUser = () => {
        history(`/list-user`);
        // window.location.reload(true);
    }
    const handleListCategory = () => {
        history(`/list-category`);
        // window.location.reload(true);
    }
    const handleListService = () => {
        history(`/list-service`);
        // window.location.reload(true);
    }
    const handleListVariantService = () => {
        history(`/list-variant-service`);
        // window.location.reload(true);
    }
    const handleListTransaction = () => {
        history(`/list-transaction`);
        // window.location.reload(true);
    }
    const handleListVoucher = () => {
        history(`/list-voucher`);
        // window.location.reload(true);
    }
  return (
    <div className="container-fluid header_container-fluid" >
        <div className="row header_row">
            <div className="col-sm-1 header__row-col-1">
                <div className="hearder__logo">
                    <Link to='/' className="header__logo-home">
                        <img src={logo} alt="logo_weddingBridal"/>
                    </Link >
                </div>
            </div>
            <div className="col-sm-11 header_row-col-11">
                <nav className="header__navbar">
                    <ul className="header__navbar-list header__navbar-list-left">
                    </ul>
                    <ul className="header__navbar-list">
                        {user && user.email ? (
                            <>
                            {user.roles && user.roles.length > 0 && user.roles.map((item, index) => {
                                return(
                                    <>
                                        {item.roleName === "ADMIN" ? (
                                            <>
                                                <li className="header__navbar-item header__navbar-user admin">
                                                    <img src={logo} alt="" className="header__navbar-user-img"/>
                                                    <span className="header__navbar-user-name">{user.lastName}</span>
                                                    <ul className="header__navbar-user-menu">
                                                        <li className="header__navbar-user-item">
                                                            <Link to='/change-password' className=""><i className="header__navbar-icon fa-solid fa-key"></i>Thay đổi mật khẩu</Link>
                                                        </li>
                                                        <li className="header__navbar-user-item" onClick={() => handleListUser()}>
                                                            <Link to='/' className=""><i className="header__navbar-icon fa-regular fa-user"></i>Danh sách người dùng</Link>
                                                        </li>
                                                        <li className="header__navbar-user-item" onClick={() => handleListCategory()}>
                                                            <Link to='/' className=""><i className="header__navbar-icon fas fa-list"></i>Danh sách danh mục</Link>
                                                        </li>
                                                        <li className="header__navbar-user-item" onClick={() => handleListService()}>
                                                            <Link to='/' className=""><i className="header__navbar-icon fas fa-list"></i>Danh sách dịch vụ</Link>
                                                        </li>
                                                        <li className="header__navbar-user-item" onClick={() => handleListVariantService()}>
                                                            <Link to='/' className=""><i className="header__navbar-icon fas fa-list"></i>Danh sách biến thể dịch vụ</Link>
                                                        </li>
                                                        <li className="header__navbar-user-item" onClick={() => handleListVoucher()}>
                                                            <Link to='/' className=""><i className="header__navbar-icon fa-solid fa-ticket"></i>Danh sách Voucher</Link>
                                                        </li>
                                                        <li className="header__navbar-user-item" onClick={() => handleListTransaction()}>
                                                            <Link to='/' className=""><i className="header__navbar-icon fa-sharp fa-solid fa-clock-rotate-left"></i>Danh sách giao dịch</Link>
                                                        </li>
                                                        <li className="header__navbar-user-item" onClick={() => handleLogOut()}>
                                                            <Link className=""><i className="header__navbar-icon fa-solid fa-right-from-bracket" ></i>Đăng xuất</Link>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </>
                                        ) : (
                                            <>
                                                {item.roleName === "STAFF" ? (
                                                    <>
                                                    <li className="header__navbar-item header__navbar-user staff">
                                                        <img src={logo} alt="" className="header__navbar-user-img"/>
                                                        <span className="header__navbar-user-name">{user.lastName}</span>
                                                        <ul className="header__navbar-user-menu">
                                                            <li className="header__navbar-user-item">
                                                                <Link to='/' className=""><i className="header__navbar-icon fa-solid fa-circle-user"></i>Thông tin tài khoản</Link>
                                                            </li>
                                                            <li className="header__navbar-user-item">
                                                                <Link to='/' className=""><i className="header__navbar-icon fas fa-list"></i>Danh sách thành viên</Link>
                                                            </li>
                                                            <li className="header__navbar-user-item">
                                                                <Link to='/' className=""><i className="header__navbar-icon fa-solid fa-file-invoice-dollar"></i>Thanh toán hóa đơn</Link>
                                                            </li>
                                                            <li className="header__navbar-user-item">
                                                                <Link to='/' className=""><i className="header__navbar-icon fas fa-file-lines"></i>Lập hóa đơn</Link>
                                                            </li>
                                                            <li className="header__navbar-user-item">
                                                                <Link to='/' className=""><i className="header__navbar-icon fa-sharp fa-solid fa-calendar-check"></i>Xác nhận trả đồ thuê</Link>
                                                            </li>
                                                            <li className="header__navbar-user-item">
                                                                <Link to='/' className=""><i className="header__navbar-icon fa-sharp fa-solid fa-clock-rotate-left"></i>Doanh thu ca</Link>
                                                            </li>
                                                            <li className="header__navbar-user-item" onClick={() => handleLogOut()}>
                                                                <Link className=""><i className="header__navbar-icon fa-solid fa-right-from-bracket" ></i>Đăng xuất</Link>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    </>
                                                ) : (
                                                    <>
                                                        <li className="header__navbar-item header__navbar-user photograper">
                                                            {user.avatar ? (
                                                                <img src={`/${user.avatar}`} alt="user_avatar.jpg" className="header__navbar-user-img"/>
                                                            ) : (
                                                                <img src={logo} alt="user_avatar.jpg" className="header__navbar-user-img"/>
                                                            )}
                                                            <span className="header__navbar-user-name">{user.lastName}</span>
                                                            <ul className="header__navbar-user-menu">
                                                                <li className="header__navbar-user-item" onClick={() => handleInfomation()}>
                                                                    <Link className=""><i className="header__navbar-icon fa-solid fa-circle-user"></i>Thông tin tài khoản</Link>
                                                                </li>
                                                                <li className="header__navbar-user-item" onClick={() => handleHistoryPayment()}>
                                                                    <Link className=""><i className="header__navbar-icon fa-sharp fa-solid fa-clock-rotate-left"></i>Danh sách lịch chụp</Link>
                                                                </li>
                                                                <li className="header__navbar-user-item" onClick={() => handleLogOut()}>
                                                                    <Link className=""><i className="header__navbar-icon fa-solid fa-right-from-bracket"></i>Đăng xuất</Link>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </> 
                                )
                            })}
                            </>
                        ) : (
                            <>
                            <li className="header__navbar-item header__navbar-item-login">
                                <Link to='/' className="header__navbar-item-link">
                                    <i className="header__navbar-icon fa-solid fa-circle-user"></i>Đăng nhập</Link> 
                            </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </div>
    </div>
  )
}
export default Header;