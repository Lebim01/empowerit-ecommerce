import ProductDetailContent from "@/Components/ProductDetails";
import { Metadata } from "next";

export async function generateMetadata({ params }): Promise<Metadata> {
  const productData = await fetch(
    `${process.env.API_PROD_URL}product/${params?.productSlug}`
  )
    .then((res) => res.json())
    .catch((err) => console.log("err", err));

  console.log({
    title: productData?.meta_title,
    description: productData?.meta_description,
    openGraph: {
      title: productData?.meta_title,
      description: productData?.meta_description,
      images: [productData?.product_meta_image?.original_url, []],
    },
  });

  return {
    title: productData?.meta_title,
    description: productData?.meta_description,
    keywords: productData?.tags?.join(', '),
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
