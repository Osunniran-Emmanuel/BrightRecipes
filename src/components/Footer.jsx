import { Link } from 'react-router-dom';
import { FaUtensils, FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-white border-t border-stone-200 mt-16 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-3">
            <div className="bg-orange-500 text-white p-2 rounded-xl">
              <FaUtensils className="text-sm" />
            </div>
            <span className="font-bold text-lg text-stone-900">
              Bright<span className="text-orange-500">Recipes</span>
            </span>
          </Link>
          <p className="text-stone-500 text-sm max-w-sm">
            Hundreds of tested recipes, clear instructions and honest nutrition — so you can spend less time deciding and more time cooking.
          </p>
        </div>
        
        <div>
          <h3 className="font-bold text-stone-900 text-sm mb-3 uppercase">Explore</h3>
          <ul className="space-y-2 text-sm text-stone-500">
            <li><Link to="/" className="hover:text-orange-500">Home</Link></li>
            <li><Link to="/recipes" className="hover:text-orange-500">Recipes</Link></li>
            <li><Link to="/saved" className="hover:text-orange-500">Saved</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-stone-900 text-sm mb-3 uppercase">Follow</h3>
          <div className="flex gap-3 text-stone-500">
            <a href="#" className="p-2 border border-stone-300 rounded-full hover:border-orange-500 hover:text-orange-500"><FaGithub /></a>
            <a href="#" className="p-2 border border-stone-300 rounded-full hover:border-orange-500 hover:text-orange-500"><FaTwitter /></a>
            <a href="#" className="p-2 border border-stone-300 rounded-full hover:border-orange-500 hover:text-orange-500"><FaInstagram /></a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 mt-10 pt-6 border-t border-stone-200 flex flex-col sm:flex-row justify-between text-xs text-stone-500 gap-2">
        <p>© {new Date().getFullYear()} Bright Recipes. All rights reserved.</p>
        <p>www.brightrecipes.com</p>
      </div>
    </footer>
  );
}

export default Footer;