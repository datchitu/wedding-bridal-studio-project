import { WrapperLableText, WrapperTextValue, WrapperTextValueHover } from "./style"
import _ from "lodash";
import React, { useState, useEffect, useQuery } from 'react';
import * as categoryApi from '../../api/categoryApi';

const CategoryNavBarComponent = (props) => {
    const categoryId = props.categoryId;
    const [ categoriesArr, setCategoriesArr] = useState([]);
    const [ category, setCategory] = useState([]);

    useEffect(()=> {
        getCategoryById();
    }, [])
    const getCategoryById = async () => {
        const response = await categoryApi.getCategoryById(categoryId)
        if(response && response.data){
            let result = response.data
            let _categoryArr = []
            for (let key in result) {
                console.log(">>> check child: ", result[categoryId])
                _categoryArr.push( result[key])
            }
            // console.log(">>> check result: ", result)
            setCategoriesArr(_categoryArr);
            setCategory(result)
        } else {
            // alert("empty result")
            setCategoriesArr([]);
        }
     }
    return (
        <>
            {/* {JSON.stringify(categoriesArr)} */}
            {categoriesArr && categoriesArr.length > 0 && categoriesArr.map((item, index) => {
                return (
                    <WrapperLableText>
                        <span>{item.name}</span>
                    </WrapperLableText>
            )
            })}
            {category && category.length > 0 && category.map((item, index) => {
                return (
                    <WrapperTextValueHover>
                        <span>{item.serviceName}</span>
                    </WrapperTextValueHover>
            )
            })}
        </>
    )
}
export default CategoryNavBarComponent