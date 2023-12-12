import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AppNotificationProvider } from "./hooks/services/AppNotification";

import GlobalStyle from "./global-styles";
import { theme } from "./theme";
import { Routing } from "./pages/routes";

interface IStyle {
  children: React.ReactNode;
}

const StyleProvider: React.FC<IStyle> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);

const App = () => {
  return (
    <StyleProvider>
      <Router>
        <AppNotificationProvider>
          <Routing />
        </AppNotificationProvider>
      </Router>
    </StyleProvider>
  );
};

export default App;
