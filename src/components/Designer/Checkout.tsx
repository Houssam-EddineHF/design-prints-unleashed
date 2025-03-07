
import { useState } from 'react';
import { Product } from '../../data/products';
import { toast } from 'sonner';

interface CheckoutProps {
  product: Product;
  color: string;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export default function Checkout({ product, color, canvasRef }: CheckoutProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Capture canvas as image data
    const designImage = canvasRef.current?.toDataURL('image/png');
    
    // Simulate sending to server
    setTimeout(() => {
      console.log({
        product: product.id,
        color,
        name,
        email,
        note,
        designImage
      });
      
      setIsSubmitting(false);
      toast.success('Votre design a été envoyé avec succès!');
      
      // Reset form
      setName('');
      setEmail('');
      setNote('');
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-medium">Finaliser votre commande</h3>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between py-2 border-b border-border/50">
          <span className="text-sm font-medium">Produit</span>
          <span className="text-sm">{product.name}</span>
        </div>
        
        <div className="flex items-center justify-between py-2 border-b border-border/50">
          <span className="text-sm font-medium">Couleur</span>
          <div className="flex items-center">
            <div 
              className="w-4 h-4 rounded-full mr-2" 
              style={{ backgroundColor: color }}
            ></div>
            <span className="text-sm">{color}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between py-2 border-b border-border/50">
          <span className="text-sm font-medium">Prix</span>
          <span className="text-sm">{product.price.toFixed(2)} €</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Nom</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            required
          />
        </div>
        
        <div>
          <label htmlFor="note" className="block text-sm font-medium mb-1">Note (optionnel)</label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Envoi en cours...
            </>
          ) : (
            'Envoyer mon design'
          )}
        </button>
      </form>
    </div>
  );
}
