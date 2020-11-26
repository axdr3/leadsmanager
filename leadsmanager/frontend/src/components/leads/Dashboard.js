import React from "react";
import { useSelector } from "react-redux";
import { Form } from "./Form";
import Leads from "./Leads";

export default function Dashboard() {
  const auth = useSelector((state) => state.auth);

  const guestDashboard = <h2>Welcome</h2>;
  return (
    <React.Fragment>
      {auth.isAuthenticated ? (
        <React.Fragment>
          <Leads />
          <Form />
        </React.Fragment>
      ) : (
        guestDashboard
      )}
    </React.Fragment>
  );
}
