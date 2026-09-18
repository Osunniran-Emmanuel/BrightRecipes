import { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaUtensils, FaHeart, FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import { RecipeContext } from './RecipeContext';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { saved, search, setSearch } = useContext(RecipeContext);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-200">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        
        {/* Logo */}
        <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
          <div className="bg-orange-500 text-white p-2 rounded-xl">
            <FaUtensils className="text-sm" />
          </div>
          <span className="font-bold text-lg text-stone-900">
            Bright<span className="text-orange-500">Recipes</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex gap-8 text-sm font-medium">
          <NavLink to="/" className={({isActive}) => isActive ? 'text-orange-600' : 'text-stone-600 hover:text-orange-600'}>Home</NavLink>
          <NavLink to="/recipes" className={({isActive}) => isActive ? 'text-orange-600' : 'text-stone-600 hover:text-orange-600'}>Recipes</NavLink>
          <NavLink to="/saved" className={({isActive}) => isActive ? 'text-orange-600' : 'text-stone-600 hover:text-orange-600'}>
            Saved {saved.length > 0 && <span className="bg-orange-500 text-white text-xs px-2 rounded-full ml-1">{saved.length}</span>}
          </NavLink>
        </ul>

        {/* Desktop Search & Login */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-2.5 text-stone-400 text-sm" />
            <input 
              type="text" 
              placeholder="Search recipes..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-stone-50 border border-stone-300 rounded-full py-2 pl-9 pr-4 text-sm outline-none focus:border-orange-400 w-64"
            />
          </div>
          <button className="bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-orange-600">
            Login
          </button>
        </div>

        {/* Mobile Icons */}
        <div className="flex lg:hidden items-center gap-4">
          <Link to="/saved" className="relative text-orange-500">
            <FaHeart size={20} />
            {saved.length > 0 && <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{saved.length}</span>}
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-stone-700">
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-stone-200 px-4 py-4 space-y-4">
          <ul className="flex flex-col gap-4 font-medium text-stone-700">
            <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink to="/recipes" onClick={() => setMenuOpen(false)}>Recipes</NavLink>
            <NavLink to="/saved" onClick={() => setMenuOpen(false)}>Saved</NavLink>
          </ul>
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-stone-400 text-sm" />
            <input 
              type="text" 
              placeholder="Search recipes..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-full py-2 pl-9 pr-4 text-sm outline-none"
            />
          </div>
          <button className="w-full bg-orange-500 text-white py-2 rounded-full font-medium">Login</button>
        </div>
      )}
    </header>
  );
}

export default Navbar;