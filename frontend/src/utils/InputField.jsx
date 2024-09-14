// InputField.jsx
import React from 'react';

function InputField({ labelText, labelFor, id, name, type, autoComplete, isRequired, placeholder, onChange, props }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
        {labelText}
      </label>
      <input
        onChange={onChange}
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={isRequired}
        placeholder={placeholder}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        {...props}
      />
    </div>
  );
}

export default InputField;
