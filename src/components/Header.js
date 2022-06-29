import { Link } from "react-router-dom";

const Header = ({searchText, search, disabled=true}) => {
	return (
		<header>
			<h2>PWA Now Playing</h2>
			<div>
				<input
					autoFocus
					value={searchText}
					onChange={search}
					type="text"
					placeholder="Search..."
					disabled={disabled}
				/>
				<Link to="/login">Logout</Link>
			</div>
		</header>
	)
};

export default Header;