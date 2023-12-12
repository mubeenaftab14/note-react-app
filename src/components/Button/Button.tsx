import React from "react";
import styled, { keyframes } from "styled-components";

import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  full?: boolean;
  white?: boolean;
  children: React.ReactNode;
  small?: boolean;
  isLoading?: boolean;
  variant?: "primary" | "outlined-primary" | "outlined";
}

const getBorderColor = (props: IProps) => {
  const { variant } = props;
  if (variant === "primary") {
    return "transparent";
  } else if (variant === "outlined") {
    return "#232527";
  } else if (variant === "outlined-primary") {
    return "#7C4DFF";
  } else {
    return "transarent";
  }
};

const getBackgroundColor = (props: IProps) => {
  const { variant } = props;
  if (variant === "primary") {
    return "linear-gradient(92.31deg, #8c49f7 0%, #6c53ff 100%)";
  } else {
    return "none";
  }
};

const Button = styled.button<IProps>`
  border: 1px solid ${(props) => getBorderColor(props)};
  background-color: transparent;
  background-color: ;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  text-align: center;
  background-image: ${(props) => getBackgroundColor(props)};
  
  color: #ffffff;
  border-radius: 10px;
  padding:${({ small }) => (small ? " 5px 12px" : " 9px 16px")};
  text-decoration: none;
  width:${({ full }) => (full ? "100%" : "auto")};
  position: relative;

  opacity: ${({disabled}) => disabled ? 0.5 : 1};

  &:hover {
    background-image: ${(props) => getBackgroundColor(props)};
    color: #ffffff;
    opacity: 1;
    cursor: ${({disabled}) => disabled ? 'auto' : 'pointer'};
    opacity: ${({disabled}) => disabled ? 0.5 : 1};
  }
`

export const SpinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SymbolSpinner = styled(FontAwesomeIcon)`
  display: inline-block;
  font-size: 18px;
  position: absolute;
  left: 50%;
  animation: ${SpinAnimation} 1.5s linear 0s infinite;
  color: ${({theme}) => theme.whiteColor};
  margin: -1px 0 -3px -9px;
`;

const Invisible = styled.div`
  color: rgba(255, 255, 255, 0);
`;

export const CutsomButton: React.FC<IProps> = (props) => {
  return (
    <Button {...props}>
      {props.isLoading ? (
        <>
          <SymbolSpinner icon={faCircleNotch} />
          <Invisible>{props.children}</Invisible>
        </>
      ) : (
        props.children
      )}
    </Button>
  )
}
