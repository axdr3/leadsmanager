import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLeads, deleteLead } from "../../actions/leads";

function Leads(props) {
  const dispatch = useDispatch();
  const leads = useSelector((state) => state.leads.leads);
  useEffect(() => {
    function dispatchLeads() {
      dispatch(getLeads());
    }
    dispatchLeads();
  }, [dispatch]);

  return (
    <div className="d-flex flex-column justify-content-center border">
      <h1 className="display-5 text-center mt-5">Leads</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, index) => (
            <tr key={lead.id}>
              <td>{lead.id}</td>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.message}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => dispatch(deleteLead(lead.id))}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leads;
