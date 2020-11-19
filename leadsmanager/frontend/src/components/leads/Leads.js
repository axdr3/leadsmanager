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
    <div className="d-flex flex-column justify-content-center border mt-5">
      <h1 className="display-5 text-center my-2">Your Leads</h1>
      <div>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Search"
          />
          <button className="btn btn-secondary my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </div>
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
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Lead Actions"
                >
                  <button className="btn btn-sm btn-success" onClick="">
                    View
                  </button>
                  <button
                    className="btn btn-sm btn-warning"
                    onClick="{() => dispatch(deleteLead(lead.id))}"
                  >
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leads;
