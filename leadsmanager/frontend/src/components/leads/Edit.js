import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import { deleteLead } from "../../actions/leads";

function Edit(props) {
  const { lead, dispatch } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // const errors = useSelector((state) => state.errors);

  const onChange = (e) => {
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
  // const dispatch = useDispatch();
  const msgMaxLength = 20;

  return (
    <tr key={lead.id}>
      <td>{lead.id}</td>
      <td>
        <input type="text" value={lead.name} onChange={onChange}></input>
      </td>
      <td>
        <input type="text" value={lead.email} onChange={onChange}></input>
      </td>
      <td>
        {lead.message.length > msgMaxLength
          ? `${lead.message.substring(0, msgMaxLength)}...` // make link to view full msg in an edit modal for both
          : lead.message}
      </td>
      <td>
        <div className="btn-group" role="group" aria-label="Lead Actions">
          {/* <button className="btn btn-sm btn-success" onClick="">
            View
          </button> */}
          <button
            className="btn btn-sm btn-warning"
            onClick="{() => dispatch(deleteLead(lead.id))}"
          >
            Finish editing lead
          </button>
        </div>
      </td>
    </tr>
  );
}

export default Edit;
