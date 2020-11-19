import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
import { deleteLead } from "../../actions/leads";
import Edit from "./Edit";

function Lead(props) {
  const { lead, dispatch } = props;
  // const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const msgMaxLength = 20;
  const [name, setName] = useState(lead.name);
  const [email, setEmail] = useState(lead.email);
  const [message, setMessage] = useState(lead.message);

  // useEffect(() => {}, [editMode]);
  const handleChange = (e) => {
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
  const handleEdit = (e) => {
    e.preventDefault();
    setEditMode(!editMode);
  };

  const editModeLayout = (
    <React.Fragment>
      <td>
        <input type="text" defaultValue={name} onChange={handleChange}></input>
      </td>
      <td>
        <input type="text" defaultValue={email} onChange={handleChange}></input>
      </td>
      <td>
        {message.length > msgMaxLength
          ? `${message.substring(0, msgMaxLength)}...` // make link to view full msg in an edit modal for both
          : message}
      </td>
      <td>
        <div className="btn-group" role="group" aria-label="Lead Actions">
          <button
            className="btn btn-sm btn-warning"
            // onClick="{() => dispatch(deleteLead(lead.id))}"
          >
            Finish editing lead
          </button>
        </div>
      </td>
    </React.Fragment>
  );

  return (
    <tr key={lead.id}>
      <td>{lead.id}</td>
      {editMode ? (
        editModeLayout
      ) : (
        <React.Fragment>
          <td>{lead.name}</td>
          <td>{lead.email}</td>
          <td>
            {lead.message.length > msgMaxLength
              ? `${lead.message.substring(0, msgMaxLength)}...` // make link to view full msg in a modal
              : lead.message}
          </td>
          <td>
            <div className="btn-group" role="group" aria-label="Lead Actions">
              {/* <button className="btn btn-sm btn-success" onClick="">
            View
          </button> */}
              <button className="btn btn-sm btn-warning" onClick={handleEdit}>
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => dispatch(deleteLead(lead.id))}
              >
                Delete
              </button>
            </div>
          </td>
        </React.Fragment>
      )}
    </tr>
  );
}

export default Lead;
