import Stripe from "stripe";

// Option 1: Use environment variable (recommended)
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Option 2: Inline key (for testing only, less secure)
const stripe = new Stripe("sk_test_XXXXXXXXXXXXXXXXXXXX"); // Replace with your Stripe secret key

// Single Pro product
const PRODUCT_PRICE_MAP = {
  "pro_upgrade": "price_XXXXXXXXXXXX", // Replace with your Stripe Price ID
};

export async function handler(event, context) {
  try {
    // Read the product key from frontend POST request
    const { product } = JSON.parse(event.body);

    const priceId = PRODUCT_PRICE_MAP[product];
    if (!priceId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid product" }),
      };
    }

    // Site URL (replace with your deployed Netlify URL)
    const siteUrl = "https://textspeeder.netlify.app"; 

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
