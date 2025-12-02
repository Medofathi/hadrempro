
import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct }) => {
  return (
    <div
      className="group relative flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-xl cursor-pointer"
      onClick={() => onSelectProduct(product)}
    >
      <div className="aspect-w-4 aspect-h-3">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 truncate group-hover:text-primary">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1 flex-grow">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
          <span className="text-xs font-medium bg-primary-100 text-primary-800 px-2 py-1 rounded-full">{product.category}</span>
        </div>
      </div>
       <div className="p-4 pt-0">
          <button
              onClick={(e) => { e.stopPropagation(); onSelectProduct(product); }}
              className="w-full bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-300">
              View Details
          </button>
      </div>
    </div>
  );
};

export default ProductCard;
