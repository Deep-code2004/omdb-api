
import React, { useState, useMemo } from 'react';
import { Layout } from './components/Layout';
import { MovieDetails as MovieDetailsType, Movie } from './types';
import { MovieCard } from './components/MovieCard';
import { getMovieDetails, searchMovies } from './services/omdbService';


const API_KEY = 'abcb7550';

function App() {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [plot, setPlot] = useState('');
  const [responseType, setResponseType] = useState('');

  const [rawResponse, setRawResponse] = useState<string | null>(null);
  const [movieData, setMovieData] = useState<MovieDetailsType | null>(null);
  const [searchResults, setSearchResults] = useState<Movie[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);



  const requestUrl = useMemo(() => {
    return `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&y=${year}&plot=${plot}&apikey=${API_KEY}`;
  }, [title, year, plot]);

  const handleSearch = async () => {
    setIsLoading(true);
    setMovieData(null);
    setSearchResults(null);
    try {
      if (!year.trim()) {
        // Search for movies when year is not provided
        const results = await searchMovies(title, 1);
        setRawResponse(JSON.stringify(results));
        if (results.Search && results.Search.length > 0) {
          setSearchResults(results.Search);
        } else {
          setSearchResults([]);
        }
      } else {
        // Fetch specific movie details when year is provided
        const res = await fetch(requestUrl);
        const data = await res.json();
        setRawResponse(JSON.stringify(data));
        if (data.Response === "True") {
          setMovieData(data);
        } else {
          setMovieData(null);
        }
      }
    } catch (err) {
      setRawResponse('{"Response":"False","Error":"Connection Error"}');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectMovie = async (id: string) => {
    setIsLoading(true);
    try {
      const details = await getMovieDetails(id);
      setMovieData(details);
      setSearchResults(null);
      setRawResponse(JSON.stringify(details));
    } catch (err) {
      setRawResponse('{"Response":"False","Error":"Failed to load movie details"}');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setTitle('');
    setYear('');
    setRawResponse(null);
    setMovieData(null);
    setSearchResults(null);
  };



  return (
    <Layout>
      <h1 className="text-6xl font-normal mb-8 text-[#333]">Movie Finder</h1>

      <div className="bg-white border border-slate-200 rounded-sm shadow-sm p-6 mb-8">
        <h2 className="text-xl font-normal mb-6 pb-4 border-b border-slate-100">By Title</h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-3">
            <label className="block text-sm mb-1">Title:</label>
            <input
              className="w-full text-white"
              type="text"
              aria-label="Movie title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Year:</label>
            <input
              className="w-full text-white"
              type="text"
              aria-label="Movie year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          {/* <div className="md:col-span-2">
            <label className="block text-sm mb-1">Plot:</label>
            <select className="w-full text-white" aria-label="Plot length" value={plot} onChange={(e) => setPlot(e.target.value)}>
              <option value="short">Short</option>
              <option value="full">Full</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Response:</label>
            <select className="w-full text-white" aria-label="Response format" value={responseType} onChange={(e) => setResponseType(e.target.value)}>
              <option value="JSON">JSON</option>
              <option value="XML">XML</option>
            </select>
          </div> */}
          <div className="md:col-span-3 flex space-x-2">
            <button
              onClick={handleSearch}
              className="btn-search text-white px-6 py-1.5 rounded-sm font-normal text-lg flex-grow hover:brightness-110 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? '...' : 'Search'}
            </button>
            <button
              onClick={handleReset}
              className="bg-[#eee] border border-[#ccc] px-4 py-1.5 rounded-sm font-normal text-lg hover:bg-slate-200"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <div>
            <p className="text-sm font-bold mb-2">Request:</p>
            <div className="bg-[#f9f9f9] border border-slate-100 p-4 rounded-sm">
              <a href={requestUrl} target="_blank" className="text-blue-600 hover:underline break-all text-sm">
                {requestUrl}
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm font-bold mb-2">Response:</p>
            <div className={`response-box p-4 rounded-sm min-h-[100px] text-sm leading-relaxed transition-all ${rawResponse ? 'opacity-100' : 'opacity-0'}`}>
              {movieData ? (
                <div className="flex space-x-4 items-start">
                  {movieData.Poster !== 'N/A' ? (
                    <img src={movieData.Poster} alt={movieData.Title} className="w-24 h-36 object-cover rounded" />
                  ) : (
                    <div className="w-24 h-36 bg-slate-800 flex items-center justify-center text-slate-500 rounded">No Poster</div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">{movieData.Title} ({movieData.Year})</h3>
                    <div className="flex items-center mb-2">
                      <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-yellow-500">{movieData.imdbRating}</span>
                    </div>
                    <p className="text-sm text-slate-300">{movieData.Plot}</p>
                  </div>
                </div>
              ) : searchResults ? (
                searchResults.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {searchResults.map((movie) => (
                      <MovieCard key={movie.imdbID} movie={movie} onClick={handleSelectMovie} />
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400">No movies found with that title.</p>
                )
              ) : (
                rawResponse
              )}
            </div>
          </div>
        </div>
      </div>


    </Layout>
  );
}

export default App;
