import React from 'react'
import { useState, useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import UserLineItem from './UserLineItem';
// import Swal from "sweetalert2";
import userApi from '../../../api/userApi';


const UserComponent = () => {
    let history = useNavigate();
    const [ status, setStatus ] = useState('0');
    const [ userArr, setUserArr ] = useState([]);

    useEffect(() => {
        getUser(status, 0).then(r => {});
        window.scrollTo(0, 0);
    }, [status]);

    const handleAddNewuser = () => {
        history(`/add-user`);
    }

    const getUser = async (status) => {
        const response = await userApi.getAllUserByDeleted(status, 0);
        const promise = Promise.resolve(response);
        promise.then(data => {
            console.log(data);
            if (data.code == 200) {
                let result = data.data;
                let _userArr = [];
                for (let key in result) {
                    _userArr.push( result[key])
                }
                setUserArr(_userArr);
            }
            }).catch(err => {
            console.log(err);
            });
    }
  return (
    <div className="container-fluid container-fluid_history-payment">
            <div className="row row_colection">
                <div className="col-sm-12 col-sm-12_history-payment">
                    <div className="contact_title" >
                        <h1 className="contact_title-h1" >Danh sách người dùng</h1>
                    </div>
                    <div className="payment_buttons">
                        <button type="button" id="checkout" className="btn-primary btn-pay" onClick={() => setStatus(0)}>Tất cả</button>
                        <button type="button" id="update-cart" className="btn-primary btn-update" onClick={() => setStatus(1)}>Đã xóa</button>
                        <button type="button" id="update-cart" className="btn-primary btn-update" onClick={() => handleAddNewuser()}>Thêm mới</button>
                    </div>
                    <form action="/cart" method="post" id="cartformpage" >
                        <table width="100%">
                            <thead className="table_thread">
                                <tr>
                                    <th className="image">Mã người dùng</th>
                                    <th className="price">Họ</th>
                                    <th className="price">Tên</th>
                                    <th className="price">Email</th>
                                    <th className="price">Số điện thoại</th>
                                    <th className="quantity">Giới tính</th>
                                    <th className="quantity">Trạng thái</th>
                                    <th className="quantity">Quyền</th>
                                    <th className="price">Thay đổi mật khẩu</th>
                                    <th className="remove">Xóa/Kích hoạt</th>
                                </tr>
                            </thead>
                            {}
                            {userArr && userArr.length > 0 && userArr.map((item, index) => {
                            return (
                                <UserLineItem
                                    key={index}
                                    userId = {item.id}
                                />
                                )
                            })}
                        </table>
                    </form>
                </div>   
            </div>
        </div>
  )
}

export default UserComponent