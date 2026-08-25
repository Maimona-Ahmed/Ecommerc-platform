import { useState } from "react";

import { FiX } from "react-icons/fi";

import api from "../api/axios";


function RegisterModal({
  onClose,
  onLogin,
}) {

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [password2, setPassword2] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    setLoading(true);


    try {

      await api.post(
        "/auth/register/",
        {
          username,
          email,
          password,
          password2,
        }
      );


      // Registration successful
      // Go back to Login

      onLogin();


    } catch (error) {

      const data =
        error.response?.data;


      if (data) {

        const firstError =
          Object.values(data)
            .flat()[0];

        setError(
          firstError ||
          "Registration failed."
        );

      } else {

        setError(
          "Something went wrong."
        );

      }

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
          Create Account
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
          className="space-y-4"
        >

          {/* Username */}

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
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


          {/* Email */}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
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


          {/* Password */}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
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


          {/* Confirm Password */}

          <input
            type="password"
            placeholder="Confirm Password"
            value={password2}
            onChange={(e) =>
              setPassword2(e.target.value)
            }
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


          {/* Submit */}

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
              ? "Creating account..."
              : "Register"
            }

          </button>

        </form>


        {/* Login */}

        <p
          className="
            mt-5
            text-center
            text-sm
            text-gray-600
          "
        >

          Already have an account?

          <button
            onClick={onLogin}
            className="
              ml-1
              font-semibold
              text-primary
            "
          >
            Login
          </button>

        </p>

      </div>

    </div>

  );

}


export default RegisterModal;
