import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movies from "./movies";
import MovieDetail from "./movies/MovieDetail";
import Login from "./login";
import PrivateRoute from "./components/PrivateRoute";
import Error404 from "./components/Error404";
import "./App.css";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/login" element={<Login />} />
				<Route element={ <PrivateRoute redirectPath='' />}>
					<Route path="/movies" element={<Movies />} />
					<Route path="/about/:id" element={<MovieDetail />} />
				</Route>
				<Route path="*" element={<Error404 />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;