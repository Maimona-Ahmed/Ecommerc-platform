
import {
  useContext,
  useState,
} from "react";

import {
  FiShoppingCart,
  FiX,
} from "react-icons/fi";

import {
  Link,
} from "react-router-dom";

import {
  WishlistContext,
} from "../context/WishlistContext";

import api from "../api/axios";


function WishlistItem({ item }) {

  const {
    removeFromWishlist,
  } = useContext(WishlistContext);


  const [addingToCart, setAddingToCart] =
    useState(false);


  // =====================================
  // PRODUCT
  // =====================================

  const product = item.product;


  // =====================================
  // IMAGE
  // =====================================

  const primaryImage =
    product?.images?.find(
      (image) =>
        image.is_primary === true
    );


  const image =
    primaryImage?.image ||
    product?.images?.[0]?.image ||
    null;


  // =====================================
  // REMOVE FROM WISHLIST
  // =====================================

  const handleRemove = async () => {

    try {

      await removeFromWishlist(
        product.id
      );

    } catch (error) {

      console.error(
        "Remove wishlist error:",
        error
      );

    }
  };


  // =====================================
  // ADD TO CART
  // =====================================

  const handleAddToCart = async () => {

    try {

      setAddingToCart(true);


      /*
       * Cart يحتاج variant_id
       *
       * Product عنده variants
       */

      const variant =
        product?.variants?.[0];


      if (!variant) {

        alert(
          "This product has no available variant."
        );

        return;
      }


      // POST Cart

      await api.post(
        "/cart/items/",
        {
          variant_id: variant.id,
          quantity: 1,
        }
      );


      alert(
        "Product added to cart!"
      );


    } catch (error) {

      console.error(
        "Add to cart error:",
        error.response?.data || error
      );


      alert(
        error.response?.data?.error ||
        "Failed to add product to cart."
      );


    } finally {

      setAddingToCart(false);

    }
  };


  return (

    <div className="
      bg-white
      rounded-2xl
      border
      overflow-hidden
      group
    ">


      {/* =================================
          IMAGE
      ================================= */}

      <div className="
        relative
        overflow-hidden
      ">


        <Link
          to={`/products/${product.id}`}
        >

          <img
            src={
              image
                ? `http://127.0.0.1:8000${image}`
                : "/placeholder.jpg"
            }

            alt={product.name}

            className="
              w-full
              h-64
              object-cover

              group-hover:scale-105

              transition
              duration-300
            "
          />

        </Link>


        {/* =================================
            REMOVE
        ================================= */}

        <button
          onClick={handleRemove}

          className="
            absolute
            top-3
            right-3

            w-9
            h-9

            rounded-full
            bg-white

            flex
            items-center
            justify-center

            shadow

            hover:text-red-500

            transition
          "

          aria-label="
            Remove from wishlist
          "
        >

          <FiX
            size={18}
          />

        </button>


      </div>


      {/* =================================
          INFORMATION
      ================================= */}

      <div className="p-4">


        <Link
          to={`/products/${product.id}`}
        >


          <h2 className="
            font-semibold
            truncate
          ">

            {product.name}

          </h2>


          <p className="
            text-primary
            font-bold
            mt-2
          ">

            ${product.price}

          </p>


        </Link>


        {/* =================================
            ADD TO CART
        ================================= */}

        <button
          onClick={handleAddToCart}

          disabled={addingToCart}

          className="
            w-full
            mt-4

            btn-primary

            flex
            items-center
            justify-center
            gap-2

            disabled:opacity-50
          "
        >

          <FiShoppingCart />

          {addingToCart
            ? "Adding..."
            : "Add To Cart"
          }

        </button>


      </div>


    </div>

  );
}


export default WishlistItem;
