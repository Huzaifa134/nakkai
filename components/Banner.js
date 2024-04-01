import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import banner1 from "@/public/banner1.png";
import banner2 from "@/public/banner2.png";
const Banner = () => {
  return (
    <div>
    <ul className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
          

          <li>
            <Link href={"/category/Kids"} className="group relative block">
              <Image
                height={300}
                width={300}
                src={banner2}
                alt=""
                className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
              />

              <div className="absolute inset-0 flex flex-col items-start justify-center  p-6">
                <h3 className="text-3xl font-medium text-white">
                WE MADE YOUR EVERYDAY FASHION BETTER!
                </h3>
                <p className='text-white'>In our journey to improve everyday fashion, euphoria presents EVERYDAY wear range - Comfortable & Affordable fashion 24/7</p>

                <span className="mt-1.5 inline-block bg-white px-5 py-3 text-xs font-medium uppercase tracking-wide text-black rounded">
                  Shop Now
                </span>
              </div>
            </Link>
          </li>
          
          <li>
            <Link href={"/category/Kids"} className="group relative block">
              <Image
                height={300}
                width={300}
                src={banner1}
                alt=""
                className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
              />

     
            </Link>
          </li>

         
        </ul>
    
    </div>
  )
}

export default Banner