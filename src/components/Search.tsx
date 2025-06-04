"use client";

//=============== CONTAINER, HOOKS, NEXT ELEMENTS, COMPONENTS, API FETCH, ICONS, ZUSTANDSTORE ===============//
// Layout
import Container from "@/layout/Container";

// Next Navigation
import { useSearchParams } from "next/navigation";

// Hooks
import { useEffect, useState } from "react";

// React
import React from "react";

// Components
import Loader from "@/app/ui/Loader";

// Icons
import { FaHeart, FaStar } from "react-icons/fa6";
import { CiShoppingCart } from "react-icons/ci";

// Zustand useCartStore & useFavoritesStore
import { useFavoritesStore } from "@/app/store/useFavoritesStore";
import { useCartStore } from "@/app/store/useCartStore";

// Next Elements
import Link from "next/link";
import Image from "next/image";

//=============== PRODUCT'S INTERFACE ===============//
interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  quantity: number;
  images: string[];
  tags: string[];
  discountPercentage: number;
  rating: number;
}

export const SearchProductPage = () => {
  //=============== STATES ===============//
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  //=============== FAVORITE STORE'S FUNCTIONS ===============//
  const { addToFavorites, alreadyOnFavorites, removeFromFavorites } =
    useFavoritesStore();

  //=============== FAVORITE CART'S FUNCTIONS ===============//
  const { addToCart } = useCartStore();

  const searchParams = useSearchParams(); // Get URL search parameters from the router
  const userQuery = searchParams.get("q"); // Get the actual search query from ?q= in the URL
  const url = `https://dummyjson.com/products/search?q=${userQuery}`; // URL to fetch

  useEffect(() => {
    const fetchSearchedProduct = async () => {
      try {
        setLoading(true); // Start loading
        setError(null); // Clear previous errors

        // If there's no query in the URL, don't fetch anything
        if (!userQuery) return;

        const response = await fetch(url);

        // If the fetch fails (non-2xx), we throw an error to be caught below
        if (!response.ok) {
          throw new Error(
            `There was an error fetching the featured products: ${response.status}`
          );
        }

        const data = await response.json();

        // Update the products with the fetched results
        setProducts(data.products);
      } catch (error) {
        // Catch any error and update the error state
        console.error("Error fetching featured products:", error);
        setError("Error fetching featured products");
      } finally {
        // Whether it fails or succeeds, we stop the loading state
        setLoading(false);
      }
    };

    fetchSearchedProduct();
  }, [userQuery, url]);

  return (
    <section className="py-24">
      <Container>
        {/*====== Loading State... ======*/}
        {loading && <Loader />}

        {/*====== Error State ======*/}
        {error && (
          // If there's an error fetching the products, show an error message.
          <div className="grid place-content-center py-16">
            <p className="text-lg sm:text-2xl lg:text-3xl">
              Oops! ❌ There was an error loading the movies! Try again!
            </p>
          </div>
        )}

        {/*====== No available Favorites ====== */}
        {products.length === 0 && (
          <div>
            <h3 className="text-3xl md:text-4xl font-medium">
              Results for: <span className="text-blue-500">{userQuery}</span>
              <p className="text-lg text-gray-800">No products found.</p>
            </h3>
            <figure className="min-h-svh grid place-content-center mt-10">
              <Image
                src={"/empty-favorites.svg"}
                width={100}
                height={100}
                className="w-[300px] sm:w-[500px] lg:w-[800px]"
                alt="No Products Image"
              />
            </figure>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div>
            <h3 className="text-3xl md:text-4xl font-medium">
              Results for: <span className="text-blue-500">{userQuery}</span>
            </h3>

            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-12">
              {products.map((product) => (
                <li
                  key={product.id}
                  className="relative group grid grid-cols-1 gap-2 p-6 border border-neutral-400 rounded-lg hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  {/*====== Ratings ======*/}
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

                    {Array.isArray(product?.tags) &&
                      product?.tags.length > 0 && (
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
          </div>
        )}
      </Container>
    </section>
  );
};

export default SearchProductPage;
