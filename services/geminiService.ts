
import { GoogleGenAI, Type } from "@google/genai";
import type { Product } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const productSchema = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.NUMBER },
    name: { type: Type.STRING },
    description: { type: Type.STRING },
    price: { type: Type.NUMBER },
    category: { type: Type.STRING },
    imageUrl: { type: Type.STRING },
  },
  required: ['id', 'name', 'description', 'price', 'category', 'imageUrl'],
};

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate a list of 12 modern and appealing e-commerce products for a fictional online store. Include diverse categories like electronics, apparel, home goods, and accessories. For each product, provide an ID (sequential from 1), name, a compelling one-sentence description, a realistic price (number only), a category, and a placeholder image URL from picsum.photos with a unique seed (e.g., https://picsum.photos/seed/product{id}/400/300).",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: productSchema,
        },
      },
    });

    const productsJson = response.text.trim();
    const products = JSON.parse(productsJson) as Product[];
    return products;

  } catch (error) {
    console.error("Error fetching products from Gemini API:", error);
    // Return a fallback static list in case of API error
    return [
      { id: 1, name: "Acoustic Pro Headphones", description: "Experience crystal-clear audio with these noise-cancelling over-ear headphones.", price: 149.99, category: "Electronics", imageUrl: "https://picsum.photos/seed/product1/400/300" },
      { id: 2, name: "Nomad Canvas Backpack", description: "A stylish and durable backpack perfect for daily commutes or weekend adventures.", price: 79.50, category: "Apparel", imageUrl: "https://picsum.photos/seed/product2/400/300" },
      { id: 3, name: "Minimalist Ceramic Vase", description: "Add a touch of modern elegance to your home with this handcrafted ceramic vase.", price: 45.00, category: "Home Goods", imageUrl: "https://picsum.photos/seed/product3/400/300" },
      { id: 4, name: "Smart Fitness Tracker", description: "Monitor your health and fitness goals with this sleek, feature-packed smart tracker.", price: 99.99, category: "Electronics", imageUrl: "https://picsum.photos/seed/product4/400/300" },
      { id: 5, name: "Organic Cotton Tee", description: "A classic, ultra-soft t-shirt made from 100% organic cotton for everyday comfort.", price: 29.95, category: "Apparel", imageUrl: "https://picsum.photos/seed/product5/400/300" },
      { id: 6, name: "AeroPress Coffee Maker", description: "Brew rich, smooth coffee without bitterness in under a minute with this innovative press.", price: 34.99, category: "Home Goods", imageUrl: "https://picsum.photos/seed/product6/400/300" },
    ];
  }
};
