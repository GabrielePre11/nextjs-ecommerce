"use client";

//=============== CONTAINER, HOOKS, NEXT ELEMENTS, COMPONENTS, API FETCH, ICONS, ZUSTANDSTORE ===============//
// Layout
import Container from "@/layout/Container";

// Zustand useFavoritesStore & useCartStore
import { useFavoritesStore } from "@/app/store/useFavoritesStore";
import { useCartStore } from "@/app/store/useCartStore";

// React
import React from "react";

// Icons
import { CiShoppingCart } from "react-icons/ci";
import { FaHeart, FaStar } from "react-icons/fa6";
import { IoArrowBackSharp } from "react-icons/io5";

// Next Elements
import Link from "next/link";
import Image from "next/image";

//=============== FAVORITES COMPONENT ===============//
const Favorites = () => {
  //=============== FAVORITE STORE'S FUNCTIONS ===============//
  const favorites = useFavoritesStore((state) => state.favorites);
  const alreadyOnFavorites = useFavoritesStore(
    (state) => state.alreadyOnFavorites
  );
  const removeFromFavorites = useFavoritesStore(
    (state) => state.removeFromFavorites
  );

  //=============== CART STORE'S FUNCTIONS ===============//
  const { addToCart } = useCartStore();

  return (
    <section className="py-24">
      <Container>
        {/*====== Back To All Products Button ====== */}
        <Link href="/">
          <button className="inline-flex items-center gap-1.5 bg-blue-500 text-neutral-100 font-medium transition-colors duration-300 hover:bg-blue-600 rounded-lg py-1.5 px-3 text-sm">
            <IoArrowBackSharp /> Go Back To Homepage
          </button>
        </Link>

        {/*====== Title & Product's Count ====== */}
        <div className="flex flex-col gap-1 mt-5">
          <h2 className="text-3xl font-medium">Your Wishlist</h2>
          <p className="inline-block text-md md:text-lg text-gray-600">
            Hi! You currently have{" "}
            <span className="font-secondary text-lg text-neutral-50 bg-blue-500 rounded-full px-2 py-0.5">
              {favorites.length}
            </span>{" "}
            {`${favorites.length > 1 ? "products" : "product"}`} here!
          </p>
        </div>

        {/*====== Favorites ====== */}
        {favorites.length > 0 && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-5">
            {favorites.map((favoriteProduct) => (
              <li
                key={favoriteProduct.id}
                className="relative group grid grid-cols-1 gap-2 p-6 border border-neutral-400 rounded-lg hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                {/*====== Add to Favorites Button ======*/}
                <button className="absolute -top-10 group-hover:translate-y-12 left-2 z-10 text-lg bg-neutral-950 text-yellow-400 px-2 py-1 rounded-full inline-flex items-center gap-2 font-secondary transform transition-transform duration-200">
                  <FaStar /> {favoriteProduct?.rating.toFixed(1) ?? 0.0}
                </button>

                {/*====== Add to Favorites Button ======*/}
                <button
                  className={`absolute top-2 right-2 z-10 text-2xl p-2 bg-neutral-900 rounded-full grid place-items-center hover:bg-neutral-800 transition-colors duration-200 ${
                    alreadyOnFavorites(favoriteProduct.id)
                      ? "text-red-500"
                      : "text-neutral-100"
                  }`}
                  onClick={() => removeFromFavorites(favoriteProduct.id)}
                >
                  <FaHeart className="hover:text-red-500" />
                </button>

                {/*====== Product's Image ======*/}
                <Link href={`/products/${favoriteProduct.id}`}>
                  <figure className="border-b border-neutral-400 pb-3">
                    <Image
                      src={favoriteProduct?.images[0]}
                      alt={favoriteProduct?.title ?? "Product Image"}
                      width={250}
                      height={250}
                      className="rounded-lg object-contain aspect-square w-52 mx-auto transition-transform hover:scale-105 mb-2"
                    />
                  </figure>
                </Link>

                {/*====== Product's Informations ======*/}
                <div className="flex flex-col mt-2">
                  <h2 className="text-2xl font-medium truncate">
                    {favoriteProduct?.title ?? "No title available"}
                  </h2>

                  {Array.isArray(favoriteProduct?.tags) &&
                    favoriteProduct?.tags.length > 0 && (
                      <ul className="flex items-center flex-wrap gap-1.5 mt-2">
                        {favoriteProduct?.tags.map((tag, index) => (
                          <li
                            key={index}
                            className="inline-block truncate bg-blue-500 text-neutral-50 px-2 py-1 rounded-full text-sm hover:bg-blue-600 transition-colors duration-200"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}

                  {/*====== Product's price, discount and cart button ======*/}
                  <div className="flex items-center justify-between mt-7">
                    {/*====== Discount & Price ======*/}
                    <div className="flex flex-col gap-1">
                      {/* Discount */}
                      {favoriteProduct?.discountPercentage > 0 && (
                        <span className="grid place-items-center font-secondary bg-blue-500 text-neutral-50 px-1.5 py-1.5 rounded-lg text-sm font-semibold w-max hover:bg-blue-600 transition-colors duration-200">
                          -{favoriteProduct?.discountPercentage}%
                        </span>
                      )}

                      {/*====== Price ======*/}
                      <span className="text-3xl font-secondary text-neutral-900 font-medium">
                        €{favoriteProduct?.price ?? "Price not available"}
                      </span>
                    </div>

                    {/*====== Add to cart ======*/}
                    <CiShoppingCart
                      className="grid place-items-center bg-blue-500 size-14 rounded-lg text-neutral-50 p-2
                          hover:bg-blue-600 transition-colors duration-300 cursor-pointer"
                      onClick={() => addToCart(favoriteProduct)}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/*====== No available Favorites ====== */}
        {favorites.length === 0 && (
          <figure className="min-h-svh grid place-content-center">
            <Image
              src={"/empty-favorites.svg"}
              width={100}
              height={100}
              className="w-[300px] sm:w-[500px] lg:w-[800px]"
              alt="No Products Image"
            />
          </figure>
        )}
      </Container>
    </section>
  );
};

export default Favorites;
