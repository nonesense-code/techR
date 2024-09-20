import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

function Contact() {
  return (
    <div className="w-full mt-4">
      <section
        id="contact"
        className="px-8 py-16 bg-[#232F3E] text-white w-full"
      >
        <h2 className="text-4xl font-bold mb-8 text-center">Contact Us</h2>

        <form className="w-auto h-auto mx-auto p-4">
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Message</label>
            <textarea className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300 cursor-pointer"
          >
            Send Message
          </button>
        </form>

        <div className="flex justify-center mt-12 space-x-6 w-full">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-gray-400 hover:text-blue-500 transition duration-300"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-gray-400 hover:text-blue-400 transition duration-300"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-gray-400 hover:text-pink-500 transition duration-300"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-gray-400 hover:text-blue-600 transition duration-300"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </section>
    </div>
  );
}

export default Contact;
