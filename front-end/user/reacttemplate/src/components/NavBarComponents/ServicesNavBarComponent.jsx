import { WrapperLableText, WrapperTextValue, WrapperTextValueHover } from "./style"
import _ from "lodash";
import React, { useState, useEffect, useQuery } from 'react';
import serviceApi from '../../api/serviceApi';
import { useNavigate,Link} from 'react-router-dom';
import capitalize from "../../utils/util_capitalize_first"

const ServicesNavBarComponent = (props) => {
    const servicesId = props.servicesId;
    const [ servicesArr, setServicesArr] = useState([]);
    let history = useNavigate();

    const handleViewServiceById = (id) => {
        history(`/category/${id}`)
        // window.location.reload(false);
        // window.location.href = ('/category/',{id});
    };
    useEffect(()=> {
        getAllServiceByCategoryId();
    }, [])
    const getAllServiceByCategoryId = async () => {
        const response = await serviceApi.getAllServiceByCategoryId(servicesId, 0)
        if(response && response.data){
            let result = response.data
            let _servicesArr = []
            for (let key in result) {
                // console.log(">>> check child: ", result[servicesId])
                _servicesArr.push(result[key])
            }
            // console.log(">>> check result: ", result)
            setServicesArr(_servicesArr);
        } else {
            // alert("empty result")
            setServicesArr([]);
        }
     }
    return (
        <>
            {servicesArr && servicesArr.length > 0 && servicesArr.map((item, index) => {
                return (
                <WrapperTextValueHover>
                    <span onClick={() => handleViewServiceById(item.id)}>{capitalize(item.name)}</span>
                </WrapperTextValueHover>
            )
        })}
        </>
    )
}
export default ServicesNavBarComponent