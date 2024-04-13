"use client"
import React, { Fragment, useContext, useEffect, useState } from "react";
import Link from 'next/link'
import { Context } from "@/Context/Context";
import Image from "next/image";
import axios from "axios";
import Button from "@/utils/Button";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Form from "./Form";
const Checkout = () => {
    const { user } = useContext(Context);
    const [usersCart, setUserCart] = useState([]);
    const [product, setProduct] = useState([]);
    const totalPrice = usersCart?.reduce(
      (total, item) =>
        total +
        item?.items?.reduce(
          (total, item) => total + item?.price * item?.quantity,
          0
        ),
      0
    );
          
    // get user cart data
    useEffect(() => {
      const getCart = async () => {
        try {
          const res = await axios.post("https://nakkai.vercel.app/api/cart-item", {
            userId: user?.data?._id,
          });
          if (res?.data?.cartItem?.length === 0) {
            return null;
          }
  
          setUserCart(res?.data?.cartItem);
          
          
          
        } catch (error) {
          console.log(error);
        }
      };
      user && getCart();
    }, [user]);
  return (
    
    <div className="container mx-auto flex  flex-wrap justify-center gap-10 ">
    <div className=" lg:w-[40%] max-[730px]:w-[100%] gap-10 overflow-y-auto  h-[500px]">
         <div className="mt-8">
         <div className="flow-root">
           {user?.data ? (
             <ul
               role="list"
               className="-my-6 divide-y divide-gray-200"
             >
               {usersCart?.length ? (
                 usersCart
                   ?.map((user, userIndex) => {
                     return (
                       <React.Fragment key={userIndex}>
                         {user?.items?.map((item) => {
                           return (
                             <>
                               <li
                                 key={item?._id}
                                 className="flex py-6"
                               >
                                 <Link
                                   href={`/products/${item?.productId}`}
                                   className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md"
                                 >
                                   <Image
                                     height={200}
                                     width={200}
                                     src={item?.image}
                                     alt={item?.name}
                                     className="h-full w-full object-contain object-center"
                                   />
                                 </Link>

                                 <div className="ml-4 flex flex-1 flex-col">
                                   <div>
                                     <div className="flex justify-between text-base font-medium text-gray-900">
                                       <h3>
                                         <a href={item?.href}>
                                           {item?.name}
                                         </a>
                                       </h3>

                                       <p className="ml-4 pr-4">
                                         ₹{item?.price}
                                       </p>
                                     </div>
                                   </div>
                                   <p className="mt-4 text-[12px] text-gray-500">
                                     {item?.size}
                                   </p>
                                   <div className="flex flex-1 items-end justify-between text-sm">
                                     <p className="text-gray-500">
                                       Qty {item?.quantity}
                                     </p>

                                    
                                   </div>
                                 </div>
                               </li>
                             </>
                           );
                         })}
                       </React.Fragment>
                     );
                   })
                   .reverse()
               ) : (
                 <>
                   <div className="flex justify-center items-center h-40">
                     {" "}
                     <p className="text-lg font-medium text-gray-900">
                       Cart is empty
                     </p>
                   </div>
                 </>
               )}
             </ul>
           ) : (
             <div className="flex justify-center items-center h-40">
               {" "}
               <p className="text-lg font-medium text-gray-900">
                 Login to view cart
               </p>
             </div>
           )}
         </div>
       </div>


     
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      {user?.data && (
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>₹ {totalPrice}.00</p>
                        </div>
                      )}
                      {user?.data && (
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                      )}
                   
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <Link
                            href="/products"
                            className="font-medium text-[#2f4550] hover:text-[#2f4550]"
                            
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </Link>
                        </p>
                      </div>
                    </div>

        
    
    
    </div>

    <div className=" flex  flex-col flex-wrap pt-5 lg:w-[40%] max-[730px]:w-[100%]">
    <Form usersCart={usersCart} />
    </div>

    </div>
  )
}

export default Checkout