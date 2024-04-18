import connectDB from "@/db/Database";
import ClothingProductUS from "@/models/USProduct";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  await connectDB();
  try {
    const product = await ClothingProductUS.findById(params.product);
    return NextResponse.json({
      status: 200,
      message: "success",
      data: product,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
};

export const PUT = async (res, { params }) => {
  await connectDB();
  const { product } = await res.json();
  try {
    const updated = await ClothingProductUS.findByIdAndUpdate(
      params.product,
      product
    );
    return NextResponse.json({
      status: 200,
      message: "success",
      data: updated,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
};

export const DELETE = async (req, { params }) => {
  await connectDB();
  try {
    const deleted = await ClothingProductUS.findByIdAndDelete(params.product);
    return NextResponse.json({
      status: 200,
      message: "success",
      data: deleted,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
};
