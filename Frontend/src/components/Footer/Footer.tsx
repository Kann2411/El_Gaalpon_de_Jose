import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import logo from "@/public/icons/icono-principal.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-900 text-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between py-12">
          
          {/* Logo section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image src={logo} alt="logo" width={60} height={60} />
              <span className="text-2xl font-bold">FitZone</span>
            </div>
            <p className="text-sm text-gray-400">
              Empowering your fitness journey with <br /> cutting-edge facilities and expert guidance.
            </p>
          </div>
          
          {/* Links section */}
          <div className="flex space-x-8">
            
            {/* Quick Links */}
            <div className='mr-6'>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {['Classes', 'Plans', 'About Us'].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-white transition-colors duration-200">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Contact Us */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-gray-400">
                <li>123 Fitness Street, Gym City, 12345</li>
                <li>Phone: (123) 456-7890</li>
                <li>Email: fitzone463@gmail.com</li>
              </ul>
            </div>
            
          </div>
        </div>
        
        <hr className="border-gray-800" />
        
        <div className="flex flex-col md:flex-row justify-between items-center py-6">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} FitZone™. All Rights Reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
