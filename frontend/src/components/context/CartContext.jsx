import {
  createContext,
  useEffect,
  useState,
} from "react";

import api from "../api/axios";


export const CartContext = createContext(null);


export function CartProvider({ children }) {

  const [cart, setCart] = useState(null);

  const [loading, setLoading] = useState(true);


  const fetchCart = async () => {

    try {

      setLoading(true);

      const response = await api.get("/cart/");

      console.log("Cart:", response.data);

      setCart(response.data);

    } catch (error) {

      console.error(
        "Error fetching cart:",
        error
      );

    } finally {

      setLoading(false);

    }
  };



  const addToCart = async (
    variantId,
    quantity
  ) => {

    try {

      const response = await api.post(
        "/cart/items/",
        {
          variant_id: variantId,
          quantity: quantity,
        }
      );

      console.log(
        "Added:",
        response.data
      );

      await fetchCart();
      

    } catch (error) {

      console.error(
        "Error adding to cart:",
        error
      );

      throw error;
    }
  };



  const updateQuantity = async (
    itemId,
    quantity
  ) => {

    try {

      const response = await api.patch(
        `/cart/items/${itemId}/`,
        {
          quantity: quantity,
        }
      );

      console.log(
        "Updated:",
        response.data
      );

      await fetchCart();

    } catch (error) {

      console.error(
        "Error updating quantity:",
        error
      );

      throw error;
    }
  };



  const removeFromCart = async (
    itemId
  ) => {

    try {

      await api.delete(
        `/cart/items/${itemId}/`
      );

      await fetchCart();

    } catch (error) {

      console.error(
        "Error deleting cart item:",
        error
      );

      throw error;
    }
  };
  useEffect(() => {

    fetchCart();

  }, []);


  return (

    <CartContext.Provider
      value={{
        cart,
        loading,

        fetchCart,
        addToCart,
        updateQuantity,
        removeFromCart,
      }}
    >

      {children}

    </CartContext.Provider>

  );
}

