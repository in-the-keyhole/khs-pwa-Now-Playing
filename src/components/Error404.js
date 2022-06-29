import { Link } from "react-router-dom";
import Header from "./Header";

const Error404 = () => {
	return (
		<>
			<Header />
			<div className="msg">
				<h1>404 Unknown</h1>
				<Link to="/">Return to movie listing</Link>
			</div>
		</>
	);
};

export default Error404;