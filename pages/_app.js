/* pages/_app.js */
import "../styles/globals.css";
import Link from "next/link";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav className="border-b p-6">
        <p className="text-4xl font-bold">NFT Listings for Products</p>
        <div className="flex mt-4">
          <Link href="/">
            <a className="mr-4 text-blue-500">All listings</a>
          </Link>
          <Link href="/create-nft">
            <a className="mr-6 text-blue-500">Mint NFT</a>
          </Link>
          <Link href="/my-nfts">
            <a className="mr-6 text-blue-500">My NFTs</a>
          </Link>
          <Link href="/dashboard">
            <a className="mr-6 text-blue-500">Dashboard</a>
          </Link>
          <Link href="/validatenft">
            <a className="mr-6 text-blue-500">ValidateNFT</a>
          </Link>
          <Link href="/decaynft">
            <a className="mr-6 text-blue-500">DecayNFT</a>
          </Link>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
