
import {
  useEffect,
  useState,
} from "react";

import api from "../components/api/axios";
import { useSearchParams } from "react-router-dom";

import ProductSearch
  from "../components/products/ProductSearch";

import ProductSort
  from "../components/products/ProductSort";

import ProductFilters
  from "../components/products/ProductFilters";

import ProductGrid
  from "../components/products/ProductGrid";


function Products() {

  // ==========================================
  // Products
  // ==========================================

  const [products, setProducts] =
    useState([]);
  const [searchParams]=useSearchParams();
  const searchFromUrl = searchParams.get("search")||"";

  useEffect(()=>{
    const urlSearch = searchParams.get("search")||"";
    setSearch(urlSearch)
  },[searchParams]);


  // ==========================================
  // Categories
  // ==========================================

  const [categories, setCategories] =
    useState([]);


  // ==========================================
  // Loading
  // ==========================================

  const [loading, setLoading] =
    useState(true);


  // ==========================================
  // Categories Loading
  // ==========================================

  const [categoriesLoading, setCategoriesLoading] =
    useState(true);


  // ==========================================
  // Search
  // ==========================================

  const [search, setSearch] =
    useState("");


  // ==========================================
  // Category
  // ==========================================

  const [category, setCategory] =
    useState("");


  // ==========================================
  // Sort
  // ==========================================

  const [sort, setSort] =
    useState("latest");


  // ==========================================
  // Mobile Filters
  // ==========================================

  const [showFilters, setShowFilters] =
    useState(false);


  // ==========================================
  // Fetch Categories
  // ==========================================

  useEffect(() => {

    const fetchCategories = async () => {

      try {

        setCategoriesLoading(true);

        const response =
          await api.get("/categories/");


        console.log(
          "Categories:",
          response.data
        );


        /*
          لو DRF pagination:

          {
            results: [...]
          }

          ولو بدون pagination:

          [...]
        */

        const data =
          response.data.results ||
          response.data ||
          [];


        setCategories(data);

      } catch (error) {

        console.error(
          "Error fetching categories:",
          error
        );

        setCategories([]);

      } finally {

        setCategoriesLoading(false);

      }

    };


    fetchCategories();

  }, []);


  // ==========================================
  // Fetch Products
  // ==========================================

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        setLoading(true);


        const params = {search:searchFromUrl};


        // Search

        if (search.trim()) {

          params.search =
            search.trim();

        }


        // Category

        if (category) {

          params.category =
            category;

        }


        // Ordering

        if (sort === "latest") {

          params.ordering =
            "-created_at";

        }

        else if (
          sort === "low-price"
        ) {

          params.ordering =
            "price";

        }

        else if (
          sort === "high-price"
        ) {

          params.ordering =
            "-price";

        }

        else if (
          sort === "a-z"
        ) {

          params.ordering =
            "name";

        }

        else if (
          sort === "z-a"
        ) {

          params.ordering =
            "-name";

        }


        console.log(
          "Products params:",
          params
        );


        const response =
          await api.get(
            "/products/",
            {
              params: params,
            }
          );


        console.log(
          "Products:",
          response.data
        );


        const data =
          response.data.results ||
          response.data ||
          [];


        setProducts(data);

      } catch (error) {

        console.error(
          "Error fetching products:",
          error
        );

        setProducts([]);

      } finally {

        setLoading(false);

      }

    };


    fetchProducts();

  }, [
    search,
    category,
    sort,
  ]);


  // ==========================================
  // JSX
  // ==========================================

  return (

    <section
      className="
        container-custom
        py-10
      "
    >


      {/* ====================================
          Header
      ==================================== */}

      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-5
          mb-8
        "
      >

        <h1
          className="
            text-3xl
            font-bold
          "
        >
          All Products
        </h1>


        <div
          className="
            flex
            flex-col
            sm:flex-row
            gap-4
          "
        >

          {/* Search */}

          <ProductSearch
            search={search}
            setSearch={setSearch}
          />


          {/* Sort */}

          <ProductSort
            sort={sort}
            setSort={setSort}
          />

        </div>

      </div>


      {/* ====================================
          Mobile Filter Button
      ==================================== */}

      <button
        onClick={() =>
          setShowFilters(
            !showFilters
          )
        }

        className="
          lg:hidden
          bg-primary
          text-white
          px-5
          py-3
          rounded-xl
          mb-5
        "
      >

        Filters

      </button>


      {/* ====================================
          Main
      ==================================== */}

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-4
          gap-8
        "
      >


        {/* ==================================
            Filters
        ================================== */}

        <div
          className={`
            ${
              showFilters
                ? "block"
                : "hidden"
            }

            lg:block
          `}
        >

          {
            categoriesLoading ? (

              <div
                className="
                  bg-white
                  rounded-2xl
                  shadow-md
                  p-6
                "
              >

                <p className="text-gray-500">
                  Loading categories...
                </p>

              </div>

            ) : (

              <ProductFilters
                categories={
                  categories
                }

                category={
                  category
                }

                setCategory={
                  setCategory
                }
              />

            )
          }

        </div>


        {/* ==================================
            Products
        ================================== */}

        <ProductGrid
          products={products}
          loading={loading}
        />

      </div>

    </section>

  );

}

export default Products;
