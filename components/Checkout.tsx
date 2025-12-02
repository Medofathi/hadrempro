
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { View } from '../types';

interface CheckoutProps {
  onNavigate: (view: View) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ onNavigate }) => {
  const { totalPrice, clearCart, cartItems } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
    }, 2000);
  };
  
  const shippingCost = 5.00;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + shippingCost + tax;

  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto text-center bg-white p-12 rounded-lg shadow-xl">
         <svg className="mx-auto h-20 w-20 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
         </svg>
        <h1 className="mt-4 text-3xl font-extrabold text-gray-900">Thank you for your order!</h1>
        <p className="mt-4 text-gray-600">Your payment has been processed successfully. A confirmation email has been sent to you.</p>
        <button
          onClick={() => onNavigate(View.PRODUCT_LIST)}
          className="mt-8 inline-block bg-primary text-white font-semibold py-3 px-8 rounded-md hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-300"
        >
          Back to Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="lg:col-span-1">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping & Payment</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
             <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" id="email" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
            </div>
             <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" id="name" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
            </div>
             <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input type="text" id="address" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
            </div>
             <div>
              <label htmlFor="card" className="block text-sm font-medium text-gray-700">Credit Card</label>
              <input type="text" id="card" placeholder="XXXX-XXXX-XXXX-XXXX" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500" />
            </div>
          </div>
          <button
            type="submit"
            disabled={isProcessing}
            className="mt-8 w-full bg-secondary text-white font-bold py-3 px-4 rounded-md hover:bg-secondary-hover disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center transition-colors duration-300"
          >
            {isProcessing ? (
               <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : `Pay $${grandTotal.toFixed(2)}`}
          </button>
        </form>
      </div>
      <div className="lg:col-span-1 bg-gray-100 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
        <div className="space-y-4">
            {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-start">
                    <div className="flex items-start space-x-4">
                        <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
                        <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                    </div>
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            ))}
        </div>
        <div className="mt-8 pt-4 border-t border-gray-300 space-y-2">
            <div className="flex justify-between"><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>${shippingCost.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Taxes</span><span>${tax.toFixed(2)}</span></div>
            <div className="flex justify-between text-xl font-bold mt-4 pt-2 border-t border-gray-400">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
