import React from 'react'
import { useState, useEffect} from 'react';
import { useNavigate,Link} from 'react-router-dom';
// import Swal from "sweetalert2";
import VariantServiceLineItem from './VariantServiceLineItem';
import variantServiceApi from  '../../../api/variantServiceApi'

const VariantvariantServiceComponent = () => {
    let history = useNavigate();
    const [ status, setStatus ] = useState('0');
    const [ variantServiceArr, setVariantServiceArr ] = useState([]);

    useEffect(() => {
        getVariantService(status, 0).then(r => {});
        window.scrollTo(0, 0);
    }, [status]);

    const handleAddNewvariantService = () => {
        history(`/add-variant-service`);
    }

    const getVariantService = async (status, page) => {
        const response = await variantServiceApi.getAllVariantService(status, page);
        const promise = Promise.resolve(response);
        promise.then(data => {
            // console.log(data);
            if (data.code == 200) {
                let result = data.data;
                let _variantServiceArr = [];
                for (let key in result) {
                    _variantServiceArr.push( result[key])
                }
                setVariantServiceArr(_variantServiceArr);
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
                        <h1 className="contact_title-h1" >Danh sách biến thể dịch vụ</h1>
                    </div>
                    <div className="payment_buttons">
                        <button type="button" id="checkout" className="btn-primary btn-pay" onClick={() => setStatus(0)}>Tất cả</button>
                        <button type="button" id="update-cart" className="btn-primary btn-update" onClick={() => setStatus(1)}>Đã xóa</button>
                        <button type="button" id="update-cart" className="btn-primary btn-update" onClick={() => handleAddNewvariantService()}>Thêm mới</button>
                    </div>
                    <form action="/cart" method="post" id="cartformpage" >
                        <table width="100%">
                            <thead className="table_thread">
                                <tr>
                                    <th className="image">Mã dịch vụ</th>
                                    <th className="price">Hình ảnh</th>
                                    <th className="price">Tên dịch vụ</th>
                                    <th className="price">Giá</th>
                                    <th className="price">Số lượng</th>
                                    <th className="quantity">Trạng thái</th>
                                    <th className="price">Chỉnh sửa</th>
                                    <th className="remove">Xóa/Kích hoạt</th>
                                </tr>
                            </thead>
                            {}
                            {variantServiceArr && variantServiceArr.length > 0 && variantServiceArr.map((item, index) => {
                            return (
                                <VariantServiceLineItem
                                    key={index}
                                    variantServiceId = {item.id}
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

export default VariantvariantServiceComponent