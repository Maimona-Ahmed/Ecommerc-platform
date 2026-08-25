import { useEffect, useState } from "react";

function ProductGallery({ product }) {
  const [selectedImage, setSelectedImage] =
    useState(null);

  useEffect(() => {
    if (product.images?.length > 0) {
      const primaryImage =
        product.images.find(
          (image) => image.is_primary
        );

      setSelectedImage(
        primaryImage || product.images[0]
      );
    }
  }, [product]);

  if (!product.images?.length) {
    return (
      <div
        className="
          w-full
          h-125
          bg-gray-100
          rounded-2xl
          flex
          items-center
          justify-center
        "
      >
        <p className="text-gray-500">
          No image available
        </p>
      </div>
    );
  }

  if (!selectedImage) {
    return null;
  }

  return (
    <div>

      {/* Main Image */}

      <img
        src={selectedImage.image}
        alt={product.name}
        className="
          w-full
          h-125
          object-cover
          rounded-2xl
          shadow
        "
      />

      {/* Thumbnails */}

      <div
        className="
          flex
          gap-4
          mt-5
          overflow-x-auto
        "
      >

        {product.images.map((image) => (

          <button
            key={image.id}
            type="button"
            onClick={() =>
              setSelectedImage(image)
            }
          >

            <img
              src={image.image}
              alt={product.name}
              className={`
                w-20
                h-20
                object-cover
                rounded-lg
                cursor-pointer
                border-2

                ${
                  selectedImage.id === image.id
                    ? "border-primary"
                    : "border-transparent"
                }
              `}
            />

          </button>

        ))}

      </div>

    </div>
  );
}

export default ProductGallery;






