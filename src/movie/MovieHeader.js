import React from 'react'
import AuthButton from '../components/AuthButton'
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
			<AuthButton />
		</div>
	</header>

export default MovieHeader
