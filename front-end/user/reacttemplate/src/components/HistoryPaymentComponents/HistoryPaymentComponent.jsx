import React from 'react'
import { useState, useEffect} from 'react';
import userApi from '../../api/userApi';
// import { useNavigate,Link} from 'react-router-dom';
// import Swal from "sweetalert2";
import HistoryPaymentLineItem from './HistoryPaymentLineItem';
import transactionUserApi from '../../api/transactionUserApi';

const HistoryPaymentComponent = () => {
    // let history = useNavigate();
    const [ status, setStatus ] = useState('0');
    const [ userId, setUserId ] = useState('');
    const [ transactionUserArr, setTransactionUserArr ] = useState([]);

    useEffect(() => {
        findUserByEmail().then(r => {});
        getTransactionUser(userId, status).then(r => {});
        window.scrollTo(0, 0);
    }, [userId, status]);

    const handleAllTransaction = (num) => {
        // setUser({...user,"firstName":e})
        setStatus(num);
    }
    const handlePaid = (e) => {
        // setUser({...user,"firstName":e})
        console.log("Check status: ", status)
    }
    const handleUnPaid = (e) => {
        // setUser({...user,"firstName":e})
        // console.log(">>> check status transaction user: ", transactionUserArr);
    }
    const handleDeleted = (num) => {
        // setUser({...user,"firstName":e})
        // setStatus(num);
        // console.log(">>>> check transaction user", transactionUserArr)
    }
    const findUserByEmail = async () => {
        const response = await userApi.getDeltailUserByDeleted(0);
        const promise = Promise.resolve(response);
        promise.then(data => {
            // console.log(data);
            if (data.code == 200) {
                setUserId(data.data.id);
                // console.log("Check user id: ", data.data.id);
            }
            }).catch(err => {
            console.log(err);
            });
    };
    const getTransactionUser = async (id, status) => {
        // try {
        //     let response = await transactionUserApi.getTransactionUserByUserIdAndDeleted(id, status);
        //     if(response.message === 'OK') {
        //         let result = response.data
        //         let _transasctionUserArr = []
        //     for (let key in result) {
        //         _transasctionUserArr.push( result[key])
        //     }
        //         setTransactionUserArr(_transasctionUserArr);
        //     } else {
        //         setTransactionUserArr([]);
        //     }
        // } catch (e) {
        //     console.log("-----Expired");
        // }
        const response = await transactionUserApi.getTransactionUserByUserIdAndDeleted(id, status);
        const promise = Promise.resolve(response);
        promise.then(data => {
            // console.log(data);
            if (data.code == 200) {
                let result = data.data;
                let _transasctionUserArr = [];
                for (let key in result) {
                    _transasctionUserArr.push( result[key])
                }
                    setTransactionUserArr(_transasctionUserArr);
            }
            }).catch(err => {
            console.log(err);
            });
    }
  return (
    <div className="container-fluid container-fluid_history-payment">
            <div className="row row_colection">
                <div className="col-sm-12 col-sm-12_history-payment">
                    <div className="contact_title">
                        <h1 className="contact_title-h1">Lịch sử thanh toán</h1>
                    </div>
                    <div className="payment_buttons">
                        <button type="submit" id="checkout" className="btn-primary btn-pay" name="checkout" value onClick={() => handleAllTransaction(0)}>Tất cả</button>
                        {/* <button type="submit" id="update-cart" className="btn-primary btn-update" name="update" value onClick={() => handlePaid()}>Đã thanh toán</button>
                        <button type="submit" id="update-cart" className="btn-primary btn-update" name="update" value onClick={() => handleUnPaid()}>Chưa thanh toán</button> */}
                        <button type="button" id="update-cart" className="btn-primary btn-update" onClick={() => setStatus(1)}>Đã xóa</button>
                    </div>
                    <form action="/cart" method="post" id="cartformpage" >
                        <table width="100%">
                            <thead className="table_thread">
                                <tr>
                                    <th className="image">Mã hóa đơn</th>
                                    <th className="price">Tổng tiền</th>
                                    <th className="quantity">Loại thanh toán</th>
                                    <th className="price">Trạng thái thanh toán</th>
                                    <th className="price">Trạng thái thực hiện</th>
                                    <th className="remove">Ngày tạo</th>
                                    <th className="remove">Ngày thanh toán</th>
                                    <th className="remove">Chi tiết</th>
                                    <th className="remove">Xóa/Kích hoạt</th>
                                </tr>
                            </thead>
                            {}
                            {transactionUserArr && transactionUserArr.length > 0 && transactionUserArr.map((item, index) => {
                            return (
                                <HistoryPaymentLineItem
                                    key={index}
                                    transactionUserId = {item.id}
                                    transactionId = {item.transactionId}
                                    transactionUserStatus = {item.status}
                                    transactionUserDeleted = {item.deleted}
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

export default HistoryPaymentComponent