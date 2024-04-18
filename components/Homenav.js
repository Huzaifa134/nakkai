import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SideCart from "./SideCart";
import Link from "next/link";
import axios from "axios";
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
import { GiHamburgerMenu } from "react-icons/gi";
import { BsBag } from "react-icons/bs";
import Image from "next/image";
import logo from "@/public/logo.png";
import { useSelectedCountry } from "../Context/selectCountry";

const Homenav = () => {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState({});
  const [rotatedCategories, setRotatedCategories] = useState({});
  const { selectedCountry , setSelectedCountry } = useSelectedCountry();

  // Function to handle click on arrow icon
  const handleClick = (category) => {
    setRotatedCategories(prevState => ({
      ...prevState,
      [category]: !prevState[category] // Toggle rotation state for the clicked category
    }));
  };
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get(`https://nakkai.vercel.app/api/${selectedCountry === "us"?'uscategory':'category'}`);
      setCategories(res?.data?.data);
    };
    fetchCategories();
  }, [selectedCountry]);
  const subCategories = ["Shirts", "T-shirts", "Sweatshirts", "Trousers"];
  const toggleCategory = (category) => {
    setOpenCategories((prevOpenCategories) => ({
      ...prevOpenCategories,
      [category]: !prevOpenCategories[category],
    }));
  };

  return (
    <div className="flex items-center justify-between w-[90%] m-auto mt-5">
      {/*hamburger*/}
      <div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="none" className="text-xl">
              <GiHamburgerMenu />
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
                          className={`h-5 w-5 transform ${
                            Object.values(openCategories).some(
                              (isOpen) => isOpen
                            )
                              ? "-rotate-180"
                              : ""
                          }`}
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
                      {categories.map((category) => (
                        <li key={category} onClick={() => handleClick(category)}>
                          <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                              <Link
                                className="text-sm font-medium"
                                href={`/category/${category}`}
                              >
                                {" "}
                                {category}{" "}
                              </Link>

                              <span
                              className="shrink-0 transition duration-300 group-open"
                              
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-5 w-5 transform ${rotatedCategories[category] ? "-rotate-90" : ""}`}
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
                              {subCategories?.map((subcategory) => {
                                return (
                                  <li key={subcategory}>
                                    <Link
                                      href={`/category/${category}/${subcategory}`}
                                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                      {subcategory}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </details>
                        </li>
                      ))}
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
      {/* logo */}
      <div>
        <Link className="block text-teal-600" href="/">
          <span className="sr-only">Home</span>
          <Image src={logo} alt="logo" />
        </Link>
      </div>
      {/*cart*/}
      <div className="">
        <span
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="text-gray-800 transition hover:text-gray-800/75 cursor-pointer"
        >
          <BsBag fontSize={19} />
        </span>
        {isCartOpen && (
          <SideCart setIsCartOpen={setIsCartOpen} isCartOpen={isCartOpen} />
        )}
      </div>
    </div>
  );
};

export default Homenav;
