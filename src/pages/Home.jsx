import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaStar, FaClock, FaArrowRight, FaTimes, FaFire, FaUtensils } from 'react-icons/fa';
import { RecipeContext } from '../components/RecipeContext';

export default function Home() {
  const { filteredRecipes, loading, isSaved, toggleSave } = useContext(RecipeContext);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const previewRecipes = filteredRecipes.slice(0, 8);
  const featuredRecipe = filteredRecipes.length > 0 ? filteredRecipes[0] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
  
      <div className="grid lg:grid-cols-2 gap-10 items-center mb-16">
        
      
        <div>
          <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full uppercase">Cook something bright</span>
          
          <h1 className="text-4xl lg:text-5xl font-extrabold text-stone-900 mt-4 leading-tight">
            Find a recipe you'll love, <span className="text-orange-500">cook it tonight.</span>
          </h1>
          
        
          <p className="text-stone-600 mt-4 leading-relaxed">
            Hundreds of tested dishes with clear instructions, prep times, and nutrition at a glance. Filter by difficulty, cuisine, or meal type, and save your favourites to build your personal cookbook.
          </p>
          
    
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <a 
              href="#recipes" 
              className="w-full sm:w-auto justify-center whitespace-nowrap bg-orange-500 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-orange-600 transition"
            >
              Browse recipes <FaArrowRight size={12} />
            </a>
            <Link 
              to="/recipes" 
              className="w-full sm:w-auto justify-center whitespace-nowrap border border-stone-300 bg-white text-stone-700 px-6 py-3 rounded-full font-medium hover:border-orange-500 transition flex items-center"
            >
              Explore categories
            </Link>
          </div>
        </div>

        
        {featuredRecipe && (
          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="relative h-64">
              <img src={featuredRecipe.image} alt={featuredRecipe.name} className="w-full h-full object-cover" />
              <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold uppercase">
                Featured Recipe
              </span>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-stone-900">{featuredRecipe.name}</h2>
              <div className="flex items-center gap-4 text-sm text-stone-500 mt-2 mb-4">
                <span className="flex items-center gap-1"><FaStar className="text-amber-400" /> {featuredRecipe.rating}</span>
                <span className="flex items-center gap-1"><FaUtensils /> {featuredRecipe.cuisine}</span>
                <span className="flex items-center gap-1"><FaClock /> {featuredRecipe.prepTimeMinutes + featuredRecipe.cookTimeMinutes} min</span>
              </div>
              <button 
                onClick={() => setSelectedRecipe(featuredRecipe)} 
                className="w-full bg-stone-900 text-white py-2.5 rounded-full font-medium hover:bg-stone-800 transition"
              >
                View Full Recipe
              </button>
            </div>
          </div>
        )}
      </div>

     
      <div id="recipes">
        <h2 className="text-3xl font-bold text-stone-900 mb-2">Featured recipes</h2>
        <p className="text-stone-500 mb-6">{filteredRecipes.length} recipes available</p>

        {loading ? (
          <p className="text-stone-500">Loading recipes...</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {previewRecipes.map((recipe) => (
              <div key={recipe.id} className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition">
                <div className="relative h-48">
                  <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
                  <button onClick={() => toggleSave(recipe)} className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md text-stone-600 hover:scale-110 transition">
                    {isSaved(recipe.id) ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                  </button>
                  <span className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full uppercase">{recipe.difficulty}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-stone-900 mb-2">{recipe.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-stone-500 mb-4">
                    <FaStar className="text-amber-400" /> {recipe.rating} ({recipe.reviewCount})
                    <span>•</span>
                    <FaClock /> {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min
                  </div>
                  <button onClick={() => setSelectedRecipe(recipe)} className="text-orange-600 border border-orange-500 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-orange-500 hover:text-white flex items-center gap-2 transition">
                    Check Recipes <FaArrowRight size={10} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedRecipe(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-64">
              <img src={selectedRecipe.image} alt={selectedRecipe.name} className="w-full h-full object-cover" />
              <button onClick={() => setSelectedRecipe(null)} className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md"><FaTimes /></button>
              <button onClick={() => toggleSave(selectedRecipe)} className="absolute top-4 right-16 bg-white p-2 rounded-full shadow-md">
                {isSaved(selectedRecipe.id) ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
              </button>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-stone-900 mb-2">{selectedRecipe.name}</h2>
              <div className="flex gap-4 text-sm text-stone-500 mb-6">
                <span className="flex items-center gap-1"><FaStar className="text-amber-400" /> {selectedRecipe.rating}</span>
                <span className="flex items-center gap-1"><FaUtensils /> {selectedRecipe.cuisine}</span>
                <span className="flex items-center gap-1"><FaClock /> {selectedRecipe.prepTimeMinutes}m prep • {selectedRecipe.cookTimeMinutes}m cook</span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                  <p className="text-xs text-stone-500 font-bold uppercase">Calories</p>
                  <p className="font-bold text-stone-900">{selectedRecipe.caloriesPerServing}</p>
                </div>
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                  <p className="text-xs text-stone-500 font-bold uppercase">Difficulty</p>
                  <p className="font-bold text-stone-900">{selectedRecipe.difficulty}</p>
                </div>
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                  <p className="text-xs text-stone-500 font-bold uppercase">Prep</p>
                  <p className="font-bold text-stone-900">{selectedRecipe.prepTimeMinutes} min</p>
                </div>
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                  <p className="text-xs text-stone-500 font-bold uppercase">Cook</p>
                  <p className="font-bold text-stone-900">{selectedRecipe.cookTimeMinutes} min</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-stone-900 mb-2">Ingredients</h3>
                  <ul className="space-y-1">
                    {selectedRecipe.ingredients.map((ing, idx) => (
                      <li key={idx} className="text-sm text-stone-600 flex gap-2 items-center">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span> {ing}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-2">Instructions</h3>
                  <ol className="space-y-2">
                    {selectedRecipe.instructions.map((step, idx) => (
                      <li key={idx} className="text-sm text-stone-600 flex gap-2">
                        <span className="bg-orange-100 text-orange-700 font-bold rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0">{idx + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}