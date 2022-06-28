import React from 'react'
import { Link } from 'react-router-dom'

const MovieHeader = ({ searchText, search }) =>
	<header>
		<h3>PWA Now Playing</h3>
		<div>
			<input
				autoFocus
				value={searchText}
				onChange={search}
				type="text"
				placeholder="Search..."
			/>
			<Link to="/login">Logout</Link>
		</div>
	</header>

export default MovieHeader