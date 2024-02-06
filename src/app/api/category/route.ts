import { countProductsByCategory } from "@/postgresql/products";
import category from "../../../../Data/category.json";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = category as any;
  await Promise.all(
    categories.data.map(async (category) => {
      category.products_count = await countProductsByCategory(category.slug);
    })
  );
  return NextResponse.json(categories);
}
