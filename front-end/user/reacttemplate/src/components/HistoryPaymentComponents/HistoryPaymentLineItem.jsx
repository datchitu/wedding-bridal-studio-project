import React from 'react'
import { useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";
import formatPrice from "../../utils/util_price"
import transactionApi from '../../api/transactionApi'
import transactionUserApi from '../../api/transactionUserApi';
import { useState, useEffect} from 'react';
import Moment from 'react-moment';

const HistoryPaymentLineItem = (props) => {
    const transactionId = props.transactionId;
    const transactionUserId = props.transactionUserId;
    const transactionUserStatus = props.transactionUserStatus;
    const transactionUserDeleted = props.transactionUserDeleted;
    let history = useNavigate();
    const [transaction, setTransaction] = useState([]);
    useEffect(() => {
        getTransactionById(transactionId, 0);
        // findTransactionUserByTransactionIdAndUserId(transactionId, userId);
        window.scrollTo(0, 0) 
    }, [transactionUserId])

    const handleDeleteTransactionById = async(e) => {
        Swal.fire({
            title: 'Bạn có muốn xóa hóa đơn ?',
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: 'Có',
            denyButtonText: `Không`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const response = deleteTransactionUser(e);
                const promise = Promise.resolve(response);
                promise.then(data => {
                    console.log(data);  
                    if (data.code == 200) {
                        Swal.fire('Xóa thành công!', '', 'success')
                        setTimeout(function() {window.location.reload(false);},1500);
                    } else {
                        Swal.fire('Xóa không thành công. Kiểm tra lại', '', 'info')
                    }
                }).catch(err => {
                    console.log(err);
                });
              
            } else if (result.isDenied) {
            }
          })
    }
    const handleActiveTransactionById = async(e) => {
        Swal.fire({
            title: 'Bạn có muốn tái kích hoạt hóa đơn ?',
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: 'Có',
            denyButtonText: `Không`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const response = activeTransactionUser(e);
                const promise = Promise.resolve(response);
                promise.then(data => {
                    console.log(data);  
                    if (data.code == 200) {
                        Swal.fire('Kích hoạt thành công!', '', 'success')
                        setTimeout(function() {window.location.reload(false);},1500);
                    } else {
                        Swal.fire('Kích hoạt không thành công. Kiểm tra lại', '', 'info')
                    }
                }).catch(err => {
                    console.log(err);
                });
              
            } else if (result.isDenied) {
            }
          })
    }

    // const deleteTransaction = async (id) => {
    //     try {
    //         let response = await transactionApi.deleteTranasction(id);
    //         console.log('----------- response:deleted transaction ', response);
    //         if(response.message === 'OK'){
    //             return response.data;
    //             console.log(">>> set user success")
    //         }
    //     } catch (e) {
    //         console.log("-----error");
    //     }
    //  }

    const deleteTransactionUser = async (id) => {
        return await transactionUserApi.deleteTransactionUser(id);
    }

    const activeTransactionUser = async (id) => {
        return await transactionUserApi.activeTransactionUser(id);
    }

    const getTransactionById = async (id, status) => {
        const response = await transactionApi.getTransactionByIdAndDeleted(id, status);
        const promise = Promise.resolve(response);
        promise.then(data => {
            // console.log(data);
            if (data.code == 200) {
                setTransaction(data.data);
                // console.log("Check user id: ", data.data.id);
            }
            }).catch(err => {
            console.log(err);
            });
     }

     function handleDetail(e) {
        history(`/history-payment-detail/${transactionId}`);
        // console.log(">>> check  transaction user id: ", e);
        // console.log(">>> check  status: ", status);
    }

  return (
    <>
        <tbody className="tbody">
            {transaction && transaction.id ? (
                <>
                    <tr>
                        <td className="code">
                            <span>{transaction.id}</span>
                        </td>
                        <td className="price">
                            <span>{formatPrice(transaction.totalPrice * ((100 - transaction.voucherDiscount) / 100))}đ</span>
                        </td>
                        <td className="content">{transaction.paymentType == true ? "thanh toán online" : " thanh toán tại cửa hàng"}</td>
                        <td className="content">{transaction.paymentStatus == true ? "đã thanh toán" : "chưa thanh toán"}</td>
                        <td className="content">{transactionUserStatus == true ? "đã hoàn thành" : "chưa thực hiện"}</td>
                        <td className="content"><Moment date={transaction.createdAt}  format="DD/MM/YYYY"/></td>
                        
                        <td className="content">{transaction.paidAt ? (
                            <>
                                <Moment date={transaction.paidAt}  format="DD/MM/YYYY"/>
                            </>
                        ) : (
                            <>
                            </>
                        )}</td>
                        <td className="content">
                            <a onClick={() => handleDetail(transactionUserId)} className="price_detail-history-payment">Chi tiết</a>
                        </td>
                        <td className="remove">
                            {transaction.paymentStatus == false ? (
                                <>
                                    {transactionUserDeleted == false ? (
                                        <>
                                            <a className="cart" onClick={() => handleDeleteTransactionById(transactionUserId)}>
                                                <i className="fa fa-trash">
                                                </i>
                                            </a>
                                        </>
                                    ) : (
                                        <>
                                            <a className="cart" onClick={() => handleActiveTransactionById(transactionUserId)}>
                                                Kích hoạt
                                            </a>
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                
                                </>
                            )}
                        </td>
                    </tr>
                </>
            ) : (<></>)}
        </tbody>
    </>
  )
}

export default HistoryPaymentLineItem