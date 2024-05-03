"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import responsive from "@/images/responsive.svg";
import secure from "@/images/secure.svg";
import setting from "@/images/settings.svg";
import userrating from "@/images/userrating.svg";
import Image from "next/image";

const SectionIndex = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("/api/auth/testimonial");
        setTestimonials(response.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <section className="flex flex-wrap justify-center  w-full gap-8 mb-16">
        <div className="bg-white text-slate-500 px-8 py-10 max-w-md  w-96 md:mx-auto mx-3 shadow-lg  rounded-lg text-center">
          <Image
            src={secure}
            width={80}
            height={80}
            alt="Secure"
            className=" mx-auto mb-4"
          />

          <h2 className="text-xl font-semibold mb-2">
            Gestión segura de contraseñas
          </h2>
          <p className="text-base">
            Almacena tus contraseñas de forma segura y protegida.
          </p>
        </div>
        <div className="bg-white text-slate-500 px-8 py-10 max-w-md  w-96 md:mx-auto mx-3 shadow-lg  rounded-lg text-center">
          <Image
            src={responsive}
            width={80}
            height={80}
            alt="Devices"
            className=" mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold mb-2">
            Acceso desde cualquier dispositivo
          </h2>
          <p className="text-base">
            Accede a tus cuentas desde tu computador o dispositivo movil.
          </p>
        </div>
        <div className="bg-white text-slate-500 px-8 py-10 max-w-md  w-96 md:mx-auto mx-3 shadow-lg  rounded-lg text-center">
          <Image
            src={setting}
            width={80}
            height={80}
            alt="Settings"
            className=" mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold mb-2">
            Control total sobre tus claves
          </h2>
          <p className="text-base">
            Administra y organiza tus claves como quieras.
          </p>
        </div>
      </section>

      <section className="text-center mb-12">
        <h2 className="text-2xl font-bold mb-4 px-5">
          ¿Por qué elegir PasswordBooklet?
        </h2>
        <p className="text-lg px-5">
          Descubre cómo nuestros usuarios están protegiendo sus cuentas con
          PasswordBooklet.
        </p>
        <div className="container mx-auto w-96 md:w-full">
          <Slider {...settings}>
            {testimonials.map((testimonial) => (
              <div key={testimonial._id} className="p-4">
                <div className="flex bg-white shadow-lg rounded-lg overflow-hidden min-h-36  h-full">
                  <Image
                    src={userrating}
                    width={40}
                    height={40}
                    alt="userratings"
                    className=" ml-2 mb-4"
                  />
                  <div className="p-2 text-left">
                    <div className="font-bold text-xl mb-2">
                      {testimonial.username}
                    </div>
                    <p className="text-sm">{testimonial.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        {/* Aquí testimonios de usuarios */}
        <p className="text-lg pt-2 text-indigo-300">Coming soon...</p>
      </section>
    </>
  );
};

export default SectionIndex;
