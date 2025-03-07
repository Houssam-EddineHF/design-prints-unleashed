
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const button = buttonRef.current;
    const image = imageRef.current;

    if (title) title.classList.add('animate-slide-in');
    
    setTimeout(() => {
      if (subtitle) subtitle.classList.add('animate-slide-in');
    }, 200);
    
    setTimeout(() => {
      if (button) button.classList.add('animate-slide-in');
    }, 400);
    
    setTimeout(() => {
      if (image) image.classList.add('animate-fade-in');
    }, 600);
  }, []);

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block px-3 py-1 rounded-full bg-secondary text-xs font-medium text-secondary-foreground opacity-0 transform translate-y-10" ref={titleRef}>
              Exprimez votre créativité
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight opacity-0 transform translate-y-10" ref={subtitleRef}>
              Créez des designs uniques sur mesure
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-lg opacity-0 transform translate-y-10" ref={subtitleRef}>
              Personnalisez des vêtements avec votre propre style et recevez-les directement chez vous. Une expérience de design intuitive pour des créations qui vous ressemblent.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 opacity-0 transform translate-y-10" ref={buttonRef}>
              <Link to="/designer" className="btn-primary">
                Commencer à créer
              </Link>
              <Link to="#showcase" className="btn-secondary">
                Voir les exemples
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/40 rounded-2xl transform rotate-3 scale-[0.98]"></div>
            <img 
              src="https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80" 
              alt="Personnalisation de vêtements"
              className="w-full h-auto rounded-xl object-cover shadow-lg opacity-0"
              style={{ minHeight: "400px" }}
              ref={imageRef}
            />
            <div className="absolute -right-4 -bottom-4 bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg max-w-xs animate-float">
              <p className="text-sm font-medium">
                "La plateforme la plus intuitive pour créer des designs personnalisés."
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
    </section>
  );
}
