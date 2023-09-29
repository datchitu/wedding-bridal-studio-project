import React from 'react'
import { useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";
import serviceApi from '../../../api/serviceApi';
import { useState, useEffect} from 'react';

const ServiceLineItem = (props) => {
    const serviceId = props.serviceId;
    let history = useNavigate();
    const [service, setservice] = useState({});
    useEffect(() => {
        getServiceById(serviceId);
        window.scrollTo(0, 0) 
    }, [serviceId])

    const handleDeleteService = async(e) => {
        Swal.fire({
            title: 'Bạn có muốn xóa dịch vụ?',
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: 'Có',
            denyButtonText: `Không`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const response = deleteService(e);
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
    const handleActiveService = async(e) => {
        Swal.fire({
            title: 'Bạn có muốn tái kích hoạt dịch vụ ?',
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: 'Có',
            denyButtonText: `Không`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const response = activeService(e);
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

    const deleteService = async (id) => {
        return await serviceApi.deleteServiceById(id);
    }

    const activeService = async (id) => {
        return await serviceApi.activeServiceById(id);
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

     function handleUpdate() {
        history(`/update-service/${service.id}`);
        // console.log(">>> check  transaction user id: ", e);
        console.log(">>> check  service id: ", service.id);
        
    }

  return (
    <>
        <tbody className="tbody">
            {service && service.id ? (
                <>
                    <tr>
                        <td className="code">
                            <span>{service.id}</span>
                        </td>
                        <td className="content">
                            <span>{service.name}</span>
                        </td>
                        <td className="content">{service.deleted == true ? "đã xóa" : " kích hoạt"}</td>
                        
                        <td className="content">
                            <a className="cart" onClick={() => handleUpdate()}>
                                <i className="fa-solid fa-pen-to-square"/>
                            </a>
                        </td>
                        <td className="remove">
                            {service.deleted == false ? (
                                <>
                                    <a className="cart" onClick={() => handleDeleteService(service.id)}>
                                        <i className="fa fa-trash"/>
                                    </a>
                                </>
                            ) : (
                                <>
                                    <a className="cart" onClick={() => handleActiveService(service.id)}>
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

export default ServiceLineItem