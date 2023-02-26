import Layout from "@/components/Layout";
import React from "react";
import { useRouter } from "next/router";
import data from "@/utils/data";
import Image from "next/image";
import Link from "next/link";

export default function ProductDetail() {
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);

  if (!product) {
    return <div>Product not return</div>;
  }

  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/" className="text-black">
          back to products
        </Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              Rating: {product.rating} stars ({product.numReviews} reviews)
            </li>
            <li>Description: {product.description}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex-justify-between">
              <div>Price</div>
              <div>${product.price}</div>
            </div>
            <div className="mb-2 flex-justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? "In Stock" : "Unavailable"}</div>
            </div>
            <div className="primary-button w-full">Add to cart</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
