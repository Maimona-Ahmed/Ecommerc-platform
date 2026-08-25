import ProductCard from "../ui/ProductCard";
import { useState,useEffect } from "react";
import api from "../api/axios";

import product1 from "../../assets/banner1.png";
import product2 from "../../assets/banner2.png";
import product3 from "../../assets/banner3.png";
import product4 from "../../assets/banner1.png";
import { WishlistContext } from "../context/WishlistContext";


function FeaturedProducts() {


const [products,setProducts]=useState([]);



    const [loading,setLoading]=useState(true);
    useEffect(()=>{
      const fetchProducts= async ()=>{
        try {
          const response = await api.get("/products/");
          setProducts(response.data.results||[]);
          console.log(response);
          console.log(response.data)

        } catch(error){
          console.error(error);
        }
      };
      fetchProducts();
      },[]);




  return (

    <section className="container-custom py-12">


      <h2
        className="
          text-2xl
          sm:text-3xl
          font-bold
          mb-8
        "
      >
        Featured Products
      </h2>



      <div
        className="
          flex
          gap-5

          overflow-x-auto
          pb-4

          md:grid
          md:grid-cols-4

          scrollbar-hide
        "
      >

        {
          products.slice(0,4).map((product)=>(
            
            <ProductCard
              key={product.id}
              product={product}
            />

          ))
        }

      </div>


    </section>

  );

}


export default FeaturedProducts;
