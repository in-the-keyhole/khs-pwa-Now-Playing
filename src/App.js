import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movies from './movie/Movies'
import MovieDetail from './movie/MovieDetail'
import Login from './login/Login'
import Error404 from './components/Error404'
import './App.css'

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Routes>
					<Route path="login" element={<Login />} />
					<Route path="/" element={<Movies />} />
					<Route path="/about/:id" element={<MovieDetail />} />
					<Route path="*" element={<Error404 />} />
				</Routes>
			</BrowserRouter>
		)
	}
}

export default App