"use client";
import { useParams } from "next/navigation";
import Category from "./Category";

const Cate = () => {
  const params = useParams();
  console.log("this is category log",params.categories)
  return (
    <div>
      <Category params={params.categories} />
    </div>
  );
};

export default Cate;
