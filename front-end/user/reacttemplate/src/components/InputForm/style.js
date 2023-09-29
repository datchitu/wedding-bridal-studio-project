import { styled } from "styled-components";

export const WrapperInputStyle = styled.input`
    display: flex;
    font-size: 1.8rem;
    width: 100%;
    height: 45px;
    margin-top: 16px;
    padding: 0 12px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    text-align: start;
    align-items: center;
`

export const WrapperErrorMessage= styled.span`
    font-size: 1.8rem;
    color: #E21818;
    width: 100%;
    font-weight: 400;
    text-align: start;
    position: absolute;
    left: 105%;
    bottom: -3px
`

export const WrapperInputStyleInvalid = styled(WrapperInputStyle)`
    & :invalid ~ span {
        display: block;
    }
`