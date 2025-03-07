
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';

export default function ProductShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const showcaseRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-scale-in');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (showcaseRef.current) {
      observer.observe(showcaseRef.current);
    }
    
    return () => {
      if (showcaseRef.current) {
        observer.unobserve(showcaseRef.current);
      }
    };
  }, []);

  return (
    <section id="showcase" className="py-20" ref={showcaseRef}>
      <div className="container px-4 md:px-6 mx-auto opacity-0">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
            Choisissez parmi nos modèles
          </h2>
          <p className="text-muted-foreground">
            Des vêtements de qualité prêts à recevoir votre design personnalisé
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.slice(0, 3).map((product, index) => (
            <div
              key={product.id}
              className="group relative rounded-xl overflow-hidden shadow-md hover-scale"
              onMouseEnter={() => setActiveIndex(index)}
            >
              <div className="aspect-[4/5] bg-secondary/30 relative">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="text-xl font-medium">{product.name}</h3>
                <p className="text-sm text-white/80 mt-1">{product.description}</p>
                <Link 
                  to={`/designer?product=${product.id}`}
                  className="mt-4 inline-flex items-center justify-center rounded-md bg-white/90 backdrop-blur-sm text-primary px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-white"
                >
                  Personnaliser
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link 
            to="/designer"
            className="btn-secondary"
          >
            Voir tous les modèles
          </Link>
        </div>
      </div>
    </section>
  );
}
