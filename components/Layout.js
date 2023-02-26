import React, { useState, useEffect} from "react";
import Head from "next/head";
import Link from "next/link";

export default function Layout({ children, title }) {
    const [year, setYear] = useState();

    useEffect(() => {
        const interval = setInterval(() => {
            setYear(new Date().getFullYear())
        }, 1000)
        return () => clearInterval(interval)
    }, [])

  return (
    <>
      <Head>
        <title>{title ? title + "- ANT-Ecommerce" : "ANT Ecommerce"}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link href="/">
              <p className="text-lg font-bold text-black">ANT Ecommerce</p>
            </Link>
            <div className="flex">
              <Link href="/cart">
                <p className="p-2">Cart</p>
              </Link>
              <Link href="/login">
                <p className="p-2">Login</p>
              </Link>
            </div>
          </nav>
        </header>

        <main className="container m-auto mt-4 px-4">{children}</main>

        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>Copyright © {year}  ANT Ecommerce</p>
          </footer>
      </div>
    </>
  );
}
