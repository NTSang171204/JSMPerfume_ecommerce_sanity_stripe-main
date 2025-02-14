import Stripe from "stripe";
import { client } from "../../lib/client";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    const { session_id } = req.body;
    if (!session_id) {
      return res.status(400).json({ error: "Session ID is required" });
    }

    //Take the order session and retrieve the line items
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items"],
    });

    const line_items = session.line_items.data;

    const orderData = {
      _type: "order",
      stripeId: session_id,
      amount_total: session.amount_total,
      currency: session.currency,
      status: "paid",
      customer_email: session.customer_details.email,
      createdAt: new Date().toISOString(),
      items: line_items.map((item) => ({
        name: item.description,
        quantity: item.quantity,
        price: item.amount_total,
      })),
    };

    const result = await client.create(orderData);
    console.log("Order created in Sanity:", result);
    return res
      .status(200)
      .json({ Message: "Order saved successfully", order: orderData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
