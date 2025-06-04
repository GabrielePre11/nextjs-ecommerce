import Container from "@/layout/Container";
import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <section className="py-24">
      <Container className="grid grid-cols-1 md:grid-cols-2 items-center gap-3 md:gap-5 lg:gap-8">
        {/* Left Side */}
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-medium md:text-4xl lg:text-5xl">
            Our Story
          </h2>
          <p className="text-gray-800 md:text-lg">
            Welcome to Exclusive - your digital destination for all things
            exceptional. Born from a passion for quality, design, and
            innovation, Exclusive is more than just an e-commerce platform:
            it&apos;s a curated space for those who value distinctive products,
            seamless shopping experiences, and customer care that truly puts
            people first. Every item on Exclusive is carefully selected to
            ensure we offer only the finest in each category. We collaborate
            with established brands and emerging creators to bring you unique
            collections you won&apos;t easily find elsewhere.
          </p>
          <p className="text-gray-800 md:text-lg">
            Our mission? To make every purchase feel like a premium experience -
            from your first click to the moment it arrives at your door.
          </p>
        </div>

        {/* Right Side */}
        <Image
          src={"/about-image.png"}
          alt="About Image"
          width={300}
          height={300}
          quality={100}
          loading="lazy"
          className="w-[350px] md:w-[400px] lg:w-[600px] place-self-center rounded-lg"
        />
      </Container>
    </section>
  );
};

export default About;
