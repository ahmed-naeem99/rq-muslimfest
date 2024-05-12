import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard";

export default function Home() {
  return (
    <main className="h-full">
      <h1>Hello World</h1>
      <Link href="/profile">Profile</Link>
      {/*Link keeps elements from being requested again everytime page is refreshed, replaces w requests to download user content to the page*/}
      <ProductCard />
    </main>
  );
}
