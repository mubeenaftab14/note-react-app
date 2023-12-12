import React from "react";
import classnames from "classnames";
import styles from "./ModalBody.module.scss";

interface ModalBodyProps {
  children?: React.ReactNode;
  maxHeight?: number | string;
  padded?: boolean;
}

export const ModalBody: React.FC<ModalBodyProps> = ({ children, maxHeight, padded = true }) => {
  const modalStyles = classnames(styles.modalBody, {
    [styles.paddingNone]: !padded,
  });
  return (
    <div className={modalStyles} style={{ maxHeight }}>
      {children}
    </div>
  );
};
