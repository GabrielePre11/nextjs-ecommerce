import Container from "@/layout/Container";
import React from "react";
import { services } from "@/lib/data";

const Services = () => {
  return (
    <section className="pt-20 pb-6">
      <Container>
        <h2 className="text-lg md:text-2xl font-medium">Our Services</h2>

        {/*===== Services List =====*/}
        <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {services.map((service) => (
            <li
              key={service.title}
              className="flex items-center gap-3 p-4 border border-neutral-400 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <span className="text-5xl p-2 grid place-content-center w-max">
                {service.icon}
              </span>

              <div>
                <h3 className="text-lg lg:text-2xl font-semibold">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default Services;
