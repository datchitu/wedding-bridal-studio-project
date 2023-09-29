import React from 'react'
import { useState, useEffect} from 'react';
import categoryApi from '../../../api/categoryApi';
import InputForm from '../../InputForm/InputForm';
import { useNavigate, useParams} from 'react-router-dom';
import Swal from "sweetalert2";

const AddCategory = () => {
    const [category, setCategory] = useState({
        "name": ''
    });
    let history = useNavigate();
    const [nameError, setNameError] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const addSubmit = (e) => {
        e.preventDefault();
        handleValidation().then(r => {});
    }
    const handleValidation = async ()  => {
        console.log('=============== CHECK');
        let formIsValid = true;

        if (!category.name.match(/^[A-Za-z\s_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ()]{6,30}$/)) {
            formIsValid = false;
            setNameError(
                "Tên danh mục phải là kiểu chữ có độ dài từ 1 đến 30 ký tự"
            );
            return false;
        } else {
            setNameError("");
            formIsValid = true;
        }

        if (formIsValid === true) {
            Swal.fire({
                title: 'Bạn có muốn thêm mới danh mục ?',
                showDenyButton: true,
                confirmButtonText: 'Có',
                denyButtonText: `Không`,
              }).then(async(result) => {
                if (result.isConfirmed) {
                    const response = await addNewCategory(category);
                    const promise = Promise.resolve(response);
                    promise.then(data => {
                        console.log(data);
                        if (data.code == 200) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Thêm mới danh mục thành công',
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
    const addNewCategory = async (data) => {
        try {
            return await categoryApi.addCategory(data);
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
                    <form  onSubmit={addSubmit} className="mb-5">
                        <h1 className="header_auth" style={{ paddingBottom: '70px' }}>Thêm mới danh mục</h1>
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

export default AddCategory