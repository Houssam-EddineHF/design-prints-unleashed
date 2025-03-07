
export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  category: 'tshirt' | 'hoodie' | 'sweatshirt';
  colors: string[];
  sizes: string[];
  canvasPosition: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export const products: Product[] = [
  {
    id: 'tshirt-basic',
    name: 'T-Shirt Basic',
    description: 'T-shirt 100% coton biologique, coupe classique',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 19.99,
    category: 'tshirt',
    colors: ['#FFFFFF', '#000000', '#264653', '#e76f51', '#2a9d8f'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    canvasPosition: {
      x: 150,
      y: 100,
      width: 300,
      height: 400
    }
  },
  {
    id: 'hoodie-premium',
    name: 'Hoodie Premium',
    description: 'Hoodie en coton épais avec doublure polaire',
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 39.99,
    category: 'hoodie',
    colors: ['#000000', '#FFFFFF', '#264653', '#e9c46a', '#e76f51'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    canvasPosition: {
      x: 150,
      y: 150,
      width: 300,
      height: 300
    }
  },
  {
    id: 'sweatshirt-classic',
    name: 'Sweatshirt Classique',
    description: 'Sweatshirt confortable pour tous les jours',
    imageUrl: 'https://images.unsplash.com/photo-1572495641004-28421ae29abb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 29.99,
    category: 'sweatshirt',
    colors: ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'],
    sizes: ['S', 'M', 'L', 'XL'],
    canvasPosition: {
      x: 150,
      y: 120,
      width: 300,
      height: 350
    }
  },
  {
    id: 'tshirt-premium',
    name: 'T-Shirt Premium',
    description: 'T-shirt en coton peigné, toucher doux et confortable',
    imageUrl: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 24.99,
    category: 'tshirt',
    colors: ['#FFFFFF', '#000000', '#264653', '#2a9d8f', '#f4a261'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    canvasPosition: {
      x: 150,
      y: 100,
      width: 300,
      height: 400
    }
  },
  {
    id: 'hoodie-lightweight',
    name: 'Hoodie Léger',
    description: 'Hoodie léger parfait pour la mi-saison',
    imageUrl: 'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 34.99,
    category: 'hoodie',
    colors: ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'],
    sizes: ['S', 'M', 'L', 'XL'],
    canvasPosition: {
      x: 150,
      y: 150,
      width: 300,
      height: 300
    }
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: Product['category']): Product[] => {
  return products.filter(product => product.category === category);
};
