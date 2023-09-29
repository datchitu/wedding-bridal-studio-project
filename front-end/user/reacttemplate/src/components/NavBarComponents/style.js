import { styled } from "styled-components";


export const WrapperLableText = styled.h4`
    position: relative;
    right: 0;
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--text-color);
    text-decoration: none;
    padding: 6px 0px 0px 4px;
    display: block;
`
export const WrapperTextValue = styled.span`
    position: relative;
    right: 0;
    font-size: 1.8rem;
    font-weight: 500;
    color: var(--text-color);
    text-decoration: none;
    padding: 8px 8px;
    display: block;
    transition: right linear 0.1s;
    cursor: pointer;
`
export const WrapperTextValueHover = styled(WrapperTextValue)`
    & :hover {
        right: -4px;
        padding: 8px 8px;
        color: var(--white-color);
        background-color: var(--base-color);
    }
`