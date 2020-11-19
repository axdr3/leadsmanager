import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLeads, deleteLead } from "../../actions/leads";

function Detail(props) {
  const dispatch = useDispatch();
  const leads = useSelector((state) => state.leads.leads);
  useEffect(() => {
    function dispatchLeads() {
      dispatch(getLeads());
    }
    dispatchLeads();
  }, [dispatch]);

  return (
    <div className="d-flex flex-column justify-content-center border mt-5"></div>
  );
}

export default Detail;
