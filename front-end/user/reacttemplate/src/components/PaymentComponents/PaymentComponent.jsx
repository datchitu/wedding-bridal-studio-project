
import { useState, useEffect} from 'react';
import transactionLineItemApi from '../../api/transactionLineItemApi';
import transactionApi from '../../api/transactionApi';
import voucherApi from '../../api/voucherApi';
import { useNavigate} from 'react-router-dom';
import formatPrice from "../../utils/util_price"
import capitalize from "../../utils/util_capitalize_first"
import Swal from "sweetalert2";
import userApi from '../../api/userApi';

function Payment() {
    const [ cartLineItemArr, setCartLineItemArr] = useState([]);
    const [ paymentType, setPaymentType] = useState('');
    const [ transaction, setTransaction] = useState({});
    const [ voucher, setVoucher] = useState({
        "code": ''
    });
    const [user, setUser] = useState([]);
    const [performDatetimeError, setPerformDatetimeError] = useState('');
    const [inputTransaction, setInputTransaction] = useState({
        "voucherId": '',
        "note": '',
        "performDate": '',
        "userId": '',
    })
    let history = useNavigate();
    const handleViewVariantServiceById = (id) => {
        history(`/variant-service-detail/${id}`)
        // window.location.reload(false);
    };

    useEffect(() => {
        setTotalPrice();
        handleGetDetailsUser().then(r => {}).then();
        getAllTransactionLineItemByCartAndDeleted();
        // getVoucherById(voucherId);
        getTransactionByFalseStatus();
        window.scrollTo(0, 0);
    }, [])

    const paymentSubmit = (e) => {
        e.preventDefault();
        handleValidation().then(r => {});
    }
    const handleGetDetailsUser = async () => {
        try {
            let response = await userApi.getDeltailUserByDeleted(0);
            // console.log('----------- response:getProfile ', response);
            if(response.message === 'OK'){
                setUser(response.data);
            }
        } catch (e) {
            console.log("-----Expired");
        }
    }
    const handleValidation = async ()  => {
        // console.log('=============== CHECK');
        let formIsValid = true;
        
        if (!inputTransaction.performDate.match(
            /^\d{4}[./-]\d{2}[./-]\d{2}$/)) {
            formIsValid = false;
            
            setPerformDatetimeError(
                "Không đúng định dạng ngày tháng !!!"
            );
            console.log("Không đúng định dạng ngày tháng");
            return false;
        } else {
            // setEmailError("");
            formIsValid = true;
        }
        // console.log('----------- PASS');
        if (formIsValid === true) {
            Swal.fire({
                title: 'Kiểm tra kỹ lại hóa đơn trước khi order hoặc thanh toán ?',
                showDenyButton: true,
                confirmButtonText: 'Có',
                denyButtonText: `Không`,
              }).then(async(result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    if (paymentType == 0) {
                        const response = await orderTransaction(inputTransaction);
                        const promise = Promise.resolve(response);
                        promise.then(data => {
                            console.log(data);
                            if (data.code == 200) {
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Order thành công',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                // console.log('------------- REGISTER@results => ', results);
                                setTimeout(function() {window.location.href = '/page/0'}, 1500);
                            } else if (data.code == 5003) {
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'error',
                                    title: 'Ngày thực hiện bị trước ngày hôm nay. Xin vui lòng kiểm tra lại !!!',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            } else {
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'error',
                                    title: 'Order không thành công. Xin vui lòng kiểm tra lại !!!',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        }).catch(err => {
                            console.log(err);
                        });
                    } else {
                        const response = await paymentTransaction(inputTransaction);
                        const promise = Promise.resolve(response);
                        promise.then(data => {
                            console.log(data);
                            if (data.code == 200) {
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Thanh toán thành công',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                // console.log('------------- REGISTER@results => ', results);
                                setTimeout(function() {window.location.href = '/page/0'}, 1500);
                            } else if (data.code == 5003) {
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'error',
                                    title: 'Ngày thực hiện bị trước ngày hôm nay. Xin vui lòng kiểm tra lại !!!',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            } else {
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'error',
                                    title: 'Thanh toán không thành công',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        }).catch(err => {
                            console.log(err);
                        });
                    }
                } else if (result.isDenied) {
                }
              })
        }
    }

    const setTotalPrice = async () => {
        return await transactionApi.setTotalPriceEmptyTransaction();
    }
    const getAllTransactionLineItemByCartAndDeleted = async () => {
        const response = await transactionLineItemApi.getAllTransactionLineItemByCartAndDeleted(0);
        if(response && response.data){
            let result = response.data
            let _cartLineItemArr = []
            for (let key in result) {
                // console.log(">>> check child: ", result[servicesId])
                _cartLineItemArr.push(result[key])
            }
            // console.log(">>> check result: ", result)
            setCartLineItemArr(_cartLineItemArr);
        } else {
            setCartLineItemArr([]);
        }
     }
     const getTransactionByFalseStatus = async () => {
        const response = await transactionApi.getTransactionByFalseStatus();
        if(response && response.data){
            setTransaction(response.data);
        } else {
            // alert("empty result")
            setTransaction([]);
        }
    };

    const findVoucherByCodeAndDeleted = async (code, status) => {
        return await voucherApi.getVoucherByCodeAndDeleted(code, status);
    };
    const orderTransaction = async (transactionData) => {
        return await transactionApi.orderTransaction(transactionData);
    };
    const paymentTransaction = async (transactionData) => {
        return await transactionApi.paymentTransaction(transactionData);
    };
    const handleOnClickVoucher = async() => {
        const response = await findVoucherByCodeAndDeleted(voucher.code, 0);
                const promise = Promise.resolve(response);
                promise.then(data => {
                    console.log(data);
                    if (data.code == 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Áp dụng voucher thành công',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        setVoucher(data.data);
                        setInputTransaction({...inputTransaction,["voucherId"]:data.data.id});
                    } else if (data.code === 5001) {    
                        Swal.fire({
                            icon: 'error',
                            title: 'Số lượng voucher đã hết !',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    } else if (data.code === 5002) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Voucher đã hết hạn !',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Voucher không tồn tại !',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                }).catch(err => {
                    console.log(err);
                });
        
    };

    function handleOnchange(e) {
        setInputTransaction({...inputTransaction,[e.target.name]:e.target.value});
    }

    function handleInputVoucherCode(e) {
        setVoucher({...voucher,[e.target.name]:e.target.value});
    }

    function handleOnchangePerformDate(e) {
        setInputTransaction({...inputTransaction,[e.target.name]:e.target.value, ["userId"]:user.id});
    }
    
    const handlePaymentType = (e) => {
        setPaymentType(e.target.value);
    }
    const handleOnClickAlert = () => {
        Swal.fire({
            icon: 'info',
            title: 'Vui lòng đăng nhập trước khi thanh toán',
            showConfirmButton: false,
            timer: 1500
        })
        setTimeout(function() {history(`/login`);}, 1500)
    }
    // const handleOnClickCheckValue = () => {
    //     console.log(">>>> check input transaction: ", inputTransaction);
    //     console.log(">>>> check voucher: ", voucher);
    // }

  return (
    <>
        <div className="container-fluid container-fluid_body">
            <div className="row row_colection">
                <div className="col-sm-12 col-sm-12_cart">
                    <div className="contact_title">
                        <h1 className="contact_title-h1">Thanh toán</h1>
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
                            {cartLineItemArr && cartLineItemArr.length > 0 && cartLineItemArr.map((item, index) => {
                                return (
                                    <tr>
                                    <td className="item">
                                        <a className="item-name" onClick={() => handleViewVariantServiceById(item.variantServiceId)}>
                                            <strong>{capitalize(item.variantServiceName)}</strong>
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
                                {voucher && voucher.id ? (
                                    <>
                                    <tr className="summary">
                                        <td colSpan="2" style={{fontWeight: '600',fontSize: '2.2rem'}}>Tổng tiền Voucher giảm giá</td>
                                        <td className="price">
                                            <span className="total">
                                                <strong>-{formatPrice(transaction.totalPrice * (voucher.discount / 100))}đ</strong>
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="summary">
                                        <td colSpan="2" style={{fontWeight: '600',fontSize: '2.2rem'}}>Tổng tiền thanh toán:</td>
                                        <td className="price">
                                            <span className="total">
                                                <strong>{formatPrice(transaction.totalPrice * ((100 - voucher.discount) / 100))}đ</strong>
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
                <div className="col-sm-12 col-sm-12_payment">
                    <div className="payment-voucher">
                        <p className="">Voucher</p>
                        <div className="payment-voucher_div" >
                            <input type="text" 
                            placeholder="Nhập mã voucher (nếu có)"
                            value={voucher.code}
                            className="voucher_input" 
                            name='code' onChange={handleInputVoucherCode}
                            />
                            {!voucher.code.length ? (
                                <button
                                type="button"
                                disabled={!voucher.code.length}
                                className="btn-primary_disable"
                            >Áp dụng</button>
                            ) : (
                                <button
                                type="button"
                                disabled={!voucher.code.length}
                                className="btn-primary" onClick={() => handleOnClickVoucher()}
                            >Áp dụng</button>
                            )}
                        </div>
                    </div>
                </div>
            <form  onSubmit={paymentSubmit} className="mb-5">
                <div className="col-sm-12 col-sm-12_payment">
                    <div className="payment-info">
                        <p className="">Thông tin thanh toán</p>
                        <div className="payment-info_div" >
                            <p className="payment-info_p">{performDatetimeError}</p>
                            <div >
                                <span className="payment-info_span" >Ngày thực hiện: </span>
                                <input 
                                    type="date" className="payment-info_date" 
                                    autoComplete="off"
                                    name='performDate'
                                    value={inputTransaction.performDate}
                                    onChange={handleOnchangePerformDate}
                                />
                            </div>
                            <input type="text" className="payment-info_input_note" 
                                    placeholder="Ghi chú" 
                                    autoComplete="off"
                                    name='note'
                                    value={inputTransaction.note}
                                    onChange={handleOnchange}/>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-sm-12_payment">
                    <div className="payment-methods">
                        <p className="">Phương thức thanh toán</p>
                        <div className="payment-methods_radio" >
                            <input type="radio" value="0" name="method" onChange={handlePaymentType}/> <span className="direct">Thanh toán tại cửa hàng</span> 
                            <input type="radio" value="1" name="method" onChange={handlePaymentType} /> <span className="vnpay">Thanh toán VNpay</span> 
                        </div>
                        <div className="payment-methods_btn-bottom">
                            <a href="/cart" className="payment-methods_btn-bottom_cart">Giỏ hàng</a>
                            {/* <button
                                type="button"
                                className="btn-primary" onClick={() => handleOnClickCheckValue()}
                            >Check Value</button> */}
                            {!inputTransaction.performDate.length || !paymentType.length ? (
                                <>
                                    <button
                                    type="submit"
                                    className="btn-primary_disable" >Hoàn tất thanh Toán</button>
                                </>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={!inputTransaction.performDate.length || !paymentType.length}
                                    className="btn-primary" 
                                >Hoàn tất thanh toán</button>
                            )}
                            
                        </div>
                    </div>
                </div>
            </form>
            </div>
        </div>
    </>
  )
}

export default Payment