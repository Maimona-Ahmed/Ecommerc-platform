import promo from "../../assets/promo.png"
function PromoBanner() {

  return (

    <section className="container-custom py-12">

      <div
        className="
          relative
          h-62.5
          sm:h-87.5

          rounded-3xl
          overflow-hidden

          bg-primary

          flex
          items-center
          justify-center

          text-center
          text-white
        "
      >


        {/* Background Image */}

        <img
          src={promo}
          alt="Promo"

          className="
            absolute
            inset-0

            w-full
            h-full

            object-cover

            opacity-70
          "
        />



        {/* Overlay */}

        <div
          className="
            absolute
            inset-0

            bg-black/40
          "
        />



        {/* Content */}

        <div
          className="
            relative
            z-10

            px-4
          "
        >

          <h2
            className="
              text-3xl
              sm:text-5xl

              font-bold

              mb-4
            "
          >
            Summer Sale
          </h2>


          <p
            className="
              text-base
              sm:text-xl

              mb-6
            "
          >
            Get up to 50% off on selected products
          </p>



          <button className="btn-primary">
            Shop Now
          </button>


        </div>


      </div>

    </section>

  );

}


export default PromoBanner;
