import React, { useCallback } from 'react'
import _ from "lodash";
import { useState, useEffect} from 'react';
import transactionLineItemApi from '../../src/api/transactionLineItemApi';
import transactionApi from '../../src/api/transactionApi';
import userApi from '../../src/api/userApi';
import { useNavigate} from 'react-router-dom';
import formatPrice from "../../src/utils/util_price"
import capitalize from "../../src/utils/util_capitalize_first";
import Swal from "sweetalert2";


function Cart() {
    const [ cartLineItemArr, setCartLineItemArr] = useState([]);
    const [ transaction, setTransaction] = useState({});
    const [email, setEmail] = useState('');
    let history = useNavigate();
    useEffect(()=> {
        getAllTransactionLineItemByCartAndDeleted();
        getTransactionByFalseStatus();
        handleGetEmailUser().then(r => {}).then();
        window.scrollTo(0, 0);
    }, [])
    const handleViewVariantServiceById = (id) => {
        history(`/variant-service-detail/${id}`)
        // window.location.reload(false);
    };
    const handleGetEmailUser = async () => {
        const profileUser = await userApi.getDeltailUserByDeleted(0);
        const promise = Promise.resolve(profileUser);
        promise.then(data => {
            console.log(data);
            if (data.code == 200) {
                setEmail(data.data.email);
            }
          }).catch(err => {
            console.log(err);
          });
    }
    const handlePayment = (id) => {
        history(`/payment`)
        // window.location.reload(false);
    };
    const handleDecrement = async(transaction_line_item_id) => {
        const response = await decrementQuantityTransactionLineItemById(transaction_line_item_id);
            const promise = Promise.resolve(response);
            promise.then(data => {
                console.log(data);
                if (data.code == 200) {
                    getAllTransactionLineItemByCartAndDeleted(0);
                    setTotalPrice();
                    setTimeout( function() {
                        getTransactionByFalseStatus()}, 100);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Số lượng không được dưới 1',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
              }).catch(err => {
                console.log(err);
              });
   };
    const handleIncrement = async(transaction_line_item_id) => {
        const response = await incrementQuantityTransactionLineItemById(transaction_line_item_id);
            const promise = Promise.resolve(response);
            promise.then(data => {
                console.log(data);
                if (data.code == 200) {
                    getAllTransactionLineItemByCartAndDeleted(0);
                    setTotalPrice();
                    setTimeout( function() {
                        getTransactionByFalseStatus()}, 100);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Vượt quá số lượng dịch vụ',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
              }).catch(err => {
                console.log(err);
              });
   };

    const handleDeleteTransactionLineItemById =  (async (id) => {
        // const deleteItem = deleteTransactionLineItemById(id);
        // deleteItem.then(function() {
        //     setTotalPrice();
        // })
        const deleteItem = await deleteTransactionLineItemById(id);
        const promise = Promise.resolve(deleteItem);
        promise.then(data => {
            console.log(data);
            if (data.code == 200) {
                setTotalPrice();
                getAllTransactionLineItemByCartAndDeleted(0);
            }
          }).catch(err => {
            console.log(err);
          });
        setTimeout( function() {
            getTransactionByFalseStatus()
        }, 100);
    });
    const handleUpdate =(async () => {
        // const setPrice = await setTotalPrice();
        // const promise = Promise.resolve(setPrice);
        // promise.then(data => {
        //     console.log(data);
        //     if (data.code == 200) {
        //         getAllTransactionLineItemByCartAndDeleted();
        //     }
        //   }).catch(err => {
        //     console.log(err);
        //   });
        // setTimeout( function() {
        //     getTransactionByFalseStatus()
        // }, 100);
        console.log(">>> check email: ", email);
    });
    

    const deleteTransactionLineItemById = async (id) => {
        return await transactionLineItemApi.deleteTransactionLineItemById(id);
    }

    // const updateQuantityTransactionLineItemById = async (transaction_line_item_id, jsonData) => {
    //     await transactionLineItemApi.updateQuantityTranasctionItemById(transaction_line_item_id, jsonData);
    // }

    const incrementQuantityTransactionLineItemById = async (transaction_line_item_id) => {
        return await transactionLineItemApi.incrementQuantityTranasctionItemById(transaction_line_item_id);
    }
    const decrementQuantityTransactionLineItemById = async (transaction_line_item_id) => {
        return await transactionLineItemApi.decrementQuantityTranasctionItemById(transaction_line_item_id);
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
            // alert("empty result")
            setCartLineItemArr([]);
        }
     }
     const getTransactionByFalseStatus = async () => {
        const response = await transactionApi.getTransactionByFalseStatus();
        if(response && response.data){
            setTransaction(response.data);
        } else {
            // alert("empty result")
            setTransaction({"totalPrice": 0});
        }
    };
    const handleOnClickAlert = () => {
        Swal.fire({
            icon: 'info',
            title: 'Vui lòng đăng nhập trước khi thanh toán',
            showConfirmButton: false,
            timer: 1500
        })
        setTimeout(function() {history(`/login`);}, 1500)
    }
  return (
    <>
        <div className="container-fluid container-fluid_body">
        {cartLineItemArr && cartLineItemArr.length > 0 ? (
            <>
                <div className="row row_colection">   
                    <div className="col-sm-12 col-sm-12_cart">
                        <div className="contact_title">
                            <h1 className="contact_title-h1">Giỏ hàng</h1>
                        </div>
                        <form action="/cart" method="post" id="cartformpage">
                            <table width="100%">
                                <thead className="table_thread">
                                    <tr>
                                        <th className="image">Hình ảnh</th>
                                        <th className="item">Tên dịch vụ</th>
                                        <th className="quantity">Số lượng</th>
                                        <th className="price">Giá tiền</th>
                                        <th className="remove">Xóa</th>
                                    </tr>
                                </thead>
                                <tbody className="tbody">
                                {cartLineItemArr && cartLineItemArr.length > 0 && cartLineItemArr.map((item, index) => {
                                    return (
                                        <tr>
                                        <td className="image">
                                            <div className="service_image">
                                                <a className="" onClick={() => handleViewVariantServiceById(item.variantServiceId)}>
                                                    <img src={item.variantServiceAvatar} alt={item.name}/>
                                                </a>
                                            </div>
                                        </td>
                                        <td className="item">
                                            <a className="" onClick={() => handleViewVariantServiceById(item.variantServiceId)}>
                                                <strong>{capitalize(item.variantServiceName)}</strong>
                                            </a>
                                        </td>
                                        <td className="quantity">
                                            <div className="tbody-quantity">
                                                <button type="button" value={item.id} onClick={() => handleDecrement(item.id)} className="tbody-quantity_btn">-</button>
                                                <span className="tbody-quantity_span">{item.quantity}</span>
                                                <button type="button" onClick={() => handleIncrement(item.id)} className="tbody-quantity_btn">+</button>
                                            </div>
                                        </td>
                                        <td className="price">{formatPrice(item.totalPrice)}đ</td>
                                        <td className="remove">
                                            <a className="cart" onClick={() => handleDeleteTransactionLineItemById(item.id)}>
                                                <i className="fa fa-trash">
                                                </i>
                                            </a>
                                        </td>
                                    </tr>
                                    )
                                })}
                                    <tr className="summary">
                                        <td colSpan="4" style={{fontWeight: '600',fontSize: '2.2rem'}}>Tổng tiền:</td>
                                        <td className="price">
                                            <span className="total">
                                                <strong>{formatPrice(transaction.totalPrice)}đ</strong>
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>   
                    <div className="col-sm-12 col-sm-12_btn">
                        <div className="cart_buttons">
                            {email ? (
                                    <>
                                        <button
                                            type="submit"
                                            id="checkout"
                                            name="checkout"
                                            className="btn-primary btn-pay" 
                                            onClick={() => handlePayment()}
                                        >Thanh toán</button>
                                    </>
                                    ) : (
                                        <>
                                            <button
                                                type="button"
                                                id="checkout"
                                                name="checkout"
                                                className="btn-primary btn-pay" onClick={() => handleOnClickAlert()}
                                            >Thanh toán</button>
                                        </>
                                    )}
                            <button type="submit" id="update-cart" className="btn-primary btn-update" name="update" onClick={() => handleUpdate()}>Cập nhật</button>
                        </div>
                    </div> 
                </div>  
            </>
        ) : (
            <>
                <div className="row row_colection">   
                    <div className="col-sm-12 col-sm-12_cart">
                        <div className="contact_title">
                            <h1 className="contact_title-h1">Giỏ hàng</h1>
                        </div>
                        <div className="contact_title">
                            <p className="contact_title-empty">Giỏ hàng hiện đang rỗng. Vui lòng thêm sản phẩm vào giỏ hàng nhé :3</p>
                        </div>
                    </div>   
                </div>
            </>
        )}
        </div>
    </>
  )
}

export default Cart