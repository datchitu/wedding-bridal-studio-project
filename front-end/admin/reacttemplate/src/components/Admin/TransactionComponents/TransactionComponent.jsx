import React from 'react'
import { useState, useEffect} from 'react';
import TransactionLineItem from './TransactionLineItem';
import transactionUserApi from '../../../api/transactionUserApi';
import formatPrice from "../../../utils/util_price"

const TransactionComponent = () => {
    // let history = useNavigate();
    const [ status, setStatus ] = useState('0');
    const [ transactionUserArr, setTransactionUserArr ] = useState([]);
    
    const totalPrice = 0;

    useEffect(() => {
        getTransactionUser(status, 0).then(r => {});
        
        window.scrollTo(0, 0);
    }, [status]);

    const handleAllTransaction = (num) => {
        // setUser({...user,"firstName":e})
        setStatus(num);
    }
    const getTransactionUser = async (status, page) => {
        const response = await transactionUserApi.getAllTransactionUser(status, page);
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
                        <h1 className="contact_title-h1">Danh sách giao dịch</h1>
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
                                    <th className="price">Email</th>
                                    <th className="quantity">Loại thanh toán</th>
                                    <th className="price">Trạng thái thanh toán</th>
                                    <th className="price">Trạng thái thực hiện</th>
                                    <th className="remove">Ngày tạo</th>
                                    <th className="remove">Ngày thanh toán</th>
                                    <th className="price">Tổng tiền</th>
                                    <th className="remove">Chi tiết</th>
                                    <th className="remove">Xóa/Kích hoạt</th>
                                </tr>
                            </thead>
                            {}
                            {transactionUserArr && transactionUserArr.length > 0 && transactionUserArr.map((item, index) => {
                            return (
                                <TransactionLineItem
                                    key={index}
                                    transactionUserId = {item.id}
                                    transactionId = {item.transactionId}
                                    transactionUserStatus = {item.status}
                                    transactionUserDeleted = {item.deleted}
                                    transactionUserUserId = {item.userId}
                                />
                                )
                            })}
                            <tr className="summary">
                                        <td colSpan="7" style={{fontWeight: '600',fontSize: '2.2rem'}}>Tổng doanh thu:</td>
                                        <td className="price">
                                            <span className="total" style={{ fontSize: '2.2rem',
                                            fontWeight: '400',
                                            width: '200px' }}>
                                                <strong>{formatPrice(totalPrice)}đ</strong>
                                            </span>
                                        </td>
                                    </tr>
                        </table>
                    </form>
                </div>   
            </div>
        </div>
  )
}

export default TransactionComponent