import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaTrash, FaStar, FaClock, FaArrowLeft, FaUtensils } from 'react-icons/fa';
import { RecipeContext } from '../components/RecipeContext';

export default function Saved() {
  const { saved, removeSaved } = useContext(RecipeContext);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-stone-900">Saved recipes</h1>
          <p className="text-stone-500 mt-2">
            {saved.length === 0 ? 'Nothing saved yet.' : `${saved.length} recipe(s) in your personal cookbook.`}
          </p>
        </div>
      
        <Link 
          to="/recipes" 
          className="flex items-center gap-2 whitespace-nowrap border border-stone-300 text-stone-700 px-5 py-2.5 rounded-full text-sm font-medium hover:border-orange-500 transition"
        >
          <FaArrowLeft size={12} /> Browse more
        </Link>
      </div>

      {saved.length === 0 ? (
        <div className="bg-white border border-stone-300 border-dashed rounded-3xl p-10 text-center">
          <FaHeart className="text-4xl text-orange-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-stone-900">Your saved list is empty</h2>
          <p className="text-stone-500 mt-2 max-w-sm mx-auto text-sm">
            Tap the heart icon on any recipe to add it here. Your picks are stored in this browser.
          </p>
          <Link to="/recipes" className="inline-block mt-6 bg-orange-500 text-white px-6 py-2.5 rounded-full font-medium">
            Find recipes
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {saved.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm">
              <div className="relative h-48">
                <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <FaHeart size={10} /> Saved
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-stone-900 mb-2">{recipe.name}</h3>
                <div className="flex items-center gap-3 text-xs text-stone-500 mb-4">
                  <span className="flex items-center gap-1"><FaStar className="text-amber-400" /> {recipe.rating}</span>
                  <span className="flex items-center gap-1"><FaClock /> {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
                  <span className="flex items-center gap-1"><FaUtensils /> {recipe.cuisine}</span>
                </div>
                <button onClick={() => removeSaved(recipe.id)} className="w-full bg-red-50 text-red-600 border border-red-200 py-2 rounded-full text-xs font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition">
                  <FaTrash size={12} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}