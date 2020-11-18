import React, { setInterval } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.auth);

  // async function waitForAuth() {
  //   await auth.isAuthenticated;
  //   console.log("past auth", auth.isAuthenticated);
  //   if (!auth.isAuthenticated) {
  //     return <Redirect to="/login" />;
  //   }
  // }
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isLoading) {
          return <h2>Loading...</h2>;
        } else if (!auth.isAuthenticated) {
          return <Redirect to="/login" />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
