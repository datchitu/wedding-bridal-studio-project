import React from 'react'
import { useState, useEffect, useRef} from 'react';
import voucherApi from '../../../api/voucherApi';
import InputForm from '../../InputForm/InputForm';
import { useNavigate, useParams} from 'react-router-dom';
import Swal from "sweetalert2";
import formatDate from '../../../utils/util_formatDate';

const AddVoucher = () => {
    const [voucher, setVoucher] = useState({
        "name": '',
        "code": '',
        "discount": '',
        "quantity": '',
        "expireDate": ''
    });
    let history = useNavigate();
    const [nameError, setNameError] = useState('');
    const [codeError, setCodeError] = useState('');
    const [discountError, setDiscountError] = useState('');
    const [quantityError, setQuantityError] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const updateSubmit = (e) => {
        e.preventDefault();
        handleValidation().then(r => {});
    }
    const handleValidation = async ()  => {
        console.log('=============== CHECK');
        let formIsValid = true;

        if (!voucher.name.match(/^[0-9A-Za-z\s_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ()%]{6,30}$/)) {
            formIsValid = false;
            setNameError(
                "Tên voucher phải là có độ dài từ 6 đến 30 ký tự"
            );
            return false;
        } else {
            setNameError("");
            formIsValid = true;
        }
        if (!voucher.code.match(/^[0-9A-Za-z]{3,30}$/)) {
            formIsValid = false;
            setCodeError(
                "Mã voucher phải là kiểu chữ và số không được có khoảng trống và có độ dài từ 3 đến 30 ký tự"
            );
            return false;
        } else {
            setCodeError("");
            formIsValid = true;
        }
        if (!voucher.discount.match(/^[0-9]{0,2}$/)) {
            formIsValid = false;
            setDiscountError(
                "Giảm giá phải là kiểu số dương có độ dài từ 0 đến 99"
            );
            // console.log("Last name phải là kiểu chữ có độ dài từ 1 đến 30 ký tự");
            return false;
        } else {
            // console.log('----------- lastName: ', inputRegister.lastName);
            setDiscountError("");
            formIsValid = true;
        }
        if (!voucher.quantity.match(/^[0-9]{1,4}$/)) {
            formIsValid = false;
            setQuantityError(
                "Số lượng phải là kiểu số dương có độ dài từ 1 đến 4 chữ số"
            );
            // console.log("Last name phải là kiểu chữ có độ dài từ 1 đến 30 ký tự");
            return false;
        } else {
            // console.log('----------- lastName: ', inputRegister.lastName);
            setQuantityError("");
            formIsValid = true;
        }

        if (formIsValid === true) {
            Swal.fire({
                title: 'Bạn có muốn tạo mới voucher ?',
                showDenyButton: true,
                confirmButtonText: 'Có',
                denyButtonText: `Không`,
              }).then(async(result) => {
                if (result.isConfirmed) {
                    const response = await addVoucher(voucher);
                    const promise = Promise.resolve(response);
                    promise.then(data => {
                        console.log(data);
                        if (data.code == 200) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Tạo mới thành công',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            setTimeout(function() {window.location.reload(true)}, 1500)
                        } else if (data.code == 5003) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'error',
                                title: 'Ngày hết hạn bị trước ngày hôm nay. Xin vui lòng kiểm tra lại !!!',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            
                        } else if (data.code == 2023) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'error',
                                title: 'Mã voucher đã tồn tại !',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'error',
                                title: 'Tạo mới không thành công. Vui lòng kiểm tra lại thông tin !!!',
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
    const addVoucher = async (data) => {
        try {
            return await voucherApi.addVoucher(data);
        } catch (e) {
            console.log("-----error");
        }
    };
    const handleOnchangeName = (e) => {
        setVoucher({...voucher,"name":e})
    }
    const handleOnchangeCode = (e) => {
        setVoucher({...voucher,"code":e})
    }
    const handleOnchangeDiscount = (e) => {
        setVoucher({...voucher,"discount":e})
    }
    const handleOnchangQuantity = (e) => {
        setVoucher({...voucher,"quantity":e})
    }
    const handleOnchangExpireDate = (e) => {
        setVoucher({...voucher,"expireDate":e})
    }
    const handleListvoucher = () => {
        history(`/list-voucher`);
    }


  return (
    <>
        <div className="container-fluid container-fluid__main">
            <row className="row_colection">
                <div className="col-sm-12 row_auth-col">
                    <form  onSubmit={updateSubmit} className="mb-5">
                        <h1 className="header_auth" style={{ paddingBottom: '70px' }}>Thêm mới voucher</h1>
                        <div className="auth-form__form">
                            
                            <div className="auth-form__group">
                                <InputForm placeholder="Tên voucher" type="text"
                                                value={voucher.name} onChange={handleOnchangeName} 
                                                errorMessage={nameError}
                                />
                            </div>
                            <div className="auth-form__group">
                                <InputForm placeholder="Code voucher" type="text"
                                                value={voucher.code} onChange={handleOnchangeCode} 
                                                errorMessage={codeError}
                                />
                            </div>
                            <div className="auth-form__group">
                                <InputForm placeholder="Giảm giá" type="text"
                                                value={voucher.discount} onChange={handleOnchangeDiscount} 
                                                errorMessage={discountError}
                                />
                            </div>
                            <div className="auth-form__group">
                                <InputForm placeholder="Số lượng" type="number"
                                                value={voucher.quantity} onChange={handleOnchangQuantity} 
                                                errorMessage={quantityError}
                                />
                            </div>
                            <div className="auth-form__group">
                                <InputForm placeholder="Ngày hết hạn" type="date"
                                                value={voucher.expireDate} onChange={handleOnchangExpireDate} 
                                />
                            </div>
                        </div>
                        <div className="auth-form__controls" style={{ paddingTop: '70px' }}>
                            <button type="button" className="btn_cus btn--normal" onClick={handleListvoucher}>Danh sách danh mục</button>
                            {!voucher.name || !voucher.code || !voucher.discount || !voucher.quantity ? (
                                <>
                                    <button 
                                    className="btn_cus btn_cus.btn--disable">Tạo mới</button>
                                </>
                            ) : (
                                <>
                                    <button type="submit" className="btn_cus btn-primary">Tạo mới</button>
                                </>
                            )}
                            
                        </div>
                    </form>   
                </div>
            </row>
        </div>
    </>
  )
}

export default AddVoucher