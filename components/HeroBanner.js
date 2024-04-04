import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import video from "../public/world.webm"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
const HeroBanner = () => {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get("http://localhost:3000/api/category");
      setCategories(res?.data?.data);
    };
    fetchCategories();
  }, []);
  return (
    <div className="flex justify-center   items-center md:my-72 my-48 lg:my-96">
    <Sheet >
    <SheetTrigger asChild >
      <Button variant="none" className="" >
      <video autoPlay muted  loop className="lg:w-[1400px] max-[340px]:w-[600px] max-[1000px]:w-[800px] max-[840px]:w-[800px] max-[500px]:max-w-3xl  "   >
      <source src="/world.webm" />
    </video>
      </Button>
    </SheetTrigger>
    <SheetContent side={"left"}>
      <div className="grid gap-4 py-4">
        <ul className="mt-6 space-y-1">
          <li>
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
            >
              Home
            </Link>
          </li>

          <li>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                <span className="text-sm font-medium"> Categories </span>

                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>

              <ul className="mt-2 space-y-1 px-4">
                {categories?.map((category) => {
                  return (
                    <li key={category}>
                      <Link
                        href={`/category/${category}`}
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        {category}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </details>
          </li>

          <li>
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              About
            </Link>
          </li>

          <li>
            <Link
              href="/products"
              onClick={() => setIsOpen(false)}
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Products
            </Link>
          </li>
        </ul>
      </div>
    </SheetContent>
  </Sheet>
    


      
    </div>
  );
};

export default HeroBanner;
