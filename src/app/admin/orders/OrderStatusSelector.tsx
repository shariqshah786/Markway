"use client";

import { useState } from "react";
import { updateOrderStatus } from "@/actions/orderActions";

interface Props {
  orderId: string;
  currentStatus: string;
}

const statuses = ["Order Created Successfully", "Preparing", "Completed", "Delivered Successfully", "Cancelled"];

export default function OrderStatusSelector({ orderId, currentStatus }: Props) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setLoading(true);
    
    try {
      const res = await updateOrderStatus(orderId, newStatus);
      if (!res.success) {
        alert("Failed to update status");
        setStatus(currentStatus); // Revert on failure
      }
    } catch (error) {
      console.error(error);
      alert("Error updating status");
      setStatus(currentStatus);
    } finally {
      setLoading(false);
    }
  };

  return (
    <select
      value={status}
      onChange={handleChange}
      disabled={loading}
      className={`px-3 py-1 rounded-full text-xs font-medium border-none outline-none cursor-pointer
        ${status === 'Delivered Successfully' ? 'bg-green-100 text-green-800' : 
          status === 'Completed' ? 'bg-blue-100 text-blue-800' : 
          status === 'Preparing' ? 'bg-yellow-100 text-yellow-800' :
          status === 'Cancelled' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'}
      `}
    >
      {statuses.map(s => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}
