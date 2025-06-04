import React from "react";
import { navLinks } from "@/lib/data";
import Link from "next/link";

//====== Icons
import { MdFavoriteBorder } from "react-icons/md";
import { BsCart2 } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import Icon from "@/app/ui/Icon";

type MobileNavProps = {
  setMobileNavOpen: (value: boolean) => void;
};

const MobileNav = ({ setMobileNavOpen }: MobileNavProps) => {
  const closeNavOnClick = (): void => {
    setMobileNavOpen(false);
  };

  return (
    <nav className="md:hidden fixed grid inset-0 z-50 bg-neutral-200 p-16 overflow-hidden">
      {/*====== NavLinks ======*/}
      <ul className="flex flex-col gap-12 text-4xl font-medium">
        {navLinks.map((link) => (
          <li key={link.name} onClick={closeNavOnClick}>
            <Link
              className="hover:text-[42px] transition-all duration-300 hover:underline underline-offset-8 decoration-neutral-900"
              href={link.href}
            >
              {link.name}
            </Link>
          </li>
        ))}

        {/*====== MobileNav Buttons ======*/}
        <div className="flex flex-col mt-auto space-y-2">
          <Link href={"/favorites"}>
            <button
              className="inline-flex items-center justify-center text-xl gap-3 min-w-full border border-neutral-900 text-neutral-950 py-2 px-4 rounded-lg transition-colors duration-200 hover:bg-neutral-900 hover:text-neutral-100"
              onClick={() => setMobileNavOpen(false)}
            >
              Favorites <MdFavoriteBorder />
            </button>
          </Link>
          <Link href={"/cart"}>
            <button
              className="inline-flex items-center justify-center text-xl gap-3 min-w-full border border-neutral-900 text-neutral-950 py-2 px-4 rounded-lg transition-colors duration-200 hover:bg-neutral-900 hover:text-neutral-100"
              onClick={() => setMobileNavOpen(false)}
            >
              Cart <BsCart2 />
            </button>
          </Link>
        </div>
      </ul>

      {/*====== Close MobileNav ======*/}
      <Icon
        reactIcon={<IoCloseOutline />}
        className="absolute top-2 right-2 text-3xl border border-neutral-950"
        onClick={() => setMobileNavOpen(false)}
        aria-label="Close Mobile Nav"
      ></Icon>
    </nav>
  );
};

export default MobileNav;
