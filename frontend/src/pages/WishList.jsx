import { useContext } from "react";

import {
  FiHeart,
} from "react-icons/fi";

import {
  WishlistContext,
} from "../components/context/WishlistContext";

import WishlistItem from "../components/wishlist/WishListItem";


function Wishlist() {

  const {
    wishlist,
    loading,
  } = useContext(WishlistContext);


  // =====================================
  // ITEMS
  // =====================================

  const items = wishlist?.items || [];


  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (

      <section className="container-custom py-16">

        <div className="
          flex
          items-center
          justify-center
        ">

          <p>
            Loading wishlist...
          </p>

        </div>

      </section>

    );
  }


  // =====================================
  // EMPTY
  // =====================================

  if (items.length === 0) {

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

          <FiHeart
            size={60}
            className="text-gray-400"
          />


          <h1 className="
            text-2xl
            font-bold
            mt-5
          ">

            Your Wishlist is Empty

          </h1>


          <p className="
            text-gray-500
            mt-2
          ">

            Save your favorite products here.

          </p>

        </div>

      </section>

    );
  }


  // =====================================
  // WISHLIST
  // =====================================

  return (

    <section className="
      container-custom
      py-10
    ">


      {/* Header */}

      <div className="
        flex
        items-center
        gap-3
        mb-8
      ">

        <FiHeart
          size={28}
        />


        <h1 className="
          text-3xl
          font-bold
        ">

          My Wishlist

        </h1>

      </div>


      {/* Items */}

      <div className="
        grid
        grid-cols-2
        sm:grid-cols-3
        lg:grid-cols-4
        gap-4
        md:gap-6
      ">


        {items.map((item) => (

          <WishlistItem
            key={item.id}
            item={item}
          />

        ))}


      </div>


    </section>

  );
}


export default Wishlist;
