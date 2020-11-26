import React, { useState, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { useDispatch } from "react-redux";
import { addLead } from "../../actions/leads";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const initialState = {
  name: "",
  email: "",
  message: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "reset":
      return initialState;
    case "memoized-reset":
      return action.initialState;

    default:
      const result = { ...state };
      result[action.type] = action.value;
      return result;
  }
};

function Form(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showModal, setShowModal] = useState(false);
  const dispatchToBackEnd = useDispatch();

  // Modal
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);

  const handleOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: name, value }); // reducer to set values
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatchToBackEnd(addLead(state)); // send to backend
    dispatch({ type: "reset" }); // send to reducer for reset
  };

  const form = (
    <div className="card card-body mt-4 mb-4">
      <h1 className="display-5 text-center">Add Lead</h1>
      <form id="lead-form" onSubmit={onSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            onChange={onChange}
            value={state.name}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            type="email"
            name="email"
            onChange={onChange}
            value={state.email}
          />
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea
            className="form-control"
            type="text"
            name="message"
            onChange={onChange}
            value={state.message}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <React.Fragment>
      <button className="btn btn-success btn-block" onClick={handleOpen}>
        Add Lead +
      </button>
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          {form}
        </div>
      </Modal>
    </React.Fragment>
  );
}

export { Form, reducer };
