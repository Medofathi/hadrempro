
import React from 'react';
import { useCart } from '../context/CartContext';
import { View } from '../types';

interface CartProps {
  onNavigate: (view: View) => void;
}

const Cart: React.FC<CartProps> = ({ onNavigate }) => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center bg-white p-12 rounded-lg shadow-md">
          <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2 className="mt-4 text-xl font-medium text-gray-900">Your cart is empty</h2>
          <p className="mt-2 text-gray-500">Looks like you haven't added anything to your cart yet.</p>
          <button
            onClick={() => onNavigate(View.PRODUCT_LIST)}
            className="mt-6 inline-block bg-primary text-white font-semibold py-3 px-6 rounded-md hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-300"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {cartItems.map(item => (
              <li key={item.id} className="p-4 sm:p-6 flex items-center space-x-4">
                <img src={item.imageUrl} alt={item.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-md object-cover" />
                <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-500 text-sm mt-1">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center mt-4 sm:mt-0">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      className="w-16 text-center border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    />
                    <button onClick={() => removeFromCart(item.id)} className="ml-4 text-gray-400 hover:text-red-500 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </div>
                   <p className="text-lg font-semibold text-gray-800 w-24 text-right hidden sm:block">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="p-6 bg-gray-50 flex justify-end items-center">
             <div className="text-right">
                <p className="text-gray-600">Subtotal</p>
                <p className="text-2xl font-extrabold text-gray-900">${totalPrice.toFixed(2)}</p>
            </div>
            <button
              onClick={() => onNavigate(View.CHECKOUT)}
              className="ml-6 bg-secondary text-white font-bold py-3 px-8 rounded-md hover:bg-secondary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all duration-300 text-lg"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
