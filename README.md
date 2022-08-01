```
                                          Project Summary:
                                          
Created NFT based web app using smart contracts on blockchain
using ERC-721 protocol for E-Commerce sites, where a Seller can
create an NFT within 1 minute and can add warranty details, ownership. 

Customers can use the digital NFT to verify the authenticity of
their product and prove their ownership and retailer should also
be able to tie the digital NFT to its warranty program. 

Tech stack used:
Frontend-> Next Js
Backend Used->Hardhat,Node
DataBase->MongoDB
Others->Solidity,Javascript 

**This project demonstrates a Hardhat use case. 
It has sample contract, a test for that contract, and a script that deploys that contract.**

```


```
                                      Procedure For Running The Project:

Step:1-> Open the whole repository in Vscode or any editor (*Note: Make sure you have nodejs installed)
Step:2-> Open 4 terminals separately
Step:3-> In 1st terminal , run these commands
         npm install
         npm audit fix
         npx hardhat node
Step:4-> In 2nd terminal , run these commands
         npx hardhat run scripts/deploy.js --network localhost
Step:5-> In 3rd terminal , run these commands
         cd backend
         node app
Step:6-> In 4th terminal , run these commands
         npm run dev
```


                                      **Detail Description of the project:**
                                      
##Seller will list the product on e-commerce site and along with an NFT will be created at NFT market place for products 
with product details, name, description, ownership, warranty details, photo etc.


<img width="350" alt="NFT_Listing_Done" src="https://user-images.githubusercontent.com/55627604/182214732-2428224c-3153-4961-b001-8dc6a1db5003.png">


##A NFT will be created for the product (as its digital version)(shown under dashboard) 
containing all detail as a smart contract on blockchain.


<img width="350" alt="Product_Details_added" src="https://user-images.githubusercontent.com/55627604/182214909-9949c682-1a3e-4782-b14a-edbdc9142b4d.png">

<img width="350" alt="Customer_Can_See_Details" src="https://user-images.githubusercontent.com/55627604/182216117-09c7adfd-ba4a-471f-8532-121fd55b3cc3.png">


##A Dynamic QR code will be generated for each product and given to seller
and seller will put this QR code (in the form of plastic chips) on product and boxes.

<img width="317" alt="QR_Code_Generated" src="https://user-images.githubusercontent.com/55627604/182215060-81178637-547e-48ab-a469-9b770e7ad0bc.png">

##At the time of receiving the product , there is inbuilt scanner in the e-commerce app which will scan the QR code on the product box and perform decryption algorithm and checks whether its product id matches with product id of the product ordered or not internally , In this way product security and authenticity will be maintained.


<img width="367" alt="QR_Code_Scanning_At_Customer_side" src="https://user-images.githubusercontent.com/55627604/182216900-4c7abf63-262f-4f50-ada5-1b0216bcd85e.png">

<img width="451" alt="Product_authenticated" src="https://user-images.githubusercontent.com/55627604/182217118-1d96e706-a9d1-4dbc-b5cd-6fe06a1589f6.png">


##If product will be returned by customer under return period, seller will perform some quality checks on the product and on the basis of that either he will delist product (NFT will be decayed) or he will refurbish it and list it again (Add refurbishment details to existing NFT in the form of smart contracts)


##If return period over, then e-commerce platform will automatically update the ownership details to existing NFT via adding smart contract.

<img width="245" alt="NFT_Ownership_transfer" src="https://user-images.githubusercontent.com/55627604/182217291-048125fd-c843-430a-8343-04ef21f0351f.png">

##Warranty Checking: 
Similarly, after the sale of product, if further customer got any repair work in  product, it will go to service center and there will verify the warranty of the product again using the same method of decryption and will check the warranty.

##Decaying NFT:
After the warranty of the product is over, its Data from the database will be  deleted and this NFT will be called decayed.


<img width="703" alt="Decay_NFT_Feature" src="https://user-images.githubusercontent.com/55627604/182218439-4e3c62ee-6e97-41f3-a2b5-9e5b2cb9efdb.png">




```
                                                 Future Scope(Improvement Areas):
                                                        
##The whole NFT marketplace should be integrated with e-commerce main site.

##Two QR code scanner needs to be implemented at e-commerce site, 
one for checking authenticity of products and second for verifying warranty of products.

##Two automated function also needs to be implemented at e-commerce site , 
one for Ownership transfer when customer confirms to take the product and second to decay the NFT after its warranty is over.

##We can also use this system to do the business related to second hand/used 
products as their ownership details and all other details will always be visible to everyone.

```

**Project Video Here::**  



https://user-images.githubusercontent.com/55627604/182227785-69eb9708-39ee-45b5-a0c4-92e65314a863.mp4


