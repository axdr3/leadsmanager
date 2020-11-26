import React, { useState, useReducer, useMemo } from "react";
// import { useDispatch } from "react-redux";
import { deleteLead, editLead } from "../../actions/leads";
import { reducer } from "./Form";

function Lead(props) {
  const { lead, dispatchToBackend, setLeadsUpdated } = props;
  const initialState = useMemo(
    () => ({
      name: lead.name,
      email: lead.email,
      message: lead.message,
    }),
    [lead]
  );

  const [editMode, setEditMode] = useState(false);
  const msgMaxLength = 20;
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: name, value }); // reducer to set values
  };
  const handleEdit = (e) => {
    e.preventDefault();
    setEditMode(!editMode);
  };

  const editModeLayout = (
    <React.Fragment>
      <td>
        <input
          type="text"
          name="name"
          defaultValue={state.name}
          onChange={handleChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          name="email"
          defaultValue={state.email}
          onChange={handleChange}
        ></input>
      </td>
      <td>
        {state.message.length > msgMaxLength
          ? `${state.message.substring(0, msgMaxLength)}...` // make link to view full msg in an edit modal for both
          : state.message}
      </td>
      <td>
        <div className="btn-group" role="group" aria-label="Lead Actions">
          <button
            className="btn btn-sm btn-warning"
            onClick={() => {
              const editedLead = { ...state };
              dispatchToBackend(editLead(lead.id, editedLead));
              dispatch({ type: state });
              setEditMode(!editMode);
              setLeadsUpdated(true);
            }}
          >
            Finish editing lead
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => {
              dispatch({ type: "reset" });
              setEditMode(!editMode);
            }}
          >
            Don't change
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
              <button className="btn btn-sm btn-warning" onClick={handleEdit}>
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => dispatchToBackend(deleteLead(lead.id))}
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
