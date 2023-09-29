import React, { useEffect, useState } from 'react';
import { useNavigate,Link} from 'react-router-dom';
import logo from '../../src/assets/images/logo.jpg';
import userApi from '../../src/api/userApi';

// import axios from 'axios';
// import _ from "lodash";

const Header = () => {
    const [keyword, setKeyword] = useState("");
    const [user, setUser] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    let history = useNavigate();

    useEffect(() => {
        handleGetDetailsUser().then(r => {});
    }, []);

    const handleViewSearchResult = (keyword) => {
        history(`/result/${keyword}`)
        window.location.reload(true);
    };
    const handleViewHome = () => {
        history(`/page/0`);
        window.location.reload(true);
    };
    const handleViewWeddingDress = () => {
        history(`/result/vay`);
        window.location.reload(true);
    };
    const handleViewMakeup = () => {
        history(`/category/11`);
        window.location.reload(true);
    };

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
                                <li className="header__navbar-item">
                                    <Link className="header__navbar-item-link header__navbar-item-link--separate" onClick={() => handleViewHome()}>Trang chủ</Link>
                                </li>
                                <li className="header__navbar-item">
                                    <Link className="header__navbar-item-link header__navbar-item-link--separate" onClick={() => handleViewMakeup()}>Trang điểm</Link>
                                </li>
                                <li className="header__navbar-item">
                                    <Link className="header__navbar-item-link header__navbar-item-link--separate" onClick={() => handleViewWeddingDress()}>Váy cô dâu</Link>
                                </li>
                            </ul>
                            <ul className="header__navbar-list">
                                <li className="header__navbar-item header__navbar-cart cart">
                                    <Link to='/cart' className="header__navbar-item-link">
                                        <i className="header__navbar-icon fa-solid fa-bag-shopping"></i>Giỏ hàng</Link>
                                </li>
                                {user && user.lastName ? (
                                    <>
                                    <li className="header__navbar-item header__navbar-user user">
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
                                                <Link className=""><i className="header__navbar-icon fa-sharp fa-solid fa-clock-rotate-left"></i>Lịch sử thanh toán</Link>
                                            </li>
                                            <li className="header__navbar-user-item" onClick={() => handleLogOut()}>
                                                <Link className=""><i className="header__navbar-icon fa-solid fa-right-from-bracket" ></i>Đăng xuất</Link>
                                            </li>
                                        </ul>
                                    </li>
                                    </>
                                ) : (
                                    <>
                                    <li className="header__navbar-item header__navbar-item-login">
                                        <Link to='/login' className="header__navbar-item-link">
                                            <i className="header__navbar-icon fa-solid fa-circle-user"></i>Đăng nhập</Link> 
                                    </li>
                                    </>
                                )}
                                
                                
                                {/* <li className="header__navbar-item header__navbar-user staff">
                                    <img src={logo} alt="" className="header__navbar-user-img"/>
                                    <span className="header__navbar-user-name">Tên nhân viên</span>
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
                                        <li className="header__navbar-user-item">
                                            <Link to='/'className=""><i className="header__navbar-icon fa-solid fa-right-from-bracket"></i>Đăng xuất</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="header__navbar-item header__navbar-user admin">
                                    <img src={logo} alt="" className="header__navbar-user-img"/>
                                    <span className="header__navbar-user-name">Admin</span>

                                    <ul className="header__navbar-user-menu">
                                        <li className="header__navbar-user-item">
                                            <Link to='/' className=""><i className="header__navbar-icon fa-solid fa-key"></i>Thay đổi mật khẩu</Link>
                                        </li>
                                        <li className="header__navbar-user-item">
                                            <Link to='/' className=""><i className="header__navbar-icon fas fa-list"></i>Danh sách thành viên</Link>
                                        </li>
                                        <li className="header__navbar-user-item">
                                            <Link to='/' className=""><i className="header__navbar-icon fas fa-list"></i>Danh sách nhân viên</Link>
                                        </li>
                                        <li className="header__navbar-user-item">
                                            <Link to='/' className=""><i className="header__navbar-icon fa-solid fa-location-dot"></i>Danh sách địa điểm</Link>
                                        </li>
                                        <li className="header__navbar-user-item">
                                            <Link to='/' className=""><i className="header__navbar-icon fa-solid fa-ticket"></i>Danh sách vé và dịch vụ</Link>
                                        </li>
                                        <li className="header__navbar-user-item">
                                            <Link to='/' className=""><i className="header__navbar-icon fa-sharp fa-solid fa-clock-rotate-left"></i>Doanh thu tổng</Link>
                                        </li>
                                        <li className="header__navbar-user-item">
                                            <Link to='/' className=""><i className="header__navbar-icon fa-solid fa-right-from-bracket"></i>Đăng xuất</Link>
                                        </li>
                                    </ul>
                                </li> */}
                            </ul>
                        </nav>
                        <div className="header-with-search">
                            <div className="header__search">
                                <div className="header__search-input-wrap">
                                    <input 
                                        type="text" className="header__search-input" 
                                        placeholder="Tìm kiếm dịch vụ"
                                        value={keyword}
                                        onChange={(event) => setKeyword(event.target.value)}
                                        />
                                    <div className="header__search-history">
                                        <h3 className="header__search-history-heading">Lịch sử tìm kiếm</h3>
                                        <ul className="header__search-history-list">
                                            <li className="header__search-history-item">
                                                <Link className="" >Váy cô dâu</Link>
                                            </li>
                                            <li className="header__search-history-item">
                                                <Link to='/' className="">Trang điểm</Link>
                                            </li>
                                            <li className="header__search-history-item">
                                                <Link to='/' className="">Chụp hình cưới</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <button type="submit" className="header__search-btn" onClick={() => handleViewSearchResult(keyword)}>
                                    <i className="header__search-btn-icon fas fa-search "></i>
                                </button>
                            </div>
                                
                        </div>
                    </div>
                </div>
            </div>
  )
}
export default Header;