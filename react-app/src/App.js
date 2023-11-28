import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Portfolio from "./components/Portfolio";
import Transactions from "./components/Transactions";
import Landing from "./components/Portfolio/Landing";
import CompanyDetails from "./components/CompanyDetails/CompanyDetails";
import Watchlist from "./components/Watchlists";
import WatchlistDetails from "./components/WatchlistDetails";
import HistoryTransactions from "./components/Transactions/History";
import HistoryHelp from "./components/Transactions/Help";
import HistoryTax from "./components/Transactions/Tax";
import HistorySettings from "./components/Transactions/Settings";
import HistoryReports from "./components/Transactions/Reports";
import HistoryRecurring from "./components/Transactions/Recurring";
import HistoryInvesting from "./components/Transactions/Investing";
import HistoryTransfers from "./components/Transactions/Transfers";

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(authenticate()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<>
			<Navigation isLoaded={isLoaded} />
			{isLoaded && (
				<Switch>
					<Route exact path="/login">
						<LoginFormPage />
					</Route>
					<Route exacth path='/:user_id/investing'>
						<HistoryInvesting />
					</Route>
					<Route exacth path='/:user_id/transfers'>
						<HistoryTransfers />
					</Route>
					<Route exacth path='/:user_id/recurring'>
						<HistoryRecurring />
					</Route>
					<Route exacth path='/:user_id/reports'>
						<HistoryReports />
					</Route>
					<Route exacth path='/:user_id/tax'>
						<HistoryTax />
					</Route>
					<Route exacth path='/:user_id/history'>
						<HistoryTransactions />
					</Route>
					<Route exacth path='/:user_id/settings'>
						<HistorySettings />
					</Route>
					<Route exacth path='/:user_id/help'>
						<HistoryHelp />
					</Route>
					<Route exact path="/companies/:company_id">
						<CompanyDetails />
					</Route>
					<Route exact path="/watchlists/current/:watchlist_id">
						<WatchlistDetails />
					</Route>
					<Route exact path="/watchlists/new">
						<WatchlistDetails />
					</Route>
					<Route exact path="/watchlists/users/:user_id">
						<Watchlist />
					</Route>
					<Route exact path="/signup">
						<SignupFormPage />
					</Route>
					<Route exact path="/transactions/:user_id">
						<Transactions />
					</Route>
					<Route exact path="/">
						<Portfolio />
					</Route>
				</Switch>
			)}
			{!isLoaded && <Landing />}
		</>
	);
}

export default App;
