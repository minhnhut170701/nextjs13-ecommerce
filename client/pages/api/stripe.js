import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_SECRET_STRIPE_KEY);

export default async function handler(req, res) {
  const { cart, discount } = req.body;
  let coupon
  if(discount){
    coupon = await stripe.coupons.retrieve(`${discount}`);
  }
  if (req.method === "POST") {
    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        ...(discount && {
          discounts: [
            {
              coupon: `${coupon.id || ""}`,
            },
          ],
        }),
        shipping_address_collection: {
          allowed_countries: ['VN'],
        },
        payment_method_types: ["card"],
        billing_address_collection: "required",
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: { amount: 0, currency: "usd" },
              display_name: "Free shipping",
              delivery_estimate: {
                minimum: { unit: "business_day", value: 5 },
                maximum: { unit: "business_day", value: 7 },
              },
            },
          },
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: { amount: 10 * 100, currency: "usd" },
              display_name: "Fast shipping",
              delivery_estimate: {
                minimum: { unit: "business_day", value: 2 },
                maximum: { unit: "business_day", value: 3 },
              },
            },
          },
        ],
        line_items: cart.map((item) => {
          const img = item.banner;
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.productName,
                images: [img],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.qty,
          };
        }),
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      };

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
