
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md w-full mb-8">
      <div className="container mx-auto px-6 py-4">
        <h1 className="text-3xl font-bold text-sky-700">Sistem Aduan Komuniti</h1>
        <p className="text-slate-500 mt-1">Saluran aduan anda terus kepada wakil rakyat.</p>
      </div>
    </header>
  );
};

export default Header;
