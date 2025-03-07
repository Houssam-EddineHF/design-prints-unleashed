
import { useState } from 'react';
import { Product, getProductsByCategory } from '../../data/products';

interface ProductSelectorProps {
  onSelectProduct: (product: Product) => void;
  onSelectColor: (color: string) => void;
  selectedProduct: Product;
  selectedColor: string;
}

export default function ProductSelector({
  onSelectProduct,
  onSelectColor,
  selectedProduct,
  selectedColor
}: ProductSelectorProps) {
  const [activeCategory, setActiveCategory] = useState<Product['category']>('tshirt');
  
  const categories = [
    { id: 'tshirt', label: 'T-Shirts' },
    { id: 'hoodie', label: 'Hoodies' },
    { id: 'sweatshirt', label: 'Sweatshirts' }
  ];
  
  const productsInCategory = getProductsByCategory(activeCategory);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
      <div className="border-b border-border">
        <div className="flex overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === category.id
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveCategory(category.id as Product['category'])}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-sm font-medium mb-3">Modèles</h3>
        <div className="grid grid-cols-2 gap-3">
          {productsInCategory.map((product) => (
            <div
              key={product.id}
              className={`relative rounded-md overflow-hidden cursor-pointer transition-all hover:shadow-md ${
                selectedProduct.id === product.id
                  ? 'ring-2 ring-primary ring-offset-2'
                  : 'hover:ring-1 hover:ring-border'
              }`}
              onClick={() => onSelectProduct(product)}
            >
              <div className="aspect-square bg-secondary/20 relative">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2">
                <h4 className="text-xs font-medium">{product.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{product.price.toFixed(2)} €</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedProduct && (
        <div className="p-4 border-t border-border">
          <h3 className="text-sm font-medium mb-3">Couleur</h3>
          <div className="flex flex-wrap gap-2">
            {selectedProduct.colors.map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full transition-transform ${
                  selectedColor === color
                    ? 'ring-2 ring-primary ring-offset-2 scale-110'
                    : 'hover:scale-105'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => onSelectColor(color)}
                aria-label={`Couleur ${color}`}
              />
            ))}
          </div>
        </div>
      )}
      
      {selectedProduct && (
        <div className="p-4 border-t border-border">
          <h3 className="text-sm font-medium mb-3">Taille</h3>
          <div className="flex flex-wrap gap-2">
            {selectedProduct.sizes.map((size) => (
              <button
                key={size}
                className="w-10 h-10 flex items-center justify-center rounded-md bg-secondary/50 hover:bg-secondary text-xs font-medium"
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
