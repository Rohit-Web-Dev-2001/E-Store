import React, { useContext, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AdminContext } from "@/app/Context/AdminContext";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const productRef = useRef(null);
  const router = useRouter();
  const { getProducts } = useContext(AdminContext);
  const [PrductData, setPrductData] = useState([]);
  const scrollToProducts = () => {
    productRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavigate = (Category) => {
    router.push(`Pages/Products/Category/${Category}`);
  };
  const getdata = async () => {
    const res = await getProducts();
    console.log(res);

    setPrductData(res);
  };
  useEffect(() => {
    getdata();
  }, []);
  const laptops = [
    {
      title: "MacBook Air M2",
      description: "13.6‑inch, 256 GB SSD, 8 GB RAM – Midnight finish.",
      price: 114999,
      image:
        "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mba13-midnight-cto-hero-202503?wid=840&hei=498&fmt=jpeg&qlt=90&.v=Q2E5SzQzQ0daYWpuZGNscHpUSFFEZktybEU1S0RNR1JRamRyTlliVTJCd2VSQkVmNWJCc0NzWFZ1VVFQblZWdnZvdUZlR0V0VUdJSjBWaDVNVG95YkVTMzRwekd2aEllbUhqT2JVR2ZFU3M",
    },
    {
      title: "Dell XPS 13",
      description: "11th Gen i7, 16 GB RAM, 512 GB SSD – InfinityEdge display.",
      price: 99999,
      image:
        "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-13-9350/media-gallery/platinum/notebook-xps-13-9350-t-oled-sl-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&wid=3988&hei=2292&qlt=100,1&resMode=sharp2&size=3988,2292&chrss=full&imwidth=5000",
    },
    {
      title: "HP Spectre x360",
      description:
        "12th Gen i5, 16 GB RAM, 512 GB SSD – Touchscreen Convertible.",
      price: 89999,
      image:
        "https://rukminim2.flixcart.com/image/832/832/xif0q/computer/c/a/s/-original-imahcd9pwhtpffwg.jpeg?q=70&crop=false",
    },
    {
      title: "Lenovo ThinkPad X1 Carbon",
      description:
        "Business-class laptop with Intel vPro & fingerprint sensor.",
      price: 85999,
      image:
        "https://p1-ofp.static.pub//fes/cms/2024/08/08/7awauyy7km5d1zq66pypo0ezc4h6f7268280.png",
    },
    {
      title: "ASUS ROG Zephyrus G14",
      description:
        "Gaming powerhouse with RTX 3060 & Ryzen 7.13.6‑inch, 256 GB SSD, 8 GB RAM",
      price: 119999,
      image:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRj1IYSl7dcJjqcUoGl1GOTAUpOuu9-ujTIcPoUvgl8KXfZTmA",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };
  const truncateDescription = (text, wordLimit = 13) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  const truncateName = (text, wordLimit = 3) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-gray-50">
        <h1
          className="text-4xl sm:text-5xl font-bold mb-4"
          style={{ color: "#101828" }}
        >
          Welcome to E-Store
        </h1>
        <p className="text-gray-600 text-lg mb-6 max-w-xl">
          Discover the best deals on smartphones and laptops. Shop smarter,
          faster, and better.
        </p>
        <button
          onClick={scrollToProducts}
          className="bg-[#101828] text-white px-6 py-3 rounded-sm font-semibold hover:opacity-90 transition"
        >
          Shop Now
        </button>
      </section>

      {/* Categories Section */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h2
          className="text-2xl font-bold text-center mb-10"
          style={{ color: "#101828" }}
        >
          Featured Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Phones */}
          <div
            className="border border-gray-200 rounded-md p-6 shadow-sm hover:shadow-md transition cursor-pointer"
            onClick={() => handleNavigate("Mobile Phones")}
          >
            <h3 className="text-xl font-semibold mb-3 text-[#101828]">
              Smartphones
            </h3>
            <p className="text-gray-600 mb-4">
              Explore the latest smartphones from top brands. Fast, sleek, and
              built to perform.
            </p>
            <img
              src="https://www.befunky.com/images/prismic/5f3dfeca-2bbc-49b0-a8df-a962e6fac21e_hero-mobile.png?auto=avif,webp&format=jpg&width=896"
              alt="Smartphones"
              className="rounded-md w-full h-48 object-cover"
            />
          </div>

          {/* Laptops */}
          <div
            className="border border-gray-200 rounded-md p-6 shadow-sm hover:shadow-md transition cursor-pointer"
            onClick={() => handleNavigate("Laptops")}
          >
            <h3 className="text-xl font-semibold mb-3 text-[#101828]">
              Laptops
            </h3>
            <p className="text-gray-600 mb-4">
              From ultrabooks to gaming machines, find the laptop that fits your
              lifestyle.
            </p>
            <img
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80"
              alt="Laptops"
              className="rounded-md w-full h-48 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Product Carousel Section */}
      <section ref={productRef} className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-10 text-[#101828]">
          Top Smart Phones
        </h2>
        <Slider {...settings}>
          {PrductData.slice(0, 5).map((mobilePhones, index) => (
            <div key={index} className="px-3">
              <div className="border border-gray-200 rounded-md shadow-sm hover:shadow-md transition  h-full flex flex-col">
                <div className="p-2  flex items-center justify-center">
                  <div className="w-[250px] h-[300px]  flex items-center justify-center">
                    <img
                      src={mobilePhones.image}
                      alt={mobilePhones.productName}
                      className="w-full  object-cover"
                    />
                  </div>
                </div>

                <h3 className="text-lg px-2 font-semibold text-[#101828]">
                  {truncateName(mobilePhones.productName)}
                </h3>
                <p className="text-sm text-gray-600 my-2 px-2 ">
                  {truncateDescription(mobilePhones.productDescription)}
                </p>
                <p className="text-[#101828] px-2  font-semibold text-base mb-2">
                  ₹{mobilePhones.price}
                </p>
                <button className="mt-auto bg-[#101828] text-white py-2 px-4 rounded-sm text-sm font-medium hover:opacity-90">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </section>
      <section ref={productRef} className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-10 text-[#101828]">
          Top Laptops
        </h2>
        <Slider {...settings}>
          {laptops.map((laptop, index) => (
            <div key={index} className="px-3">
              <div className="border border-gray-200 rounded-md shadow-sm hover:shadow-md transition p-4 h-full flex flex-col">
                <img
                  src={laptop.image}
                  alt={laptop.title}
                  className="w-full h-48 object-cover rounded-sm mb-4"
                />
                <h3 className="text-lg font-semibold text-[#101828]">
                  {laptop.title}
                </h3>
                <p className="text-sm text-gray-600 my-2">
                  {laptop.description}
                </p>
                <p className="text-[#101828] font-semibold text-base mb-2">
                  ₹{laptop.price}
                </p>
                <button className="mt-auto bg-[#101828] text-white py-2 px-4 rounded-sm text-sm font-medium hover:opacity-90">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500 border-t mt-10">
        © {new Date().getFullYear()} E-Store. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
