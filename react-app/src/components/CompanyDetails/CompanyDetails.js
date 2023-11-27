import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompany } from "../../store/companies";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import LineChart from "../Chart/LineChart";
import "./CompanyDetails.css";

export default function CompanyDetails() {
  const { company_id } = useParams();
  const [selectedOption, setSelectedOption] = useState("dollars");
  const [dollarAmount, setDollarAmount] = useState("");
  const [sharesAmount, setSharesAmount] = useState("");
  const [showButtons, setShowButtons] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);
  //   console.log("sessionUser", sessionUser);
  const company = useSelector((state) => state.companies.company);
  //   console.log(company);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleDollarChange = (event) => {
    const amount = event.target.value;
    setDollarAmount(event.target.value);

    const calculatedShares =
      amount > 0 ? (amount / company.price).toFixed(6) : 0;
    setSharesAmount(calculatedShares);
  };

  const handleShareChange = (event) => {
    setSharesAmount(event.target.value);
  };

  const handleReviewOrder = () => {
    setShowButtons(true);
  };

  const handleConfirmOrder = async () => {
    // const numberOfShares = selectedOption === "shares" ? sharesAmount || 0 : 0;

    console.log(sharesAmount);
    try {
      const res = await fetch(`/api/purchases/${company_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number_of_shares: sharesAmount,
        }),
      });
      console.log("res------>", res);
      const data = await res.json();

      console.log("data ------>", data);

      setDollarAmount("");
      setSharesAmount("");
      setShowButtons(false);
      //   history.push("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancelOrder = () => {
    setShowButtons(false);
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
                        {dollarAmount > 0
                          ? (dollarAmount / company.price).toFixed(6)
                          : 0}
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
                        $
                        {sharesAmount > 0
                          ? (company.price * sharesAmount).toFixed(2)
                          : 0}
                      </div>
                    </div>
                  </div>
                )}
                <div className="review-order-box">
                  <div className="rev-button">
                    {!showButtons && (
                      <button onClick={handleReviewOrder}>Review Order</button>
                    )}
                  </div>
                  {showButtons && (
                    <div className="confirm-cancel-buttons">
                      <button onClick={handleConfirmOrder}>
                        Confirm Order
                      </button>
                      <button onClick={handleCancelOrder}>Cancel Order</button>
                    </div>
                  )}
                </div>
                <div className="buy-power-box">
                  <div className="buy-power">
                    {`$${sessionUser.balance.toFixed(
                      2
                    )} buying power available`}
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
