import React from "react";
import Dropdown from "rc-dropdown";
import Menu, { Item as MenuItem } from "rc-menu";
import "rc-dropdown/assets/index.css";
import styled from "styled-components";

import { MenuIcon } from "./icons";

import { Separator, LineSeparator } from "../../../components";

interface IProps {
  toggleUpdateNotesModal?: () => void;
  toggleDeleteNotesModal?: () => void;
}

const Button = styled.button`
  border: none;
  padding: none;
  background-color: transparent;
`;

const Item = styled(MenuItem)`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #ffffff;
  opacity: 0.7;
  width: 100%;
  cursor: pointer;
`;

export const ActionsMenu: React.FC<IProps> = ({
  toggleUpdateNotesModal,
  toggleDeleteNotesModal,
}) => {
  return (
    <Dropdown
      trigger={["click"]}
      overlay={
        <Menu
          style={{
            width: "180px",
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(15px)",
            borderRadius: "10px",
            boxShadow: "none",
            padding: "12px 16px",
          }}
        >
          <Item key="1" onClick={toggleUpdateNotesModal}>
            Update
          </Item>
          <Separator height="12px" />
          <LineSeparator color="#3F4042" />
          <Separator height="12px" />
          <Item
            key="2"
            style={{ color: "red" }}
            onClick={toggleDeleteNotesModal}
          >
            Delete
          </Item>
        </Menu>
      }
      alignPoint
    >
      <Button>
        <MenuIcon />
      </Button>
    </Dropdown>
  );
};
