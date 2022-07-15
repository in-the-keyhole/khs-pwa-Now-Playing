import { Navigate, Outlet } from "react-router-dom";
import { LS_PREFIX } from "../utils";

const PrivateRoute = ({ redirectPath = '/' }) => {
	const user = localStorage.getItem(LS_PREFIX+'authUser');
	if (!user) {
		alert("no user, redirect to login");
		return <Navigate to={redirectPath} replace />;
	}

	return <Outlet />;
};

export default PrivateRoute;