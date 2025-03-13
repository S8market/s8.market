import React, { useEffect } from 'react';

export default function Properties() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">All Properties</h1>
        {/* Add your properties listing content here */}
      </div>
    </div>
  );
}
