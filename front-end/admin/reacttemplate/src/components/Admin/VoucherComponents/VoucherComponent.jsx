import React from 'react'
import { useState, useEffect} from 'react';
import { useNavigate,Link} from 'react-router-dom';
// import Swal from "sweetalert2";
import VoucherLineItem from './VoucherLineItem';
import voucherApi from '../../../api/voucherApi';


const VoucherComponent = () => {
    let history = useNavigate();
    const [ status, setStatus ] = useState('0');
    const [ voucherArr, setVoucherArr ] = useState([]);

    useEffect(() => {
        getVoucher(status, 0).then(r => {});
        window.scrollTo(0, 0);
    }, [status]);

    const handleAddNewVoucher = () => {
        history(`/add-voucher`);
    }

    const getVoucher = async (status) => {
        const response = await voucherApi.getAllVoucherByDeleted(status, 0);
        const promise = Promise.resolve(response);
        promise.then(data => {
            // console.log(data);
            if (data.code == 200) {
                let result = data.data;
                let _voucherArr = [];
                for (let key in result) {
                    _voucherArr.push( result[key])
                }
                setVoucherArr(_voucherArr);
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
                        <h1 className="contact_title-h1" >Danh sách voucher</h1>
                    </div>
                    <div className="payment_buttons">
                        <button type="button" id="checkout" className="btn-primary btn-pay" onClick={() => setStatus(0)}>Tất cả</button>
                        <button type="button" id="update-cart" className="btn-primary btn-update" onClick={() => setStatus(1)}>Đã xóa</button>
                        <button type="button" id="update-cart" className="btn-primary btn-update" onClick={() => handleAddNewVoucher()}>Thêm mới</button>
                    </div>
                    <form action="/cart" method="post" id="cartformpage" >
                        <table width="100%">
                            <thead className="table_thread">
                                <tr>
                                    <th className="image">Mã voucher</th>
                                    <th className="price">Tên voucher</th>
                                    <th className="price">Code voucher</th>
                                    <th className="price">Giảm giá</th>
                                    <th className="price">Số lượng</th>
                                    <th className="quantity">Ngày hết hạn</th>
                                    <th className="quantity">Trạng thái</th>
                                    <th className="price">Chỉnh sửa</th>
                                    <th className="remove">Xóa/Kích hoạt</th>
                                </tr>
                            </thead>
                            {}
                            {voucherArr && voucherArr.length > 0 && voucherArr.map((item, index) => {
                            return (
                                <VoucherLineItem
                                    key={index}
                                    voucherId = {item.id}
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

export default VoucherComponent