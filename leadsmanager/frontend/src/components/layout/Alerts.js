import React, { useEffect } from "react";
import { withAlert } from "react-alert";
import { useSelector } from "react-redux";

function Alerts(props) {
  const error = useSelector((state) => state.errors);
  const message = useSelector((state) => state.messages);
  const alert = props.alert;

  useEffect(() => {
    // lead input error
    if (error.msg.name) alert.error(`Name: ${error.msg.name.join()}`);
    if (error.msg.email) alert.error(`Email: ${error.msg.email.join()}`);
    if (error.msg.message) alert.error(`Message: ${error.msg.message.join()}`);
    // non_field_errors
    if (error.msg.non_field_errors)
      alert.error(error.msg.non_field_errors.join());
    // login errors
    if (error.msg.username)
      alert.error(`Username: ${error.msg.username.join()}`);
    if (error.msg.password)
      alert.error(`Password: ${error.msg.password.join()}`);
    // register errors
    if (message.leadDeleted) alert.success(message.leadDeleted);
    if (message.leadAdded) alert.success(message.leadAdded);
    if (message.passwordsNotMatch) alert.error(message.passwordsNotMatch);
  }, [error, message, alert]);

  return <React.Fragment></React.Fragment>;
}

export default withAlert()(Alerts);
