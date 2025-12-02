import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import type { Product } from './types';
import { View } from './types';


const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.PRODUCT_LIST);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const navigateTo = (view: View) => {
    window.scrollTo(0, 0);
    setCurrentView(view);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    navigateTo(View.PRODUCT_DETAIL);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // If user is searching from another view, navigate them to the product list
    if (query && currentView !== View.PRODUCT_LIST) {
      navigateTo(View.PRODUCT_LIST);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case View.PRODUCT_LIST:
        return <ProductList onSelectProduct={handleSelectProduct} searchQuery={searchQuery} />;
      case View.PRODUCT_DETAIL:
        return selectedProduct ? <ProductDetail product={selectedProduct} onBack={() => navigateTo(View.PRODUCT_LIST)} /> : <ProductList onSelectProduct={handleSelectProduct} searchQuery={searchQuery} />;
      case View.CART:
        return <Cart onNavigate={navigateTo} />;
      case View.CHECKOUT:
        return <Checkout onNavigate={navigateTo} />;
      default:
        return <ProductList onSelectProduct={handleSelectProduct} searchQuery={searchQuery} />;
    }
  };

  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen font-sans text-gray-800">
        <Header onNavigate={navigateTo} onSearch={handleSearch} />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default App;
