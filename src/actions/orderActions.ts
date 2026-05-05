"use server";

import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import { revalidatePath } from "next/cache";

export async function createOrder(orderData: any) {
  try {
    await dbConnect();
    
    const newOrder = new Order({
      customer: {
        name: orderData.customer.name,
        email: orderData.customer.email,
        phone: orderData.customer.phone,
        address: orderData.customer.address,
      },
      items: orderData.items.map((item: any) => ({
        product: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        color: item.color,
      })),
      totalAmount: orderData.totalAmount,
      status: "Processing",
      paymentMethod: orderData.paymentMethod || "Stripe",
      paymentStatus: "Paid", // For this demo, assuming payment is successful
    });

    const savedOrder = await newOrder.save();
    
    revalidatePath("/admin/orders");
    revalidatePath("/admin"); // For dashboard stats
    
    return { success: true, orderId: savedOrder._id.toString() };
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, error: "Failed to create order" };
  }
}

export async function getOrders() {
  try {
    await dbConnect();
    const orders = await Order.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
}
