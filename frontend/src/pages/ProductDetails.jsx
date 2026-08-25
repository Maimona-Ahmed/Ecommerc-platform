import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../components/api/axios";

import ProductGallery from "../components/ProductDetails/ProductGallery";
import ProductInfo from "../components/ProductDetails/ProductInfo";
import ProductTabs from "../components/ProductDetails/ProductTabs";

function ProductDetails() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(
          `/products/${slug}/`
        );

        setProduct(response.data);

        console.log("Product:", response.data);
      } catch (error) {
        console.error(
          "Failed to fetch product:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <section className="container-custom py-20">
        <div className="text-center">
          <p className="text-gray-500">
            Loading product...
          </p>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="container-custom py-20">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-3">
            Product Not Found
          </h1>

          <p className="text-gray-500">
            The product you are looking for
            does not exist.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="container-custom py-10">

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-10
        "
      >
        <ProductGallery
          product={product}
        />

        <ProductInfo
          product={product}
        />
      </div>

      <ProductTabs
        product={product}
      />

    </section>
  );
}

export default ProductDetails;
