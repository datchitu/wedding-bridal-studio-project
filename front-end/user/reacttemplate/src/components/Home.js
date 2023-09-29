import React, { useCallback } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import SliderComponent from '../../src/components/SliderComponents/SliderComponent'
import  slider1  from '../../src/assets/images/wedding-bridal-4.jpg'
import  slider2  from '../../src/assets/images/wedding-bridal-2.jpg'
import  slider3  from '../../src/assets/images/wedding-bridal-3.jpg'
import  slider4  from '../../src/assets/images/Da-Nang-tour-1.jpg'
import NavBarComponent from './NavBarComponents/NavBarComponent'
import CardComponent from './CardComponents/CardComponent'
import variantServiceApi from '../../src/api/variantServiceApi'
import  weddingDress1  from '../../src/assets/images/wedding-dress-1.jpg'
import  aoDai1  from '../../src/assets/images/ao-dai-1.jpg'
import  weddingDress2  from '../../src/assets/images/wedding-dress-2.jpg'
import  doKhoa3  from '../../src/assets/images/do-khoa-3.jpg'

const Home = () => {
    const prev = () => {
    }
    const next = () => {
    }
    let history = useNavigate();
    const handleViewPage = useCallback (async (num) => {
        history(`/page/${num}`)
        const response = await variantServiceApi.getAllVariantService(0, num)
        if(response && response.data){
            let result = response.data
            let _variantServicesArr = []
            for (let key in result) {
                // console.log(">>> check child: ", result[id])
                _variantServicesArr.push( result[key])
            }
            // console.log(">>> check result: ", result)
            setvariantServicesArr(_variantServicesArr);
        } else {
            setvariantServicesArr([]);
        }
        window.scrollTo(0, 500) 
    });
    const { serviceId, keywordSearch} = useParams();
    const num = 0;
    const [ variantServicesArr, setvariantServicesArr] = useState([]);
    const getAllVariantService = async () => {}
    // console.log(">>> check num params: ", useParams())
    useEffect(()=> {
        if (typeof serviceId == 'undefined' && typeof keywordSearch == 'undefined') {
            const getAllVariantServiceResult = async () => {
                const response = await variantServiceApi.getAllVariantService(0,num)
                if(response && response.data){
                    let result = response.data
                    let _variantServicesArr = []
                    for (let key in result) {
                        // console.log(">>> check child: ", result[id])
                        _variantServicesArr.push( result[key])
                    }
                    // console.log(">>> check result: ", result)
                    setvariantServicesArr(_variantServicesArr);
                } else {
                    setvariantServicesArr([]);
                }
             }
             getAllVariantService(getAllVariantServiceResult());
        } else if (typeof keywordSearch != 'undefined'){
            // console.log(">>> check params keywordSearch = ", keywordSearch)
            const getAllVariantServiceByKeyword = async () => {
                const response = await variantServiceApi.searchVariantServiceByName(keywordSearch, 0, 0)
                if(response && response.data){
                    let result = response.data
                    let _variantServicesArr = []
                    for (let key in result) {
                        // console.log(">>> check child: ", result[id])
                        _variantServicesArr.push( result[key])
                    }
                    // console.log(">>> check result: ", result)
                    setvariantServicesArr(_variantServicesArr);
                } else {
                    // alert("empty result")
                    setvariantServicesArr([]);
                }
             }
             getAllVariantService(getAllVariantServiceByKeyword());
        } else {
            // console.log(">>> check params serviceId = ", keywordSearch)
            const getAllVariantServiceById = async () => {
                const response = await variantServiceApi.getAllVariantServiceByServiceId(serviceId, 0, 0)
                if(response && response.data){
                    let result = response.data
                    let _variantServicesArr = []
                    for (let key in result) {
                        // console.log(">>> check child: ", result[id])
                        _variantServicesArr.push( result[key])
                    }
                    // console.log(">>> check result: ", result)
                    setvariantServicesArr(_variantServicesArr);
                } else {
                    setvariantServicesArr([]);
                }
             }
             getAllVariantService(getAllVariantServiceById());
        } 
        
    }, [serviceId, keywordSearch, num])

  return (
    <>
    <div className="container-fluid container-fluid__main">
            <div className="row row__top">
                <div className="col-sm-8 app__container-left"> 
                    <section className="slider">

                        <div className="slider__container">
                            <div className="slider__item">
                                <SliderComponent arrImages = {[slider1, slider2, slider3, slider4]} />
                            </div>
                            <div className="slider__container-btn">
                                <div className="control_prev">
                                    <i className="fas fa-chevron-left" onClick={prev}></i>
                                </div>
                                <div className="control_next">
                                    <i className="fas fa-chevron-right" onClick={next}></i>
                                </div>
                            </div>
                        </div>
                    </section> 
                </div>
                <div className="col-sm-4 app__container-right">
                    <div className="row container__row-top">
                        <li><Link href=""><img src={weddingDress1} alt="wedding-dress-1 "/></Link></li>
                        <li><Link href=""><img src={aoDai1} alt="ao-dai-1 "/></Link></li>   
                    </div>
                    <div className="row container__row-bot">
                        
                        <li><Link href=""><img src={weddingDress2} alt="wedding-dress-2 "/></Link></li>
                        <li><Link href=""><img src={doKhoa3} alt="do-khoa-3 "/></Link></li>
                    </div>
                </div>   
            </div>
            <div className="row row_category">
                <div className="col-sm-2">
                    <div className="row">
                        <nav className="category_services">
                           <h1 className="category__header">
                               <i className="category__header-icon fas fa-list"></i>
                               Danh mục
                           </h1>
                           <ul className="category-list">
                               <li className="category-item">
                                    <NavBarComponent/>
                               </li>
                           </ul>
                        </nav>
                   </div>    
                </div>
                <div className="col-sm-10">
                    <div className="col_services_entrance-ticket">
                        <div className="row_col_item">
                            {/* {variantServices?.data?.map((variantService) => {
                                return(
                                    <CardComponent
                                        id={variantService.id}
                                        name={variantService.name}
                                        // avatar={variantService.avatar}
                                        avatar={`/${variantService.avatar}`}
                                        price={variantService.price}
                                    />
                                )
                            })} */}
                            {variantServicesArr && variantServicesArr.length > 0 && variantServicesArr.map((item, index) => {
                                return(
                                    <CardComponent
                                        key={index}
                                        id={item.id}
                                        name={item.name}
                                        // avatar={variantService.avatar}
                                        avatar={`/${item.avatar}`}
                                        price={item.price}
                                    />
                                )
                            })}
                        </div>
                    </div>
                    <div className="col-services_bottom">
                        {typeof serviceId == 'undefined' && typeof keywordSearch == 'undefined' ? (
                            <>
                                <div className="col-services_bottom-items">
                                    <button className="page_numbers" onClick={() => handleViewPage(0)}>1</button>
                                    <button className="page_numbers" onClick={() => handleViewPage(1)}>2</button>
                                    <button className="page_numbers" onClick={() => handleViewPage(2)}>3</button>
                                    <button className="page_numbers-last" onClick={() => handleViewPage(3)}>Trang cuối</button>
                                </div>
                            </>
                        ) : (
                            <></>
                        )}
                        
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Home