
import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Canvas from '../components/Designer/Canvas';
import ProductSelector from '../components/Designer/ProductSelector';
import Checkout from '../components/Designer/Checkout';
import { products, getProductById } from '../data/products';

export default function Designer() {
  const [searchParams] = useSearchParams();
  const initialProductId = searchParams.get('product') || 'tshirt-basic';
  
  const initialProduct = getProductById(initialProductId) || products[0];
  const [selectedProduct, setSelectedProduct] = useState(initialProduct);
  const [selectedColor, setSelectedColor] = useState(selectedProduct.colors[0]);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-32">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-8 text-center">
              Créez votre design personnalisé
            </h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-2 order-2 lg:order-1">
                <ProductSelector
                  onSelectProduct={setSelectedProduct}
                  onSelectColor={setSelectedColor}
                  selectedProduct={selectedProduct}
                  selectedColor={selectedColor}
                />
                
                <div className="mt-8">
                  <Checkout 
                    product={selectedProduct}
                    color={selectedColor}
                    canvasRef={canvasRef}
                  />
                </div>
              </div>
              
              <div className="lg:col-span-3 order-1 lg:order-2">
                <div className="glass-panel rounded-lg p-4">
                  <Canvas 
                    product={selectedProduct}
                    color={selectedColor}
                  />
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
