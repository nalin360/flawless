import React from 'react';

const validInputTypes = ['text', 'email', 'password'];

function Inputs({ label, type = 'text', value, onChange, placeholder, ...props }) {
  // Validate type prop
  if (!validInputTypes.includes(type)) {
    console.error(`Invalid input type provided: ${type}. Using default type "text".`);
    type = 'text';
  }

  return (
    <div>
      <label htmlFor={label} className="block text-gray-700">{label}</label>
      <input
        id={label} // Add id prop for accessibility
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full mt-1 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        {...props}
      />
    </div>
  );
}

export default Inputs;
