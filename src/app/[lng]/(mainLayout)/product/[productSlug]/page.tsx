import ProductDetailContent from "@/Components/ProductDetails";
import { removeEmojis } from "@/Utils/Emojis";
import { Metadata } from "next";

export async function generateMetadata({ params }): Promise<Metadata> {
  const productData = await fetch(
    `${process.env.API_PROD_URL}product/${params?.productSlug}`
  )
    .then((res) => res.json())
    .then((res) => ({
      meta_title: res.meta_title,
      meta_description: removeEmojis(res.meta_description),
      product_meta_image: res.product_meta_image,
      tags: res.tags,
    }));

  return {
    title: productData?.meta_title,
    description: productData?.meta_description,
    keywords: productData?.tags?.join(", "),
    openGraph: {
      title: productData?.meta_title,
      description: productData?.meta_description,
      images: [productData?.product_meta_image?.original_url, []],
    },
  };
}

const ProductDetails = ({ params }) => {
  return (
    <>
      <ProductDetailContent params={params?.productSlug} />
    </>
  );
};

export default ProductDetails;
