import { useState } from 'react';
import { useQuery } from '@apollo/client';
import Movie from './Movie'
import { NOW_PLAYING } from '../GqlQueries';
import Header from "../components/Header";
import { LS_PREFIX, setBadge } from "../config";

let movies = null;
let setMovies = null;

function randomNotification() {
  const randomItem = Math.floor(Math.random() * movies.length);
  const movie = movies[randomItem];
  const notifTitle = `Latest Release: ${movie.title}`;
  const notifBody = movie.title;
  const notifImg = movie.posterPath;
  const options = {
    body: notifBody,
    icon: notifImg,
  };
  //alert("notif title: "+notifTitle);
  new Notification(notifTitle, options);
  setTimeout(randomNotification, 30000);
}

function promptNotification() {
	Notification.requestPermission().then((result) => {
  	console.log("result: ", result);
    if (result === 'granted') {
      randomNotification();
      //alert("show notif...");
    } else {
    	alert("no notif");
    }
  });
}

const Movies = () => {
	const [searchText, setSearchText] = useState('');
	const [error, setError] = useState(false);
	//const [movies, setMovies] = useState(null);
	[movies, setMovies] = useState(null);
	const [searchDisabled, setSearchDisabled] = useState(false);
	const [filteredMovies, setFilteredMovies] = useState(null);

	let { loading } = useQuery(NOW_PLAYING, {
		onCompleted: (results) => {
			//set full list of movies as master list which can be filtered thru and display a subset
			setMovies(results.nowPlaying);
			setFilteredMovies(results.nowPlaying);
			console.log("Got live results", results.nowPlaying);
			localStorage.setItem(LS_PREFIX+'movies', JSON.stringify(results.nowPlaying));
			setBadge(results.nowPlaying.length);
			setTimeout(promptNotification, 3000);
		},
		onError: (err) => {
			const cachedNowPlaying = localStorage.getItem(LS_PREFIX+'movies');
			if (cachedNowPlaying) {
				const data = JSON.parse(cachedNowPlaying);
				console.log("Got cached results...", data);
				setMovies(data);
				setFilteredMovies(data);
			} else {
				console.log("No results from api, no data in cache, show error");
				setError("An error occurred getting movies. "+err);
				setSearchDisabled(true);	//disable search if no movies are returned
			}
		}
	});

	const search = (e) => {
		const val = e.target.value;
		setSearchText(val);
		if (movies && movies.length) {
			const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(val.toLowerCase()));
			setFilteredMovies(filteredMovies);
		}
	}


	return (
		<>
			<Header searchText={searchText} search={search} disabled={searchDisabled} />
			{ loading ? (
				<p className="msg">Loading movies...</p>
			) : error ? (
				<p className="msg">{error}</p>
			) : (
				<div className="movie-container">
				{filteredMovies && filteredMovies.length ? (
					<ul>
						{filteredMovies.map((movie) => (
						<li key={movie.id}>
							<Movie
								id={movie.id}
								poster={movie.posterPath}
								title={movie.title}
							/>
						</li>
					))}
					</ul>
				) : (
					<p className="msg">No results found. Try a different search.</p>
				)}
				</div>
			)}
		</>
	)
}

export default Movies;