import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import QRCode from "qrcode";

import { marketplaceAddress } from "../config";

import NFTMarketplace from "../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CreatorDashboard() {
  const [open, setOpen] = React.useState(false);
  const [nftInfo, setNftInfo] = React.useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [imageUrl, setImageUrl] = useState("");
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    loadNFTs();
  }, []);
  async function generateQR(id) {
    const response = await QRCode.toDataURL(id);
    setImageUrl(response);
  }
  async function loadNFTs() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      marketplaceAddress,
      NFTMarketplace.abi,
      signer
    );
    const data = await contract.fetchItemsListed();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await contract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          id: meta.data.id,
        };
        return item;
      })
    );

    setNfts(items);
    setLoadingState("loaded");
  }
  if (loadingState === "loaded" && !nfts.length)
    return <h1 className="py-10 px-20 text-3xl">No NFTs listed</h1>;
  return (
    <div>
      <div className="p-4">
        <h2 className="text-2xl py-2">Items Listed</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {nfts.map((nft, i) => (
            <div
              key={i}
              className="border shadow rounded-xl overflow-hidden cursor-pointer"
              onClick={() => {
                console.log(nft.id);
                axios
                  .get(`http://localhost:4000/${nft.id}`)
                  .then((res) => {
                    console.log(res);
                    axios
                      .get(res.data[0].url)
                      .then((res) => {
                        setImageData(res.data);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                    setNftInfo(res.data[0]);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                handleOpen();
              }}
            >
              <img src={nft.image} className="rounded p-4" />
            </div>
          ))}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <p
                className="float-right text-xl cursor-pointer"
                onClick={() => {
                  setOpen(false);
                }}
              >
                X
              </p>
              <img src={imageData.image} className="rounded p-4" />
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Name: {nftInfo.name}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Description: {nftInfo.description}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Ownership: {nftInfo.ownership}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Status: {nftInfo.status}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                WarrantyInfo: {nftInfo.warrantyInfo}
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                onClick={() => {
                  generateQR(nftInfo.id);
                }}
              >
                <button className="border-2 p-2 bg-blue-500 text-white">
                  Generate QR
                </button>
                <br />
                <br />
                {imageUrl ? (
                  <a href={imageUrl} download>
                    {" "}
                    <img src={imageUrl} />
                  </a>
                ) : null}
              </Typography>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
}
