import React from 'react'
import { useState, useEffect} from 'react';
import { useNavigate,Link} from 'react-router-dom';
// import Swal from "sweetalert2";
import ServiceLineItem from './ServiceLineItem';
import serviceApi from '../../../api/serviceApi';

const ServiceComponent = () => {
    let history = useNavigate();
    const [ status, setStatus ] = useState('0');
    const [ serviceArr, setServiceArr ] = useState([]);

    useEffect(() => {
        getService(status).then(r => {});
        window.scrollTo(0, 0);
    }, [status]);

    const handleAddNewService = () => {
        history(`/add-service`);
    }

    const getService= async (status) => {
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
    <div className="container-fluid container-fluid_history-payment">
            <div className="row row_colection">
                <div className="col-sm-12 col-sm-12_history-payment">
                    <div className="contact_title" >
                        <h1 className="contact_title-h1" >Danh sách dịch vụ</h1>
                    </div>
                    <div className="payment_buttons">
                        <button type="button" id="checkout" className="btn-primary btn-pay" onClick={() => setStatus(0)}>Tất cả</button>
                        <button type="button" id="update-cart" className="btn-primary btn-update" onClick={() => setStatus(1)}>Đã xóa</button>
                        <button type="button" id="update-cart" className="btn-primary btn-update" onClick={() => handleAddNewService()}>Thêm mới</button>
                    </div>
                    <form action="/cart" method="post" id="cartformpage" >
                        <table width="100%">
                            <thead className="table_thread">
                                <tr>
                                    <th className="image">Mã dịch vụ</th>
                                    <th className="price">Tên dịch vụ</th>
                                    <th className="quantity">Trạng thái</th>
                                    <th className="price">Chỉnh sửa</th>
                                    <th className="remove">Xóa/Kích hoạt</th>
                                </tr>
                            </thead>
                            {}
                            {serviceArr && serviceArr.length > 0 && serviceArr.map((item, index) => {
                            return (
                                <ServiceLineItem
                                    key={index}
                                    serviceId = {item.id}
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

export default ServiceComponent