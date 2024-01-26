import { NavLink } from "react-router-dom";
import "./Portfolio.css";

const Landing = () => {
  return (
		<div className="main-landing-container">
			<div className="landing-main">
				<h2>
					Welcome to <span style={{ color: "green" }}>Legolas</span>, your gateway to the exciting world of stock
					trading!
				</h2>
				<h4 className="login-suggestion">
					<NavLink to="/login" className="login-shortcut">
						Please login to see your portfolio.
					</NavLink>
				</h4>
				<img
					className="landing-picture"
					src={require("../../static/pexels-pixabay-210607.jpg").default}
					alt="landing-sparkline"
				/>
			</div>
			<div className="about-container">
				<h2 className="about-title">Our Team</h2>
				<div className="socials-container">
					<div className="cory-about asquare">
						<h4 className="me">Cory Campbell</h4>
						<div className="arow">
							<a href="https://www.linkedin.com/in/cory-campbell-67694b2a5/">
								<i class="fa-brands fa-linkedin"></i>
							</a>
							<a href="https://github.com/CoryCampbell">
								<i class="fa-brands fa-github"></i>
							</a>
						</div>
					</div>
					<div className="malcolm-about asquare">
						<h4 className="me">Malcolm Caleb</h4>
						<div className="arow">
							<a href="https://www.linkedin.com/in/malcolm-caleb-7928722a5/">
								<i class="fa-brands fa-linkedin"></i>
							</a>
							<a href="https://github.com/malcolmc22">
								<i class="fa-brands fa-github"></i>
							</a>
						</div>
					</div>
					<div className="ali-about asquare">
						<h4 className="me">Ali Keshanian</h4>
						<div className="arow">
							<a href="https://www.linkedin.com/in/alirezakeshanian/">
								<i class="fa-brands fa-linkedin"></i>
							</a>
							<a href="https://github.com/ark1980">
								<i class="fa-brands fa-github"></i>
							</a>
						</div>
					</div>
					<div className="quinn-about asquare">
						<h4 className="me">Quinn Bush</h4>
						<div className="arow">
							<a href="https://www.linkedin.com/in/quinlan-bush/">
								<i class="fa-brands fa-linkedin"></i>
							</a>
							<a href="https://github.com/Quinn5545">
								<i class="fa-brands fa-github"></i>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Landing;
