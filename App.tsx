
import React, { useState, useMemo } from 'react';
import { Layout } from './components/Layout';
import { MovieDetails as MovieDetailsType } from './types';


const API_KEY = 'abcb7550';

function App() {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [plot, setPlot] = useState('');
  const [responseType, setResponseType] = useState('');

  const [rawResponse, setRawResponse] = useState<string | null>(null);
  const [movieData, setMovieData] = useState<MovieDetailsType | null>(null);
  const [isLoading, setIsLoading] = useState(false);



  const requestUrl = useMemo(() => {
    return `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&y=${year}&plot=${plot}&apikey=${API_KEY}`;
  }, [title, year, plot]);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(requestUrl);
      const data = await res.json();
      setRawResponse(JSON.stringify(data));
      if (data.Response === "True") {
        setMovieData(data);
      } else {
        setMovieData(null);
      }
    } catch (err) {
      setRawResponse('{"Response":"False","Error":"Connection Error"}');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setTitle('');
    setYear('');
    setPlot('short');
    setRawResponse(null);
    setMovieData(null);
  };



  return (
    <Layout>
      <h1 className="text-6xl font-normal mb-8 text-[#333]">Examples</h1>

      <div className="bg-white border border-slate-200 rounded-sm shadow-sm p-6 mb-8">
        <h2 className="text-xl font-normal mb-6 pb-4 border-b border-slate-100">By Title</h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-3">
            <label className="block text-sm mb-1">Title:</label>
            <input
              className="w-full text-white"
              type="text"

              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Year:</label>
            <input
              className="w-full text-white"
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Plot:</label>
            <select className="w-full text-white" value={plot} onChange={(e) => setPlot(e.target.value)}>
              <option value="short">Short</option>
              <option value="full">Full</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Response:</label>
            <select className="w-full text-white" value={responseType} onChange={(e) => setResponseType(e.target.value)}>
              <option value="JSON">JSON</option>
              <option value="XML">XML</option>
            </select>
          </div>
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
              {rawResponse}
            </div>
          </div>
        </div>
      </div>


    </Layout>
  );
}

export default App;
