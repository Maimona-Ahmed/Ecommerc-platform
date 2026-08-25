import ProductCard from "../ui/ProductCard";

function ProductGrid({
  products,
  loading,
}) {

  if (loading) {

    return (
      <div
        className="
          lg:col-span-3
          flex
          items-center
          justify-center
          py-20
        "
      >

        <p className="text-gray-500">
          Loading products...
        </p>

      </div>
    );

  }


  return (

    <div
      className="
        lg:col-span-3
        grid
        grid-cols-2
        md:grid-cols-3
        gap-6
      "
    >

      {products.length > 0 ? (

        products.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
          />

        ))

      ) : (

        <p
          className="
            col-span-full
            text-center
            text-gray-500
            py-10
          "
        >
          No products found
        </p>

      )}

    </div>

  );
}

export default ProductGrid;

