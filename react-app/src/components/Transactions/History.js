import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUserTransactionsThunk } from "../../store/transactions.js";
import { useParams } from "react-router-dom/cjs/react-router-dom.min.js";
import "./transactions.css";
import { fetchAllCompanies } from "../../store/companies.js";
import { fetchUserPortfolio } from "../../store/portfolio.js";

export default function HistoryTransactions() {
  const { user_id } = useParams();
  const transactions = useSelector((state) =>
    Object.values(state.transactions?.currentUserTransactions)
  );
  const sessionUser = useSelector((state) => state.session.user);
  const companies = useSelector((state)=> state.companies.allCompanies)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserTransactionsThunk(user_id));
    dispatch(fetchUserPortfolio(user_id));
    dispatch(fetchAllCompanies())
  }, [dispatch, user_id]);

  return (
		sessionUser &&
		transactions && companies.length > 0 && (
			<div>
				<div className="users-transactions">
					<h1 className="transaction-title">
						{sessionUser.first_name} {sessionUser.last_name}
					</h1>
					<div className="transactions-container">
						<div className="investing-container">
							<NavLink to={`/${user_id}/investing`}>Investing</NavLink>
						</div>
						<div className="transfers-container">
							<NavLink exact to={`/${user_id}/transfers`}>
								Transfers
							</NavLink>
						</div>
						<div className="recurring-container">
							<NavLink exact to={`/${user_id}/recurring`}>
								Recurring
							</NavLink>
						</div>
						<div className="reports-container">
							<NavLink exact to={`/${user_id}/reports`}>
								Reports
							</NavLink>
						</div>
						<div className="tax-container">
							<NavLink exact to={`/${user_id}/Tax`}>
								Tax center
							</NavLink>
						</div>
						<div className="history-container">
							<NavLink to={`/${user_id}/history`}>History</NavLink>
						</div>
						<div className="settings-container">
							<NavLink exact to={`/${user_id}/settings`}>
								Settings
							</NavLink>
						</div>
						<div className="help-container">
							<NavLink exact to={`/${user_id}/help`}>
								Help
							</NavLink>
						</div>
					</div>
				</div>
				<div className="transactions-history-container">
					{transactions.map((ele) => (
						<div className="transaction">
							<div className="transaction-left-container">
								<div className="transaction-left-title">
									{companies?.find((company) => company.id == ele.company_id)?.name} {ele.type[0].toUpperCase() + ele.type.slice(1)}
								</div>
								<div className="transaction-left-created">{ele.created_at}</div>
							</div>
							<div className="transaction-right-container">
								<div className="transaction-right-total">${ele.total.toFixed(2)}</div>
								<div></div>
							</div>
						</div>
					))}
				</div>
			</div>
		)
	);
}
