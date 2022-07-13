import { Link } from "react-router-dom";

const Header = ({searchText, search, disabled=true}) => {
	return (
		<header>
			<h2>PWA Now Playing</h2>
			<div>
				<input
					value={searchText}
					onChange={search}
					type="text"
					placeholder="Search..."
					disabled={disabled}
				/>
				<Link to="/">Logout</Link>
				<Link to="/phone">Phone</Link>
			</div>
		</header>
	)
};

export default Header;