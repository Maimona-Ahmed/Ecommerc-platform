import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
function ProductCard({ product }) {
  const primaryImage = product.images?.find((image)=>image.is_primary) || product.images?.[0];
    const {
      wishlist,
      addToWishlist,
      removeFromWishlist,
    } = useContext(WishlistContext)

  const {
    addToCart,
  } = useContext(CartContext);


  const handleAddToCart = async () => {

    const variants = product.variants || [];

    // لا يوجد Variant
    if (variants.length === 0) {
      alert("This product has no available variant.");
      return;
    }


    // نبحث عن أول Variant متوفر
    const availableVariant = variants.find(
      (variant) =>
        Number(variant.stock) > 0
    );


    if (!availableVariant) {
      alert("This product is out of stock.");
      return;
    }


    try {

      await addToCart(
        availableVariant.id,
        1
      );

      console.log(
        "Added to cart:",
        availableVariant.id
      );

    } catch (error) {

      console.error(
        "Add to cart error:",
        error.response?.data || error
      );

    }

  };

  
    const wishlistItems =
    wishlist?.items || [];

    const isInWishlist =
    wishlistItems.some(
      (item) =>
        Number(item.product?.id) ===
        Number(product.id)
    );
    
  const handleWishlist = async () => {

    try {

      if (isInWishlist) {

        await removeFromWishlist(
          product.id
        );

        console.log(
          "Removed from wishlist"
        );

      } else {

        await addToWishlist(
          product.id
        );

        console.log(
          "Added to wishlist"
        );

      }

    } catch (error) {

      console.error(
        "Wishlist error:",
        error.response?.data ||
        error
      );

    }

  };
  return (
    

    <div
      className="
      min-w-50
      sm:min-w-60

      bg-white
      rounded-2xl

      shadow-md

      overflow-hidden

      transition
      hover:-translate-y-1
      hover:shadow-xl
      "
    >


      {/* Product Image */}

      <div
        className="
        relative
        h-48
        sm:h-60
        overflow-hidden
        "
      >
        
        <Link to={`/products/${product.slug}`}>

        <img
          src={primaryImage?.image}
          alt={product.name}

          className="
          w-full
          h-full

          object-cover

          transition
          duration-500

          hover:scale-110
          "
        />
        </Link>


        <button
          onClick={handleWishlist}
          className="
          absolute
          top-3
          right-3

          bg-white

          w-8
          h-8

          rounded-full

          flex
          items-center
          justify-center

          shadow
          "
        >
          {isInWishlist?(
            <FiHeart className="text-red-500"/>):
            (

            <FiHeart className="text-gray-700"/>

          )}

          

        </button>


      </div>




      {/* Product Info */}

      <div className="p-3 sm:p-4">
        <Link to={`/products/${product.id}`}>
        

        <h3
          className="
          text-sm
          sm:text-base

          font-semibold

          truncate
          "
        >
          {product.name}
        </h3>



        <p
          className="
          text-primary
          font-bold

          mt-2

          text-sm
          sm:text-lg
          "
        >
          ${product.price}
        </p>

        </Link>




        <button
          onClick={handleAddToCart}
          className="
          mt-3

          w-full

          flex
          items-center
          justify-center
          gap-2

          bg-primary

          text-white

          py-2

          rounded-lg

          text-xs
          sm:text-sm
          "
        >

          <FiShoppingCart />

          Add To Cart

        </button>


      </div>


    </div>

  );

}


export default ProductCard;
