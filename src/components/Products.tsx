"use client";

//=============== CONTAINER, HOOKS, NEXT ELEMENTS, COMPONENTS, API FETCH, ICONS, ZUSTANDSTORE ===============//
// Layout
import Container from "@/layout/Container";

// React Hooks
import React, { useCallback, useEffect, useState } from "react";

// Next Link and Image
import Image from "next/image";
import Link from "next/link";

// Components
import Categories from "./Categories";
import Loader from "@/app/ui/Loader";

// fetchProducts API
import { fetchProducts } from "@/lib/fetchProducts";

// Icons
import { CiShoppingCart } from "react-icons/ci";
import { FaHeart, FaStar } from "react-icons/fa6";

// Zustand useFavoritesStore & useCartStore Stores
import { useFavoritesStore } from "@/app/store/useFavoritesStore";
import { useCartStore } from "@/app/store/useCartStore";

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

//=============== PRODUCTS COMPONENT ===============//
const Products = () => {
  //=============== STATES ===============//
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  //=============== FAVORITE STORE'S FUNCTIONS ===============//
  const { addToFavorites, alreadyOnFavorites, removeFromFavorites } =
    useFavoritesStore();

  //=============== FAVORITE CART'S FUNCTIONS ===============//
  const { addToCart } = useCartStore();

  // It defines the number of products to fetch per page (in the URL to fetch).
  const limit = 10;

  //=============== HANDLING THE API CALL (from @lib/fetchProducts) ===============//
  useEffect(() => {
    const getFeaturedProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const data: Product[] = await fetchProducts(page, limit);
        setProducts((prev) => {
          /*
          - We use a Set to store the IDs of existing products, as Sets don't allow duplicates unlike arrays.
          - Then we filter out products whose IDs already exist, so when the user clicks "Load More", we avoid adding duplicates to the list (the key must be unique).
          */
          const existingIDs = new Set(prev.map((product) => product.id));

          const newProducts = data.filter(
            (product) => !existingIDs.has(product.id)
          );
          // We return the previous products and the new ones.
          return [...prev, ...newProducts];
        });
      } catch (error: unknown) {
        setError("There was an error fetching the products.");

        if (error instanceof Error) {
          console.error("Error fetching products:", error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    getFeaturedProducts();
  }, [page]);

  //=============== LOAD MORE PRODUCTS FUNCTION ===============//
  const loadMoreProducts = useCallback(() => {
    /*
    - We use the useCallback hook for optimization. Even though the computation isn't heavy, 
      it helps prevent recreating the function on every render.
    - When the user clicks the "Load More" button, new products are fetched as the page number increases.
  */
    setLoading(true);
    setPage((prev) => prev + 1);
  }, []);

  return (
    <section className="py-24">
      <Container>
        <h3 className="text-3xl md:text-4xl font-medium">Products</h3>
        <p className="text-lg text-neutral-500 mt-2">
          Explore our wide range of products!
        </p>
      </Container>

      {/*=============== CATEGORIES COMPONENT ===============*/}
      <Categories />

      <Container>
        {/*====== Loading State... ======*/}
        {loading && <Loader />}

        {/*====== Error State ======*/}
        {error && (
          // If there's an error fetching the products, show an error message.
          <div className="grid place-content-center">
            <p className="text-lg sm:text-2xl lg:text-3xl">
              Oops! ❌ There was an error loading the movies! Try again!
            </p>
          </div>
        )}

        {/*====== Products List ======*/}
        {!loading && !error && products.length > 0 && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-14">
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

        {/*====== Load More Products Button ======*/}
        {!error && products.length > 0 && (
          <div className="mt-10 text-center">
            <button
              onClick={loadMoreProducts}
              aria-label="Load More Products"
              className="bg-neutral-900 text-white px-3 py-2.5 rounded-lg hover:bg-neutral-900/90 transition-colors duration-200"
            >
              Load More Products
            </button>
          </div>
        )}
      </Container>
    </section>
  );
};

export default Products;
