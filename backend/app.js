const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://wadhwa-mayank:mongo@cluster0.ukgbs.mongodb.net/nftDB?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => {
    console.log("DB Connected");
  }
);

const itemsSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  ownership: String,
  status: String,
  warrantyInfo: String,
  url: String,
});

const Item = new mongoose.model("Item", itemsSchema);

app.get("/:id", function (req, res) {
  const id = req.params.id;
  Item.find({ id }, function (err, foundItem) {
    if (!foundItem || foundItem.length === 0) {
      console.log(err);
    } else {
      res.json(foundItem);
    }
  });
});
app.delete("/decay/:id" , function(req,res){
  const id = req.params.id;
  Item.find({ id }, function (err, foundItem) {
    if (!foundItem || foundItem.length === 0) {
      console.log(err);
    } else {
      
      foundItem.remove()
      .then((result)=>{
        console.log(foundItem); 
        res.json({result});
      })
      .catch((err)=>{
        console.log(err);
      })
    }
  });
})

app.post("/", function (req, res) {
  const nft = req.body;

  const item = new Item({
    id: nft.id,
    name: nft.name,
    description: nft.description,
    ownership: nft.ownership,
    status: nft.status,
    warrantyInfo: nft.warranty,
    url: nft.url,
  });

  item.save().then((data) => {
    Item.find({}, function (err, foundItems) {
      res.json(foundItems);
    });
  });
});

app.listen(4000, function () {
  console.log("web server listening on port 4000");
});
