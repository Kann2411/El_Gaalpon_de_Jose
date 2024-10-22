import Image from "next/image";
import logo from "@/public/icons/icono-principal.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Image src={logo} alt="logo" width={60} height={60} />
            <div className="ml-4 text-2xl font-bold text-white">FitZone</div>
          </div>
          <div className="flex space-x-8">
            <a href="/home" className="text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Home
            </a>
            <a href="/plans" className="text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Plans
            </a>
            <a href="/contact" className="text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Contact Us
            </a>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024 <a href="/" className="hover:underline">FitZone™</a>. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            {/* Icons for social media */}
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              {/* Insert SVG for Facebook */}
            </a>
            {/* Repeat similar structure for other social media icons */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;