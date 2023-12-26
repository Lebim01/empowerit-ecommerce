export type Product = {
  title: string;
  description: string;
  status: "active" | "inactive";
};

export type Variant = {};

export interface ProductWithVariants extends Product {
  variants: Variant;
}
