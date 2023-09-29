import { WrapperLableText, WrapperTextValue, WrapperTextValueHover } from "./style"
import _ from "lodash";
import React, { useState, useEffect, useQuery } from 'react';
import * as categoryApi from '../../api/categoryApi';
import ServicesNavBarComponent from "./ServicesNavBarComponent";
import capitalize from "../../utils/util_capitalize_first"



const NavBarComponent = () => {
    // const [idCa, setId] = useState("");
    const [categoryArr, setCategorysArr] = useState([]);
    useEffect(()=> {
        getAllCategory();
    }, [])
    const getAllCategory = async () => {
        const response = await categoryApi.getAllCategory(0)
        if(response && response.data){
            let result = response.data
            let _servicesArr = []
            for (let key in result) {
                _servicesArr.push( result[key])
            }
            setCategorysArr(_servicesArr);
        // console.log(">>> check category", result);

        } else {
            setCategorysArr([]);
        }
     }
     

    return (
        <div>
            {categoryArr && categoryArr.length > 0 && categoryArr.map((item, index) => {
                return(
                    <>
                    <WrapperLableText>{capitalize(item.name)}</WrapperLableText>
                    <ServicesNavBarComponent
                        servicesId = {item.id}
                    />
                    </> 
                )
            })}

            {/* <WrapperLableText>Dịch vụ trọn gói</WrapperLableText>

            <ServicesNavBarComponent
                servicesId = {3}
            />
            <WrapperLableText>Dịch vụ đơn</WrapperLableText>
            <ServicesNavBarComponent
                servicesId = {4}
            /> */}
        </div>
    )
}

export default NavBarComponent