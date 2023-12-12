import React from "react";
import styles from "./ModalFooter.module.scss";

interface IProps {
  children?: React.ReactNode;
}

export const ModalFooter: React.FC<IProps> = ({children}) => {
  return <div className={styles.modalFooter}>{children}</div>;
};
