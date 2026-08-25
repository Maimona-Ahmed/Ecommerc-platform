
import { useContext, useState } from "react";

import { FiX } from "react-icons/fi";

import { AuthContext } from "../context/AuthContext";


function LoginModal({ onClose,onRegister }) {

  const { login } =
    useContext(AuthContext);


  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  // =========================
  // Submit
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    setLoading(true);


    try {

      const result =
        await login(
          email,
          password
        );


      if (!result.success) {

        setError(
          result.message
        );

        return;

      }


      // Login successful

      onClose();


    } finally {

      setLoading(false);

    }

  };


  return (

    <div
      className="
        fixed
        inset-0
        z-100
        flex
        items-center
        justify-center
        bg-black/50
        px-4
      "
      onClick={onClose}
    >

      <div
        className="
          relative
          w-full
          max-w-md
          rounded-2xl
          bg-white
          p-6
          shadow-xl
        "
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        {/* Close */}

        <button
          onClick={onClose}
          className="
            absolute
            right-4
            top-4
            text-xl
            text-gray-500
          "
        >
          <FiX />
        </button>


        {/* Title */}

        <h2
          className="
            text-2xl
            font-bold
            mb-6
          "
        >
          Login
        </h2>


        {/* Error */}

        {error && (

          <div
            className="
              mb-4
              rounded-lg
              bg-red-50
              p-3
              text-sm
              text-red-600
            "
          >
            {error}
          </div>

        )}


        <form
          onSubmit={handleSubmit}
          className="
            space-y-4
          "
        >

          {/* Email */}

          <div>

            <label
              className="
                block
                mb-1
                font-medium
              "
            >
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
              className="
                w-full
                rounded-lg
                border
                px-4
                py-3
                outline-none
                focus:border-primary
              "
              required
            />

          </div>


          {/* Password */}

          <div>

            <label
              className="
                block
                mb-1
                font-medium
              "
            >
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter your password"
              className="
                w-full
                rounded-lg
                border
                px-4
                py-3
                outline-none
                focus:border-primary
              "
              required
            />

          </div>


          {/* Login Button */}

          <button
            type="submit"
            disabled={loading}
            className="
              btn-primary
              w-full
              py-3
              disabled:opacity-50
            "
          >

            {loading
              ? "Logging in..."
              : "Login"
            }

          </button>
          Writing
<p className="mt-5 text-center text-sm text-gray-600">

  Don't have an account?

  <button
    type="button"
    onClick={onRegister}
    className="
      ml-1
      font-semibold
      text-primary
    "
  >
    Register
  </button>

</p>


        </form>

      </div>

    </div>

  );

}


export default LoginModal;
