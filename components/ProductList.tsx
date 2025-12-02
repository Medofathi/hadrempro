import React, { useState, useEffect, useMemo } from 'react';
import { fetchProducts } from '../services/geminiService';
import ProductCard from './ProductCard';
import Spinner from './Spinner';
import type { Product } from '../types';

interface ProductListProps {
  onSelectProduct: (product: Product) => void;
  searchQuery: string;
}

const ProductList: React.FC<ProductListProps> = ({ onSelectProduct, searchQuery }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!searchQuery) {
      return products;
    }
    const lowercasedQuery = searchQuery.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(lowercasedQuery) ||
      product.category.toLowerCase().includes(lowercasedQuery)
    );
  }, [products, searchQuery]);

  if (loading) {
    return (
        <div className="flex flex-col items-center justify-center h-96">
            <Spinner />
            <p className="mt-4 text-lg text-gray-600">Generating Fresh Products...</p>
        </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl p-8">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Our Products</h1>
      <p className="text-lg text-gray-600 mb-8">Discover our curated collection of fine goods.</p>
      
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onSelectProduct={onSelectProduct} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
           <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">No Products Found</h2>
          {searchQuery ? (
            <p className="mt-2 text-gray-500">Your search for "{searchQuery}" did not match any products.</p>
          ) : (
             <p className="mt-2 text-gray-500">There are no products available at the moment.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
