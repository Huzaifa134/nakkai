// pages/api/category/[cate]/subcategory/[subcate].js

import connectDB from "@/db/Database";
import ClothingProduct from "@/models/Product";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await connectDB();
    const { cate, subcate } = params;
    const products = await ClothingProduct.find({ category: cate, subcategory: subcate });
    return NextResponse.json(
      {
        status: "success",
        data: products,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: "error",
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
};
