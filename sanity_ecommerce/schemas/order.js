export default {
    name: 'order',
    type: 'document',
    title: 'Orders',
    fields: [
        {
            name: "stripeId",
            type: "string",
            title: "Stripe Session ID",
        },
        {
            name: "customer_email",
            type: "string",
            title: "Customer Email",
        },
        {
            name: "items",
            title: "Ordered Items",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "name", type: "string", title: "Product Name" },
                        { name: "quantity", type: "number", title: "Quantity" },
                        { name: "price", type: "number", title: "Price" }
                    ]
                }
            ],
        },
        {
            name: "amount_total",
            type: "number",
            title: "Total Amount",
        },
        {
            name: "currency",
            type: "string",
            title: "Currency",
        },
        {
            name: "status",
            title: "Order Status",
            type: "string",
            options: {
                list: ["pending", "paid", "shipped", "completed", "cancelled"],
            },
        },
        {
            name: "createdAt",
            type: "datetime",
            title: "Created At",
        }
    ]
};
