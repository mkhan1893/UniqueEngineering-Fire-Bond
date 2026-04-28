export interface Product {
  id?: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  subcategory: string;
  createdAt: any;
  updatedAt: any;
}

export type Page = "home" | "about" | "services" | "contact" | "products" | "admin" | "login" | "knowledge" | "access-denied";
