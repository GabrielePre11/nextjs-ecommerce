import Container from "@/layout/Container";
import Link from "next/link";
import React from "react";

const Articles = () => {
  return (
    <section className="pt-16 pb-5">
      <Container className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/*=============== MAN'S ARTICLE ===============*/}
        <article
          style={{
            backgroundImage: `url("https://thumbs.dreamstime.com/b/man-doing-shopping-full-length-portrait-handsome-guy-bags-smiling-mall-88601808.jpg")`,
            height: "300px",
            backgroundPosition: "top",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="relative rounded-lg transition-shadow duration-200 hover:shadow-lg shadow-gray-400"
        >
          <Link href={"/products/category/mens-shirts"}>
            <button className="absolute bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-lg bg-neutral-900 text-lg text-neutral-100 transition-colors duration-200 hover:bg-neutral-950">
              Man&apos;s T-Shirts
            </button>
          </Link>
        </article>

        {/*=============== WOMENS ARTICLE ===============*/}
        <article
          style={{
            backgroundImage: `url("https://img.freepik.com/free-photo/two-women-are-shopping-happily_46073-339.jpg?size=626&ext=jpg")`,
            height: "300px",
            backgroundPosition: "top",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="relative rounded-lg transition-shadow duration-200 hover:shadow-lg shadow-gray-400"
        >
          <Link href={"/products/category/womens-dresses"}>
            <button className="absolute bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-lg bg-neutral-900 text-lg text-neutral-100 transition-colors duration-200 hover:bg-neutral-950">
              Womens Dresses
            </button>
          </Link>
        </article>
      </Container>
    </section>
  );
};

export default Articles;
