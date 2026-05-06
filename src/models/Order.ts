import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String },
      address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String,
      },
    },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        name: String,
        price: Number,
        quantity: Number,
        color: String,
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Order Created Successfully", "Preparing", "Completed", "Delivered Successfully", "Cancelled"],
      default: "Order Created Successfully",
    },
    paymentMethod: { type: String, default: "Stripe" },
    paymentStatus: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

const Order = models.Order || model("Order", OrderSchema);
export default Order;
