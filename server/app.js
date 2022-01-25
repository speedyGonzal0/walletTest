const express = require('express');
const cors = require("cors");
const bip39 = require('bip39')
const { ethers } = require("ethers");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:19006"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);
app.use(express.urlencoded({
  extended: false
}));

app.get("/create", function (req, res){
    const mnemonic = bip39.generateMnemonic()
    const wallet = new ethers.Wallet.fromMnemonic(mnemonic)
    // console.log(mnemonic + " "+ wallet.address)
    res.send({mnemonic: mnemonic, wallet: wallet.address})
})

app.post("/import", function (req, res){
    const {walletinput} = req.body;
    const wallet = new ethers.Wallet.fromMnemonic(walletinput)
    // console.log(wallet.address)
    res.send( wallet.address)
})


app.listen(19007, () => {
    console.log(`Example app listening on port 19007!`)
  });