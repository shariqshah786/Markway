"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { createProduct } from "@/actions/productActions";

export default function AddProductForm() {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPreviews: string[] = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
          if (newPreviews.length === files.length) {
            setImagePreviews(prev => [...prev, ...newPreviews]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const actionWrapper = async (formData: FormData) => {
    setIsSubmitting(true);
    const result = await createProduct(formData);
    if (result.success) {
      setImagePreviews([]);
      formRef.current?.reset();
      alert("Product created successfully!");
    } else {
      alert("Error creating product: " + result.error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8 p-6">
      <h2 className="text-lg font-heading font-semibold text-charcoal mb-4">Add New Product</h2>
      <form ref={formRef} action={actionWrapper} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate mb-2">Product Name</label>
            <input type="text" name="name" required className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-gold" placeholder="e.g. The Obsidian Cabin" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate mb-2">Category</label>
              <select name="category" className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-gold bg-white">
                <option value="Luggage">Luggage</option>
                <option value="Backpacks">Backpacks</option>
                <option value="Accessories">Accessories</option>
                <option value="Bags">Bags</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate mb-2">Price (₹)</label>
              <input type="number" name="price" required className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-gold" placeholder="25000" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate mb-2">Stock</label>
              <input type="number" name="stock" required className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-gold" placeholder="50" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate mb-2">Colors (Format: Name:Hex)</label>
              <input type="text" name="colors" className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-gold" placeholder="Black:#000, Silver:#C0C0C0" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate mb-2">Features (Comma separated)</label>
            <input type="text" name="features" className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-gold" placeholder="360 Wheels, TSA Lock, Waterproof" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate mb-2">Full Description</label>
            <textarea name="description" rows={5} required className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-gold" placeholder="Describe the product details in depth..."></textarea>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate mb-2">Product Images (Upload Multiple)</label>
            <div className="mt-1 flex flex-col gap-4">
              <div className="flex justify-center px-6 pt-8 pb-8 border-2 border-gray-300 border-dashed rounded-md hover:border-gold transition cursor-pointer relative bg-gray-50">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="images-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-gold hover:text-charcoal focus-within:outline-none">
                      <span>Upload files</span>
                      <input id="images-upload" name="images" type="file" className="sr-only" accept="image/*" multiple onChange={handleImageChange} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">Add up to 8 high-quality images</p>
                </div>
              </div>

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-4 gap-3">
                  {imagePreviews.map((preview, idx) => (
                    <div key={idx} className="relative group aspect-[3/4]">
                      <Image src={preview} alt={`Preview ${idx}`} width={200} height={200} className="h-full w-full object-cover rounded-md border border-gray-200" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition shadow-md"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-charcoal text-white px-6 py-5 text-sm font-bold uppercase tracking-[0.2em] hover:bg-gold transition shadow-xl disabled:opacity-50"
            >
              {isSubmitting ? "Processing..." : "Publish Product"}
            </button>
          </div>
          <p className="text-[10px] text-slate text-center uppercase tracking-widest">Markway International • Product Management</p>
        </div>
      </form>
    </div>
  );
}
