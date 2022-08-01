import React, { useEffect , useState } from 'react';
import {QrScanner} from "react-qrcode-scanner";
import axios from "axios";

function validateNFT() {
    const [value, setValue] = useState(0);
    const [foundval , setFoundVal] = useState("Not found");

    const handleScan = (value) => {
        console.log(value);
        setValue(parseInt(value));
        axios
        .get(`http://localhost:4000/${value}`)
        .then((res) => {
                console.log(res);
                setFoundVal("NFT validated");
            })
            .catch((err) => {
              console.log(err);
            });
        console.log(foundval);
    }

    const handleError = (error) => {
        console.log({error})
    }
    const  video = {
        width: '30%',
        height: '35%',
    }

        
    return (

        <div className="flex justify-center">
            <div><h1 className="m-10 text-gray-900">Validate your nft here</h1></div>
            <div>To Verify you NFT please scan the QR code</div>
            <div> {
                (value ===0) ? <div  className="mt-10"><QrScanner
                onScan={handleScan}
                onError={handleError}
                video
            /></div>:
            <div className='m-10 card'>
                <h2>{foundval}</h2>
            </div>
            }</div>
           
           
        </div>
    );
}

export default validateNFT;