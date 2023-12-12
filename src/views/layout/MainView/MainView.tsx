import React from "react";
import styles from "./MainView.module.scss";
import classNames from "classnames";

import { Sidebar } from "../Sidebar";

interface IProps {
  sendMessageLoading?: boolean;
  children?: React.ReactNode;
}

export const MainView: React.FC<IProps> = ({children}) => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={classNames(styles.content)}>
        {children}
      </div>
    </div>
  )
}
