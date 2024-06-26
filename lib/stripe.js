// const { Stripe, loadStripe } = require("@stripe/stripe-js");
import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripePromise = () => {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";

  if (!stripePromise && !!key) {
    stripePromise = loadStripe(key);
  }
  return stripePromise;
};

export default getStripePromise;
