import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLeads } from "../../actions/leads";
import Lead from "./Lead";

function Leads(props) {
  const dispatch = useDispatch();
  const leads = useSelector((state) => state.leads.leads);
  const [leadsDidUpdate, setLeadsDidUpdate] = useState(false);

  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState({ direction: -1, by: "id" });
  const params = useRef(""); // so it doesn't rerender after use

  useEffect(() => {
    if (!leadsDidUpdate) {
      dispatch(getLeads());
      setLeadsDidUpdate(true);
    }
  }, [dispatch, leadsDidUpdate]);

  useEffect(() => {
    const newParams = new URLSearchParams({
      search: search,
      ordering: (ordering.direction > 0 ? "" : "-").concat(ordering.by),
    });

    if (newParams.values !== params.values) {
      params.current = newParams;
      dispatch(getLeads("?" + params.current.toString()));
      setLeadsDidUpdate(true);
    }
  }, [dispatch, search, ordering]);

  return (
    <div className="d-flex flex-column justify-content-center border mt-5">
      <h1 className="display-5 text-center my-2">Your Leads</h1>
      <div>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Search"
            onChange={(e) => {
              // e.preventDefault();
              setSearch(e.target.value);
            }}
          />
          <button className="btn btn-secondary my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </div>
      <table className="table table-bordered table-hover">
        <thead className="thead-light">
          <tr>
            <th>
              <span
                className="btn"
                onClick={() => {
                  setOrdering({ direction: ordering.direction * -1, by: "id" });
                }}
              >
                ID
              </span>
            </th>
            <th>
              <span
                className="btn"
                onClick={() => {
                  setOrdering({
                    direction: ordering.direction * -1,
                    by: "name",
                  });
                }}
              >
                Name
              </span>
            </th>
            <th>
              <span
                className="btn"
                onClick={() => {
                  setOrdering({
                    direction: ordering.direction * -1,
                    by: "email",
                  });
                }}
              >
                Email
              </span>
            </th>
            <th>Message</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, index) => (
            <Lead
              lead={lead}
              key={index}
              index={index}
              storeDispatch={dispatch}
              setLeadsDidUpdate={setLeadsDidUpdate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leads;
