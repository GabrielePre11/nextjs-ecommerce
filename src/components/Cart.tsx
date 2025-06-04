"use client";

//=============== CONTAINER, HOOKS, NEXT ELEMENTS, COMPONENTS, API FETCH, ICONS, ZUSTANDSTORE ===============//
// Hooks
import React, { useMemo } from "react";

// Zustand Cart Store
import { useCartStore } from "@/app/store/useCartStore";

// Layout
import Container from "@/layout/Container";

// Next Elements
import Link from "next/link";
import Image from "next/image";

// Icons
import { IoArrowBackSharp } from "react-icons/io5";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { ImBin2 } from "react-icons/im";

//=============== CART COMPONENT ===============//
const Cart = () => {
  //=============== CART STORE'S ELEMENTS ===============//
  const {
    products,
    removeFromCart,
    increaseProductQuantity,
    decreaseProductQuantity,
  } = useCartStore();

  const totalQuantity = useMemo(() => {
    // We calculate the total number of items in the cart by summing up the quantity of each product.
    return products.reduce((acc, p) => acc + p.quantity, 0);
  }, [products]);

  const subtotal = useMemo(() => {
    // We calculate the subtotal by multiplying the price and quantity of each product and summing everything up.
    return products.reduce((acc, p) => acc + p.price * p.quantity, 0);
  }, [products]);

  return (
    <section className="py-24">
      <Container>
        {/*====== Back To All Products Button ====== */}
        <Link href="/products">
          <button className="inline-flex items-center gap-1.5 bg-blue-500 text-neutral-100 font-medium transition-colors duration-300 hover:bg-blue-600 rounded-lg py-1.5 px-3 text-sm">
            <IoArrowBackSharp /> Continue Shopping
          </button>
        </Link>

        {/*====== Title & Product's Count ====== */}
        <div className="flex flex-col gap-1 mt-5">
          <h2 className="text-3xl font-medium">Shopping Cart 🛒</h2>
          <p className="inline-block text-md md:text-lg text-gray-600">
            Welcome! You currently have{" "}
            <span className="font-secondary text-lg text-neutral-50 bg-blue-500 rounded-full px-2 py-0.5">
              {totalQuantity}
            </span>{" "}
            {`${totalQuantity !== 1 ? "products" : "product"}`} here!
          </p>
        </div>

        {/*====== Store ====== */}
        {/* Left Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            {products.length === 0 && (
              <Image
                src={"/empty-cart.svg"}
                alt="Empty Cart"
                width={300}
                height={50}
                className="my-10 p-5 place-self-center sm:w-[350px] md:w-[400px] lg:[w-450px]"
              ></Image>
            )}

            {products.length > 0 && (
              <ul className="grid grid-cols-1 mt-8 gap-3">
                {products.map((product) => (
                  <li
                    key={product.id}
                    className="flex flex-col items-center sm:flex-row sm:justify-between border border-neutral-400 rounded-lg p-2 transition-shadow duration-200 hover:shadow-lg hover:shadow-neutral-400"
                  >
                    {/*====== Product's Image & Name ====== */}
                    <div className="flex items-center gap-1.5">
                      {/*====== Product's Image ====== */}
                      <figure className="bg-neutral-300 rounded-lg p-1">
                        <Image
                          src={product.images[0]}
                          alt={product.title}
                          width={30}
                          height={30}
                          className="w-10"
                        ></Image>
                      </figure>

                      {/*====== Product's Name ====== */}
                      <h3 className="text-lg truncate font-medium pr-1">
                        {product.title}
                      </h3>
                    </div>

                    {/*====== Quantity Buttons ======*/}
                    <div className="flex items-center justify-between mt-4 sm:mt-0 gap-5">
                      <div className="inline-flex items-center gap-2 border border-neutral-400 rounded-lg p-1">
                        {/*====== Decrement Button ======*/}
                        <button
                          className="text-3xl text-red-500 transition-transform duration-200 hover:scale-110"
                          onClick={() => decreaseProductQuantity(product.id)}
                        >
                          <CiCircleMinus />
                        </button>
                        <span className="text-2xl font-mono border-x border-x-neutral-500 px-3 w-12 text-center">
                          {product.quantity}
                        </span>

                        {/*====== Increment Button ======*/}
                        <button
                          className="text-3xl text-green-500 transition-transform duration-200 hover:scale-110"
                          onClick={() => increaseProductQuantity(product.id)}
                        >
                          <CiCirclePlus />
                        </button>
                      </div>

                      {/* Product's Price */}
                      <span className="font-secondary text-lg">
                        €{product.price}
                      </span>

                      {/* Remove From Cart Button */}
                      <button
                        className="text-3xl p-2 text-red-500 transition-transform duration-200 hover:scale-110"
                        onClick={() => removeFromCart(product.id)}
                      >
                        <ImBin2 />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right Side */}
          <div className="flex flex-col gap-3 bg-neutral-200 p-3.5 rounded-lg">
            <div>
              <h3 className="text-2xl font-medium">Promo Code</h3>
              <form
                action="/"
                className="flex items-center border border-neutral-400 rounded-lg w-full mt-2"
              >
                <input
                  type="text"
                  placeholder="Type here..."
                  className="py-2 px-3 flex-1"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 w-max">
                  Apply
                </button>
              </form>
            </div>

            <ul className="grid grid-cols-1 my-3 gap-1 lg:mt-auto">
              <li className="text-lg uppercase font-medium">
                Subtotal:{" "}
                <span className="font-secondary">€{subtotal.toFixed(2)}</span>
              </li>
              <li className="text-lg uppercase font-medium">
                Delivery: <span className="font-secondary">Free</span>
              </li>
              <li className="text-lg uppercase font-semibold">
                Total:{" "}
                <span className="font-secondary">€{subtotal.toFixed(2)}</span>
              </li>
            </ul>

            <button className="w-full py-2 text-lg bg-blue-500 rounded-lg text-neutral-100 hover:bg-blue-600 transition-colors duration-200">
              Continue to checkout
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Cart;
