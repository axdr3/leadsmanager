import React, { Component, useEffect } from "react";
import { withAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

function Alerts(props) {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.errors);
  const message = useSelector((state) => state.messages);
  useEffect((prevProps) => {
    if (error !== prevProps.error) {
      if (error.msg.name) alert.error(`Name: ${error.msg.name.join()}`);
      if (error.msg.email) alert.error(`Email: ${error.msg.email.join()}`);

      if (error.msg.message)
        alert.error(`Message: ${error.msg.message.join()}`);
      if (error.msg.non_field_errors)
        alert.error(error.msg.non_field_errors.join());
      if (error.msg.username) alert.error(error.msg.username.join());
    }

    if (message !== prevProps.message) {
      if (message.leadDeleted) alert.success(message.leadDeleted);
      if (message.leadAdded) alert.success(message.leadAdded);
      if (message.passwordsNotMatch) alert.error(message.passwordsNotMatch);
    }
  });

  return <React.Fragment></React.Fragment>;
}

export default withAlert()(Alerts);
