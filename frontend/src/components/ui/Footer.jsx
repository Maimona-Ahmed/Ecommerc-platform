import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiMapPin,
  FiPhone,
  FiMail,
} from "react-icons/fi";

function Footer() {
  return (
    <footer className="bg-secondary text-gray-300 mt-20">

      <div className="container-custom py-14">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo */}

          <div>

            <h2 className="text-3xl font-bold text-white mb-4">
              Fashion
            </h2>

            <p className="text-sm leading-7">
              Discover the latest fashion trends with premium quality products
              at affordable prices.
            </p>

          </div>



          {/* Quick Links */}

          <div>

            <h3 className="text-white font-semibold text-lg mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li><a href="#">Home</a></li>

              <li><a href="#">Products</a></li>

              <li><a href="#">Categories</a></li>

              <li><a href="#">Contact</a></li>

            </ul>

          </div>



          {/* Categories */}

          <div>

            <h3 className="text-white font-semibold text-lg mb-4">
              Categories
            </h3>

            <ul className="space-y-3">

              <li>Men</li>

              <li>Women</li>

              <li>Shoes</li>

              <li>Bags</li>

            </ul>

          </div>



          {/* Contact */}

          <div>

            <h3 className="text-white font-semibold text-lg mb-4">
              Contact
            </h3>

            <div className="space-y-4">

              <p className="flex items-center gap-3">
                <FiMapPin />
                Sana'a, Yemen
              </p>

              <p className="flex items-center gap-3">
                <FiPhone />
                +967 XXX XXX XXX
              </p>

              <p className="flex items-center gap-3">
                <FiMail />
                info@fashion.com
              </p>

            </div>

          </div>

        </div>



        {/* Bottom */}

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">

          <p className="text-sm">
            © 2026 Fashion Store. All rights reserved.
          </p>

          <div className="flex gap-5 mt-4 md:mt-0 text-xl">

            <FiFacebook className="cursor-pointer hover:text-white transition" />

            <FiInstagram className="cursor-pointer hover:text-white transition" />

            <FiTwitter className="cursor-pointer hover:text-white transition" />

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;
