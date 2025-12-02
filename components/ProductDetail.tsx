
import React from 'react';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = React.useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="h-64 w-full object-cover md:h-full md:w-96" src={product.imageUrl} alt={product.name} />
        </div>
        <div className="p-8 flex flex-col justify-between">
          <div>
            <button onClick={onBack} className="text-sm text-primary hover:underline mb-4 flex items-center">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Products
            </button>
            <div className="uppercase tracking-wide text-sm text-primary font-semibold">{product.category}</div>
            <h1 className="block mt-1 text-4xl leading-tight font-extrabold text-black">{product.name}</h1>
            <p className="mt-4 text-gray-600 text-lg">{product.description}</p>
          </div>
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <span className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              <button
                onClick={handleAddToCart}
                className={`flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white ${isAdding ? 'bg-green-500' : 'bg-primary hover:bg-primary-hover'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-300 w-48`}
              >
                {isAdding ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Added!
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
