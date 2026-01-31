
import React from 'react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onClick: (id: string) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const hasPoster = movie.Poster && movie.Poster !== 'N/A';

  return (
    <div 
      className="group relative flex flex-col bg-slate-900/50 rounded-xl overflow-hidden cursor-pointer border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 transition-all duration-300 transform hover:-translate-y-1"
      onClick={() => onClick(movie.imdbID)}
    >
      <div className="aspect-[2/3] overflow-hidden relative">
        {hasPoster ? (
          <img 
            src={movie.Poster} 
            alt={movie.Title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500 italic">
            No Poster Available
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
           <span className="text-xs font-bold text-white bg-indigo-600 px-2 py-1 rounded">VIEW DETAILS</span>
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-100 line-clamp-1 group-hover:text-indigo-400 transition-colors">
            {movie.Title}
          </h3>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">
            {movie.Year} &bull; {movie.Type}
          </p>
        </div>
      </div>
    </div>
  );
};
