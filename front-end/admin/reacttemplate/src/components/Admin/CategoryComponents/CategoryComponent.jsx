import React from 'react'
import { useState, useEffect} from 'react';
import { useNavigate,Link} from 'react-router-dom';
// import Swal from "sweetalert2";
import CategoryLineItem from './CategoryLineItem';
import categoryApi from '../../../api/categoryApi';

const CategoryComponent = () => {
    let history = useNavigate();
    const [ status, setStatus ] = useState('0');
    const [ categoryArr, setCategoryArr ] = useState([]);

    useEffect(() => {
        getCategory(status).then(r => {});
        window.scrollTo(0, 0);
    }, [status]);

    const handleAddNewCategory = () => {
        history(`/add-category`);
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
    <div className="container-fluid container-fluid_history-payment">
            <div className="row row_colection">
                <div className="col-sm-12 col-sm-12_history-payment">
                    <div className="contact_title" >
                        <h1 className="contact_title-h1" >Danh sách danh mục</h1>
                    </div>
                    <div className="payment_buttons">
                        <button type="button" id="checkout" className="btn-primary btn-pay" onClick={() => setStatus(0)}>Tất cả</button>
                        <button type="button" id="update-cart" className="btn-primary btn-update" onClick={() => setStatus(1)}>Đã xóa</button>
                        <button type="button" id="update-cart" className="btn-primary btn-update" onClick={() => handleAddNewCategory()}>Thêm mới</button>
                    </div>
                    <form action="/cart" method="post" id="cartformpage" >
                        <table width="100%">
                            <thead className="table_thread">
                                <tr>
                                    <th className="image">Mã danh mục</th>
                                    <th className="price">Tên danh mục</th>
                                    <th className="quantity">Trạng thái</th>
                                    <th className="price">Chỉnh sửa</th>
                                    <th className="remove">Xóa/Kích hoạt</th>
                                </tr>
                            </thead>
                            {}
                            {categoryArr && categoryArr.length > 0 && categoryArr.map((item, index) => {
                            return (
                                <CategoryLineItem
                                    key={index}
                                    categoryId = {item.id}
                                />
                                )
                            })}
                        </table>
                    </form>
                </div>   
            </div>
        </div>
  )
}

export default CategoryComponent