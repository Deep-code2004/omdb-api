
import React, { useState, useEffect } from 'react';
import { MovieDetails as MovieDetailsType } from '../types';


interface MovieDetailsProps {
  details: MovieDetailsType;
  onClose: () => void;
}

export const MovieDetails: React.FC<MovieDetailsProps> = ({ details, onClose }) => {




  return (
    <div className="fixed inset-0 z-50 overflow-y-auto px-4 py-8 flex items-center justify-center">
      <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={onClose}></div>

      <div className="relative bg-slate-900 border border-slate-800 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-slate-950/50 hover:bg-red-500/20 text-slate-400 hover:text-red-500 rounded-full transition-all"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Poster Section */}
          <div className="w-full md:w-1/3 bg-slate-950">
            {details.Poster !== 'N/A' ? (
              <img src={details.Poster} alt={details.Title} className="w-full h-full object-cover" />
            ) : (
              <div className="aspect-[2/3] flex items-center justify-center bg-slate-800 text-slate-500">No Poster</div>
            )}
          </div>

          {/* Content Section */}
          <div className="w-full md:w-2/3 p-6 md:p-8 space-y-6 overflow-y-auto max-h-[80vh]">
            <header>
              <div className="flex flex-wrap gap-2 mb-2">
                {details.Genre.split(',').map(g => (
                  <span key={g} className="text-[10px] font-bold tracking-widest uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded">
                    {g.trim()}
                  </span>
                ))}
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                {details.Title} <span className="font-normal text-slate-500">({details.Year})</span>
              </h2>
              <div className="flex items-center space-x-4 mt-3 text-sm text-slate-400">
                <span className="flex items-center">
                  <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {details.imdbRating}
                </span>
                <span>{details.Runtime}</span>
                <span className="px-2 py-0.5 border border-slate-700 rounded text-xs">{details.Rated}</span>
              </div>
            </header>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Plot</h4>
                <p className="text-slate-300 leading-relaxed text-sm md:text-base">{details.Plot}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Director</h4>
                  <p className="text-slate-200">{details.Director}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Release Date</h4>
                  <p className="text-slate-200">{details.Released}</p>
                </div>
                <div className="col-span-2">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Cast</h4>
                  <p className="text-slate-200">{details.Actors}</p>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};
