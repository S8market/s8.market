import React from 'react';
import Loader from './Loader'; // Adjust the import path

const LoadingWrapper = ({ isLoading, children, className }) => {
  return (
    <div className={`relative ${className || ''}`}>
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
          <Loader />
        </div>
      )}
      {children}
    </div>
  );
};

export default LoadingWrapper;