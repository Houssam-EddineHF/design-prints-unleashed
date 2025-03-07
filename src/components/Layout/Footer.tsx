
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-secondary/50 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">CustomPrint</h4>
            <p className="text-sm text-muted-foreground">
              Créez des designs uniques et personnalisés sur des vêtements de qualité.
            </p>
          </div>
          
          <div>
            <h4 className="text-base font-medium mb-3">Navigation</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Accueil</Link></li>
              <li><Link to="/designer" className="text-sm text-muted-foreground hover:text-primary transition-colors">Créer un Design</Link></li>
              <li><Link to="/admin" className="text-sm text-muted-foreground hover:text-primary transition-colors">Administration</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-base font-medium mb-3">Assistance</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Centre d'aide</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-base font-medium mb-3">Légal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Conditions d'utilisation</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Politique de confidentialité</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-center text-muted-foreground">
            © {new Date().getFullYear()} CustomPrint. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
