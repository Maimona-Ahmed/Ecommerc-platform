import { useContext, useState } from "react";

import {
  FiShoppingCart,
  FiHeart,
  FiUser,
  FiSearch,
  FiMenu,
  FiLogOut,
  FiX,
} from "react-icons/fi";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { AuthContext } from "../context/AuthContext";

import LoginModal from "../Auth/LoginModal";
import RegisterModal from "../Auth/RegisterModal";


function Navbar() {

  // =========================
  // Auth
  // =========================

  const {
    user,
    isLoggedIn,
    logout,
  } = useContext(AuthContext);


  // =========================
  // Cart
  // =========================

  const { cart } =
    useContext(CartContext);


  // =========================
  // Wishlist
  // =========================

  const { wishlist } =
    useContext(WishlistContext);


  // =========================
  // Navigate
  // =========================

  const navigate = useNavigate();


  // =========================
  // States
  // =========================

  const [loginOpen, setLoginOpen] =
    useState(false);

  const [registerOpen, setRegisterOpen] =
    useState(false);

  const [menuOpen, setMenuOpen] =
    useState(false);

  // Search state
  const [search, setSearch] =
    useState("");


  // =========================
  // Counts
  // =========================

  const cartCount =
    cart?.items?.reduce(
      (total, item) =>
        total + Number(item.quantity || 0),
      0
    ) || 0;


  const wishlistCount =
    wishlist?.items?.length || 0;


  // =========================
  // Search
  // =========================

  const handleSearch = (e) => {

    e.preventDefault();

    const value = search.trim();

    if (!value) {
      navigate("/products");
      return;
    }

    navigate(
      `/products?search=${encodeURIComponent(value)}`
    );

  };


  // =========================
  // Logout
  // =========================

  const handleLogout = () => {

    logout();

    setLoginOpen(false);

  };


  return (

    <>

      {/* =========================
          Navbar
      ========================= */}

      <nav
        className="
          w-full
          bg-white
          sticky
          top-0
          z-50
          shadow-sm
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            h-20
            flex
            items-center
            justify-between
          "
        >

          {/* =========================
              Left Side
          ========================= */}

          <div
            className="
              flex
              items-center
              gap-8
            "
          >

            {/* Logo */}

            <Link
              to="/"
              className="
                text-2xl
                font-bold
                text-primary
              "
            >
              Fashion
            </Link>


            {/* Desktop Links */}

            <div
              className="
                hidden
                md:flex
                gap-6
              "
            >

              <Link
                to="/"
                className="nav-link"
              >
                Home
              </Link>

              <Link
                to="/products"
                className="nav-link"
              >
                Products
              </Link>

              <Link
                to="/categories"
                className="nav-link"
              >
                Categories
              </Link>

            </div>

          </div>


          {/* =========================
              Search
          ========================= */}

          <form
            onSubmit={handleSearch}
            className="
              hidden
              md:flex
              items-center
              w-80
              border
              rounded-full
              border-primary
              px-4
            "
          >

            <FiSearch
              className="
                text-gray-400
              "
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search products..."
              className="
                w-full
                px-3
                py-2
                outline-none
              "
            />

          </form>


          {/* =========================
              Right Side
          ========================= */}

          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            {/* =========================
                NOT LOGGED IN
            ========================= */}

            {!isLoggedIn && (

              <button
                onClick={() =>
                  setLoginOpen(true)
                }
                className="
                  btn-primary
                "
              >
                Login
              </button>

            )}


            {/* =========================
                LOGGED IN
            ========================= */}

            {isLoggedIn && (

              <>

                {/* Cart */}

                <Link
                  to="/cart"
                  className="
                    relative
                    inline-flex
                  "
                >

                  <FiShoppingCart
                    className="
                      text-2xl
                      cursor-pointer
                    "
                  />

                  {cartCount > 0 && (

                    <span
                      className="
                        absolute
                        -top-2
                        -right-2
                        min-w-5
                        h-5
                        px-1
                        flex
                        items-center
                        justify-center
                        bg-red-500
                        text-white
                        text-xs
                        rounded-full
                      "
                    >
                      {cartCount}
                    </span>

                  )}

                </Link>


                {/* Wishlist */}

                <Link
                  to="/wishlist"
                  className="
                    relative
                    inline-flex
                  "
                >

                  <FiHeart
                    className="
                      text-2xl
                      cursor-pointer
                    "
                  />

                  {wishlistCount > 0 && (

                    <span
                      className="
                        absolute
                        -top-2
                        -right-2
                        min-w-5
                        h-5
                        px-1
                        flex
                        items-center
                        justify-center
                        bg-red-500
                        text-white
                        text-xs
                        rounded-full
                      "
                    >
                      {wishlistCount}
                    </span>

                  )}

                </Link>


                {/* User */}

                <div
                  className="
                    hidden
                    sm:flex
                    items-center
                    gap-2
                  "
                >

                  <FiUser
                    className="text-xl"
                  />

                  <span
                    className="
                      text-sm
                      font-medium
                    "
                  >
                    {user?.username}
                  </span>

                </div>


                {/* Logout */}

                <button
                  onClick={handleLogout}
                  className="
                    flex
                    items-center
                    gap-1
                    text-sm
                    hover:text-red-500
                  "
                >

                  <FiLogOut />

                  <span className="hidden sm:block">
                    Logout
                  </span>

                </button>

              </>

            )}


            {/* Mobile Menu */}

            <button
              className="
                md:hidden
              "
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
            >

              {menuOpen ? (
                <FiX className="text-2xl" />
              ) : (
                <FiMenu className="text-2xl" />
              )}

            </button>

          </div>

        </div>


        {/* =========================
            Mobile Menu
        ========================= */}

        {menuOpen && (

          <div
            className="
              md:hidden
              border-t
              bg-white
              px-4
              py-4
              space-y-3
            "
          >

            {/* Mobile Search */}

            <form
              onSubmit={(e) => {

                handleSearch(e);
                setMenuOpen(false);

              }}
              className="
                flex
                items-center
                border
                rounded-xl
                px-3
              "
            >

              <FiSearch
                className="
                  text-gray-400
                "
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search products..."
                className="
                  w-full
                  px-3
                  py-3
                  outline-none
                "
              />

            </form>


            <Link
              to="/"
              onClick={() =>
                setMenuOpen(false)
              }
              className="
                block
                nav-link
              "
            >
              Home
            </Link>


            <Link
              to="/products"
              onClick={() =>
                setMenuOpen(false)
              }
              className="
                block
                nav-link
              "
            >
              Products
            </Link>


            <Link
              to="/categories"
              onClick={() =>
                setMenuOpen(false)
              }
              className="
                block
                nav-link
              "
            >
              Categories
            </Link>


            {!isLoggedIn && (

              <button
                onClick={() => {

                  setMenuOpen(false);
                  setLoginOpen(true);

                }}
                className="
                  btn-primary
                  w-full
                "
              >
                Login
              </button>

            )}

          </div>

        )}

      </nav>


      {/* =========================
          Login Modal
      ========================= */}

      {loginOpen && (

        <LoginModal
          onClose={() =>
            setLoginOpen(false)
          }

          onRegister={() => {

            setLoginOpen(false);
            setRegisterOpen(true);

          }}
        />

      )}


      {/* =========================
          Register Modal
      ========================= */}

      {registerOpen && (

        <RegisterModal
          onClose={() =>
            setRegisterOpen(false)
          }

          onLogin={() => {

            setRegisterOpen(false);
            setLoginOpen(true);

          }}
        />

      )}

    </>

  );

}


export default Navbar;
