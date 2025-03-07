
import { useEffect, useRef, useState } from 'react';
import { Product } from '../../data/products';
import { toast } from 'sonner';

interface CanvasProps {
  product: Product;
  color: string;
}

export default function Canvas({ product, color }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [designImage, setDesignImage] = useState<HTMLImageElement | null>(null);

  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      setContext(ctx);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;
      
      // Clear canvas and set background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.01)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, [brushColor, brushSize]);

  // Load product image as background
  useEffect(() => {
    if (!context || !product) return;
    
    const img = new Image();
    img.src = product.imageUrl;
    img.onload = () => {
      if (!canvasRef.current) return;
      
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      
      // Apply color filter for product
      context.globalCompositeOperation = 'source-over';
      context.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
      
      // Apply product color filter
      context.globalCompositeOperation = 'multiply';
      context.fillStyle = color;
      context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      
      // Reset composite operation
      context.globalCompositeOperation = 'source-over';
      
      // Draw existing design if any
      if (designImage) {
        const { x, y, width, height } = product.canvasPosition;
        context.drawImage(designImage, x, y, width, height);
      }
    };
  }, [product, color, context, designImage]);

  // Drawing functions
  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (!context) return;
    
    setIsDrawing(true);
    const pos = getPointerPosition(e);
    setLastPosition(pos);
    
    // Start new path
    context.beginPath();
    context.moveTo(pos.x, pos.y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !context) return;
    
    const pos = getPointerPosition(e);
    
    context.lineTo(pos.x, pos.y);
    context.stroke();
    
    setLastPosition(pos);
  };

  const stopDrawing = () => {
    if (!context) return;
    
    if (isDrawing) {
      context.closePath();
      setIsDrawing(false);
    }
  };

  const getPointerPosition = (e: React.MouseEvent | React.TouchEvent) => {
    if (!canvasContainerRef.current) return { x: 0, y: 0 };
    
    const rect = canvasContainerRef.current.getBoundingClientRect();
    let clientX, clientY;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const clearCanvas = () => {
    if (!context || !canvasRef.current) return;
    
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    // Redraw background
    const img = new Image();
    img.src = product.imageUrl;
    img.onload = () => {
      if (!canvasRef.current || !context) return;
      
      context.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
      
      // Apply color filter
      context.globalCompositeOperation = 'multiply';
      context.fillStyle = color;
      context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      
      // Reset composite operation
      context.globalCompositeOperation = 'source-over';
    };
    
    setDesignImage(null);
    toast.success('Canvas effacé');
  };

  const uploadDesign = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target?.result) return;
      
      const img = new Image();
      img.src = event.target.result as string;
      img.onload = () => {
        setDesignImage(img);
        
        if (context && canvasRef.current) {
          const { x, y, width, height } = product.canvasPosition;
          
          // Clear canvas and redraw product
          const productImg = new Image();
          productImg.src = product.imageUrl;
          productImg.onload = () => {
            if (!context || !canvasRef.current) return;
            
            context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            context.drawImage(productImg, 0, 0, canvasRef.current.width, canvasRef.current.height);
            
            // Apply color filter
            context.globalCompositeOperation = 'multiply';
            context.fillStyle = color;
            context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            
            // Reset composite operation
            context.globalCompositeOperation = 'source-over';
            
            // Draw uploaded design
            context.drawImage(img, x, y, width, height);
          };
        }
      };
    };
    
    reader.readAsDataURL(file);
    toast.success('Design importé');
  };

  return (
    <div className="flex flex-col space-y-4">
      <div 
        ref={canvasContainerRef}
        className="relative border border-border rounded-lg overflow-hidden bg-white shadow-md"
        style={{ 
          width: '100%', 
          height: 'auto', 
          aspectRatio: '3/4'
        }}
      >
        <canvas
          ref={canvasRef}
          width={600}
          height={800}
          className="absolute inset-0 w-full h-full"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
      
      <div className="flex flex-wrap gap-3 justify-center">
        <div className="flex items-center space-x-2">
          <label htmlFor="brush-color" className="text-sm">Couleur:</label>
          <input
            id="brush-color"
            type="color"
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
            className="w-8 h-8 border-0 rounded overflow-hidden"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <label htmlFor="brush-size" className="text-sm">Taille:</label>
          <input
            id="brush-size"
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="w-24"
          />
        </div>
        
        <button 
          onClick={clearCanvas}
          className="text-sm px-3 py-1 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded transition-colors"
        >
          Effacer
        </button>
        
        <label className="text-sm px-3 py-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded transition-colors cursor-pointer">
          Importer
          <input
            type="file"
            accept="image/*"
            onChange={uploadDesign}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}
