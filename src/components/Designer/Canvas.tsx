
import { useEffect, useRef, useState } from 'react';
import { Product } from '../../data/products';
import { toast } from 'sonner';
import { Canvas as FabricCanvas, Image as FabricImage } from 'fabric';

interface CanvasProps {
  product: Product;
  color: string;
}

export default function Canvas({ product, color }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<FabricCanvas | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [designImage, setDesignImage] = useState<HTMLImageElement | null>(null);
  const [isDrawingMode, setIsDrawingMode] = useState(true);

  // Initialize Fabric canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Create Fabric.js canvas instance
    const fabricCanvas = new FabricCanvas(canvasRef.current, {
      width: 600,
      height: 800,
      backgroundColor: 'rgba(255, 255, 255, 0.01)',
      selection: !isDrawingMode,
    });
    
    // Set up drawing brush
    fabricCanvas.freeDrawingBrush.color = brushColor;
    fabricCanvas.freeDrawingBrush.width = brushSize;
    fabricCanvas.isDrawingMode = isDrawingMode;
    
    fabricCanvasRef.current = fabricCanvas;
    
    // Load product image as background
    loadProductImage(fabricCanvas);
    
    // Clean up
    return () => {
      fabricCanvas.dispose();
    };
  }, [product, color]);

  // Update brush properties when they change
  useEffect(() => {
    if (!fabricCanvasRef.current) return;
    
    fabricCanvasRef.current.freeDrawingBrush.color = brushColor;
    fabricCanvasRef.current.freeDrawingBrush.width = brushSize;
  }, [brushColor, brushSize]);

  // Update drawing mode
  useEffect(() => {
    if (!fabricCanvasRef.current) return;
    
    fabricCanvasRef.current.isDrawingMode = isDrawingMode;
    fabricCanvasRef.current.selection = !isDrawingMode;
  }, [isDrawingMode]);

  // Load product image as background
  const loadProductImage = (canvas: FabricCanvas) => {
    const img = new Image();
    img.src = product.imageUrl;
    img.onload = () => {
      const fabricImage = new FabricImage(img, {
        left: 0,
        top: 0,
        scaleX: canvas.width! / img.width,
        scaleY: canvas.height! / img.height,
        selectable: false,
        evented: false,
      });
      
      canvas.setBackgroundImage(fabricImage, canvas.renderAll.bind(canvas), {
        backgroundImageOpacity: 1,
        backgroundImageStretch: true,
      });
      
      // Apply color filter
      applyColorFilter(canvas);
      
      // Add design image if available
      if (designImage) {
        addDesignImageToCanvas(designImage);
      }
    };
  };

  // Apply color tint to the product
  const applyColorFilter = (canvas: FabricCanvas) => {
    const filter = new FabricImage.filters.BlendColor({
      color: color,
      mode: 'multiply',
      alpha: 0.5
    });
    
    if (canvas.backgroundImage && 'filters' in canvas.backgroundImage) {
      canvas.backgroundImage.filters = [filter];
      canvas.backgroundImage.applyFilters();
      canvas.renderAll();
    }
  };

  // Add design image to canvas
  const addDesignImageToCanvas = (img: HTMLImageElement) => {
    if (!fabricCanvasRef.current) return;
    
    // Remove existing design images
    fabricCanvasRef.current.getObjects().forEach(obj => {
      if (obj.data && obj.data.isDesign) {
        fabricCanvasRef.current?.remove(obj);
      }
    });
    
    // Create new design image
    const { x, y, width, height } = product.canvasPosition;
    const designFabricImage = new FabricImage(img, {
      left: x,
      top: y,
      width: width,
      height: height,
      scaleX: 1,
      scaleY: 1,
      selectable: true,
      data: { isDesign: true },
      borderColor: '#2a9d8f',
      cornerColor: '#2a9d8f',
      cornerSize: 10,
      transparentCorners: false,
    });
    
    fabricCanvasRef.current.add(designFabricImage);
    fabricCanvasRef.current.setActiveObject(designFabricImage);
    fabricCanvasRef.current.renderAll();
  };

  // Clear canvas
  const clearCanvas = () => {
    if (!fabricCanvasRef.current) return;
    
    // Remove all objects
    fabricCanvasRef.current.getObjects().forEach(obj => {
      fabricCanvasRef.current?.remove(obj);
    });
    
    // Redraw background
    loadProductImage(fabricCanvasRef.current);
    
    setDesignImage(null);
    toast.success('Canvas effacé');
  };

  // Upload design
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
        addDesignImageToCanvas(img);
        
        // Switch to select mode automatically to allow immediate manipulation
        setIsDrawingMode(false);
      };
    };
    
    reader.readAsDataURL(file);
    toast.success('Design importé');
  };

  // Toggle drawing/select mode
  const toggleMode = () => {
    setIsDrawingMode(!isDrawingMode);
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
          onClick={toggleMode}
          className={`text-sm px-3 py-1 ${isDrawingMode ? 'bg-primary' : 'bg-secondary'} hover:bg-opacity-80 text-primary-foreground rounded transition-colors`}
        >
          {isDrawingMode ? 'Mode Dessin' : 'Mode Sélection'}
        </button>
        
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
