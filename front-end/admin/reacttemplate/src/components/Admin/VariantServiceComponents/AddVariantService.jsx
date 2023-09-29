import React from 'react'
import { useState, useEffect, useRef} from 'react';
import variantServiceApi from '../../../api/variantServiceApi';
import serviceApi from '../../../api/serviceApi';
import InputForm from '../../InputForm/InputForm';
import { useNavigate, useParams} from 'react-router-dom';
import logo from '../../../assets/images/logo.jpg';
import Swal from "sweetalert2";

const AddVariantvariantService = () => {
    const [variantService, setVariantService] = useState({
        "servicesId": '1',
        "name": '',
        "price": '',
        "description": '',
        "avatar": '',
        "quantity": ''
    });
    const inputRef = useRef(null);
    let history = useNavigate();
    const [serviceArr, setServiceArr] = useState([]);
    const [nameError, setNameError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [quantityError, setQuantityError] = useState('');
    useEffect(() => {
        getService(0);
        window.scrollTo(0, 0);
    }, []);

    const addSubmit = (e) => {
        e.preventDefault();
        handleValidation().then(r => {});
    }
    const handleValidation = async ()  => {
        console.log('=============== CHECK');
        let formIsValid = true;

        if (!variantService.name.match(/^[0-9A-Za-z\s_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ()]{6,50}$/)) {
            formIsValid = false;
            setNameError(
                "Tên biến thể dịch vụ bao gồm kiểu chữ và số có độ dài từ 1 đến 50 ký tự"
            );
            return false;
        } else {
            setNameError("");
            formIsValid = true;
        }

        if (!variantService.price.match(/^[0-9]{5,10}$/)) {
            formIsValid = false;
            setPriceError(
                "Giá tiền phải là kiểu số dương có độ dài từ hàng chục đến hàng tỉ đồng"
            );
            // console.log("Last name phải là kiểu chữ có độ dài từ 1 đến 30 ký tự");
            return false;
        } else {
            // console.log('----------- lastName: ', inputRegister.lastName);
            setPriceError("");
            formIsValid = true;
        }

        // if (!variantService.description.match(/^[0-9A-Za-z!@.,;:'"?-]{6,500}$/)) {
        //     formIsValid = false;
        //     setDescriptionError(
        //         "Mô tả phải là kiểu chữ có độ dài từ 6 đến 500 ký tự"
        //     );
        //     return false;
        // } else {
        //     setDescriptionError("");
        //     formIsValid = true;
        // }
        if (!variantService.quantity.match(/^[0-9]{1,4}$/)) {
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
                title: 'Bạn có muốn thêm mới biến thể dịch vụ ?',
                showDenyButton: true,
                confirmButtonText: 'Có',
                denyButtonText: `Không`,
              }).then(async(result) => {
                if (result.isConfirmed) {
                    const response = await addNewVariantService(variantService);
                    const promise = Promise.resolve(response);
                    promise.then(data => {
                        console.log(data);
                        if (data.code == 200) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Thêm mới biến thể dịch vụ thành công',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            if (data.data) {
                                // console.log(">>> check token decoded: ", decoded.sub)
                                setTimeout(function() {window.location.reload(true)}, 1500)
                            }
                        } else if (data.code == 2023) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'error',
                                title: 'Tên biến thể đã tồn tại !',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            if (data.data) {
                                // console.log(">>> check token decoded: ", decoded.sub)
                                setTimeout(function() {window.location.reload(true)}, 1500)
                            }
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'error',
                                title: 'Thêm mới không thành công. Vui lòng kiểm tra lại thông tin !!!',
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
    const addNewVariantService = async (data) => {
        try {
            return await variantServiceApi.addVariantService(data);
        } catch (e) {
            console.log("-----error");
        }
    };
    const handleImageClick = (e) => {
        inputRef.current.click();
    }
    const handleOnchangeName = (e) => {
        setVariantService({...variantService,"name":e})
    }
    const handleOnchangePrice = (e) => {
        setVariantService({...variantService,"price":e})
    }
    const handleOnchangeDescription = (e) => {
        setVariantService({...variantService,"description":e})
    }
    const handleOnchangeQuantity = (e) => {
        setVariantService({...variantService,"quantity":e})
    }
    const handleListVariantService = () => {
        history(`/list-variant-service`);
        // console.log(">>> check variant service: ", variantService);
    }
    const handleOnchangeAvatar = (e) => {
        // const image = e.target.files[0];
        // console.log(">>> check image: ", image);
        setVariantService({...variantService,"avatar": "./images/" + e.target.files[0].name})
    }
    const handleOnchangeService = (e) => {
        setVariantService({...variantService,[e.target.name]:e.target.value});
    }
    const getService = async (status) => {
        const response = await serviceApi.getAllServiceByDeleted(status);
        const promise = Promise.resolve(response);
        promise.then(data => {
            // console.log(data);
            if (data.code == 200) {
                let result = data.data;
                let _serviceArr = [];
                for (let key in result) {
                    _serviceArr.push( result[key])
                }
                setServiceArr(_serviceArr);
            }
            }).catch(err => {
            console.log(err);
        });
    }

  return (
    <>
        <div className="container-fluid container-fluid__main">
            <row className="row_colection">
                <div className="col-sm-12 row_auth-col">
                    <form  onSubmit={addSubmit} className="mb-5">
                        <h1 className="header_auth" style={{ paddingBottom: '70px' }}>Thêm mới biến thể dịch vụ</h1>
                        <div className="auth-form__form">
                            <div className="auth-form__group" onClick={handleImageClick}>
                                <div className="auth-form__avt" >
                                    <div className="auth-form__avt-icon" >
                                        <i className="fa-solid fa-circle-plus btn-icon"></i>
                                    </div>
                                    {variantService.avatar ? (
                                        <img src={`/${variantService.avatar}`} alt={variantService.name}/>
                                    ) : (
                                        <img src={logo} alt={variantService.name}/>
                                    )}
                                    <input type="file" ref={inputRef} onChange={handleOnchangeAvatar} style={{ display: "none" }} />
                                </div>
                            </div>
                            <div className="auth-form__group">
                                <InputForm placeholder="Tên biến thể dịch vụ" type="text"
                                                value={variantService.name} onChange={handleOnchangeName} 
                                                errorMessage={nameError}
                                />
                            </div>
                            <div className="auth-form__group">
                                <InputForm placeholder="Giá" type="text"
                                                value={variantService.price} onChange={handleOnchangePrice} 
                                                errorMessage={priceError}
                                />
                            </div>
                            <div className="auth-form__group">
                                <InputForm placeholder="Mô tả" type="text"
                                                value={variantService.description} onChange={handleOnchangeDescription} 
                                                errorMessage={descriptionError}
                                />
                            </div>
                            <div className="auth-form__group">
                                <InputForm placeholder="Số lượng" type="number"
                                                value={variantService.quantity} onChange={handleOnchangeQuantity} 
                                                errorMessage={quantityError}
                                />
                            </div>
                            

                            <div className="auth-form__group">
                                <select className="auth-form__group_select" name='servicesId' onChange={handleOnchangeService}>
                                    {serviceArr && serviceArr.length > 0 && serviceArr.map((item, index) => {
                                    return (
                                            <option key={index} value={item.id}>{item.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="auth-form__controls" style={{ paddingTop: '70px' }}>
                            <button type="button" className="btn_cus btn--normal" onClick={handleListVariantService}>Danh sách biến thể dịch vụ</button>
                            {!variantService.name ? (
                                <>
                                    <button 
                                    className="btn_cus btn_cus.btn--disable">Thêm mới</button>
                                </>
                            ) : (
                                <>
                                    <button type="submit" className="btn_cus btn-primary">Thêm mới</button>
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

export default AddVariantvariantService