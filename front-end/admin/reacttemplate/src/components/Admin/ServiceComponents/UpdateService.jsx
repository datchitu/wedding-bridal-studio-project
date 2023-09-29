import React from 'react'
import { useState, useEffect, useRef} from 'react';
import serviceApi from '../../../api/serviceApi';
import InputForm from '../../InputForm/InputForm';
import { useNavigate, useParams} from 'react-router-dom';
import Swal from "sweetalert2";

const UpdateService = () => {
    const { id } = useParams();
    const [service, setservice] = useState({});
    let history = useNavigate();
    const [nameError, setNameError] = useState('');

    useEffect(() => {
        getServiceById(id).then(r => {});
        window.scrollTo(0, 0);
    }, []);

    const updateSubmit = (e) => {
        e.preventDefault();
        handleValidation().then(r => {});
    }
    const handleValidation = async ()  => {
        console.log('=============== CHECK');
        let formIsValid = true;

        // if (!service.name.match(/^[A-Za-z\s_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ()]{6,30}$/)) {
        //     formIsValid = false;
        //     setNameError(
        //         "Tên dịch vụ phải là kiểu chữ có độ dài từ 1 đến 30 ký tự"
        //     );
        //     return false;
        // } else {
        //     setNameError("");
        //     formIsValid = true;
        // }

        if (formIsValid === true) {
            Swal.fire({
                title: 'Bạn có muốn cập nhật dịch vụ ?',
                showDenyButton: true,
                confirmButtonText: 'Có',
                denyButtonText: `Không`,
              }).then(async(result) => {
                if (result.isConfirmed) {
                    const response = await updateService(id, service);
                    const promise = Promise.resolve(response);
                    promise.then(data => {
                        console.log(data);
                        if (data.code == 200) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Cập nhật thành công',
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
                                title: 'Cập nhật không thành công. Vui lòng kiểm tra lại thông tin !!!',
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
    const getServiceById = async (id) => {
        const response = await serviceApi.getServiceById(id);
        const promise = Promise.resolve(response);
        promise.then(data => {
            // console.log(data);
            if (data.code == 200) {
                setservice(data.data);
                // console.log("Check user id: ", data.data.id);
            }
            }).catch(err => {
            console.log(err);
            });
     }
    const updateService = async (id, data) => {
        try {
            return await serviceApi.updateServiceById(id, data);
        } catch (e) {
            console.log("-----error");
        }
    };
    const handleOnchangeName = (e) => {
        setservice({...service,"name":e})
    }
    const handleListservice = () => {
        history(`/list-service`);
    }


  return (
    <>
        <div className="container-fluid container-fluid__main">
            <row className="row_colection">
                <div className="col-sm-12 row_auth-col">
                    <form  onSubmit={updateSubmit} className="mb-5">
                        <h1 className="header_auth" style={{ paddingBottom: '70px' }}>Cập nhật dịch vụ</h1>
                        <div className="auth-form__form">
                            
                            <div className="auth-form__group">
                                <InputForm placeholder="Tên dịch vụ" type="text"
                                                value={service.name} onChange={handleOnchangeName} 
                                                errorMessage={nameError}
                                />
                            </div>
                        </div>
                        <div className="auth-form__controls" style={{ paddingTop: '70px' }}>
                            <button type="button" className="btn_cus btn--normal" onClick={handleListservice}>Danh sách dịch vụ</button>
                            {!service.name ? (
                                <>
                                    <button 
                                    className="btn_cus btn_cus.btn--disable">Cập nhật</button>
                                </>
                            ) : (
                                <>
                                    <button type="submit" className="btn_cus btn-primary">Cập nhật</button>
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

export default UpdateService