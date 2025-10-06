import Stripe from "stripe";

// Use environment variable for restricted key
const stripe = new Stripe(process.env.STRIPE_RESTRICTED_KEY);

// Single Pro product mapping
const PRODUCT_PRICE_MAP = {
  "pro_upgrade": "price_XXXXXXXXXXXX", // Replace with your Stripe Price ID
};

export async function handler(event, context) {
  try {
    // Get the product requested from frontend
    const { product } = JSON.parse(event.body);

    const priceId = PRODUCT_PRICE_MAP[product];
    if (!priceId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid product" }),
      };
    }

    // Your deployed Netlify site URL
    const siteUrl = process.env.URL || "https://textspeeder.netlify.app";

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/success.html`,
      cancel_url: `${siteUrl}/cancel.html`,
    });

    return { statusCode: 200, body: JSON.stringify({ url: session.url }) };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
