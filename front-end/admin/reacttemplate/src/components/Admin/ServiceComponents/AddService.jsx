import React from 'react'
import { useState, useEffect} from 'react';
import serviceApi from '../../../api/serviceApi';
import categoryApi from '../../../api/categoryApi';
import InputForm from '../../InputForm/InputForm';
import { useNavigate, useParams} from 'react-router-dom';
import Swal from "sweetalert2";

const AddService = () => {
    const [service, setService] = useState({
        "categoriesId": '3',
        "name": ''
    });
    let history = useNavigate();
    const [nameError, setNameError] = useState('');
    const [categoryArr, setCategoryArr] = useState([]);

    useEffect(() => {
        getCategory(0);
        window.scrollTo(0, 0);
    }, []);

    const addSubmit = (e) => {
        e.preventDefault();
        handleValidation().then(r => {});
    }
    const handleValidation = async ()  => {
        console.log('=============== CHECK');
        let formIsValid = true;

        if (!service.name.match(/^[A-Za-z\s_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ()]{6,30}$/)) {
            formIsValid = false;
            setNameError(
                "Tên dịch vụ phải là kiểu chữ có độ dài từ 1 đến 30 ký tự"
            );
            return false;
        } else {
            setNameError("");
            formIsValid = true;
        }

        if (formIsValid === true) {
            Swal.fire({
                title: 'Bạn có muốn thêm mới dịch vụ ?',
                showDenyButton: true,
                confirmButtonText: 'Có',
                denyButtonText: `Không`,
              }).then(async(result) => {
                if (result.isConfirmed) {
                    const response = await addNewService(service);
                    const promise = Promise.resolve(response);
                    promise.then(data => {
                        console.log(data);
                        if (data.code == 200) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Thêm mới dịch vụ thành công',
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
    const addNewService = async (data) => {
        try {
            return await serviceApi.addService(data);
        } catch (e) {
            console.log("-----error");
        }
    };
    const handleOnchangeName = (e) => {
        setService({...service,"name":e})
    }
    const handleListService = () => {
        history(`/list-service`);
        // console.log(">>> check service input: ", service);
    }
    const handleOnchangeCategory = (e) => {
        // history(`/list-service`);
        setService({...service,[e.target.name]:e.target.value});
    }
    const getCategory = async (status) => {
        const response = await categoryApi.getAllCategory(status);
        const promise = Promise.resolve(response);
        promise.then(data => {
            // console.log(data);
            if (data.code == 200) {
                let result = data.data;
                let _categoryArr = [];
                for (let key in result) {
                    _categoryArr.push( result[key])
                }
                setCategoryArr(_categoryArr);
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
                        <h1 className="header_auth" style={{ paddingBottom: '70px' }}>Thêm mới dịch vụ</h1>
                        <div className="auth-form__form">
                            <div className="auth-form__group">
                                <InputForm placeholder="Tên dịch vụ" type="text"
                                                value={service.name} onChange={handleOnchangeName} 
                                                errorMessage={nameError}
                                />
                            </div>
                            <div className="auth-form__group">
                                <select className="auth-form__group_select" name='categoriesId' onChange={handleOnchangeCategory}>
                                    {categoryArr && categoryArr.length > 0 && categoryArr.map((item, index) => {
                                    return (
                                            <option value={item.id}>{item.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="auth-form__controls" style={{ paddingTop: '70px' }}>
                            <button type="button" className="btn_cus btn--normal" onClick={handleListService}>Danh sách dịch vụ</button>
                            {!service.name ? (
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

export default AddService