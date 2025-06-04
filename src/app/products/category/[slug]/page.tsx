"use client";

//=============== CONTAINER, HOOKS, NEXT ELEMENTS, COMPONENTS, API FETCH, ICONS, ZUSTANDSTORE ===============//
// Zustand useFavoritesStore & useCartStore
import { useCartStore } from "@/app/store/useCartStore";
import { useFavoritesStore } from "@/app/store/useFavoritesStore";

// Components
import Loader from "@/app/ui/Loader";

// Layout
import Container from "@/layout/Container";

// Next Elements
import Image from "next/image";
import Link from "next/link";

// Hooks
import { useEffect, useState } from "react";

// Icons
import { CiShoppingCart } from "react-icons/ci";
import { FaHeart, FaStar } from "react-icons/fa6";
import { IoArrowBackSharp } from "react-icons/io5";

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

//=============== CategoryPage ===============//

/*
NEXT JS 15 error: A param property was accessed directly with params.id. params is now a Promise and should be unwrapped with React.use() before accessing properties of the underlying params object. In this version of Next.js direct access to param properties is still supported to facilitate migration, but in a future version, you will be required to unwrap params with React.use().

- Solved with this: https://stackoverflow.com/questions/79465960/react-a-param-property-was-accessed-directly-with-params
*/

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  //=============== STATES ===============//
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slug, setSlug] = useState<string>("");

  //=============== FAVORITE STORE'S FUNCTIONS ===============//
  const { addToFavorites, alreadyOnFavorites, removeFromFavorites } =
    useFavoritesStore();

  //=============== FAVORITE CART'S FUNCTIONS ===============//
  const { addToCart } = useCartStore();

  //=============== HANDLING THE API CALL WITH THE CATEGORY SLUG (slug: name) ===============//
  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchProduct = async () => {
      try {
        const { slug } = await params;
        setSlug(slug);

        const response = await fetch(
          `https://dummyjson.com/products/category/${slug}?limit=4&skip=0`
        );

        if (!response.ok) {
          throw new Error("There was an error fetching the product");
        }

        const data: { products: Product[] } = await response.json();
        setCategoryProducts(data.products);
      } catch (error) {
        setError("Error fetching featured products");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params]);

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

        {!loading && !error && categoryProducts && (
          <>
            {/*====== Back To All Products Button ====== */}
            <Link href="/products">
              <button className="inline-flex items-center gap-1.5 bg-blue-500 text-neutral-100 font-medium transition-colors duration-300 hover:bg-blue-600 rounded-lg py-1.5 px-3 text-sm">
                <IoArrowBackSharp /> Go Back To Products
              </button>
            </Link>

            <div className="grid gap-9">
              <h2 className="inline-flex items-center gap-2 text-2xl font-medium mt-4">
                Category:{" "}
                <span className="bg-green-400 text-neutral-100 px-3 py-1 rounded-full text-lg">
                  {slug}
                </span>
              </h2>

              {/*====== Similar Products List ======*/}
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {categoryProducts.map((categoryProduct) => (
                  <li
                    key={categoryProduct.id}
                    className="relative group grid grid-cols-1 gap-2 p-6 border border-neutral-400 rounded-lg hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                  >
                    {/*====== Ratings ======*/}
                    <button className="absolute -top-10 group-hover:translate-y-12 left-2 z-10 text-lg bg-neutral-950 text-yellow-400 px-2 py-1 rounded-full inline-flex items-center gap-2 font-secondary transform transition-transform duration-200">
                      <FaStar /> {categoryProduct?.rating.toFixed(1) ?? 0.0}
                    </button>

                    {/*====== Add to Favorites Button ======*/}
                    <button
                      className={`absolute top-2 right-2 z-10 text-2xl p-2 bg-neutral-900 rounded-full grid place-items-center hover:bg-neutral-800 transition-colors duration-200 ${
                        alreadyOnFavorites(categoryProduct.id)
                          ? "text-red-500"
                          : "text-neutral-100"
                      }`}
                      onClick={() => {
                        if (alreadyOnFavorites(categoryProduct.id)) {
                          removeFromFavorites(categoryProduct.id);
                        } else {
                          addToFavorites(categoryProduct);
                        }
                      }}
                    >
                      <FaHeart className="hover:text-red-500" />
                    </button>

                    {/*====== Product's Image ======*/}
                    <Link href={`/products/${categoryProduct.id}`}>
                      <figure className="border-b border-neutral-400 pb-3">
                        <Image
                          src={categoryProduct?.images[0]}
                          alt={categoryProduct?.title ?? "Product Image"}
                          width={250}
                          height={250}
                          className="rounded-lg object-contain aspect-square w-52 mx-auto transition-transform hover:scale-105 mb-2"
                        />
                      </figure>
                    </Link>

                    {/*====== Product's Informations ======*/}
                    <div className="flex flex-col mt-2">
                      <h2 className="text-2xl font-medium truncate">
                        {categoryProduct?.title ?? "No title available"}
                      </h2>

                      {Array.isArray(categoryProduct?.tags) &&
                        categoryProduct?.tags.length > 0 && (
                          <ul className="flex items-center flex-wrap gap-1.5 mt-2">
                            {categoryProduct?.tags.map((tag, index) => (
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
                          {categoryProduct?.discountPercentage > 0 && (
                            <span className="grid place-items-center font-secondary bg-blue-500 text-neutral-50 px-1.5 py-1.5 rounded-lg text-sm font-semibold w-max hover:bg-blue-600 transition-colors duration-200">
                              -{categoryProduct?.discountPercentage}%
                            </span>
                          )}

                          {/*====== Price ======*/}
                          <span className="text-3xl font-secondary text-neutral-900 font-medium">
                            €{categoryProduct?.price ?? "Price not available"}
                          </span>
                        </div>

                        {/*====== Add to cart ======*/}
                        <CiShoppingCart
                          className="grid place-items-center bg-blue-500 size-14 rounded-lg text-neutral-50 p-2
                      hover:bg-blue-600 transition-colors duration-300 cursor-pointer"
                          onClick={() => addToCart(categoryProduct)}
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
