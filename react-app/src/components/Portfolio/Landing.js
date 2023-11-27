import { NavLink } from 'react-router-dom';
import "./Portfolio.css";

const Landing = () => {
  return (
		<div className="main-landing-container">
			<h2>
				Welcome to <span style={{ color: "#91d142" }}>Legolas</span>, your gateway to the exciting world of stock
				trading!
			</h2>
			<h4>
				Please <NavLink to="/login">login</NavLink> to see your portfolio.
			</h4>
		</div>
	);
};

export default Landing;
