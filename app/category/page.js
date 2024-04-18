"use client";
import Image from "next/image";
import Link from "next/link";
import HeadPart from "./HeadPart";
import clothing from "@/public/clothing.jpg";
const page = () => {
  
  const categories = [
    {
      name: "Man's Collection",
      link: "Men",
      image:
        "https://images.unsplash.com/photo-1610384104075-e05c8cf200c3?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Kids's Collection",
      link: "kids",
      image:
        "https://images.unsplash.com/photo-1627859774205-83c1279a6382?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Women's Collection",
      link: "Women",
      image:
        "https://images.unsplash.com/photo-1552874869-5c39ec9288dc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return (
    <div>
      <div className="w-[100%] h-[600px] mb-20">
        <Image src={clothing} alt="image" className="w-full h-full" />
      </div>
      <div className="w-full md:w-10/12 mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center">
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            CATEGORIES
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-gray-500 mb-10">
            All clothing brands or shops have their own target audience and it
            is very important that you follow the tone that fits that audience.
          </p>
          <Link href={""} className="px-10 py-2 border-2 border-gray-500 ">Shop All</Link>
        </header>
        <ul className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {categories?.map((category) => (
            <li key={category.name}>
              <Link
                href={`/category/${category.link}`}
                className="group relative block"
              >
                <Image
                  height={300}
                  width={300}
                  src={category.image}
                  alt="category"
                  className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90 rounded-md"
                />

                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">
                    {category.name}
                  </h3>

                  <span className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white rounded">
                    Shop Now
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <HeadPart />
      </div>
    </div>
  );
};

export default page;
