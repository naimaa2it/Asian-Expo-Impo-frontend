'use client';

import { CheckCircle, Mail, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

const OrderSuccessPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto animate-bounce" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Order Placed Successfully!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for your order. We've sent a detailed invoice to your email address.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center gap-2 text-blue-700 mb-2">
            <Mail className="w-5 h-5" />
            <span className="font-semibold">Check Your Email</span>
          </div>
          <p className="text-sm text-gray-600">
            Your order confirmation and invoice have been sent to your email. Please check your inbox (and spam folder).
          </p>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={() => router.push('/')}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-md font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </button>
          
          <button
            onClick={() => router.push('/products')}
            className="w-full bg-white border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-md font-semibold hover:bg-blue-50 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
        
        <p className="text-xs text-gray-500 mt-6">
          Order ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
        </p>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
