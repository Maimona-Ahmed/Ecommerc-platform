import { useContext } from "react";
import { Link } from "react-router-dom";

import {
  FiShoppingCart
} from "react-icons/fi";

import { CartContext } from "../components/context/CartContext";

import CartItem from "../components/Cart/CartItem";
import CartSummary from "../components/Cart/CartSummary";


function Cart() {

  const { cart } = useContext(CartContext);


  // Empty Cart

  if (!cart || !cart.items||cart.items.length===0) {

    return (

      <section className="
        container-custom
        py-16
      ">

        <div className="
          flex
          flex-col
          items-center
          justify-center
          text-center
        ">


          <FiShoppingCart
            size={60}
            className="text-gray-400"
          />


          <h1 className="
            text-2xl
            font-bold
            mt-5
          ">
            Your Cart is Empty
          </h1>


          <p className="
            text-gray-500
            mt-2
          ">
            You haven't added any products yet.
          </p>


          <Link
            to="/products"
            className="btn-primary mt-6"
          >
            Continue Shopping
          </Link>


        </div>

      </section>

    );
  }



  return (

    <section className="
      container-custom
      py-10
    ">


      <h1 className="
        text-3xl
        font-bold
        mb-8
      ">
        Shopping Cart
      </h1>



      <div className="
        grid
        grid-cols-1
        lg:grid-cols-3
        gap-8
      ">


        {/* Cart Items */}

        <div className="
          lg:col-span-2
          space-y-4
        ">

          {
            cart.items.map((item) => (

              <CartItem
                key={item.id}
                item={item}
              />

            ))
          }

        </div>



        {/* Summary */}

        <CartSummary />


      </div>


    </section>

  );
}


export default Cart;
