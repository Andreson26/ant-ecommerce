import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { Store } from "@/utils/Store";
import { ToastContainer } from "react-toastify";
import { Menu } from "@headlessui/react";
import "react-toastify/dist/ReactToastify.css";
import { useSession, signOut } from "next-auth/react";
import DropdownLink from "./DropdownLink";
import Cookies from "js-cookie";

export default function Layout({ children, title }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [year, setYear] = useState();
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const { status, data: session } = useSession();

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));

    const interval = setInterval(() => {
      setYear(new Date().getFullYear());
    }, 1000);
    return () => clearInterval(interval);
  }, [cart.cartItems]);

  const logoutHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/login" });
  };

  return (
    <>
      <Head>
        <title>{title ? title + "- ANT-Ecommerce" : "ANT Ecommerce"}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link href="/">
              <p className="text-lg font-bold text-black">ANT Ecommerce</p>
            </Link>
            <div className="flex">
              <Link href="/cart">
                <p className="p-2">
                  Cart
                  {cartItemsCount > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cartItemsCount}
                    </span>
                  )}
                </p>
              </Link>
              {status === "loading" ? (
                <p className="p-2">Loading...</p>
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-blue-600 p-2">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white shadow-lg text-blue-800">
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/profile">
                        Profile
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/order-history"
                      >
                        Order History
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <Link
                        className="dropdown-link"
                        href="#"
                        onClick={logoutHandler}
                      >
                        Logout
                      </Link>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/login">
                  <p className="p-2">Login</p>
                </Link>
              )}
            </div>
          </nav>
        </header>

        <main className="container m-auto mt-4 px-4">{children}</main>

        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>Copyright © {year} ANT Ecommerce</p>
        </footer>
      </div>
    </>
  );
}
