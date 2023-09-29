import React from 'react'
import { useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";
import variantServiceApi from '../../../api/variantServiceApi';
import { useState, useEffect} from 'react';
import formatPrice from "../../../utils/util_price"

const VariantvariantServiceLineItem = (props) => {
    const variantServiceId = props.variantServiceId;
    let history = useNavigate();
    const [variantService, setvariantService] = useState({});
    useEffect(() => {
        getVariantServiceById(variantServiceId);
        window.scrollTo(0, 0) 
    }, [variantServiceId])

    const handleDeleteVariantService = async(e) => {
        Swal.fire({
            title: 'Bạn có muốn xóa biến thể dịch vụ?',
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: 'Có',
            denyButtonText: `Không`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const response = deleteVariantService(e);
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
    const handleActiveVariantService = async(e) => {
        Swal.fire({
            title: 'Bạn có muốn tái kích hoạt dịch vụ ?',
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: 'Có',
            denyButtonText: `Không`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const response = activeVariantService(e);
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

    const deleteVariantService = async (id) => {
        return await variantServiceApi.deleteVariantServiceById(id);
    }

    const activeVariantService = async (id) => {
        return await variantServiceApi.activeVariantServiceById(id);
    }

    const getVariantServiceById = async (id) => {
        const response = await variantServiceApi.getVariantServiceById(id);
        const promise = Promise.resolve(response);
        promise.then(data => {
            // console.log(data);
            if (data.code == 200) {
                setvariantService(data.data);
                // console.log("Check user id: ", data.data.id);
            }
            }).catch(err => {
            console.log(err);
            });
     }

     function handleUpdate() {
        history(`/update-variant-service/${variantService.id}`);
        // console.log(">>> check  transaction user id: ", e);
        console.log(">>> check  variantService id: ", variantService.id);
    }

  return (
    <>
        <tbody className="tbody">
            {variantService && variantService.id ? (
                <>
                    <tr>
                        <td className="code">
                            <span>{variantService.id}</span>
                        </td>
                        <td className="image">
                            <div className="variant-service_image">
                                <img src={variantService.avatar} alt={variantService.name}/>
                            </div>
                        </td>
                        <td className="content">
                            <span>{variantService.name}</span>
                        </td>
                        <td className="price">
                            <span>{formatPrice(variantService.price)}</span>
                        </td>
                        <td className="price">
                            <span>{variantService.quantity}</span>
                        </td>
                        <td className="content">{variantService.deleted == true ? "đã xóa" : " kích hoạt"}</td>
                        
                        <td className="content">
                            <a className="cart" onClick={() => handleUpdate()}>
                                <i className="fa-solid fa-pen-to-square"/>
                            </a>
                        </td>
                        <td className="remove">
                            {variantService.deleted == false ? (
                                <>
                                    <a className="cart" onClick={() => handleDeleteVariantService(variantService.id)}>
                                        <i className="fa fa-trash"/>
                                    </a>
                                </>
                            ) : (
                                <>
                                    <a className="cart" onClick={() => handleActiveVariantService(variantService.id)}>
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

export default VariantvariantServiceLineItem