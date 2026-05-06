"use server";

import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import { revalidatePath } from "next/cache";
import { sendOrderEmail } from "@/lib/email";

export async function createOrder(orderData: { customer: { name: string, email: string, phone: string, address: { street: string, city: string, state: string, country: string, zip: string } }, items: Array<{ id: string, name: string, price: number, quantity: number, color?: string }>, totalAmount: number, paymentMethod?: string }) {
  try {
    await dbConnect();
    
    const newOrder = new Order({
      customer: {
        name: orderData.customer.name,
        email: orderData.customer.email,
        phone: orderData.customer.phone,
        address: orderData.customer.address,
      },
      items: orderData.items.map((item) => ({
        product: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        color: item.color,
      })),
      totalAmount: orderData.totalAmount,
      status: "Order Created Successfully",
      paymentMethod: orderData.paymentMethod || "Stripe",
      paymentStatus: "Paid", // For this demo, assuming payment is successful
    });

    const savedOrder = await newOrder.save();
    
    revalidatePath("/admin/orders");
    revalidatePath("/admin"); // For dashboard stats
    
    // Send order creation email
    const emailSubject = `Order Confirmation - ${savedOrder._id}`;
    const emailHtml = `
      <h1>Thank you for your order!</h1>
      <p>Your order has been created successfully.</p>
      <p>Order ID: ${savedOrder._id}</p>
      <p>Total Amount: ₹${savedOrder.totalAmount}</p>
      <p>We will notify you when your order is preparing and shipped.</p>
    `;
    await sendOrderEmail(savedOrder.customer.email, emailSubject, emailHtml);
    
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
    return [];
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  try {
    await dbConnect();
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    
    if (!updatedOrder) {
      return { success: false, error: "Order not found" };
    }
    
    revalidatePath("/admin/orders");
    
    // Send email on status update
    const emailSubject = `Order Update - ${updatedOrder._id}`;
    const emailHtml = `
      <h1>Your Order Status Updated</h1>
      <p>Your order (ID: ${updatedOrder._id}) status has been updated to: <strong>${status}</strong></p>
      <p>Thank you for shopping with us!</p>
    `;
    await sendOrderEmail(updatedOrder.customer.email, emailSubject, emailHtml);
    
    return { success: true };
  } catch (error) {
    console.error("Error updating order status:", error);
    return { success: false, error: "Failed to update order status" };
  }
}
