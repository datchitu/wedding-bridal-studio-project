import React from 'react'
import { useState, useEffect} from 'react';
import transactionApi from '../../../api/transactionApi';
import transactionUserApi from '../../../api/transactionUserApi';
import userApi from '../../../api/userApi';
import { useNavigate,Link, useParams} from 'react-router-dom';
import formatPrice from "../../../utils/util_price"
import formatDate from "../../../utils/util_formatDate"
import capitalize from "../../../utils/util_capitalize_first"
import Swal from "sweetalert2";
import Moment from 'react-moment';

const TransactionDetail = (props) => {
    const { transactionId } = useParams();
    // const { voucher, setVoucher} = useState({});
    const [ performDatetimeError, setPerformDatetimeError ] = useState('');
    const [ transactionUser, setTransactionUser ] = useState('');
    const [ note, setNote ] = useState('');
    const [ userId, setUserId ] = useState('');
    const [ transaction, setTransaction] = useState({});
    let history = useNavigate();
    const handleViewVariantServiceById = (id) => {
        history(`/variant-service-detail/${id}`)
        // window.location.reload(false);
    };

    useEffect(()=> {
        getTransactionById(transactionId, 0);
        findUserByEmail();
        // getVoucherById(3);
        findTransactionUserByTransactionIdAndUserId(transactionId, userId);
        window.scrollTo(0, 0);
    }, [userId])

    const getTransactionById = async (id) => {
        const response = await  transactionApi.getTransactionByIdAndDeleted(id, 0);
        const promise = Promise.resolve(response);
        promise.then(data => {
            // console.log(data);
            if (data.code == 200) {
                setTransaction(data.data);
                setNote(data.data.note);
                // console.log("Check user id: ", data.data.id);
            }
            }).catch(err => {
            console.log(err);
            });
    };

    const paymentSubmit = (e) => {
        e.preventDefault();
        handleValidation().then(r => {});
    }

    const handleValidation = async ()  => {
        // console.log('=============== CHECK');
        let formIsValid = true;
        
        if (formIsValid === true) {
            Swal.fire({
                title: 'Kiểm tra kỹ lại hóa đơn trước khi order hoặc thanh toán ?',
                showDenyButton: true,
                confirmButtonText: 'Có',
                denyButtonText: `Không`,
              }).then(async(result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    const response = await paymentTransaction(transactionId, note);
                    const promise = Promise.resolve(response);
                    promise.then(data => {
                    console.log(data);
                    if (data) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Thanh toán thành công',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        updatePerformDate(transactionUser.id, transactionUser.performDatetime);
                        setTimeout(function() {window.location.reload(false);},1500);
                    } else {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Thanh toán không thành công. Vui lòng kiểm tra lại',
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

    const findTransactionUserByTransactionIdAndUserId = async (transactionId, userId) => {
        const response = await transactionUserApi.getTransactionUserByTransactionIdAndUserId(transactionId, userId);
        const promise = Promise.resolve(response);
        promise.then(data => {
            // console.log(data);
            if (data.code == 200) {
                setTransactionUser(data.data);

                // console.log("Check TransactionUser: ", data.data.performDatetime);
            }
            }).catch(err => {
            console.log(err);
            });
    };

    const paymentTransaction = async (id, note) => {
        try {
            return await transactionApi.updateTransaction(id, note);
        } catch (e) {
            console.log("-----error");
        }
    };
    const updatePerformDate = async (id, performDatetime) => {
        try {
            return await transactionUserApi.updatePerformDate(id, performDatetime);
        } catch (e) {
            console.log("-----error");
        }
    };

    const handleOnchangePerformDate = (e) => {
        setTransactionUser({...transactionUser, [e.target.name] : e.target.value});
    }
    const handleOnchangeNote = (e) => {
        setNote(e.target.value)
    }
    const handleCheck = (e) => {
    //    console.log(">>> check user: ", userId);
       console.log(">>> check transaction user: ", formatDate(transactionUser.performDatetime));
        // console.log(">>> check note: ", note);
    }
  return (
    <>
        <div className="container-fluid container-fluid_body">
            <div className="row row_colection">
                <div className="col-sm-12 col-sm-12_cart">
                    <div className="contact_title">
                        <h1 className="contact_title-h1">Chi tiết thanh toán</h1>
                    </div>
                    <form action="/cart" method="post" id="cartformpage">
                        <table width="100%">
                            <thead className="table_thread">
                                <tr>
                                    <th className="item">Tên dịch vụ</th>
                                    <th className="quantity">Số lượng</th>
                                    <th className="price">Giá tiền</th>
                                </tr>
                            </thead>
                            <tbody className="tbody">
                            {transaction.transactionLineItems && transaction.transactionLineItems.length > 0 && transaction.transactionLineItems.map((item, index) => {
                                return (
                                    <tr>
                                    <td className="item">
                                        <a className="item-name" onClick={() => handleViewVariantServiceById(item.variantServiceId)}>
                                            <strong>{capitalize(item.transactionLineItemName)}</strong>
                                        </a>
                                    </td>
                                    <td className="quantity">
                                        <div className="tbody-quantity">
                                            <span className="tbody-quantity_span">{item.quantity}</span>
                                        </div>
                                    </td>
                                    <td className="price">{formatPrice(item.totalPrice)}đ</td>
                                </tr>
                                )
                            })}
                                    <tr className="summary">
                                    <td colSpan="2" style={{fontWeight: '600',fontSize: '2.2rem'}}>Tổng tiền:</td>
                                    <td className="price">
                                        <span className="total">
                                            <strong>{formatPrice(transaction.totalPrice)}đ</strong>
                                        </span>
                                    </td>
                                </tr>
                                {transaction.voucherDiscount && transaction.voucherDeleted === false ? (
                                    <>
                                    <tr className="summary">
                                        <td colSpan="2" style={{fontWeight: '600',fontSize: '2.2rem'}}>Tổng tiền Voucher {transaction.voucherName}</td>
                                        <td className="price">
                                            <span className="total">
                                                <strong>-{formatPrice(transaction.totalPrice * (transaction.voucherDiscount / 100))}đ</strong>
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="summary">
                                        <td colSpan="2" style={{fontWeight: '600',fontSize: '2.2rem'}}>Tổng tiền thanh toán:</td>
                                        <td className="price">
                                            <span className="total">
                                                <strong>{formatPrice(transaction.totalPrice * ((100 - transaction.voucherDiscount) / 100))}đ</strong>
                                            </span>
                                        </td>
                                    </tr>
                                    </>
                                ) : (
                                    <>
                                    </>
                                )}
                            </tbody>
                        </table>
                    </form>
                </div>
                <form  onSubmit={paymentSubmit} className="mb-5">
                    <div className="col-sm-12 col-sm-12_payment">
                        <div className="payment-info">
                            <p className="">Thông tin thanh toán</p>
                            {transaction.paymentType == false ? (
                            <>
                                <div className="payment-info_div" >
                                    <p className="payment-info_p">{performDatetimeError}</p>
                                    <div >
                                        <span className="payment-info_span" >Ngày thực hiện: </span>
                                        <input 
                                            type="date" className="payment-info_date" 
                                            autoComplete="off"
                                            name='performDatetime'
                                            // value={formatDate(transactionUserPerformDate)}
                                            value={formatDate(transactionUser.performDatetime)}
                                            onChange={handleOnchangePerformDate}
                                        />
                                    </div>
                                    <input type="text" className="payment-info_input_note" 
                                            placeholder="Ghi chú" 
                                            autoComplete="off"
                                            name='note'
                                            value={note}
                                            onChange={handleOnchangeNote}/>
                                </div>
                            </>
                            ) : (
                                <>
                                    <div className="payment-detail_div" >
                                        <span className="payment-detail_span" >Ngày thực hiện: </span>
                                        <span className="payment-detail_date" >
                                            <Moment date={transactionUser.performDatetime}  format="DD/MM/YYYY"/>
                                        </span>
                                        <span className="payment-detail_span" >Ghi chú: </span>
                                        <span className="payment-info_input_note">{transaction.note}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="col-sm-12 col-sm-12_payment">
                        <div className="payment-methods">
                            <p className="">Phương thức thanh toán</p>
                            <div className="payment-methods_radio" >
                                {transaction.paymentType == false ? (
                                    <>
                                        <span className="direct">Thanh toán tại cửa hàng</span> 
                                    </>
                                ) : (
                                    <>
                                        <span className="vnpay">Thanh toán VNpay</span> 
                                    </>
                                )}
                                
                            </div>

                            {/* <button
                                    className="btn-primary" onClick={ handleCheck}>Thanh toán hóa đơn</button> */}

                            {transaction.paymentStatus == false ? (
                            <>
                                <div className="payment-detail_btn-bottom">
                                <button
                                    type="submit"
                                    className="btn-primary" >Thanh toán hóa đơn</button>
                            </div>
                            </>
                            ) : (
                                <>
                                </>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default TransactionDetail