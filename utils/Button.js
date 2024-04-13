"use client";
import { useState } from "react";
import  getStipePromise  from "@/lib/stripe";

const Button =   ({usersCart}) => {
  const product = usersCart?.map((item) => {
    return {
      name: item?.items?.map((item) => item?.name).join(","),
      price: item?.items?.map((item) => item?.price).join(","),
      quantity: item?.items?.map((item) => item?.quantity).join(","),
    };
  }
  );


  const [isLoading, setIsLoading] = useState(false);
  const handleCheckout = async (e) => {
    e.preventDefault();
    const stripe = await getStipePromise();
    const response = await fetch("api/stripe-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
      body: JSON.stringify(product),
    });

   

    const data = await response.json();
    console.log(data);
    if (data.session) {
      stripe?.redirectToCheckout({ sessionId: data.session.id });
    }
  };
  return (
    <button
    onClick={handleCheckout}
      disabled={isLoading}
      className={`flex w-full items-center justify-center rounded-md border border-transparent bg-[#2f4550] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[#2f4550] ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {isLoading ? "Processing..." : " Proceed to checkout"}
    </button>
  );
};

export default Button;
