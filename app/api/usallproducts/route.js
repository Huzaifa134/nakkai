import connectDB from "@/db/Database";
import ClothingProductUS from "@/models/USProduct";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  await connectDB();
  try {
    const products = await ClothingProductUS.find({});
    return NextResponse.json({
      status: 200,
      message: "success",
      data: products,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
};
