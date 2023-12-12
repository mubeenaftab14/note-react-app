import React from "react";
import styled from "styled-components";

interface IProps {
  children?: React.ReactNode;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  background: #141517;
  color: #fff;
`;

const Content = styled.div`
  padding: 68px 0px 0 0px;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 769px) {
    padding: 68px 0 0 0;
  }
`;

export const Main: React.FC<IProps> = ({ children }) => (
  <Wrapper>
    <Content>{children}</Content>
  </Wrapper>
)
