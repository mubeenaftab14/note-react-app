import React from "react";
import { Route, Routes } from "react-router-dom";
import { RoutePaths } from "./routePaths";

import { LoginPage, SignupPage } from "./AuthPages";
import { NotesPage } from "./NotesPage";
import { AccountPage } from "./AccountPage";

import { Notification } from "../components";
import {
  useAppNotification,
  appNotificationInitialState,
} from "../hooks/services/AppNotification";
import ProtectedRoute from "../ProtectedRoute";

export const Routing = () => {
  const { notification, triggerNotification } = useAppNotification();

  return (
    <React.Fragment>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => triggerNotification(appNotificationInitialState)}
      />
      <Routes>
        <Route path={`${RoutePaths.Login}`} element={<LoginPage />} />
        <Route path={`/${RoutePaths.Signup}`} element={<SignupPage />} />
        <Route
          path={`/${RoutePaths.Notes}`}
          element={
            <ProtectedRoute>
              <NotesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={`/${RoutePaths.Account}`}
          element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </React.Fragment>
  );
};
