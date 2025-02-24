import { z } from "zod";
import data from "../data.json";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const { slug } = await context.params;

  const validatedSlug = z.string().parse(slug);

  const product = data.products.find(
    (product) => product.slug === validatedSlug
  );

  if (!product) {
    return Response.json({ message: "Product not found" }, { status: 400 });
  }

  return Response.json(product);
}
