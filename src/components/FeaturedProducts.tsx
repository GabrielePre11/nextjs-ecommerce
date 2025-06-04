"use client";

//=============== CONTAINER, HOOKS, NEXT ELEMENTS, COMPONENTS, API FETCH, ICONS, ZUSTANDSTORE ===============//
// Layout
import Container from "@/layout/Container";

// Hooks
import React, { useEffect, useState } from "react";

// API
import { fetchFeaturedProducts } from "@/lib/fetchFeaturedProducts";

// Next Elements
import Link from "next/link";
import Image from "next/image";

// Zustand Stores
import { useFavoritesStore } from "@/app/store/useFavoritesStore";
import { useCartStore } from "@/app/store/useCartStore";

// Icons
import { FaHeart, FaStar } from "react-icons/fa6";
import { CiShoppingCart } from "react-icons/ci";

// Components
import Loader from "@/app/ui/Loader";

//=============== FeaturedProduct INTERFACE ===============//
interface FeaturedProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  images: string[];
  quantity: number;
  tags: string[];
  discountPercentage: number;
  rating: number;
}

//=============== FeaturedProduct COMPONENTS ===============//
const FeaturedProducts = () => {
  //=============== STATES ===============//
  const [featuredProducts, setFeaturedProducts] = useState<FeaturedProduct[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  //=============== ZUSTAND FAVORITE STORE'S FUNCTIONS ===============//
  const { addToFavorites, alreadyOnFavorites, removeFromFavorites } =
    useFavoritesStore();

  //=============== ZUSTAND CART STORE'S FUNCTIONS ===============//
  const { addToCart } = useCartStore();

  //=============== HANDLING THE API CALL (from @lib/fetchFeaturedProducts) ===============//
  useEffect(() => {
    const getFeaturedProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const data: FeaturedProduct[] = await fetchFeaturedProducts();
        console.log(data);
        setFeaturedProducts(data);
      } catch (error) {
        setError("Error fetching featured products");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getFeaturedProducts();
  }, []);

  return (
    <section className="py-14">
      <Container>
        <h3 className="text-lg md:text-2xl font-medium">Featured Products</h3>

        {/*====== Loading State ====== */}
        {loading && <Loader />}

        {/*====== Error State ====== */}
        {error && (
          <div className="grid place-content-center">
            <p className="text-lg sm:text-2xl lg:text-3xl">
              Oops! ❌ There was an error loading the product. Try again!
            </p>
          </div>
        )}

        {/*====== Error State ======*/}
        {error && (
          <p className="text-center text-red-500 font-semibold mt-4">{error}</p>
        )}

        {/*====== Featured Products List ======*/}
        {!loading && !error && featuredProducts.length > 0 && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-5">
            {featuredProducts.map((product) => (
              <li
                key={product.id}
                className="relative group grid grid-cols-1 gap-2 p-6 border border-neutral-400 rounded-lg hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                {/*====== Add to Favorites Button ======*/}
                <button className="absolute -top-10 group-hover:translate-y-12 left-2 z-10 text-lg bg-neutral-950 text-yellow-400 px-2 py-1 rounded-full inline-flex items-center gap-2 font-secondary transform transition-transform duration-200">
                  <FaStar /> {product?.rating.toFixed(1) ?? 0.0}
                </button>

                {/*====== Add to Favorites Button ======*/}
                <button
                  className={`absolute top-2 right-2 z-10 text-2xl p-2 bg-neutral-900 rounded-full grid place-items-center hover:bg-neutral-800 transition-colors duration-200 ${
                    alreadyOnFavorites(product.id)
                      ? "text-red-500"
                      : "text-neutral-100"
                  }`}
                  onClick={() => {
                    if (alreadyOnFavorites(product.id)) {
                      removeFromFavorites(product.id);
                    } else {
                      addToFavorites(product);
                    }
                  }}
                >
                  <FaHeart className="hover:text-red-500" />
                </button>

                {/*====== Product's Image ======*/}
                <Link href={`/products/${product.id}`}>
                  <figure className="border-b border-neutral-400 pb-3">
                    <Image
                      src={product?.images[0]}
                      alt={product?.title ?? "Product Image"}
                      width={250}
                      height={250}
                      className="rounded-lg object-contain aspect-square w-52 mx-auto transition-transform hover:scale-105 mb-2"
                    />
                  </figure>
                </Link>

                {/*====== Product's Informations ======*/}
                <div className="flex flex-col mt-2">
                  <h2 className="text-2xl font-medium truncate">
                    {product?.title ?? "No title available"}
                  </h2>

                  {Array.isArray(product?.tags) && product?.tags.length > 0 && (
                    <ul className="flex items-center flex-wrap gap-1.5 mt-2">
                      {product?.tags.map((tag, index) => (
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
                      {product?.discountPercentage > 0 && (
                        <span className="grid place-items-center font-secondary bg-blue-500 text-neutral-50 px-1.5 py-1.5 rounded-lg text-sm font-semibold w-max hover:bg-blue-600 transition-colors duration-200">
                          -{product?.discountPercentage}%
                        </span>
                      )}

                      {/*====== Price ======*/}
                      <span className="text-3xl font-secondary text-neutral-900 font-medium">
                        €{product?.price ?? "Price not available"}
                      </span>
                    </div>

                    {/*====== Add to cart ======*/}
                    <CiShoppingCart
                      className="grid place-items-center bg-blue-500 size-14 rounded-lg text-neutral-50 p-2
                      hover:bg-blue-600 transition-colors duration-300 cursor-pointer"
                      onClick={() => addToCart(product)}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/*====== All Products Button ======*/}
        <div className="mt-10 grid place-content-center">
          <Link href={"/products"}>
            <button className="inline-block text-lg px-3 py-1.5 bg-neutral-100 border border-neutral-900 text-neutral-900 rounded-lg transition-colors duration-200 hover:bg-neutral-900 hover:text-neutral-50">
              All Products
            </button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProducts;
