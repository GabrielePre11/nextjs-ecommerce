"use client";

//=============== CONTAINER, HOOKS, NEXT ELEMENTS, COMPONENTS, API FETCH, ICONS, ZUSTANDSTORE ===============//
// Hooks
import { useEffect, useState } from "react";

// Next Elements
import Image from "next/image";
import Link from "next/link";

// Components
import Loader from "@/app/ui/Loader";

// Layout
import Container from "@/layout/Container";

// Data
import { deliveryInfo } from "@/lib/data";

// Icons
import { IoArrowBackSharp } from "react-icons/io5";
import { FaStar, FaHeart, FaShoppingCart } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";

// Zustand useFavoritesStore & useCartStore
import { useFavoritesStore } from "@/app/store/useFavoritesStore";
import { useCartStore } from "@/app/store/useCartStore";

//=============== PRODUCT'S INTERFACE ===============//
interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  quantity: number;
  description: string;
  availabilityStatus: string;
  shippingInformation: string;
  images: string[];
  tags: string[];
  discountPercentage: number;
  rating: number;
}

//=============== PRODUCTS PAGE ===============//

/*
NEXT JS 15 error: A param property was accessed directly with params.id. params is now a Promise and should be unwrapped with React.use() before accessing properties of the underlying params object. In this version of Next.js direct access to param properties is still supported to facilitate migration, but in a future version, you will be required to unwrap params with React.use().

- Solved with this: https://stackoverflow.com/questions/79465960/react-a-param-property-was-accessed-directly-with-params
*/

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  //=============== STATES ===============//
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //=============== FAVORITE STORE'S FUNCTIONS ===============//
  const { addToFavorites, alreadyOnFavorites, removeFromFavorites } =
    useFavoritesStore();

  //=============== FAVORITE CART'S FUNCTIONS ===============//
  const { addToCart } = useCartStore();

  //=============== HANDLING THE API CALL WITH THE ID ===============//
  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchProduct = async () => {
      try {
        const { id } = await params;
        const response = await fetch(`https://dummyjson.com/products/${id}`);

        if (!response.ok) {
          throw new Error("There was an error fetching the product");
        }

        const data: Product = await response.json();
        setProduct(data);
      } catch (error) {
        setError("Error fetching featured products");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params]);

  //=============== HANDLING THE API CALL OF THE PRODUCTS WITH THE SAME CATEGORY ===============//
  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchSimilarProducts = async () => {
      // If there's no category (e.g. product is undefined), we exit early
      if (!product?.category) return;

      try {
        const productCategory = product?.category;

        // We fetch up to 4 products from the same category as the current product
        const response = await fetch(
          `https://dummyjson.com/products/category/${productCategory}?limit=4&skip=0`
        );

        // If the request fails, we throw an error
        if (!response.ok) {
          throw new Error("There was an error fetching the product");
        }

        // We extract the products from the response
        const data: { products: Product[] } = await response.json();

        // We filter out the current product to avoid showing it in the similar list
        const filteredProducts = data.products.filter(
          (similarProduct) => similarProduct.id !== product.id
        );

        // We update the state with the filtered similar products
        setSimilarProducts(filteredProducts);
      } catch (error) {
        // If there's any error, we set an error message and log it
        setError("Error fetching featured products");
        console.error(error);
      } finally {
        // In any case (success or error), we stop the loading state
        setLoading(false);
      }
    };

    fetchSimilarProducts();
  }, [product?.category, product?.id]);

  return (
    <section className="py-24">
      <Container>
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

        {/*====== Product ====== */}
        {!loading && !error && product && (
          <>
            {/*====== Back To All Products Button ====== */}
            <Link href="/products">
              <button className="inline-flex items-center gap-1.5 bg-blue-500 text-neutral-100 font-medium transition-colors duration-300 hover:bg-blue-600 rounded-lg py-1.5 px-3 text-sm">
                <IoArrowBackSharp /> Go Back To Products
              </button>
            </Link>

            {/*====== Main Content ====== */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/*====== LEFT (LG) ====== */}
              <figure className="relative mt-5 flex flex-col items-center bg-neutral-200 rounded-lg p-6 cursor-pointer overflow-hidden group">
                <Image
                  src={product.images?.[0] ?? "/placeholder.png"}
                  alt={product.title ?? "Product Image"}
                  width={500}
                  height={500}
                  priority={true}
                  className="max-w-60 sm:max-w-80 md:w-[400px] lg:w-[500px] mx-auto transform transition-transform duration-200 hover:scale-105"
                />

                {/*====== Ratings ======*/}
                <button className="absolute -top-10 group-hover:translate-y-12 left-2 z-10 bg-neutral-950 text-neutral-100 px-2 py-1 rounded-full inline-flex items-center text-sm uppercase gap-2 font-secondary transform transition-transform duration-200">
                  {product?.category ?? "Unknown"}
                </button>
              </figure>

              {/*====== RIGHT (LG) ====== */}
              <div className="flex flex-col h-full">
                {/*====== Title ====== */}
                <h2 className="text-2xl pt-3 font-medium">{product.title}</h2>

                {/*====== Rating & Availability Status ======*/}
                <p className="flex items-center gap-5 mt-3">
                  <span className="inline-flex items-center gap-1.5 bg-neutral-950 px-3 py-1.5 rounded-full text-neutral-100 font-secondary">
                    <FaStar className="text-yellow-400 text-2xl" />
                    {product.rating.toFixed(1)}
                  </span>
                  <span
                    className={`relative font-medium text-sm py-1 px-3 border border-neutral-500 rounded-lg before:content-[''] before:absolute before:-left-2.5 before:top-1/2 before:-translate-y-1/2 before:w-[1px] before:h-4 before:bg-neutral-900 ${
                      product.availabilityStatus === "In Stock"
                        ? "bg-green-500 text-neutral-100 border-0"
                        : "bg-transparent text-neutral-900"
                    }`}
                  >
                    {product.availabilityStatus}
                  </span>
                </p>

                {/*====== Price & Discount ======*/}
                <div className="flex items-center gap-3 mt-3">
                  {/*====== Price ======*/}
                  <span className="text-2xl font-secondary">
                    €{product.price}
                  </span>

                  {/*====== Discount ======*/}
                  {product?.discountPercentage > 0 && (
                    <span className="font-secondary bg-blue-500 text-neutral-50 px-1.5 py-1.5 rounded-lg text-sm font-semibold w-max hover:bg-blue-600 transition-colors duration-200">
                      -{product?.discountPercentage}%
                    </span>
                  )}
                </div>

                {/*====== Description ======*/}
                <p className="text-gray-700 max-w-2xl text-sm md:text-lg border-b border-b-neutral-500 pb-5 mt-2">
                  {product.description}
                </p>

                {/*====== Quantity & Favorites Button ======*/}
                <div className="flex items-center justify-between mt-4">
                  {/*====== Tags ======*/}
                  {Array.isArray(product?.tags) && product?.tags.length > 0 && (
                    <ul className="flex items-center flex-wrap gap-1.5 mt-3">
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

                  {/*====== Favorites Icon ======*/}
                  <button
                    className={`inline-block p-2 text-2xl border border-neutral-400 rounded-full transition-colors duration-200 hover:text-red-600 ${
                      alreadyOnFavorites(product.id)
                        ? "text-red-600"
                        : "text-neutral-950"
                    }`}
                    onClick={() => {
                      if (alreadyOnFavorites(product.id)) {
                        removeFromFavorites(product.id);
                      } else {
                        addToFavorites(product);
                      }
                    }}
                  >
                    <FaHeart />
                  </button>
                </div>

                {/*====== Add to Cart ======*/}
                <button
                  className="inline-flex items-center py-3 gap-2 mt-4 mb-5 text-lg w-full justify-center bg-blue-500 text-neutral-100 rounded-lg font-medium transition-colors duration-300 hover:bg-blue-600"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart <FaShoppingCart className="text-2xl" />
                </button>

                {/*====== Shipping Information ======*/}
                <div className="grid place-content-center mb-3">
                  <p className="text-sm font-secondary sm:text-lg text-gray-600">
                    {product?.shippingInformation}
                  </p>
                </div>

                {/*====== Delivery Info ======*/}
                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-3 rounded-lg mt-6 md:mt-auto">
                  {deliveryInfo.map((info) => (
                    <li
                      key={info.title}
                      className="flex items-center gap-5 p-2 border border-neutral-500 rounded-lg"
                    >
                      {/*====== Box Icon ======*/}
                      <span className="text-4xl sm:text-6xl">{info.icon}</span>

                      {/*====== Box Informations ======*/}
                      <div className="flex flex-col gap-1.5">
                        <h3 className="text-lg sm:text-2xl font-medium mt-2">
                          {info.title}
                        </h3>
                        <p className="text-gray-700 text-sm sm:text-lg">
                          {info.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}

        {/*=========== SIMILAR PRODUCTS (Same category) ===========*/}
        {!loading && !error && similarProducts && (
          <div className="flex flex-col gap-1.5 mt-5 pt-5 border-t border-t-neutral-400">
            {/*====== Title & Description ======*/}
            <h3 className="text-2xl font-medium">Similar Products</h3>
            <p className="inline-block gap-3 items-center text-gray-700 max-w-2xl text-sm md:text-lg">
              Take a look at some products of the category:{" "}
              <span className="bg-green-400 text-neutral-100 px-3 py-1 rounded-full">
                {product?.category}
              </span>
            </p>

            {/*====== Similar Products List ======*/}
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-10">
              {similarProducts.map((similarProduct) => (
                <li
                  key={similarProduct.id}
                  className="relative group grid grid-cols-1 gap-2 p-6 border border-neutral-400 rounded-lg hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  {/*====== Ratings ======*/}
                  <button className="absolute -top-10 group-hover:translate-y-12 left-2 z-10 text-lg bg-neutral-950 text-yellow-400 px-2 py-1 rounded-full inline-flex items-center gap-2 font-secondary transform transition-transform duration-200">
                    <FaStar /> {similarProduct?.rating.toFixed(1) ?? 0.0}
                  </button>

                  {/*====== Add to Favorites Button ======*/}
                  <button
                    className={`absolute top-2 right-2 z-10 text-2xl p-2 bg-neutral-900 rounded-full grid place-items-center hover:bg-neutral-800 transition-colors duration-200 ${
                      alreadyOnFavorites(similarProduct.id)
                        ? "text-red-500"
                        : "text-neutral-100"
                    }`}
                    onClick={() => {
                      if (alreadyOnFavorites(similarProduct.id)) {
                        removeFromFavorites(similarProduct.id);
                      } else {
                        addToFavorites(similarProduct);
                      }
                    }}
                  >
                    <FaHeart className="hover:text-red-500" />
                  </button>

                  {/*====== Product's Image ======*/}
                  <Link href={`/products/${similarProduct.id}`}>
                    <figure className="border-b border-neutral-400 pb-3">
                      <Image
                        src={similarProduct?.images[0]}
                        alt={similarProduct?.title ?? "Product Image"}
                        width={250}
                        height={250}
                        className="rounded-lg object-contain aspect-square w-52 mx-auto transition-transform hover:scale-105 mb-2"
                      />
                    </figure>
                  </Link>

                  {/*====== Product's Informations ======*/}
                  <div className="flex flex-col mt-2">
                    <h2 className="text-2xl font-medium truncate">
                      {similarProduct?.title ?? "No title available"}
                    </h2>

                    {Array.isArray(similarProduct?.tags) &&
                      similarProduct?.tags.length > 0 && (
                        <ul className="flex items-center flex-wrap gap-1.5 mt-2">
                          {similarProduct?.tags.map((tag, index) => (
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
                        {similarProduct?.discountPercentage > 0 && (
                          <span className="grid place-items-center font-secondary bg-blue-500 text-neutral-50 px-1.5 py-1.5 rounded-lg text-sm font-semibold w-max hover:bg-blue-600 transition-colors duration-200">
                            -{similarProduct?.discountPercentage}%
                          </span>
                        )}

                        {/*====== Price ======*/}
                        <span className="text-3xl font-secondary text-neutral-900 font-medium">
                          €{similarProduct?.price ?? "Price not available"}
                        </span>
                      </div>

                      {/*====== Add to cart ======*/}
                      <CiShoppingCart
                        className="grid place-items-center bg-blue-500 size-14 rounded-lg text-neutral-50 p-2
                      hover:bg-blue-600 transition-colors duration-300 cursor-pointer"
                        onClick={() => addToCart(similarProduct)}
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
}
