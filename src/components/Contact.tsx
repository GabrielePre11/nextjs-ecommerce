import Container from "@/layout/Container";
import React from "react";

import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

const Contact = () => {
  return (
    <section className="py-24">
      <Container className="grid grid-cols-1 sm:grid-cols-2 items-center gap-8">
        {/* Left Side */}
        <ul className="grid grid-cols-1 gap-3 max-w-[400px]">
          <li className="flex flex-col gap-2 border-b-2 border-gray-600">
            <span className="bg-blue-500 rounded-full p-3 text-neutral-100 w-max text-2xl">
              <FaPhoneAlt />
            </span>
            <h3 className="text-2xl font-medium">Call To Us</h3>
            <p className="text-gray-800 md:text-lg">
              We are available 24/7, 7 days a week.
            </p>
            <span className="md:text-lg font-medium mb-5 font-secondary">
              +8801611112222
            </span>
          </li>

          <li className="flex flex-col gap-3 mt-3">
            <span className="bg-blue-500 rounded-full p-3 text-neutral-100 w-max text-2xl">
              <IoIosMail />
            </span>

            <h3 className="text-2xl font-medium">Write To Us</h3>
            <p className="text-gray-800 md:text-lg">
              Fill out our form and we will contact you within 24 hours.
            </p>

            <div className="flex flex-col gap-2.5">
              <div className="block font-medium text-lg">
                <h3>Customer Email: </h3>
                <span className="text-sm text-gray-800 font-medium">
                  customer@exclusive.com
                </span>
              </div>
              <div className="block font-medium text-lg">
                <h3>Support Email:</h3>
                <span className="text-sm text-gray-800 font-medium">
                  support@exclusive.com
                </span>
              </div>
            </div>
          </li>
        </ul>

        {/* Right Side */}
        <form action="/" className="grid grid-cols-1 items-center gap-3.5">
          <div className="grid grid-cols-1 gap-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2">
              <input
                type="text"
                placeholder="Your Name"
                className="p-2 text-lg border border-gray-400 rounded-sm w-full focus:ring focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
              />
              <input
                type="text"
                placeholder="Your Email"
                className="p-2 text-lg border border-gray-400 rounded-sm w-full focus:ring focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
              />
            </div>

            <input
              type="text"
              placeholder="Your Phone"
              className="p-2 text-lg border border-gray-400 rounded-sm w-full focus:ring focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
            />
          </div>

          <textarea
            name="contact-textarea"
            placeholder="Your Message"
            className="p-2 text-lg border border-gray-400 rounded-sm h-40 sm:h-48 md:h-52 lg:h-60 resize-none focus:ring focus:ring-blue-500 focus:ring-offset-2 transition duration-200 outline-0"
          ></textarea>
        </form>
      </Container>
    </section>
  );
};

export default Contact;
