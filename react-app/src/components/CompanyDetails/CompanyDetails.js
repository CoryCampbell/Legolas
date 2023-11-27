import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompany } from "../../store/companies";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import LineChart from "../Chart/LineChart";
import "./CompanyDetails.css";

export default function CompanyDetails() {
  const { company_id } = useParams();
  const [selectedOption, setSelectedOption] = useState("dollars");
  const [dollarAmount, setDollarAmount] = useState("");
  const [sharesAmount, setSharesAmount] = useState("");
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  //   console.log("sessionUser", sessionUser);
  const company = useSelector((state) => state.companies.company);
  //   console.log(company);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleDollarChange = (event) => {
    setDollarAmount(event.target.value);
  };

  const handleShareChange = (event) => {
    setSharesAmount(event.target.value);
  };

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
          <div className="buy-box-top">
            <div>Buy {company.symbol}</div>
          </div>
          <div className="order-type-box">
            <div>Order Type: Market Order</div>
          </div>

          <div className="buy-in-box">
            <div>
              Buy In:
              <select
                id="dropdown"
                value={selectedOption}
                onChange={handleOptionChange}
              >
                <option value="dollars">Dollars</option>
                <option value="shares">Shares</option>
              </select>
              <div className="buy-in-amount-box">
                {selectedOption === "dollars" ? (
                  <div className="dollars-box">
                    <div>
                      <div className="amount-text">Amount:</div>
                      <input
                        type="number"
                        placeholder="$0.00"
                        className="input-dollars"
                        value={dollarAmount}
                        onChange={handleDollarChange}
                      ></input>
                    </div>
                    <div className="est-box">
                      <div className="est-quantity">Est. Quantity:</div>
                      <div className="est-quantity-num">
                        {(dollarAmount / company.price).toFixed(6)}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="shares-box">
                    <div>
                      <div className="amount-text">Shares:</div>
                      <input
                        type="number"
                        placeholder="0"
                        className="input-shares"
                        value={sharesAmount}
                        onChange={handleShareChange}
                      ></input>
                    </div>
                    <div className="market-price-box">
                      <div className="market-price-box-text">Market Price:</div>
                      <div>${company.price}</div>
                    </div>
                    <div className="est-box">
                      <div className="est-quantity">Est. Cost:</div>
                      <div className="est-quantity-num">
                        ${(company.price * sharesAmount).toFixed(2)}
                      </div>
                    </div>
                  </div>
                )}
                <div className="review-order-box">
                  <div className="rev-button">
                    <button>Review Order</button>
                  </div>
                </div>
                <div className="buy-power-box">
                  <div className="buy-power">
                    {`$${sessionUser.balance} buying power available`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
