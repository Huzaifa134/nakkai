"use client";
import Image from "next/image";
import Link from "next/link";
import React, {
  useState,
  useEffect,
  useRef,
  createRef,
  useCallback,
} from "react";
import axios from "axios";
import { X } from "lucide-react";
// import video from "../public/world.webm"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useSelectedCountry } from "../Context/selectCountry";
import Globe from "./RealGlobe";
const HeroBanner = () => {
  const [country] = useState();
  const [isSheetOpen, setSheetOpener] = useState(false);

  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { selectedCountry, setSelectedCountry } = useSelectedCountry();
  const subCategories = ["Shirts", "T-shirts", "Sweatshirts", "Trousers"];
  const [rotatedCategories, setRotatedCategories] = useState({});
  const [openCategories, setOpenCategories] = useState({});
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get(
        `https://nakkai.vercel.app/api/${
          selectedCountry === "us" ? "uscategory" : "category"
        }`
      );
      setCategories(res?.data?.data);
    };

    if (selectedCountry !== "none") {
      fetchCategories();
    }

  }, [selectedCountry]);
  const handleCountrySelection = (country) => {
    setSelectedCountry(country);
  };
  const handleClick = (category) => {
    setRotatedCategories((prevState) => ({
      ...prevState,
      [category]: !prevState[category], // Toggle rotation state for the clicked category
    }));
  };

  console.log(selectedCountry);

  const sheetHanlderCallback = useCallback((value) => {
    handleCountrySelection(value);
    sheetHandler();
  }, []);

  const sheetHandler = () => {
    setSheetOpener((prevState) => !prevState);
  };
  return (
    <div
      className="flex justify-center  flex-col  items-center md:mb-10 mb-20 lg:mb-0"
      style={{ overflowX: "hidden" }}
    >
      <Globe sheetHandler={sheetHanlderCallback} />
      {/* <button
        value={"us"}
        onClick={(e) => {
          handleCountrySelection(e.target.value);
        }}
        className="border-2 border-black p-4 bg-blue-400 mb-5"
      >
        United State
      </button>
      <button
        value={"uk"}
        onClick={(e) => {
          handleCountrySelection(e.target.value);
        }}
        className="border-2 border-black p-4 bg-blue-400"
      >
        United Kingdom
      </button> */}
      <Sheet open={isSheetOpen}>
        <SheetContent
          key={Math.floor(Math.random() * 4)}
          side={"left"}
          onInteractOutside={sheetHandler}
        >
          <div className="grid gap-4 py-4">
            <button
              onClick={sheetHandler}
              className="bg-white z-10 absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
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
                          Object.values(openCategories).some((isOpen) => isOpen)
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
                      <li key={category} >
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                          <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                            <Link
                              className="text-sm font-medium"
                              href={`/category/${category}`}
                              // href={`/${selectedCountry==="us"?'uscategory':'category'}/${category}`}
                            >
                              {" "}
                              {category}{" "}
                            </Link>

                            <span className="shrink-0 transition duration-300 group-open">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-5 w-5 transform ${
                                  rotatedCategories[category]
                                    ? "-rotate-90"
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
  );
};

export default HeroBanner;
