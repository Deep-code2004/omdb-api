
import { OMDBResponse, MovieDetails } from '../types';

const API_KEY = 'abcb7550';
const BASE_URL = 'https://www.omdbapi.com/';

export const searchMovies = async (query: string, page: number = 1): Promise<OMDBResponse> => {
  const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const getMovieDetails = async (id: string): Promise<MovieDetails> => {
  const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  if (data.Response === "False") throw new Error(data.Error);
  return data;
};
