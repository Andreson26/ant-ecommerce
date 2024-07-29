import Layout from "@/components/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import ProductItem from "@/components/ProductItem";
import db from "@/utils/db";
import Product from "@/models/Product";
import { useContext } from "react";
import { Store } from "@/utils/Store";

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      return toast.error("Sorry. Product is out of stock");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    toast.success("Product added to cart");
  };

  return (
    <Layout title="home page">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => {
          return (
            <ProductItem
              key={product.slug}
              product={product}
              addToCartHandler={addToCartHandler}
            />
          );
        })}
      </div>
    </Layout>
  );
}
console.log(db)
export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
