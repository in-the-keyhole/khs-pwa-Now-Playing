import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ redirectPath = '/login' }) => {
	const user = localStorage.getItem('KHS-PWA|authUser');
	if (!user) {
		return <Navigate to={redirectPath} replace />;
	}

	return <Outlet />;
};

export default PrivateRoute;