import React from 'react'
import { useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";
import voucherApi from '../../../api/voucherApi';
import { useState, useEffect} from 'react';
import Moment from 'react-moment';

const VoucherLineItem = (props) => {
    const voucherId = props.voucherId;
    let history = useNavigate();
    const [voucher, setVoucher] = useState({});
    useEffect(() => {
        getVoucherById(voucherId);
        window.scrollTo(0, 0) 
    }, [voucherId])

    const handleDeleteVoucher = async(e) => {
        Swal.fire({
            title: 'Bạn có muốn xóa voucher?',
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: 'Có',
            denyButtonText: `Không`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const response = deleteVoucher(e);
                const promise = Promise.resolve(response);
                promise.then(data => {
                    console.log(data);  
                    if (data.code == 200) {
                        Swal.fire('Xóa thành công!', '', 'success')
                        setTimeout(function() {window.location.reload(false);},1500);
                    } else {
                        Swal.fire('Xóa không thành công. Kiểm tra lại', '', 'info')
                    }
                }).catch(err => {
                    console.log(err);
                });
              
            } else if (result.isDenied) {
            }
          })
    }
    const handleActiveVoucher = async(e) => {
        Swal.fire({
            title: 'Bạn có muốn tái kích hoạt voucher ?',
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: 'Có',
            denyButtonText: `Không`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const response = activeVoucher(e);
                const promise = Promise.resolve(response);
                promise.then(data => {
                    console.log(data);  
                    if (data.code == 200) {
                        Swal.fire('Kích hoạt thành công!', '', 'success')
                        setTimeout(function() {window.location.reload(false)},1500);
                    } else {
                        Swal.fire('Kích hoạt không thành công. Kiểm tra lại', '', 'info')
                    }
                }).catch(err => {
                    console.log(err);
                });
              
            } else if (result.isDenied) {
            }
          })
    }

    const deleteVoucher = async (id) => {
        return await voucherApi.deleteVoucherById(id);
    }

    const activeVoucher = async (id) => {
        return await voucherApi.activeVoucherById(id);
    }

    const getVoucherById = async (id) => {
        const response = await voucherApi.getVoucherById(id);
        const promise = Promise.resolve(response);
        promise.then(data => {
            // console.log(data);
            if (data.code == 200) {
                setVoucher(data.data);
                // console.log("Check user id: ", data.data.id);
            }
            }).catch(err => {
            console.log(err);
            });
     }

     function handleUpdate(e) {
        history(`/update-voucher/${voucher.id}`);
        // console.log(">>> check  transaction user id: ", e);
        // console.log(">>> check  status: ", status);
    }

  return (
    <>
        <tbody className="tbody">
            {voucher && voucher.id ? (
                <>
                    <tr>
                        <td className="code">
                            <span>{voucher.id}</span>
                        </td>
                        <td className="content">
                            <span>{voucher.name}</span>
                        </td>
                        <td className="content">
                            <span>{voucher.code}</span>
                        </td>
                        <td className="content">
                            <span>{voucher.discount}%</span>
                        </td>
                        <td className="content">
                            <span>{voucher.quantity}</span>
                        </td>
                        <td className="content">
                            <span>
                                <Moment date={voucher.expireDate}  format="DD/MM/YYYY"/>
                            </span>
                        </td>
                        <td className="content">{voucher.deleted == true ? "đã xóa" : " kích hoạt"}</td>
                        
                        <td className="content">
                            <a className="cart" onClick={() => handleUpdate(voucher.id)}>
                                <i className="fa-solid fa-pen-to-square"/>
                            </a>
                        </td>
                        <td className="remove">
                            {voucher.deleted == false ? (
                                <>
                                    <a className="cart" onClick={() => handleDeleteVoucher(voucher.id)}>
                                        <i className="fa fa-trash"/>
                                    </a>
                                </>
                            ) : (
                                <>
                                    <a className="cart" onClick={() => handleActiveVoucher(voucher.id)}>
                                        Kích hoạt
                                    </a>
                                </>
                            )}
                        </td>
                    </tr>
                </>
            ) : (<></>)}
        </tbody>
    </>
  )
}

export default VoucherLineItem