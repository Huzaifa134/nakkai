const { NextRequest, NextResponse } = require("next/server");
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY || "";

const stripe = new Stripe(key, {
  apiVersion: "2022-11-15",
});

export const POST = async (req) => {
  const body = await req.json();
  console.log("this is route body",body);
  try {
    if (body.length > 0) {
      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "required",
        shipping_options: [
          { shipping_rate: "shr_1P58wSF6kfIdgAFtdLyMlUXK" },
          { shipping_rate: "shr_1P58vyF6kfIdgAFtLTir1sdJ" },
        ],
        invoice_creation: {
          enabled: true,
        },
        line_items: body.map((item) => {
          return {
            price_data: {
              currency: "USD",
              product_data: {
                name: item.name,
              },
              unit_amount: item.price * 100,
            },
            quantity: item.quantity,
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
              maximum: 10,
            },
          };
        }),
        phone_number_collection: {
          enabled: true,
        },
        // success_url: `${req.headers.get("origin")}/success`,
        success_url: `${req.headers.get("origin")}/`,
        cancel_url: `${req.headers.get("origin")}/?canceled=true`,
      });
      return NextResponse.json({ session });
    } else {
      return NextResponse.json({ message: "No Data Found" });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(err.message);
  }
}

