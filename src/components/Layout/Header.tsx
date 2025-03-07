
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu mobile quand on change de page
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/"
            className="text-2xl font-display font-semibold tracking-tight transition-opacity hover:opacity-80"
          >
            CustomPrint
          </Link>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link 
                  to="/" 
                  className={`text-sm transition-colors duration-200 ${
                    isActive('/') 
                      ? 'font-medium text-primary' 
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link 
                  to="/designer" 
                  className={`text-sm transition-colors duration-200 ${
                    isActive('/designer') 
                      ? 'font-medium text-primary' 
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  Créer un Design
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin" 
                  className={`text-sm transition-colors duration-200 ${
                    isActive('/admin') 
                      ? 'font-medium text-primary' 
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  Administration
                </Link>
              </li>
            </ul>
          </nav>

          <div className="md:hidden">
            <button 
              className="p-2 text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isMobileMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
        
        {/* Menu mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-100">
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/" 
                  className={`block text-sm py-2 transition-colors duration-200 ${
                    isActive('/') 
                      ? 'font-medium text-primary' 
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link 
                  to="/designer" 
                  className={`block text-sm py-2 transition-colors duration-200 ${
                    isActive('/designer') 
                      ? 'font-medium text-primary' 
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  Créer un Design
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin" 
                  className={`block text-sm py-2 transition-colors duration-200 ${
                    isActive('/admin') 
                      ? 'font-medium text-primary' 
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  Administration
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
