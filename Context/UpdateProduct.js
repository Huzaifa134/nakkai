// ProductContext.js

import { createContext, useState } from 'react';

export const ProductCreateContext = createContext();

const ProductProvider = ({ children }) => {
  const [quantity, setQuantity] = useState(0);

  const updateQuantity = async (productId, newQuantity) => {
    try {
      // Make an API call to update the quantity in the database
      // Example:
      await axios.put(`http://localhost:3000/api/product/${productId}`, { quantity: newQuantity });
      setQuantity(newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  return (
    <ProductCreateContext.Provider value={{ quantity, setQuantity, updateQuantity }}>
      {children}
    </ProductCreateContext.Provider>
  );
};

export default ProductProvider;
