import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://'+location.hostname+':3000/mocks/',
	headers: { 'Content-Type': 'application/json' }
});

export const getMovies = () => {
	return instance.get('movies.json');
}

export const getMovie = async (id) => {
	const response = await getMovies();
	const { results: movies } = response.data;
	const movie = movies.find(m => m.id == id);
	return movie;
}