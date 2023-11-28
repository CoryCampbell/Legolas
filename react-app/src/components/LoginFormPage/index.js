import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoUser = () => {
		setEmail("demo@aa.io");
		setPassword("password");
	};

	return (
		<div className="login-page-container">
			<div className="login-img-container">
				<img
					className="login-img"
					alt="landing page img"
					src="https://cdn.robinhood.com/assets/generated_assets/webapp/web-platform-prefetch-sdp/member/9435691b466061dc75b0.jpg"
				/>
			</div>
			<div className="form-container">
				<h1 className="login-title">Log in to Legolas</h1>
				<form onSubmit={handleSubmit}>
					<ul>
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</ul>
					<label>
						Email
						<input
							className="login-email-input"
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</label>
					<label>
						Password
						<input
							className="login-password-input"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</label>
					<div className="login-button-container">
						<button type="submit" className="login-button">
							Log In
						</button>
						<button type="submit" className="demo-button" onClick={demoUser}>
							Demo User
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default LoginFormPage;
