import React from 'react'
import { useState, useEffect, useRef} from 'react';
import categoryApi from '../../../api/categoryApi';
import InputForm from '../../InputForm/InputForm';
import { useNavigate, useParams} from 'react-router-dom';
import Swal from "sweetalert2";

const UpdateCategory = () => {
    const { id } = useParams();
    const [category, setCategory] = useState({});
    let history = useNavigate();
    const [nameError, setNameError] = useState('');

    useEffect(() => {
        getCategoryById(id).then(r => {});
        window.scrollTo(0, 0);
    }, []);

    const updateSubmit = (e) => {
        e.preventDefault();
        handleValidation().then(r => {});
    }
    const handleValidation = async ()  => {
        console.log('=============== CHECK');
        let formIsValid = true;

        if (!category.name.match(/^[A-Za-z\s_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ()]{6,30}$/)) {
            formIsValid = false;
            setNameError(
                "Tên danh mục phải là kiểu chữ có độ dài từ 6 đến 30 ký tự"
            );
            return false;
        } else {
            setNameError("");
            formIsValid = true;
        }

        if (formIsValid === true) {
            Swal.fire({
                title: 'Bạn có muốn cập nhật danh mục ?',
                showDenyButton: true,
                confirmButtonText: 'Có',
                denyButtonText: `Không`,
              }).then(async(result) => {
                if (result.isConfirmed) {
                    const response = await updateCategory(id, category);
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
    const getCategoryById = async (id) => {
        const response = await categoryApi.getCategoryById(id);
        const promise = Promise.resolve(response);
        promise.then(data => {
            // console.log(data);
            if (data.code == 200) {
                setCategory(data.data);
                // console.log("Check user id: ", data.data.id);
            }
            }).catch(err => {
            console.log(err);
            });
     }
    const updateCategory = async (id, data) => {
        try {
            return await categoryApi.updateCategoryById(id, data);
        } catch (e) {
            console.log("-----error");
        }
    };
    const handleOnchangeName = (e) => {
        setCategory({...category,"name":e})
    }
    const handleListCategory = () => {
        history(`/list-category`);
    }


  return (
    <>
        <div className="container-fluid container-fluid__main">
            <row className="row_colection">
                <div className="col-sm-12 row_auth-col">
                    <form  onSubmit={updateSubmit} className="mb-5">
                        <h1 className="header_auth" style={{ paddingBottom: '70px' }}>Cập nhật danh mục</h1>
                        <div className="auth-form__form">
                            
                            <div className="auth-form__group">
                                <InputForm placeholder="Tên danh mục" type="text"
                                                value={category.name} onChange={handleOnchangeName} 
                                                errorMessage={nameError}
                                />
                            </div>
                        </div>
                        <div className="auth-form__controls" style={{ paddingTop: '70px' }}>
                            <button type="button" className="btn_cus btn--normal" onClick={handleListCategory}>Danh sách danh mục</button>
                            {!category.name ? (
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

export default UpdateCategory