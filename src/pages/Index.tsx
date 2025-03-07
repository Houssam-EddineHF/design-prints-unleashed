
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Hero from '../components/Home/Hero';
import ProductShowcase from '../components/Home/ProductShowcase';

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero />
        <ProductShowcase />
        
        <section className="py-20 bg-secondary/30">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-6">
                  Comment ça fonctionne
                </h2>
                
                <ol className="space-y-6">
                  <li className="flex">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-medium mr-4">
                      1
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Choisissez votre modèle</h3>
                      <p className="text-muted-foreground">
                        Sélectionnez parmi nos t-shirts, hoodies et sweatshirts de qualité.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-medium mr-4">
                      2
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Personnalisez votre design</h3>
                      <p className="text-muted-foreground">
                        Utilisez notre éditeur intuitif pour créer ou importer votre design unique.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-medium mr-4">
                      3
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Envoyez votre commande</h3>
                      <p className="text-muted-foreground">
                        Finalisez votre design et envoyez-le à nos experts en impression.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-medium mr-4">
                      4
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Recevez votre création</h3>
                      <p className="text-muted-foreground">
                        Votre vêtement personnalisé est fabriqué et livré directement chez vous.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-bl from-primary/5 to-secondary/40 rounded-2xl transform -rotate-3 scale-[0.98]"></div>
                <img 
                  src="https://images.unsplash.com/photo-1626885930974-c58da8344f97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80" 
                  alt="Processus de création"
                  className="w-full h-auto object-cover rounded-xl shadow-lg"
                  style={{ minHeight: "400px" }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
