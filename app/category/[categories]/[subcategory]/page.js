"use client";
import { useParams } from "next/navigation";
// import Category from "./Category";
import Subcategory from "./Subcategory";

const Cate = () => {
  const params = useParams();
  return (
    <div>
    
      <Subcategory paramss={params.subcategory}  params={params.categories}/>
    </div>
  );
};

export default Cate;
