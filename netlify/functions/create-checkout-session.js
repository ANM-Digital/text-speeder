import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Map your relevant products to their Stripe Price IDs
const PRODUCT_PRICE_MAP = {
  "prod_TBGWcCeAc21K2T": "price_XXXXXXXX1", // Replace with actual Price ID for prod_TBGWcCeAc21K2T
  "prod_TBGEuiuCxQWImD": "price_XXXXXXXX2", // Replace with actual Price ID for prod_TBGEuiuCxQWImD
};

export async function handler(event, context) {
  try {
    // Read the product key from frontend POST request
    const { product } = JSON.parse(event.body);

    const priceId = PRODUCT_PRICE_MAP[product];
    if (!priceId) {
      return { statusCode: 400, body: JSON.stringify({ error: "Invalid product" }) };
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.URL}/success.html`,
      cancel_url: `${process.env.URL}/cancel.html`,
    });

    return { statusCode: 200, body: JSON.stringify({ url: session.url }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
