import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addLead } from "../../actions/leads";

function Form(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);

  const onChange = (e) => {
    // this.setState({ [e.target.name]: e.target.value })
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        return;
      case "email":
        setEmail(e.target.value);
        return;
      case "message":
        setMessage(e.target.value);
        return;
      default:
        return;
    }
  };

  // useEffect(() => {setName(document.getElementsByName)}, [name])

  const onSubmit = (e) => {
    e.preventDefault();
    const lead = { name, email, message };
    dispatch(addLead(lead)); // send to backend
    console.log(errors);
    if (!errors.status) {
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <div className="card card-body mt-4 mb-4">
      <h1 className="display-5 text-center">Add Lead</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            onChange={onChange}
            value={name}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            type="email"
            name="email"
            onChange={onChange}
            value={email}
          />
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea
            className="form-control"
            type="text"
            name="message"
            onChange={onChange}
            value={message}
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
}

export default Form;
