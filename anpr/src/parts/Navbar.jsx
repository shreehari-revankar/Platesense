import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from './images/logo.png';
import "./main.css";

function Navbar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	return (
		<header>
            <div>
			<img src={Logo}></img>
            <h3>PLATESENSE</h3>
            </div>
			<nav ref={navRef}>
				<a href="/#home">HOME</a>
				<a href="/#features-section">FEATURE</a>
				<a href="/#glance">GLANCE</a>
				<a href="/#demo">TRY</a>
				<a href="/#technologies">TECHNOLOGIES</a>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Navbar;