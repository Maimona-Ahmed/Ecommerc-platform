import {
  createContext,
  useEffect,
  useState,
} from "react";

import api from "../api/axios";


export const WishlistContext =
  createContext(null);


export function WishlistProvider({ children }) {

  const [wishlist, setWishlist] = useState({
    id: null,
    items: [],
  });


  const [loading, setLoading] =
    useState(false);


  // ==============================
  // GET WISHLIST
  // ==============================

  const fetchWishlist = async () => {

    try {

      setLoading(true);

      const response = await api.get(
        "/wishlist/"
      );

      setWishlist(response.data);

    } catch (error) {

      console.error(
        "Fetch wishlist:",
        error.response?.data || error
      );

    } finally {

      setLoading(false);

    }
  };


  // ==============================
  // ADD WISHLIST
  // ==============================

  const addToWishlist = async (
    productId
  ) => {

    try {

      const response = await api.post(
        "/wishlist/",
        {
          product_id: productId,
        }
      );

      setWishlist(response.data);

      return response.data;

    } catch (error) {

      console.error(
        "Add wishlist:",
        error.response?.data || error
      );

      throw error;
    }
  };


  // ==============================
  // REMOVE WISHLIST
  // ==============================

  const removeFromWishlist = async (
    productId
  ) => {

    try {

      await api.delete(
        "/wishlist/",
        {
          data: {
            product_id: productId,
          },
        }
      );

      await fetchWishlist();

    } catch (error) {

      console.error(
        "Remove wishlist:",
        error.response?.data || error
      );

      throw error;
    }
  };


  // ==============================
  // INITIAL FETCH
  // ==============================

  useEffect(() => {

    fetchWishlist();

  }, []);


  return (

    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        fetchWishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >

      {children}

    </WishlistContext.Provider>
  );
}
