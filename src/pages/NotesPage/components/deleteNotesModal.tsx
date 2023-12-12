import React from "react";
import styled from "styled-components";
import { Modal, Separator } from "components";
import Button from "components/Button";

interface IProps {
  onClose: () => void;
  onDelete: () => void;
}

const ModalBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Headline = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  color: #ffffff;
  white-space: pre-wrap;
  text-align: center;
`;

const Message = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  color: #ffffff;
  opacity: 0.7;
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

export const DeleteNotesModal = ({ onClose, onDelete }: IProps) => {
  return (
    <Modal size="sm" onClose={onClose}>
      <ModalBody>
        <Headline>Delete Notes</Headline>
        <Separator height="6px" />
        <Message>Are you sure you want to delete?</Message>
        <Separator height="40px" />
        <Footer>
          <Button variant="outlined-primary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onDelete} isLoading={false}>
            Delete
          </Button>
        </Footer>
      </ModalBody>
    </Modal>
  );
};
