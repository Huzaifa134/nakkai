
import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { Context } from "./Context";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { useSelectedCountry } from "../Context/selectCountry";
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { user } = useContext(Context);
  const [cartdetails, setCartDetails] = useState({
    quantity: 1,
    size: "Medium",
  });

  const { _id } = useParams();
  const [product, setProduct] = useState({}); // Change to object instead of null
  const { selectedCountry , setSelectedCountry } = useSelectedCountry();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!_id) {
          console.log("Error: _id is undefined or null.");
          return;
        }

        const res = await axios.get(`https://nakkai.vercel.app/api/${selectedCountry==="us"?'usproduct':'product'}/${_id}`);
        setProduct(res.data.data); // Set product initially
      } catch (error) {
        console.log("Fetch product error:", error);
      }
    };
    fetchProduct();
  }, [_id,selectedCountry]);
console.log("this is id from cartproivider",_id)
  // add item to cart
  const addItemToCart = async (e) => {
    try {
      if (!product) {
        toast.error("Product information not available.");
        return;
      }

      const updatedQuantity = product.quantity - cartdetails.quantity;

      if (updatedQuantity < 0) {
        toast.error("Insufficient quantity available.");
        return;
      }

      // Update product quantity in the state
      setProduct({ ...product, quantity: updatedQuantity });

      // Update quantity in the database
      const upres = await axios.put(`https://nakkai.vercel.app/api/${selectedCountry==="us"?'usallproducts':'allproducts'}/${_id}`, {
        product,
      });

      if (upres.status === 200) {
        // Add item to cart if quantity update is successful
        const res = await axios.post("https://nakkai.vercel.app/api/cart", {
          userId: user?.data?._id,
          items: [
            {
              productId: e._id,
              image: e.mainImage,
              price: e.price,
              name: e.name,
              quantity: cartdetails.quantity,
              size: cartdetails.size,
            },
          ],
        });

        toast.success("Product added to cart successfully");
        setCartDetails({
          quantity: 1,
          size: "Medium",
        });
      } else {
        toast.error("Failed to update product quantity.");
      }
    } catch (error) {
      console.log("Add to cart error:", error);
      toast.error("An error occurred while adding to cart");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartdetails,
        setCartDetails,
        addItemToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;