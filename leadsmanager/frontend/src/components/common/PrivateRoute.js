import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) => {
        setInterval(() => {
          if (auth.isLoading) {
            return <h2>Loading...</h2>;
          } else if (!auth.isAuthenticated) {
            return <Redirect to="/login" />;
          }
        }, 2000);

        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
