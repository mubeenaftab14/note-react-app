import styled from "styled-components";

interface IProps {
  width?: string;
  height?: string;
}

export const LineSeparator = styled.div<{
  color?: string;
}>`
  width: 100%;
  border-top: 1px solid ${({color}) => color ? color : "#232527"};
`;

export const Separator = styled.div<IProps>`
  width: ${({ width }) => (width ? width : "100%")};
  height: ${({ height }) => (height ? height : "20px")};
`;