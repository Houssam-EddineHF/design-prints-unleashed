
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            <button className="p-2 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
