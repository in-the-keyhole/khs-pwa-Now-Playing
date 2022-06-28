import React from 'react'
import Movie from './Movie'

const MovieList = ({ movies }) =>
	movies && movies.length
		? <ul>
				{movies.map(movie =>
					<li key={movie.id}>
						<Movie
							title={movie.title}
							poster={`/images/posters${movie.poster_path}`}
							id={movie.id}
						/>
					</li>
				)}
			</ul>
		: <p className="msg">No results found.</p>

export default MovieList