
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="omdb-header text-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between py-2">
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-normal py-2 cursor-pointer">OMDb API</h1>
            <nav className="hidden lg:flex space-x-4 text-sm font-medium">
              <a href="#" className="hover:text-slate-300">Usage</a>
              <a href="#" className="hover:text-slate-300">Parameters</a>
              <a href="#" className="hover:text-slate-300">Examples</a>
              <a href="#" className="hover:text-slate-300">Change Log</a>
              <a href="#" className="hover:text-slate-300">API Key</a>
            </nav>
          </div>
          <div className="flex items-center space-x-0 text-sm h-12">
            <button className="btn-patron px-4 h-full font-bold hover:brightness-110">Become a Patron</button>
            <button className="btn-donate px-4 h-full font-bold hover:brightness-110">Donate</button>
            <button className="bg-slate-700 px-4 h-full font-bold hover:brightness-110">Contact</button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} OMDb API
          </p>
        </div>
      </footer>
    </div>
  );
};
