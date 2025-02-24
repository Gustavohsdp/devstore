import { IProduct } from "@/app/api/products/types/product";
import { api } from "@/config/api";
import { env } from "@/env";
import { ImageResponse } from "next/og";
import colors from "tailwindcss/colors";

export const runtime = "edge";

export const alt = "";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

async function getProduct(slug: string): Promise<IProduct> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 15, // 15 minutes
    },
  });

  const product = await response.json();

  return product;
}

export default async function OgImage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  console.log(product);

  const productImageURL = new URL(product.image, env.APP_URL).toString();

  return new ImageResponse(
    (
      <div
        style={{
          background: colors.zinc[950],
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <img src={productImageURL} alt="" style={{ width: "100%" }} />
      </div>
    ),
    {
      ...size,
    }
  );
}
