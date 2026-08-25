
import { useEffect, useState } from "react";
import banner1 from "../../assets/banner1.png"
import banner2 from "../../assets/banner2.png"
import banner3 from "../../assets/banner3.png"


function Hero() {


  const slides = [
    {
      image: banner1,
      title: "New Collection",
      description: "Discover the latest fashion trends",
      button: "Shop Now",
    },
    {
      image: banner2,
      title: "Summer Sale",
      description: "Get your favorite styles with special offers",
      button: "Shop Now",
    },
    {
      image: banner3,
      title: "New Arrivals",
      description: "Explore our newest products",
      button: "Explore Now",
    },
  ];
  console.log(banner1);



  const [currentIndex, setCurrentIndex] = useState(0);



  const nextSlide = () => {

    setCurrentIndex((prev) =>
      prev === slides.length - 1
      ? 0
      : prev + 1
    );

  };



  const prevSlide = () => {

    setCurrentIndex((prev) =>
      prev === 0
      ? slides.length - 1
      : prev - 1
    );

  };




  useEffect(() => {

    const timer = setInterval(() => {

      nextSlide();

    },4000);


    return () => clearInterval(timer);

  },[]);





  return (

    <section className="w-full max-w-[1600px] mx-auto py-1 px-6">


      <div
        className="
        relative
        w-full
        h-145
        sm:h-157.5
        md:h-170

        overflow-hidden

        rounded-3xl
        border-4
        border-white

        shadow-2xl
        "
      >



        {/* Images */}

        {slides.map((slide,index)=>(

          <img

            key={index}

            src={slide.image}

            alt={slide.title}


            className={`
              absolute
              inset-0

              w-full
              h-full

              object-cover
              object-top

              transition-opacity
              duration-700


              ${
                currentIndex === index
                ? "opacity-100"
                : "opacity-0"
              }

            `}

          />

        ))}




        {/* Overlay */}

        <div
          className="
          absolute
          inset-0
          bg-black/30
          "
        />




        {/* Content */}

        <div
          className="
          absolute
          inset-0

          flex
          items-center
          justify-start

          text-left
          text-white
          px-15
          sm:px-25
          lg:px-35
          "
        >

          <div>


            <h1
              className="
              text-3xl
              sm:text-5xl
              font-bold
              mb-4
              "
            >
              {slides[currentIndex].title}
            </h1>


            <p className="mb-6">
              {slides[currentIndex].description}
            </p>


            <button className="btn-primary">
              {slides[currentIndex].button}
            </button>


          </div>

        </div>






        {/* Arrows */}

        <button
          onClick={prevSlide}
          className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2

          w-10
          h-10

          rounded-full
          bg-white/70

          shadow-lg
          "
        >
          ←
        </button>



        <button
          onClick={nextSlide}
          className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2

          w-10
          h-10

          rounded-full
          bg-white/70

          shadow-lg
          "
        >
          →
        </button>






        {/* Dots */}

        <div
          className="
          absolute
          bottom-5

          left-1/2
          -translate-x-1/2

          flex
          gap-3
          "
        >

          {slides.map((_,index)=>(

            <button

              key={index}

              onClick={()=>setCurrentIndex(index)}

              className={`
              w-3
              h-3
              rounded-full

              ${
                currentIndex===index
                ? "bg-white scale-125"
                : "bg-white/50"
              }

              transition
              `}
            />

          ))}


        </div>


      </div>


    </section>

  );

}


export default Hero;
