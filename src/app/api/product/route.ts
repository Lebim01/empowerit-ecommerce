import { getProducts } from "@/postgresql/products";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request?.nextUrl?.searchParams;
  const queryCategory = searchParams.get("category");
  const querySortBy = searchParams.get("sortBy");
  const querySearch = searchParams.get("search");

  const queryPage = searchParams.get("page");
  const queryPaginate = searchParams.get("paginate");

  let products = await getProducts({
    querySearch,
    querySortBy,
    queryCategory,
    queryPage,
    queryPaginate,
  });
  return NextResponse.json(products);
}
