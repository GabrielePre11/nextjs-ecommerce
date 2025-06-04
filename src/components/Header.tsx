"use client";

//=============== CONTAINER, HOOKS, NEXT ELEMENTS, COMPONENTS, API FETCH, ICONS, ZUSTANDSTORE ===============//
// Layout
import Container from "@/layout/Container";

// Components
import Icon from "@/app/ui/Icon";
import MobileNav from "./MobileNav";
import MobileSearch from "./MobileSearch";

// Next Elements
import Link from "next/link";

// Data
import { navLinks } from "@/lib/data";

// Hooks
import React, { useEffect, useMemo, useState } from "react";

// Zustand Stores
import { useFavoritesStore } from "@/app/store/useFavoritesStore";
import { useCartStore } from "@/app/store/useCartStore";

// Icons
import { MdFavoriteBorder } from "react-icons/md";
import { BsCart2 } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { RiMenu3Fill } from "react-icons/ri";

// Next Navigation
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

//=============== HEADER COMPONENT ===============//
export default function Header() {
  //=============== STATES ===============//
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState<boolean>(false);

  //=============== USERQUERY TO SEARCH PRODUCTS ===============//
  const [userSearchQuery, setUserSearchQuery] = useState<string>("");

  //=============== NEXT PATH/ROUTER ===============//
  const nextPath = usePathname();
  const nextRouter = useRouter();

  //=============== ZUSTAND STORE ===============//
  const { favorites } = useFavoritesStore();
  const { products } = useCartStore();

  const subtotal = useMemo(() => {
    /*
    - We calculate the total quantity of all products using the method: reduce.
    - useMemo helps avoid recalculating it on every render unless products change.
    */
    return products.reduce((acc, product) => acc + product.quantity, 0);
  }, [products]);

  const handleUserSearch = (): void => {
    // We trim and lowercase the user input to make the search more consistent.
    const userQuery = userSearchQuery.trim().toLocaleLowerCase();

    // If the search input is empty, we stop here.
    if (!userQuery) return;

    // We close the mobile search, clear the input, and navigate to the search results page.
    setMobileSearchOpen(false);
    setUserSearchQuery("");
    nextRouter.push(`/search?q=${encodeURIComponent(userQuery)}`);
  };

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? "hidden" : "auto";
  }, [mobileNavOpen]);

  return (
    <header className="fixed top-0 left-0 w-full bg-neutral-100 z-50 border-b border-neutral-400">
      <Container className="flex items-center justify-between py-4">
        {/*========= LOGO =========*/}
        <Link href={"/"}>
          <h2 className="text-2xl font-medium">Exclusive</h2>
        </Link>

        {/*========= NAVBAR =========*/}
        <ul className="hidden lg:flex items-center gap-8 text-lg font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                className={`hover:underline hover:underline-offset-4 transition-all duration-300 ${
                  nextPath === link.href ? "text-blue-500" : "text-neutral-950"
                }`}
                href={link.href}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/*========= MOBILE NAV =========*/}
        {mobileNavOpen && <MobileNav setMobileNavOpen={setMobileNavOpen} />}

        {/*========= MOBILE SEARCHBAR =========*/}
        <div
          className={`${
            mobileSearchOpen ? "absolute" : "hidden"
          } top-20 left-1/2 -translate-x-1/2 w-full max-w-[500px] px-3 md:hidden`}
        >
          <MobileSearch setMobileSearchOpen={setMobileSearchOpen} />
        </div>

        {/*========= ICONS & SEARCHBAR =========*/}
        <div className="flex items-center gap-1.5 md:gap-2">
          {/*========= SEARCHBAR =========*/}
          <div className="hidden md:flex items-center pr-1.5 bg-transparent border border-neutral-400 rounded-lg md:w-[250px]">
            <input
              type="text"
              placeholder="What are you looking for?"
              name="mobile-searchbar"
              value={userSearchQuery}
              onKeyDown={(e) => e.key === "Enter" && handleUserSearch()}
              onChange={(e) => setUserSearchQuery(e.target.value)}
              className="py-2 px-2 flex-1 text-md"
            />
            <CiSearch
              className="bg-neutral-950 md:bg-transparent text-3xl text-neutral-100 md:text-neutral-950 rounded-full p-1 size-8 cursor-pointer transition duration-200 hover:scale-105"
              onClick={handleUserSearch}
              aria-label="Search..."
            />
          </div>

          {/*========= ICONS =========*/}
          {/* Search Icon */}
          <Icon
            reactIcon={<CiSearch />}
            onClick={() => setMobileSearchOpen((prev) => !prev)}
            className="md:hidden"
          ></Icon>

          {/* Favorites Icon */}
          <Link href={"/favorites"} className="relative">
            <Icon reactIcon={<MdFavoriteBorder />}></Icon>
            <span className="absolute -top-0.5 right-0 h-5 w-5 flex items-center justify-center rounded-full bg-blue-500 font-secondary text-neutral-100 text-xs">
              {favorites.length}
            </span>
          </Link>

          {/* Cart Icon */}
          <Link href={"/cart"} className="relative">
            <Icon reactIcon={<BsCart2 />}></Icon>
            <span className="absolute -top-0.5 right-0 h-5 w-5 flex items-center justify-center rounded-full bg-blue-500 font-secondary text-neutral-100 text-xs">
              {subtotal}
            </span>
          </Link>

          {/* Open Menu */}
          <Icon
            reactIcon={<RiMenu3Fill />}
            onClick={() => setMobileNavOpen(true)}
            className="md:hidden"
          ></Icon>
        </div>
      </Container>
    </header>
  );
}
