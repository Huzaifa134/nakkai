import React ,{ useState } from 'react'

import Collection from "@/components/Collection";
import HomeProducts from "@/components/HomeProducts";
import Link from 'next/link'
import Banner from '@/components/Banner';
const HeadPart = () => {
    
  const [show] = useState(true);
  return (
    <div>
    <Collection />
    <header className="text-center mb-10">
    <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
    OUR PRODUCTS
    </h2>

    <p className="mx-auto mt-4 max-w-xl text-gray-500 mb-10">
    Clothing is something we all should wear in order to fit in to society. The act of wearing clothing is a choice in some indigenous societies
    </p>
    <Link href={""} className="px-10 py-2 border-2 border-gray-500 ">Shop All</Link>
  </header>
      <HomeProducts show={show} />
      <Banner/>
    </div>
  )
}

export default HeadPart