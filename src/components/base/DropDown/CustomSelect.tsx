import Select, { Props } from "react-select";
import styled from "styled-components";

export const CustomSelect = styled(Select)<
  {
    $withBorder?: boolean;
    $error?: boolean;
    $background?: string;
    height?:number
  } & Props
>`
  & > .react-select__control {
    height: ${({height }) => (height ? height : 36)}px;
    box-shadow: none;
    // border: 1px solid ${({ theme, $withBorder, $error }) => $error ? theme.dangerColor : $withBorder ? theme.greyColor30 : theme.greyColor0};
    // background: ${({ $background, theme }) => ($background ? $background : theme.greyColor0)};
    border: 1px solid ${({theme, $withBorder, $error}) => 
      $error ? theme.dangerColor : $withBorder ? theme.greyColor30 : 'rgba(255, 255, 255, 0.1)'};
    background: ${({$background}) => ($background ? $background : 'transparent')};
    border-radius: 6px;
    font-size: 14px;
    line-height: 16px;
    min-height: 36px;

    &:hover {
      // border-color: ${({ theme, $error }) => ($error ? theme.dangerColor : theme.greyColor20)};
      // background: ${({ $background, theme }) => ($background ? $background : theme.greyColor20)};
      border-color: ${({ theme, $error }) => ($error ? theme.dangerColor : 'rgba(255, 255, 255, 0.1)')};
      background: ${({ $background, theme }) => ($background ? $background : 'transparent')};
    }

    &.react-select__control--menu-is-open {
      border: 1px solid ${({ theme }) => theme.primaryColor};
      box-shadow: none;
      background: ${({ theme }) => theme.primaryColor12};
    }

    & .react-select__multi-value {
      background: rgba(255, 255, 255, 0);
    }

    & .react-select__value-container {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
    }
  }
`;
