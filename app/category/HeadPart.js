import React ,{ useState } from 'react'

import Collection from "@/components/Collection";
import HomeProducts from "@/components/HomeProducts";
const HeadPart = () => {
    
  const [show] = useState(true);
  return (
    <div>
    <Collection />
      <span className="text-2xl font-bold text-center mt-10 mb-10">
        Recent Products List
      </span>
      <HomeProducts show={show} />
    </div>
  )
}

export default HeadPart