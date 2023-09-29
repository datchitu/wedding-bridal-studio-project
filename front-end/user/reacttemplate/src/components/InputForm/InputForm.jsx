import React, { useState } from "react";
import { WrapperErrorMessage, WrapperInputStyle, WrapperInputStyleInvalid } from "./style";

const InputForm = ( props ) => {
    const { placeholder, errorMessage,pattern,require, ...rests } = props
    const handleOnchangeInput = (e) => {
        props.onChange(e.target.value)
    }
    return (
        <div>
            <WrapperErrorMessage>{errorMessage}</WrapperErrorMessage>
            <WrapperInputStyleInvalid placeholder={placeholder} value={props.value} pattern={pattern} require={require} {...rests} onChange={handleOnchangeInput} required/>
        </div>
    )
}

export default InputForm