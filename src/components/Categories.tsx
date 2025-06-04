"use client";

//=============== CONTAINER, HOOKS, NEXT ELEMENTS, COMPONENTS, ICONS ===============//
// Layout
import Container from "@/layout/Container";

// Data
import { categories } from "@/lib/data";

// Next Link
import Link from "next/link";

// Hooks
import React, { useRef } from "react";

// Icons
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

//=============== CATEGORIES COMPONENT ===============//
const Categories = () => {
  //=============== USEREF HOOK ===============//
  const scrollRef = useRef<HTMLUListElement>(null);

  /*
  - We use useRef to reference the <ul> element that contains the category list and create a simple slider using arrows.
  - The scroll direction can be either "left" or "right".
  - With useRef, we can access the current scroll position and use the scrollBy method to move 200px in the chosen direction, with smooth behavior.
  */

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  return (
    <section className="pt-14 overflow-x-clip">
      <Container>
        <div className="flex items-center justify-between">
          <h3 className="text-lg md:text-2xl font-medium">
            Browse by categories
          </h3>

          {/*=============== ARROWS =============== */}
          <div className="flex items-center gap-2">
            <FaArrowLeft
              onClick={() => scroll("left")}
              className="text-2xl size-9 rounded-full p-1.5 cursor-pointer transition-colors duration-200 hover:bg-blue-500 hover:text-neutral-100"
            />
            <FaArrowRight
              onClick={() => scroll("right")}
              className="text-2xl size-9 rounded-full p-1.5 cursor-pointer transition-colors duration-200 hover:hover:bg-blue-500 hover:text-neutral-100"
            />
          </div>
        </div>

        {/*=============== Categories ===============*/}
        <ul
          ref={scrollRef}
          className="flex items-center gap-3 overflow-x-auto scrollbar-hide mt-3.5"
        >
          {categories.map((category) => (
            <li key={category.slug} className="shrink-0">
              <Link
                className="inline-flex py-1.5 px-3 rounded-full bg-blue-500 text-neutral-100 transition-colors duration-200 hover:hover:bg-blue-600"
                href={`/products/category/${category.slug}`}
              >
                {category.slug}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default Categories;
