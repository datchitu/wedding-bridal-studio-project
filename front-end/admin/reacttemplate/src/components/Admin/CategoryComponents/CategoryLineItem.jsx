import React from 'react'
import { useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";
import categoryApi from '../../../api/categoryApi';
import { useState, useEffect} from 'react';

const CategoryLineItem = (props) => {
    const categoryId = props.categoryId;
    let history = useNavigate();
    const [category, setCategory] = useState({});
    
    useEffect(() => {
        getCategoryById(categoryId);
        window.scrollTo(0, 0) 
    }, [categoryId])

    const handleDeleteCategory = async(e) => {
        Swal.fire({
            title: 'Bạn có muốn xóa danh mục?',
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: 'Có',
            denyButtonText: `Không`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const response = deleteCategory(e);
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
    const handleActiveCategory = async(e) => {
        Swal.fire({
            title: 'Bạn có muốn tái kích hoạt danh mục ?',
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: 'Có',
            denyButtonText: `Không`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const response = activeCategory(e);
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

    const deleteCategory = async (id) => {
        return await categoryApi.deleteCategoryById(id);
    }

    const activeCategory = async (id) => {
        return await categoryApi.activeCategoryById(id);
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

     function handleUpdate(e) {
        history(`/update-category/${category.id}`);
        // console.log(">>> check  transaction user id: ", e);
        // console.log(">>> check  status: ", status);
    }

  return (
    <>
        <tbody className="tbody">
            {category && category.id ? (
                <>
                    <tr>
                        <td className="code">
                            <span>{category.id}</span>
                        </td>
                        <td className="content">
                            <span>{category.name}</span>
                        </td>
                        <td className="content">{category.deleted == true ? "đã xóa" : " kích hoạt"}</td>
                        
                        <td className="content">
                            <a className="cart" onClick={() => handleUpdate(category.id)}>
                                <i className="fa-solid fa-pen-to-square"/>
                            </a>
                        </td>
                        <td className="remove">
                            {category.deleted == false ? (
                                <>
                                    <a className="cart" onClick={() => handleDeleteCategory(category.id)}>
                                        <i className="fa fa-trash"/>
                                    </a>
                                </>
                            ) : (
                                <>
                                    <a className="cart" onClick={() => handleActiveCategory(category.id)}>
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

export default CategoryLineItem