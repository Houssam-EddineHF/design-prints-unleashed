
import { useState } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { products, Product } from '../data/products';
import { toast } from 'sonner';

export default function Admin() {
  const [designs, setDesigns] = useState([
    { id: 1, customer: 'Jean Dupont', product: 'T-Shirt Basic', status: 'pending', date: '2023-05-10' },
    { id: 2, customer: 'Marie Martin', product: 'Hoodie Premium', status: 'processing', date: '2023-05-09' },
    { id: 3, customer: 'Pierre Lefebvre', product: 'Sweatshirt Classique', status: 'completed', date: '2023-05-08' },
  ]);
  
  const [uploading, setUploading] = useState(false);
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState<Product['category']>('tshirt');
  const [productPrice, setProductPrice] = useState('');

  const handleStatusChange = (id: number, newStatus: string) => {
    setDesigns(designs.map(design => 
      design.id === id ? { ...design, status: newStatus } : design
    ));
    toast.success(`Statut mis à jour: ${newStatus}`);
  };

  const handleProductUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setUploading(false);
      toast.success(`Nouveau produit ajouté: ${productName}`);
      
      // Reset form
      setProductName('');
      setProductCategory('tshirt');
      setProductPrice('');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-32">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-8">
              Administration
            </h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
                  <div className="p-4 border-b border-border">
                    <h2 className="text-xl font-medium">Designs reçus</h2>
                  </div>
                  
                  <div className="p-4">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="px-4 py-2 text-left text-sm font-medium">Client</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Produit</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Date</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Statut</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {designs.map((design) => (
                            <tr key={design.id} className="border-b border-border/50">
                              <td className="px-4 py-3 text-sm">{design.customer}</td>
                              <td className="px-4 py-3 text-sm">{design.product}</td>
                              <td className="px-4 py-3 text-sm">{design.date}</td>
                              <td className="px-4 py-3 text-sm">
                                <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                                  design.status === 'pending' 
                                    ? 'bg-yellow-100 text-yellow-800' 
                                    : design.status === 'processing'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-green-100 text-green-800'
                                }`}>
                                  {design.status === 'pending' 
                                    ? 'En attente' 
                                    : design.status === 'processing'
                                    ? 'En cours'
                                    : 'Terminé'}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm">
                                <div className="flex space-x-2">
                                  <button 
                                    className="text-xs px-2 py-1 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded transition-colors"
                                    onClick={() => handleStatusChange(design.id, 'processing')}
                                  >
                                    Traiter
                                  </button>
                                  <button 
                                    className="text-xs px-2 py-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded transition-colors"
                                    onClick={() => handleStatusChange(design.id, 'completed')}
                                  >
                                    Terminer
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
                  <div className="p-4 border-b border-border">
                    <h2 className="text-xl font-medium">Ajouter un produit</h2>
                  </div>
                  
                  <form onSubmit={handleProductUpload} className="p-4 space-y-4">
                    <div>
                      <label htmlFor="product-name" className="block text-sm font-medium mb-1">Nom du produit</label>
                      <input
                        id="product-name"
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="product-category" className="block text-sm font-medium mb-1">Catégorie</label>
                      <select
                        id="product-category"
                        value={productCategory}
                        onChange={(e) => setProductCategory(e.target.value as Product['category'])}
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        required
                      >
                        <option value="tshirt">T-Shirt</option>
                        <option value="hoodie">Hoodie</option>
                        <option value="sweatshirt">Sweatshirt</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="product-price" className="block text-sm font-medium mb-1">Prix (€)</label>
                      <input
                        id="product-price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="product-image" className="block text-sm font-medium mb-1">Image du produit</label>
                      <input
                        id="product-image"
                        type="file"
                        accept="image/*"
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                        required
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={uploading}
                      className="w-full btn-primary flex items-center justify-center"
                    >
                      {uploading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Envoi en cours...
                        </>
                      ) : (
                        'Ajouter le produit'
                      )}
                    </button>
                  </form>
                </div>
                
                <div className="mt-8 bg-white rounded-lg shadow-sm border border-border overflow-hidden">
                  <div className="p-4 border-b border-border">
                    <h2 className="text-xl font-medium">Produits existants</h2>
                  </div>
                  
                  <div className="p-4">
                    <ul className="space-y-3">
                      {products.slice(0, 5).map((product) => (
                        <li key={product.id} className="flex items-center justify-between pb-2 border-b border-border/50">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-md bg-secondary/30 overflow-hidden">
                              <img 
                                src={product.imageUrl} 
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-sm font-medium">{product.name}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{product.price.toFixed(2)} €</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
