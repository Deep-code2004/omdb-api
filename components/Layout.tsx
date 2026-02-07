
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
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
