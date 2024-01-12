import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompany } from "../../store/companies";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import LineChart from "../Chart/LineChart";
import "./CompanyDetails.css";
import { fetchUserPortfolio } from "../../store/portfolio";
import AddToWatchlistModal from "../AddToWatchlistModal";
import OpenModalButton from "../OpenModalButton";

export default function CompanyDetails() {
  const { company_id } = useParams();
  const [selectedOption, setSelectedOption] = useState("dollars");
  const [dollarAmount, setDollarAmount] = useState("");
  const [sharesAmount, setSharesAmount] = useState("");
  const [showButtons, setShowButtons] = useState(false);
  const [action, setAction] = useState("buy");
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);
  const company = useSelector((state) => state.companies.company);
  const portfolio = useSelector((state) =>
    Object.values(state.portfolio.currentUserPortfolio)?.filter(
      (stock) => stock.company_id == company_id
    )
  );

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

  const handleConfirmOrderBuy = async () => {
    // const numberOfShares = selectedOption === "shares" ? sharesAmount || 0 : 0;

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

      const data = await res.json();

      if (res.ok) {
        window.alert("Purchase successful!");
        setDollarAmount("");
        setSharesAmount("");
        setShowButtons(false);
      } else {
        window.alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleConfirmOrderSell = async () => {
    const decimalVal = parseFloat(sharesAmount);
    const formattedVal = decimalVal.toFixed(6);


    try {
      const res = await fetch(`/api/sell/${company_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number_of_shares_to_sell: formattedVal,
        }),
      });

      const data = await res.json();


      if (res.ok) {
        window.alert("Transaction successful!");
        setDollarAmount("");
        setSharesAmount("");
        setShowButtons(false);
      } else {
        window.alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancelOrder = () => {
    setShowButtons(false);
  };

  const handleActionChange = (e) => {
    setAction(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchCompany(company_id));
    dispatch(fetchUserPortfolio(sessionUser?.id));
  }, [dispatch, company_id, sessionUser?.id]);

  return (
		<>
			<div className="full-window-view">
				<div className="stock-view">
					<div className="company-detail-name">{company.name}</div>

					<div className="company-detail-price">${company.price}</div>

					<div className="company-detail-chart">
						<LineChart />
					</div>
					<div className="company-about-section">
						<h4 className="company-about-header">About</h4>
						<div className="company-detail-about">{company.about}</div>
					</div>
				</div>

				<div className="buy-or-sell-view">
					<div className="buy-box-top">
						<div>
							<select value={action} onChange={handleActionChange}>
								<option value="buy">Buy</option>
								<option value="sell">Sell</option>
							</select>
							{` ${company.symbol}`}
						</div>
					</div>
					<div className="order-type-box">
						<div>Order Type: Market Order</div>
					</div>
					{action === "buy" ? (
						<div className="buy-in-box">
							<div>
								Buy In:
								<select id="dropdown" value={selectedOption} onChange={handleOptionChange}>
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
													{dollarAmount > 0 ? (dollarAmount / company.price).toFixed(6) : 0}
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
													${sharesAmount > 0 ? (company.price * sharesAmount).toFixed(2) : 0}
												</div>
											</div>
										</div>
									)}
									<div className="review-order-box">
										<div className="rev-button">
											{!showButtons && <button onClick={handleReviewOrder}>Review Order</button>}
										</div>
										{showButtons && (
											<div className="confirm-cancel-buttons">
												<button onClick={handleConfirmOrderBuy}>Confirm Order</button>
												<button onClick={handleCancelOrder}>Cancel Order</button>
											</div>
										)}
									</div>
									<div className="buy-power-box">
										<div className="buy-power">{`$${sessionUser.balance.toFixed(2)} buying power available`}</div>
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className="buy-in-box">
							<div>
								Sell In:
								<select id="dropdown" value={selectedOption} onChange={handleOptionChange}>
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
													{dollarAmount > 0 ? (dollarAmount / company.price).toFixed(6) : 0}
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
												<div className="est-quantity">Est. Credit:</div>
												<div className="est-quantity-num">
													${sharesAmount > 0 ? (company.price * sharesAmount).toFixed(2) : 0}
												</div>
											</div>
										</div>
									)}
									<div className="review-order-box">
										<div className="rev-button">
											{!showButtons && <button onClick={handleReviewOrder}>Review Order</button>}
										</div>
										{showButtons && (
											<div className="confirm-cancel-buttons">
												<button onClick={handleConfirmOrderSell}>Confirm Order</button>
												<button onClick={handleCancelOrder}>Cancel Order</button>
											</div>
										)}
									</div>
									<div className="buy-power-box">
										<div className="buy-power">
											{portfolio[0].price > 0
												? selectedOption === "dollars"
													? `$${portfolio[0]?.price.toFixed(2)} Available`
													: `${portfolio[0]?.shares.toFixed(6)} Shares Available`
												: selectedOption === "dollars"
												? "0 Available"
												: "0 Shares Available"}
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
					<div className="add-to-list-button">
						<OpenModalButton
							buttonText={"+ Add to Lists"}
							modalComponent={<AddToWatchlistModal company_id={company_id} />}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
