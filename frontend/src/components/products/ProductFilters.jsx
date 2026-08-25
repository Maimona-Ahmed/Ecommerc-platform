function ProductFilters({
  categories,
  category,
  setCategory,
}) {

  return (

    <aside
      className="
        bg-white
        rounded-2xl
        shadow-md
        p-6
        h-fit
      "
    >

      <h2 className="text-xl font-bold mb-6">
        Filters
      </h2>


      <h3 className="font-semibold mb-4">
        Categories
      </h3>


      <div className="space-y-3">

        {/* All */}

        <label
          className="
            flex
            items-center
            gap-3
            cursor-pointer
          "
        >

          <input
            type="radio"
            name="category"
            checked={category === ""}
            onChange={() => setCategory("")}
          />

          <span>
            All
          </span>

        </label>


        {/* API Categories */}

        {categories.map((item) => (

          <label
            key={item.id}
            className="
              flex
              items-center
              gap-3
              cursor-pointer
            "
          >

            <input
              type="radio"
              name="category"
              checked={
                String(category) ===
                String(item.id)
              }
              onChange={() =>
                setCategory(item.id)
              }
            />

            <span>
              {item.name}
            </span>

          </label>

        ))}

      </div>

    </aside>

  );
}

export default ProductFilters;
