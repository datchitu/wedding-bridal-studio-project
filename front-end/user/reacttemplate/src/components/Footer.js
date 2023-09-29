import React from 'react'
import logo from '../../src/assets/images/logo.jpg'


function Footer() {
  return (
    <div className="container-fluid container-fluid__footer">
                <div className="row footer_row-top">
                    <div className="col-sm-4 footer_top-left">
                        <div className="footer_row-top-left">
                            <img src={logo} alt="weđing-bridal-logo"/>
                            <h1 className="footer_row-h1">Wedding Bridal Studio</h1>
                            <p className="footer_row-content">Địa chỉ: 256 Hồ Văn Huê, P.9, Q.Phú Nhuận, HCM.</p>
                            <p className="footer_row-content">Hotline: 092554875</p>
                            <p className="footer_row-content">Email:  weddingbridalstudio@gmail.com</p>
                            <h1 className="footer_row-h1">Theo dõi chúng tôi trên</h1>
                            <li className="footer_row-top-left-fl">
                                <a href="" className="footer_row-item">
                                    <i className="footer_row-icon fab fa-facebook">
                                        Facebook
                                    </i>
                                    
                                </a>
                                <a href="" className="footer_row-item">
                                    <i className="footer_row-icon fab fa-instagram">
                                        Instagram
                                    </i>
                                    
                                </a>
                            </li>
                        </div>
                    </div>
                    <div className="col-sm-8 footer_top-right">
                        <div className="footer_row-top-right">
                            <h1 className="footer_row-h1">Bản đồ</h1>
                        </div>
                    </div>
                </div>
                <div className="row footer_row-bot">
                    <h2 className="footer_row-bot-content">Wedding Bridal Studio, Hồ Chí Minh 2023 - All rights reserved</h2>
                </div>
            </div>
  )
}

export default Footer