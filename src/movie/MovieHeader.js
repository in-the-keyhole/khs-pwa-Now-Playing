import React from 'react'

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
			<a href="/login">Logout</a>
		</div>
	</header>

export default MovieHeader