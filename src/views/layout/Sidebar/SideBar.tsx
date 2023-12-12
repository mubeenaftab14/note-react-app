import React from "react";
import styles from "./Sidebar.module.scss";
import styled from "styled-components";

import Button from "../../../components/Button";

import useRouter from "../../../hooks/useRouter";
import { RoutePaths } from "../../../pages/routePaths";

const ItemsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Item = styled.div<{
  isSelected?: boolean;
}>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  border-radius: 5px;
  padding: 6px 12px;
  cursor: pointer;
  background-color: ${({ isSelected }) =>
    isSelected ? "#343541" : "transparent"};
  margin-bottom: 1px;
  &:hover {
    background-color: ${({ isSelected }) =>
      isSelected ? "#343541" : "#2A2B32"};
  }
`;

const ItemText = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 28px;
  color: #ffffff;
  margin-left: 13px;
  white-space: nowrap;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
`;

interface ISidebarItem {
  pathname: string;
}

const sidebarItems: ISidebarItem[] = [
  { pathname: RoutePaths.Notes },
  { pathname: RoutePaths.Account },
];

export const Sidebar: React.FC = () => {
  const { push, includeRoute } = useRouter();

  const onLogout = () => {
    localStorage.clear();
    push(`${RoutePaths.Login}`);
  };
  return (
    <div className={styles.container}>
      <ItemsContainer>
        {sidebarItems.map((item) => (
          <Item
            isSelected={includeRoute(item.pathname)}
            onClick={() => push(`/${item.pathname}`)}
          >
            <ItemText>{item.pathname}</ItemText>
          </Item>
        ))}
      </ItemsContainer>
      <Button variant="outlined-primary" onClick={onLogout}>
        Logout
      </Button>
    </div>
  );
};
