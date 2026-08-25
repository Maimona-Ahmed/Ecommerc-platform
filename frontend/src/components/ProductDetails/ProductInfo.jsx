import {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  FiHeart,
  FiShoppingCart,
  FiPlus,
  FiMinus,
} from "react-icons/fi";

import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";


function ProductInfo({ product }) {

  // ==========================================
  // Cart Context
  // ==========================================

  const {
    addToCart,
  } = useContext(CartContext);


  // ==========================================
  // Wishlist Context
  // ==========================================

  const {
    wishlist,
    addToWishlist,
    removeFromWishlist,
  } = useContext(WishlistContext);


  // ==========================================
  // Selected Options
  // ==========================================

  const [selectedOptions, setSelectedOptions] =
    useState({});


  // ==========================================
  // Selected Variant
  // ==========================================

  const [selectedVariant, setSelectedVariant] =
    useState(null);


  // ==========================================
  // Quantity
  // ==========================================

  const [quantity, setQuantity] =
    useState(1);


  // ==========================================
  // Wishlist Items
  // ==========================================

  const wishlistItems =
    wishlist?.items || [];


  // ==========================================
  // Check Wishlist
  // ==========================================

  const isInWishlist =
    wishlistItems.some(
      (item) =>
        Number(item.product?.id) ===
        Number(product.id)
    );


  // ==========================================
  // Select Option
  // ==========================================

  const handleOptionSelect = (
    variationName,
    optionValue
  ) => {

    setSelectedOptions((prev) => ({
      ...prev,
      [variationName]: optionValue,
    }));

    setQuantity(1);
  };


  // ==========================================
  // Find Matching Variant
  // ==========================================

  useEffect(() => {

    const variants =
      product.variants || [];

    if (
      Object.keys(selectedOptions).length === 0
    ) {

      setSelectedVariant(null);

      return;
    }


    const variant = variants.find(
      (variant) => {

        const options =
          variant.options || [];


        return options.every(
          (option) => {

            return (
              selectedOptions[
                option.variation_name
              ] === option.option_value
            );

          }
        );

      }
    );


    setSelectedVariant(
      variant || null
    );


    if (variant) {
      setQuantity(1);
    }

  }, [
    selectedOptions,
    product.variants,
  ]);


  // ==========================================
  // Increase Quantity
  // ==========================================

  const handleIncrease = () => {

    if (!selectedVariant) {
      return;
    }


    const stock =
      Number(selectedVariant.stock) || 0;


    if (quantity < stock) {

      setQuantity(
        (prev) => prev + 1
      );

    }

  };


  // ==========================================
  // Decrease Quantity
  // ==========================================

  const handleDecrease = () => {

    setQuantity(
      (prev) =>
        prev > 1
          ? prev - 1
          : 1
    );

  };


  // ==========================================
  // Add To Cart
  // ==========================================

  const handleAddToCart = async () => {

    if (!selectedVariant) {

      alert(
        "Please select all options."
      );

      return;
    }


    if (
      Number(selectedVariant.stock) <= 0
    ) {

      alert(
        "This product is out of stock."
      );

      return;
    }


    try {

      // مهم:
      // لا نستخدم api.post هنا
      // نستخدم Context

      await addToCart(
        selectedVariant.id,
        quantity
      );

      console.log(
        "Added to cart"
      );

    } catch (error) {

      console.error(
        "Add to cart error:",
        error.response?.data ||
        error
      );

    }

  };


  // ==========================================
  // Wishlist Toggle
  // ==========================================

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


  // ==========================================
  // JSX
  // ==========================================

  return (

    <div>

      {/* Product Name */}

      <h1 className="text-3xl font-bold">
        {product.name}
      </h1>


      {/* Price */}

      <p
        className="
          text-2xl
          font-bold
          text-primary
          mt-5
        "
      >

        $

        {
          selectedVariant
            ? selectedVariant.price
            : product.price
        }

      </p>


      {/* Description */}

      <p
        className="
          text-gray-600
          mt-5
          leading-7
        "
      >

        {product.description}

      </p>


      {/* Variations */}

      {product.variations?.map(
        (variation) => (

          <div
            key={variation.id}
            className="mt-6"
          >

            <h3
              className="
                font-semibold
                mb-3
              "
            >

              {variation.name}

            </h3>


            <div
              className="
                flex
                gap-3
                flex-wrap
              "
            >

              {variation.options?.map(
                (option) => {

                  const selected =
                    selectedOptions[
                      variation.name
                    ] === option.value;


                  return (

                    <button
                      key={option.id}
                      type="button"

                      onClick={() =>
                        handleOptionSelect(
                          variation.name,
                          option.value
                        )
                      }

                      className={`
                        px-4
                        py-2
                        rounded-lg
                        border

                        ${
                          selected
                            ? "border-primary bg-primary text-white"
                            : "border-gray-300"
                        }
                      `}
                    >

                      {option.value}

                    </button>

                  );

                }
              )}

            </div>

          </div>

        )
      )}


      {/* Selected Variant */}

      {selectedVariant && (

        <div className="mt-5">

          <p className="text-sm">

            SKU:

            <span
              className="
                font-semibold
                ml-2
              "
            >

              {selectedVariant.sku}

            </span>

          </p>


          <p
            className="
              text-sm
              mt-2
            "
          >

            Availability:

            <span
              className="
                font-semibold
                ml-2
              "
            >

              {selectedVariant.availability}

            </span>

          </p>


          <p
            className="
              text-sm
              mt-2
            "
          >

            Stock:

            <span
              className="
                font-semibold
                ml-2
              "
            >

              {selectedVariant.stock}

            </span>

          </p>

        </div>

      )}


      {/* Quantity */}

      <div className="mt-6">

        <h3
          className="
            font-semibold
            mb-3
          "
        >

          Quantity

        </h3>


        <div
          className="
            flex
            items-center
            gap-4
          "
        >

          <button
            type="button"
            onClick={handleDecrease}
            disabled={quantity <= 1}

            className="
              w-10
              h-10
              border
              rounded-lg
              flex
              items-center
              justify-center
              disabled:opacity-50
            "
          >

            <FiMinus />

          </button>


          <span className="font-semibold">
            {quantity}
          </span>


          <button
            type="button"
            onClick={handleIncrease}

            disabled={
              !selectedVariant ||
              quantity >=
                Number(
                  selectedVariant?.stock || 0
                )
            }

            className="
              w-10
              h-10
              border
              rounded-lg
              flex
              items-center
              justify-center
              disabled:opacity-50
            "
          >

            <FiPlus />

          </button>

        </div>

      </div>


      {/* Actions */}

      <div
        className="
          flex
          gap-4
          mt-8
        "
      >

        {/* Add To Cart */}

        <button
          type="button"
          onClick={handleAddToCart}

          disabled={
            !selectedVariant ||
            Number(
              selectedVariant?.stock || 0
            ) <= 0
          }

          className="
            btn-primary
            flex-1
            flex
            items-center
            justify-center
            gap-2
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >

          <FiShoppingCart />

          Add To Cart

        </button>


        {/* Wishlist */}

        <button
          type="button"
          onClick={handleWishlist}

          className={`
            w-14
            h-12
            border
            rounded-xl
            flex
            items-center
            justify-center
            transition

            ${
              isInWishlist
                ? "border-red-500"
                : "border-gray-300"
            }
          `}
        >

          <FiHeart
            size={24}
            className={
              isInWishlist
                ? "text-red-500 fill-red-500"
                : "text-gray-500"
            }
          />

        </button>

      </div>

    </div>

  );

}


export default ProductInfo;
