import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLeads, deleteLead } from "../../actions/leads";
import Lead from "./Lead";

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
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
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
            <Lead lead={lead} key={index} index={index} dispatch={dispatch} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leads;
