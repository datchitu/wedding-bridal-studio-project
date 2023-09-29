import React from 'react'
import { useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";
import userApi from '../../../api/userApi';
import { useState, useEffect} from 'react';
import formatDate from '../../../utils/util_formatDate';
import Moment from 'react-moment';

const UserLineItem = (props) => {
    const userId = props.userId;
    let history = useNavigate();
    const [user, setUser] = useState({});
    useEffect(() => {
        getUserById(userId, -1);
        window.scrollTo(0, 0) 
    }, [userId])

    const handleDeleteUser = async(e) => {
        Swal.fire({
            title: 'Bạn có muốn xóa người dùng ?',
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: 'Có',
            denyButtonText: `Không`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const response = deleteUser(e);
                const promise = Promise.resolve(response);
                promise.then(data => {
                    console.log(data);  
                    if (data.code == 200) {
                        Swal.fire('Xóa thành công!', '', 'success')
                        setTimeout(function() {window.location.reload(false)},1500);
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
    const handleActiveUser = async(e) => {
        Swal.fire({
            title: 'Bạn có muốn tái kích hoạt người dùng ?',
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: 'Có',
            denyButtonText: `Không`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const response = activeUser(e);
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

    const deleteUser = async (id) => {
        return await userApi.deleteUserById(id);
    }

    const activeUser = async (id) => {
        return await userApi.activeUserById(id);
    }

    const getUserById = async (id, status) => {
        const response = await userApi.getUserByIdAndDeleted(id, status);
        const promise = Promise.resolve(response);
        promise.then(data => {
            // console.log(data);
            if (data.code == 200) {
                setUser(data.data);
                // console.log("Check user id: ", data.data.id);
            }
            }).catch(err => {
            console.log(err);
            });
     }

     function handleChangePass(e) {
        history(`/change-password-user/${user.id}`);
        // console.log(">>> check  transaction user id: ", e);
        // console.log(">>> check  status: ", status);
    }

  return (
    <>
        <tbody className="tbody">
            {user.roles && user.roles.length > 0 && user.roles.map((item, index) => {
                return (
                    <>
                        {user && user.id ? (
                            <>
                                <tr>
                                    <td className="code">
                                        <span>{user.id}</span>
                                    </td>
                                    <td className="content">
                                        <span>{user.firstName}</span>
                                    </td>
                                    <td className="content">
                                        <span>{user.lastName}</span>
                                    </td>
                                    <td className="content">
                                        <span>{user.email}</span>
                                    </td>
                                    <td className="content">
                                        <span>{user.phone}</span>
                                    </td>
                                    <td className="content">
                                        <span>{user.gender == true ? "nữ" : "nam"}</span>
                                    </td>
                                    <td className="content">{user.deleted == true ? "đã xóa" : " kích hoạt"}</td>
                                    <td className="content">
                                        <span>{item.roleName}</span>
                                    </td>
                                    <td className="content">
                                        <a className="cart" onClick={() => handleChangePass(user.id)}>
                                            <i className="fa-solid fa-pen-to-square"/>
                                        </a>
                                    </td>
                                    <td className="remove">
                                        {user.deleted == false ? (
                                            <>
                                                <a className="cart" onClick={() => handleDeleteUser(user.id)}>
                                                    <i className="fa fa-trash"/>
                                                </a>
                                            </>
                                        ) : (
                                            <>
                                                <a className="cart" onClick={() => handleActiveUser(user.id)}>
                                                    Kích hoạt
                                                </a>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            </>
                        ) : (<></>)}
                    </>
                )
            })}
        </tbody>
    </>
  )
}

export default UserLineItem