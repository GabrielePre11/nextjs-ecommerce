import Container from "@/layout/Container";
import React from "react";
import { footerLinks } from "@/lib/data";

const Footer = () => {
  return (
    <footer className="bg-neutral-950 text-neutral-100 py-8 left-0 right-0">
      <Container>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-9">
          <li className="flex flex-col gap-2">
            {/*====== Title ======*/}
            <h3 className="text-2xl font-semibold">Exclusive</h3>

            {/*====== Content ======*/}
            <span>Subscribe</span>
            <form className="flex items-center flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 border border-neutral-400 rounded-lg w-full"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 w-full"
              >
                Subscribe
              </button>
            </form>
          </li>

          {footerLinks.map((link) => (
            <li key={link.title}>
              <h3 className="text-2xl font-semibold">{link.title}</h3>

              <ul className="flex flex-col gap-2 mt-2">
                {link.links.map((subLink) => (
                  <li key={subLink.name}>
                    <a
                      href={subLink.name}
                      className="text-neutral-300 hover:text-white transition-colors duration-200 hover:underline"
                    >
                      {subLink.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        {/* SubHeader */}
        <hr className="my-5" />
        <div className="flex items-center flex-col md:flex-row md:justify-between gap-3">
          <p className="text-center text-neutral-400">
            © {new Date().getFullYear()} Exclusive. All rights reserved.
          </p>

          <p className="text-center text-neutral-400">
            Coded by Prestano Gabriele
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
