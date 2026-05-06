"use server";

import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { revalidatePath } from "next/cache";

export async function getProducts(filters: { category?: string, q?: string, minPrice?: number, maxPrice?: number } = {}) {
  try {
    await dbConnect();
    
    const query: {
      category?: string;
      name?: { $regex: string; $options: string };
      price?: { $gte?: number; $lte?: number };
    } = {};
    
    if (filters.category && filters.category !== "All") {
      query.category = filters.category;
    }
    
    if (filters.q) {
      query.name = { $regex: filters.q, $options: "i" };
    }
    
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      query.price = {};
      if (filters.minPrice !== undefined) query.price.$gte = filters.minPrice;
      if (filters.maxPrice !== undefined) query.price.$lte = filters.maxPrice;
    }

    const products = await Product.find(query).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductById(id: string) {
  try {
    await dbConnect();
    const product = await Product.findById(id).lean();
    if (!product) return null;
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}

export async function createProduct(formData: FormData) {
  try {
    await dbConnect();
    
    const name = formData.get("name") as string;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    
    // Handling multiple images - Converting to Base64 for immediate visibility
    const imageFiles = formData.getAll("images") as File[];
    const imageUrls: string[] = [];

    if (imageFiles && imageFiles.length > 0 && imageFiles[0].name !== "undefined") {
      for (const file of imageFiles) {
        if (file.size > 0) {
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const base64 = buffer.toString("base64");
          const dataUrl = `data:${file.type};base64,${base64}`;
          imageUrls.push(dataUrl);
        }
      }
    }

    // Fallback if no images were actually uploaded
    if (imageUrls.length === 0) {
      imageUrls.push("/placeholder-luggage.png");
    }

    // Parsing colors: "Black:#000, Silver:#C0C0C0"
    const colorsInput = formData.get("colors") as string;
    const colors = colorsInput ? colorsInput.split(",").map(c => {
      const [name, hex] = c.split(":").map(s => s.trim());
      return { name: name || "Default", hex: hex || "#000" };
    }) : [{ name: "Midnight Black", hex: "#1C1C1C" }];

    // Parsing features
    const featuresInput = formData.get("features") as string;
    const features = featuresInput ? featuresInput.split(",").map(f => f.trim()) : [];

    const newProduct = new Product({
      name: name,
      slug: slug,
      description: formData.get("description"),
      price: Number(formData.get("price")),
      category: formData.get("category"),
      stock: Number(formData.get("stock")),
      images: imageUrls,
      colors: colors,
      features: features,
    });

    await newProduct.save();
    revalidatePath("/admin/products");
    revalidatePath("/shop");
    return { success: true };
  } catch (error) {
    console.error("Error creating product:", error);
    return { success: false, error: "Failed to create product" };
  }
}

export async function deleteProduct(id: string) {
  try {
    await dbConnect();
    await Product.findByIdAndDelete(id);
    revalidatePath("/admin/products");
    revalidatePath("/shop");
    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: "Failed to delete product" };
  }
}
