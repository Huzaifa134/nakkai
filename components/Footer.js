"use client";
import { Context } from "@/Context/Context";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import logo from "@/public/logo.png";
import { FaTwitterSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaSquarePinterest } from "react-icons/fa6";
import { ImSkype } from "react-icons/im";
const Footer = () => {
  const { user } = useContext(Context);
  return (
    <>
      <footer className="bg-white mt-16  lg:grid lg:grid-cols-5 lg:w-[90%] lg:mx-auto">
        <div className="relative h-32 w-56 lg:col-span-2 flex flex-wrap flex-col items-center mb-36">
          <Image
            src={logo}
            alt="footer"
            
            className=" left-0 absolute"
          />
          <p className="pt-32 pl-5 w-72">
            Be the first to know about our special offers, news, and updates.
          </p>
          <div className="flex relative left-[-265px] text-3xl lg:text-2xl top-60 lg:gap-5  pb-10">
            <Link href={""}>
              <FaTwitterSquare />
            </Link>
            <Link href={""}>
              <FaSquareInstagram />
            </Link>
            <Link href={""}>
              <FaFacebookSquare />
            </Link>
            <Link href={""}>
              <IoLogoLinkedin />
            </Link>
            <Link href={""}>
              <FaSquarePinterest />
            </Link>
            <Link href={""}>
              <ImSkype />
            </Link>
          </div>
        </div>

        <div className="px-4 pt-5 pb-16 lg:ml-[-150px] sm:px-6 lg:col-span-3 lg:px-0">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
            <p className="font-semibold lg:text-2xl text-gray-900">BRAND</p>
            <ul className="mt-6 space-y-4 text-sm">
            <li>
              <a
                href="#!"
                className="text-gray-700 transition hover:opacity-75"
              >
                {" "}
                STORES
              </a>
            </li>

            <li>
              <a
                href="#!"
                className="text-gray-700 transition hover:opacity-75"
              >
                {" "}
                About
              </a>
            </li>

            <li>
              <a
                href="#!"
                className="text-gray-700 transition hover:opacity-75"
              >
                {" "}
                Contract
              </a>
            </li>

            

            
          </ul>

              
            </div>

            <div className="grid grid-cols-1 lg:ml-[-200px] gap-4 sm:grid-cols-2">
              <div>
                <p className="font-semibold lg:text-2xl text-gray-900">BORING STUFF</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      href="#!"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {" "}
                      LEGAL NOTICE
                    </a>
                  </li>

                  <li>
                    <a
                      href="#!"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {" "}
                      PRIVACY POLICY
                    </a>
                  </li>

                  <li>
                    <a
                      href="#!"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {" "}
                      TERMS
                    </a>
                  </li>

                  

                  
                </ul>
              </div>

              <div className="lg:w-72">
                <p className="font-semibold lg:text-2xl text-gray-900 lg:w-96">Sign up for our newsletter</p>

                <form action="lg:w-72">
                <input type="email" name="" id="" className="border-2 lg:w-72 border-black mt-5 py-3"/>
                <input type="submit" value="SUBSCRIBE" className="bg-black text-white px-6 py-2 mt-5"/>
                <p className="mt-5">We never Span You!</p>
                </form>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t  border-gray-100 pt-12">
            <div className="sm:flex sm:items-center sm:justify-between">
              <ul className="flex flex-wrap gap-4 text-xs">
                <li>
                  <a
                    href="#!"
                    className="text-gray-500 transition hover:opacity-75"
                  >
                    {" "}
                    Terms & Conditions{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#!"
                    className="text-gray-500 transition hover:opacity-75"
                  >
                    {" "}
                    Privacy Policy{" "}
                  </a>
                </li>

                <li>
                  <a
                    href="#!"
                    className="text-gray-500 transition hover:opacity-75"
                  >
                    {" "}
                    Cookies{" "}
                  </a>
                </li>
              </ul>

              <p className="mt-8 text-xs text-gray-500 sm:mt-0">
                &copy; 2024. Ritesh Clothing Store . All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
