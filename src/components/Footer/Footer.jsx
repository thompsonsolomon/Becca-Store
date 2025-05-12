import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import "./footer.css";
import { CompanyName } from "../../../Data";

const Foot = () => {
  return (
    <footer className="bg-white-900 text-black py-10">
      <div className=" mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and About Section */}
        <div>
          <p className="text-sm text-black">
            Your one-stop solution for the highest quality products, carefully sourced and delivered with precision. We ensure that nature’s best reaches your doorstep, offering not just products, but a commitment to excellence and customer satisfaction every step of the way.
          </p>
        </div>


        {/* Contact Information */}
        <div>
          <h2 className="text-lg font-semibold text-black mb-4">Contact Us</h2>
          <ul className="space-y-2 text-sm">
            <li>📞 <b>Phone</b>: <a href="tel:+08076452210"> (+234)8076452210</a></li>
            <li><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-500 inline-block mr-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z" />
            </svg>
              <b>Location</b>: <a href="https://maps.app.goo.gl/uKb14VKYzAKy3bBU70"> Tanke Oke-odo ilorin</a></li>
            <li>📧 <b>Email</b>: <a href="mailto:thompsonrebecca645@gmail.com">thompsonrebecca645@gmail.com</a></li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h2 className="text-lg font-semibold text-black mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/klassie.angela"
              className="p-3 rounded-full bg-[#4caf50] text-green-900 hover:bg-green-500 hover:text-white"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://wa.me/2348032517780"
              className="p-3 rounded-full bg-[#4caf50] text-green-900 hover:bg-green-500 hover:text-white"
              aria-label="Twitter"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://www.instagram.com/beccat64?igsh=YzljYTk1ODg3Zg=="
              className="p-3 rounded-full bg-[#4caf50] text-green-900 hover:bg-green-500 hover:text-white"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://vm.tiktok.com/ZMSeMr8n5/"
              className="p-3 rounded-full bg-[#4caf50] text-green-900 hover:bg-green-500 hover:text-white"
              aria-label="LinkedIn"
            >
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm">
        <p>&copy; 2025 {CompanyName} All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Foot;
