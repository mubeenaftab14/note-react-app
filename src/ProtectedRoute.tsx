import React, { ReactNode, useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
type ProtectedRoutesProps = {
  children: ReactNode;
};
const ProtectedRoute = ({ children }: ProtectedRoutesProps) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserToken = () => {
    const userToken = localStorage.getItem("Token");
    if (!userToken) {
      setIsLoggedIn(false);
      return navigate("/");
    }
    setIsLoggedIn(true);
  };
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);
  return <>{isLoggedIn ? children : null}</>;
};
export default ProtectedRoute;
