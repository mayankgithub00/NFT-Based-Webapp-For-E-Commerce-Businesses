import React, { useEffect , useState } from 'react';
import {QrScanner} from "react-qrcode-scanner";
import axios from "axios";

function decayNFT() {
    const [value, setValue] = useState(0);
    const [foundval , setFoundVal] = useState("Not found");

    const handleScan = (value) => {
        console.log(value);
        setValue(parseInt(value));
        axios
        .get(`http://localhost:4000/decay/${value}`)
        .then((res) => {
                console.log(res);
                foundval = "Nft decayed";
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
        width: '40%',
        height: '45%',
    }

        
    return (

        <div className="flex justify-center">
            <div><h1 className=" text-gray-900">Validate your nft here</h1></div>
            <div> {
                (value ===0) ? <div  className="mt-10"><QrScanner
                onScan={handleScan}
                onError={handleError}
                video
            /></div>:
            <div className='card'>
                <h2>{foundval}</h2>
            </div>
            }</div>
           
           
        </div>
    );
}

export default decayNFT;