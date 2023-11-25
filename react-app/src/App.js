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
					<Route path="/login">
						<LoginFormPage />
					</Route>
					<Route path="/signup">
						<SignupFormPage />
					</Route>
					<Route path="/transactions/:user_id">
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
