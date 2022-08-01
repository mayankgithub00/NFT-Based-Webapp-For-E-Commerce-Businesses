import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import axios from "axios";
import uniqid from "uniqid";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

import { marketplaceAddress } from "../config";

import NFTMarketplace from "../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    price: "0.0",
    id: uniqid(),
    name: "",
    description: "",
    ownership: "",
    status: "",
    warranty: "",
  });
  const router = useRouter();

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  async function uploadToIPFS() {
    const { name, description, price, ownership, status, warranty, id } =
      formInput;
    if (
      !name ||
      !description ||
      !price ||
      !ownership ||
      !status ||
      !warranty ||
      !fileUrl
    )
      return;
    /* first, upload to IPFS */
    const data = JSON.stringify({
      id,
      name,
      description,
      ownership,
      status,
      warranty,
      image: fileUrl,
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, return the URL to use it in the transaction */
      return url;
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function listNFTForSale() {
    const url = await uploadToIPFS();
    console.log("urldone");
    const web3Modal = new Web3Modal();
    console.log("urldone1");
    const connection = await web3Modal.connect();
    console.log("urldone2");
    const provider = new ethers.providers.Web3Provider(connection);
    console.log("urldone4");
    const signer = provider.getSigner();
    console.log("urldone5");

    /* next, create the item */
    const price = ethers.utils.parseUnits(formInput.price, "ether");
    let contract = new ethers.Contract(
      marketplaceAddress,
      NFTMarketplace.abi,
      signer
    );

    let listingPrice = await contract.getListingPrice();

    listingPrice = listingPrice.toString();
    console.log("urldone6");
    let transaction = await contract.createToken(url, price, {
      value: listingPrice,
    });

    await transaction.wait();
    const item = {
      id: formInput.id,
      name: formInput.name,
      description: formInput.description,
      ownership: formInput.ownership,
      status: formInput.status,
      warranty: formInput.warranty,
      url: url,
    };
    axios({
      method: "post",
      url: "http://localhost:4000/",
      headers: {
        "Content-Type": "application/json",
      },
      data: item,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    
    router.push("/dashboard");
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input
          placeholder="Product Name"
          className="mt-8 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, name: e.target.value })
          }
        />
        <textarea
          placeholder="Product Description"
          className="mt-4 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, description: e.target.value })
          }
        />
        <input
          placeholder="Ownership"
          className="mt-4 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, ownership: e.target.value })
          }
        />
        <input
          placeholder="status"
          className="mt-4 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, status: e.target.value })
          }
        />
        <input
          placeholder="Warranty Info"
          className="mt-4 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, warranty: e.target.value })
          }
        />
        <input type="file" name="Asset" className="my-4" onChange={onChange} />
        {fileUrl && <img className="rounded mt-4" width="350" src={fileUrl} />}
        <button
          onClick={listNFTForSale}
          className="font-bold mt-4 bg-blue-500 text-white rounded p-4 shadow-lg"
        >
          Create NFT
        </button>
      </div>
    </div>
  );
}
