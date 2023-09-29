import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import variantServiceApi from '../../src/api/variantServiceApi'
import transactionApi from '../../src/api/transactionApi'
import formatPrice from "../../src/utils/util_price"
import Swal from "sweetalert2";



const VariantServiceDetail = (props) => {
    const { id } = useParams();
    const [ variantService, setVariantService] = useState({});
    
    
    useEffect(() => {
        fetchVariantServiceById();
        window.scrollTo(0, 0);
    }, [id]);
    const fetchVariantServiceById = async () => {
        const response = await variantServiceApi.getVariantServiceById(id)
        if(response && response.data){
            return setVariantService(response.data)
        }
        
    };

    var jsonData = {
            "variantServiceId": id,
            "quantity": 1
    }

    const setToltalPrice = async() => {
        return await transactionApi.setTotalPriceEmptyTransaction();
    }
    const addToCart = async(jsonData) => {
        return await transactionApi.addVariantServiceToTransaction(jsonData)
    }

    const handleAddToCart = () => {
        const response = addToCart(jsonData)
        setTimeout( function() {
            setToltalPrice();
        }, 100);
        response.then(function(result) {
            // console.log(">>> check response: ", result);
            if (result.code === 200) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Dịch vụ đã được thêm vào giỏ hàng',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: `Số lượng dịch vụ đã hết !!! vui lòng chọn dịch vụ khác`,
                    showConfirmButton: false,
                    timer: 1500
                })
                return;
            }
        })
        
    };
    return (
      <>
        <div className="container-fluid container-fluid_body">
            <div className="row row_colection">
                <div className="col-sm-6 col-sm-6_left">
                    <div className="image-collection_main">
                        <img src={`/${variantService.avatar}`} 
                            alt={variantService.name} 
                            className="variant-service-detail-image" 
                            rounded="true"
                        />
                    </div>
                    <div className="image-collection_container">
                        <img src={`/${variantService.avatar}`} 
                            alt={variantService.name} 
                            className="variant-service-detail-image" 
                            rounded="true"
                        />   
                    </div>
                </div>
                <div className="col-sm-6 col-sm-6_right">
                    <div className="content-collection_item">
                        <h1 className="variant-service-item_name">
                            {variantService?.name? variantService.name.charAt(0).toUpperCase() + variantService.name.slice(1) : variantService.name}
                        </h1>
                        <p>{variantService?.description? variantService.description.charAt(0).toUpperCase() + variantService.description.slice(1) : variantService.description}</p>
                        {variantService.quantity > 0 ? (
                            <span className="content-collection_item-quantity">Số lượng còn lại: {variantService.quantity}</span>

                        ) : (
                            <span className="content-collection_item-quantity" >Số lượng còn lại: Đã hết</span>
                        )}
                        <div className="content-collection_item-price">
                            <span className="price-text">Giá:</span>
                            <span className="price-number">
                                {formatPrice(variantService.price)}đ
                            </span>
                        </div>
                        <div className="btn-add-cart">
                            <Link className="btn-add-cart" onClick={() => handleAddToCart()}>Thêm vào giỏ hàng</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
  }
  
  export default VariantServiceDetail;