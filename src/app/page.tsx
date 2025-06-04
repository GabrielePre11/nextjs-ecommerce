import Articles from "@/components/Articles";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import Hero from "@/components/Hero";
import Services from "@/components/Services";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Articles />
      <Categories />
      <FeaturedProducts />
    </>
  );
}
