import { NavLink } from "react-router-dom";
import "./Portfolio.css";

const Landing = () => {
  return (
		<div className="main-landing-container">
			<div>
				<h2>
					Welcome to <span style={{ color: "green" }}>Legolas</span>, your gateway to the exciting world of stock
					trading!
				</h2>
				<h4 className="login-suggestion">
					Please <NavLink to="/login">login</NavLink> to see your portfolio.
				</h4>
			</div>
			<div className="about-container">
				<h2 className="about-title">About Us</h2>
				<div className="socials-container">
					<div className="ali-about asquare">
						Ali <a href="https://www.linkedin.com/in/alirezakeshanian/">linkedin</a>
					</div>
					<div className="malcolm-about asquare">
						Malcolm Caleb
						<a>email: malcolmcaleb01@gmail.com</a>
						<a>github: @malcolmc22</a>
					</div>
					<div className="cory-about asquare">
						Cory Campbell
						<a>email: corycampbell20@yahoo.com</a>
						<a>github: @CoryCampbell</a>
						<a>discord: monkeydcory</a>
					</div>
					<div className="quinn-about asquare">
						Quinn Bush <a href="https://www.linkedin.com/in/quinlan-bush/">linkedin</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Landing;
