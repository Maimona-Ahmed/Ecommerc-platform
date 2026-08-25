import { useContext } from "react";
import { Link } from "react-router-dom";

import { CartContext } from "../context/CartContext";


function CartSummary() {

  const { cart } = useContext(CartContext);


  // =========================
  // Cart Items
  // =========================

  const items = cart?.items || [];


  // =========================
  // Subtotal
  // =========================

  const subtotal = items.reduce(
    (total, item) => {
      return total + Number(item.subtotal || 0);
    },
    0
  );


  // =========================
  // Shipping
  // =========================

  const shipping =
    subtotal >= 100
      ? 0
      : 10;


  // =========================
  // Total
  // =========================

  const total =
    subtotal + shipping;


  return (

    <div
      className="
        bg-white
        rounded-2xl
        border
        p-6
        h-fit
        lg:sticky
        lg:top-24
      "
    >

      <h2
        className="
          text-xl
          font-bold
          mb-6
        "
      >
        Order Summary
      </h2>


      {/* =========================
          Subtotal
      ========================== */}

      <div
        className="
          flex
          justify-between
          text-gray-600
          mb-4
        "
      >

        <span>
          Subtotal
        </span>

        <span
          className="
            font-medium
          "
        >
          ${subtotal.toFixed(2)}
        </span>

      </div>


      {/* =========================
          Shipping
      ========================== */}

      <div
        className="
          flex
          justify-between
          text-gray-600
          mb-4
        "
      >

        <span>
          Shipping
        </span>

        <span
          className="
            font-medium
          "
        >

          {shipping === 0
            ? "Free"
            : `$${shipping.toFixed(2)}`
          }

        </span>

      </div>


      <div
        className="
          border-t
          my-5
        "
      />


      {/* =========================
          Total
      ========================== */}

      <div
        className="
          flex
          justify-between
          text-lg
          font-bold
        "
      >

        <span>
          Total
        </span>

        <span
          className="
            text-primary
          "
        >
          ${total.toFixed(2)}
        </span>

      </div>


      {/* =========================
          Checkout
      ========================== */}

      <Link
        to="/checkout"
        className="
          btn-primary
          w-full
          mt-6
          flex
          items-center
          justify-center
        "
      >
        Proceed To Checkout
      </Link>


      {/* =========================
          Continue Shopping
      ========================== */}

      <Link
        to="/products"
        className="
          w-full
          mt-3
          py-3
          border
          rounded-lg
          text-gray-600
          hover:border-primary
          hover:text-primary
          transition
          flex
          items-center
          justify-center
        "
      >
        Continue Shopping
      </Link>

    </div>

  );
}


export default CartSummary;
