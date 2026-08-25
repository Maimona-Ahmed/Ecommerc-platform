import { useContext } from "react";

import {
  FiPlus,
  FiMinus,
  FiTrash2,
} from "react-icons/fi";

import { CartContext } from "../context/CartContext";


function CartItem({ item }) {

  const {
    updateQuantity,
    removeFromCart,
  } = useContext(CartContext);


  const increaseQuantity = async () => {

    try {

      await updateQuantity(
        item.id,
        item.quantity + 1
      );

    } catch (error) {

      console.error(error);

    }

  };


  const decreaseQuantity = async () => {

    if (item.quantity <= 1) {
      return;
    }

    try {

      await updateQuantity(
        item.id,
        item.quantity - 1
      );

    } catch (error) {

      console.error(error);

    }

  };


  const handleRemove = async () => {

    try {

      await removeFromCart(item.id);

    } catch (error) {

      console.error(error);

    }

  };


  return (

    <div
      className="
        bg-white
        rounded-2xl
        border
        p-4
        flex
        flex-col
        sm:flex-row
        gap-4
      "
    >

      {/* =====================
          Image
      ====================== */}

      <img
        src={`http://127.0.0.1:8000${item.product_image}`}
        alt={item.variant?.product?.name}
        className="
          w-full
          sm:w-28
          h-28
          object-cover
          rounded-xl
        "
      />


      {/* =====================
          Information
      ====================== */}

      <div
        className="
          flex-1
          flex
          flex-col
          justify-between
        "
      >

        <div>

          {/* Product Name */}

          <h2
            className="
              text-lg
              font-semibold
            "
          >
            {item.product_name}
          </h2>


          {/* Price */}

          <p
            className="
              text-primary
              font-bold
              mt-1
            "
          >
            ${item.variant?.price}
          </p>


          {/* =====================
              Options
          ====================== */}

          <div
            className="
              flex
              flex-wrap
              gap-4
              text-sm
              text-gray-500
              mt-2
            "
          >

            {item.variant?.options?.map(
              (option) => (

                <span
                  key={option.id}
                >

                  {option.variation_name}:

                  {" "}

                  {option.option_value}

                </span>

              )
            )}

          </div>

        </div>


        {/* =====================
            Controls
        ====================== */}

        <div
          className="
            flex
            items-center
            justify-between
            mt-4
          "
        >

          {/* Quantity */}

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <button
              type="button"
              onClick={decreaseQuantity}
              disabled={item.quantity <= 1}
              className="
                w-9
                h-9
                border
                rounded-lg
                flex
                items-center
                justify-center
                hover:border-primary
                disabled:opacity-40
              "
            >

              <FiMinus />

            </button>


            <span
              className="
                min-w-5
                text-center
                font-semibold
              "
            >
              {item.quantity}
            </span>


            <button
              type="button"
              onClick={increaseQuantity}
              className="
                w-9
                h-9
                border
                rounded-lg
                flex
                items-center
                justify-center
                hover:border-primary
              "
            >

              <FiPlus />

            </button>

          </div>


          {/* Delete */}

          <button
            type="button"
            onClick={handleRemove}
            className="
              text-gray-400
              hover:text-red-500
              transition
            "
          >

            <FiTrash2 size={20} />

          </button>

        </div>

      </div>

    </div>

  );

}


export default CartItem;
