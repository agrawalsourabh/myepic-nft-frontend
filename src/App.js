import React from "react";
import 'tachyons';
import { ethers, providers } from "ethers";
import abi from './utils/MyEpicNFT.json';

import Nav from './Nav';
import Button from "./Button";

import './App.css';
class App extends React.Component{

  App(props) {
    this.super(props);

    
  }
  state = {
    isConnected: false,
    contractAddress: "0x7199AF74282CbB865150683EfB1F3396257b5Ab2",
    owner: "0xB27d536976B9869309F665e01cFB28ebED580774",
    abi: abi.abi
  };

  mintNFT = async() => {
    const {owner, contractAddress, abi} = this.state;
    const {ethereum} = window;
    let image = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAzNTAgMzUwIj4KICAgIDxzdHlsZT4uYmFzZSB7IGZpbGw6IHdoaXRlOyBmb250LWZhbWlseTogc2VyaWY7IGZvbnQtc2l6ZTogMTRweDsgfTwvc3R5bGU+CiAgICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJibGFjayIgLz4KICAgIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBjbGFzcz0iYmFzZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TXlTZWNvbmRORlQ8L3RleHQ+Cjwvc3ZnPg==";

    try{
      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        let nftTxn = await contract.makeAnEpicNFT("MyNewNFT", "This is my new NFT", image);
        console.log("Minning....");
        await nftTxn.wait();

        console.log("see mined transaction on: ", "https://ropsten.etherscan.io/tx/"+nftTxn);

      }
      else{
        console.log("object not exist!");
      }
    }
    catch(error){
      console.log(error);
    }
  }

  checkIfWalletIsConnected = async() => {
    const {ethereum} = window;

    if(!ethereum){
      console.log("Make sure if wallet is connected!");
      return false;
    }

    return true;

  }

  connectWallet = async() => {
    console.log("connect Wallet clicked");
    try{
      const {ethereum} = window;

      if(!ethereum){
        console.log("Get metamask!");
        return;
      }

      console.log("YOu have metamask!");

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Accounts: " , accounts.length);
    }
    catch(error){
      console.log(error);
    }
  }

  componentDidMount = () => {
    const value = this.checkIfWalletIsConnected();
    this.setState({isConnected: value});
  }



  render(){
    return(
      <div className="App">
        <Nav onClickHandler={this.connectWallet} walletConnectionStatus={this.state.isConnected}/>
        <h1> My NFT Collection</h1>
        <p> Each unique. Each beautiful. Discover your NFT today.</p>
        <Button text={'Mint your NFT!'} onClick={this.mintNFT}/>
      </div>
    );
  }
}

export default App;