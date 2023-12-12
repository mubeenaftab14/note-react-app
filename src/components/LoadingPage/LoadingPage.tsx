import React from "react";
import styled from "styled-components";

import { Spinner } from "../../components";

interface IProps {
  full?: boolean;
  position?: string;
  smallLoader?: boolean;
}

const Container = styled.div<IProps>`
  width: 100%;
  height: 100%;
  padding: 20px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, position }) => (position ? theme.backgroundColor : "transparent")};
  z-index: 10005;
  position: ${({ position }) => (position ? position : "static")};
`;

const LoadingPage: React.FC<IProps> = ({full, position, smallLoader}) => (
  <Container full={full} position={position}>
    <Spinner small={smallLoader} />
  </Container>
);

export default LoadingPage;
