import React, { createContext, useContext, useState } from "react";

export interface AppNotification {
  message: string;
  type: "info" | "error";
};

export interface AppNotificationProviderValue {
  notification: AppNotification;
  triggerNotification: React.Dispatch<React.SetStateAction<AppNotification>>;
};

interface IProps {
  children?: React.ReactNode;
};

const AppNotificationContext = createContext<AppNotificationProviderValue | null>(null);

export const appNotificationInitialState: AppNotification = { message: "", type: "info" };

export const AppNotificationProvider: React.FC<IProps> = ({ children }) => {
  const [notification, triggerNotification] = useState<AppNotification>(appNotificationInitialState);

  return (
    <AppNotificationContext.Provider value={{ notification, triggerNotification }}>
      {children}
    </AppNotificationContext.Provider>
  );
};

export const useAppNotification = (): AppNotificationProviderValue => {
  const appNotificationContext = useContext(AppNotificationContext);

  if (!appNotificationContext) {
    throw new Error("AppNotificationContext must be used within AppNotificationProvider");
  }

  return appNotificationContext;
};
