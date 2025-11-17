
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  const activeLinkClass = "text-white bg-indigo-600";
  const inactiveLinkClass = "text-gray-300 hover:bg-gray-700 hover:text-white";

  return (
    <header className="bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white text-2xl font-bold">
              Mon Portfolio
            </Link>
          </div>
          <nav className="flex space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${isActive ? activeLinkClass : inactiveLinkClass}`
              }
            >
              Projets
            </NavLink>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${isActive ? activeLinkClass : inactiveLinkClass}`
              }
            >
              Admin
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
