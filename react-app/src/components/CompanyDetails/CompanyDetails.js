import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompany } from "../../store/companies";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import LineChart from "../Chart/LineChart";
import "./CompanyDetails.css";

export default function CompanyDetails() {
  const { company_id } = useParams();
  const dispatch = useDispatch();

  const company = useSelector((state) => state.companies.company);
  console.log(company);

  useEffect(() => {
    dispatch(fetchCompany(company_id));
  }, [dispatch, company_id]);

  return (
    <>
      <div className="full-window-view">
        <div className="stock-view">
          <div className="company-detail-name">{company.name}</div>

          <div className="company-detail-price">${company.price}</div>

          <div className="company-detail-chart">
            <LineChart />
          </div>

          <div className="company-detail-about">{company.about}</div>
        </div>

        <div className="buy-or-sell-view">
          <div>Buy Shares</div>
          <div>Sell Shares</div>
        </div>
        <div></div>
      </div>
    </>
  );
}
