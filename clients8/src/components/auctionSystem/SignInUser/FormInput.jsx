import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../../../context/context';

export const FormInput = ({ label, placeholder, isTextArea, isBankOfficer, error }) => {
  const inputId = `${label.toLowerCase().replace(/\s+/g, '-')}`;
  const { bankOfficerFormValues, setBankOfficerFormValues, userFormValues, setUserFormValues } = useContext(AppContext);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isBankOfficer) {
      setBankOfficerFormValues({
        ...bankOfficerFormValues,
        [name]: value,
      });
    } else {
      setUserFormValues({
        ...userFormValues,
        [name]: value,
      });
    }
  };

  // Determine the current value from state based on user type
  const currentValue = isBankOfficer 
    ? (bankOfficerFormValues[inputId] || '')
    : (userFormValues[inputId] || '');

  return (
    <div className="flex flex-col mt-4 max-w-full rounded-3xl w-[500px]">
      <label htmlFor={inputId} className="self-start font-medium text-gray-500">
        {label} <span className="text-red-500">*</span>
      </label>
      {isTextArea ? (
        <textarea
          id={inputId}
          name={inputId}
          placeholder={placeholder}
          onChange={handleChange}
          value={currentValue}
          required
          className={`px-6 pt-2 pb-24 rounded-3xl bg-gray-400 bg-opacity-40 text-black text-opacity-50 max-md:px-5 max-md:pb-28 max-md:max-w-full ${
            error ? 'border-2 border-red-500' : ''
          }`}
        />
      ) : (
        <input
          type={label.toLowerCase() === 'password' || label.toLowerCase() === 'confirm password' ? 'password' : 'text'}
          id={inputId}
          name={inputId}
          placeholder={placeholder}
          onChange={handleChange}
          value={currentValue}
          required
          className={`h-9 px-6 mt-2 rounded-3xl bg-gray-400 bg-opacity-40 text-black text-opacity-50 max-md:px-2 max-md:max-w-full ${
            error ? 'border-2 border-red-500' : ''
          }`}
        />
      )}
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};
