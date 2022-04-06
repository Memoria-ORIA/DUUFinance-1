import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './pages/Dashboard/Dashboard'
import { Routes, Route } from "react-router-dom";
import Calculator from './pages/Calculator/Calculator';
import Account from './pages/Account/Account';
import MobSidebar from './components/MobSidebar/MobSidebar';
import WalletModal from './components/WalletModal/WalletModal';
import routerAbi from './abis/ROUTER.json';
import genTokenAbi from './abis/GEN.json';
import erc20Abi from './abis/ERC20.json';
import { ethers } from 'ethers';
import axios from 'axios'
// const Web3 = require('web3');



// mainnet
// const GEN_TOKEN_ADDRESS  = "";
// const BUSD_TOKEN_ADDRESS  = "0xe9e7cea3dedca5984780bafc599bd69add087d56";

// testnet
const GEN_TOKEN_ADDRESS = "0x1B6f709Ff948e00F4c2eD8338a00E40863960Cdb";
const BUSD_TOKEN_ADDRESS = "0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee ";
const WBNB_TOKEN_ADDRESS = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd";

function App() {
  const [mobMenu, setmobMenu] = useState(false)
  const [Modal, setModal] = useState(false)
  const handlerSetmonMenu = () => {
    setmobMenu(!mobMenu)
  }

  const [tokenPrice, setTokenPrice] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [circulatingSupply, setCirculatingSupply] = useState(0)
  const [treasuryBalance,setTreasuryBalance]= useState(0)
  const [GIFBalance,setGIFBalance]= useState(0)
  const [firePitBalance,setFirePitBalance]= useState(0)
  const [poolBalance,setPoolBalance]= useState(0)
  

  const [walletBalance, setWalletBalance] = useState(0);
  const [rebaseDuration, setRebaseDuration] = useState(1800);
  const [nextRewardAmount, setNextRewardAmount] = useState();
  const [nextRewardYield, setNextRewardYield] = useState();
  const [roi, setRoi] = useState();

  const handlerSetModal = () => {
    // event.preventDefault()
    console.log('clicked');
    setModal(!Modal)
  }

  async function test() {

    // const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
    // var Contract = require('web3-eth-contract');

    // // set provider for all later instances to use
    // Contract.setProvider('ws://localhost:8546');

    // const contract = web3.eth.Contract((jsonInterface, address);


}

  // event on initialize page.
  useEffect(() => {
    const interval = setInterval(refreshPage, 3000);
    InitPage();
    return () => clearInterval(interval);
  }, []);

  async function InitPage() {
    await refreshPage();
    // await conntectWallet();
    console.log("[GEN] Page Initialized");
  }

  async function refreshPage() {
    try {

      // const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
      // const contract = web3.eth.Contract(genTokenAbi, GEN_TOKEN_ADDRESS);
      // console.log("web3_contract:",contract)
      const provider = new ethers.providers. JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545');
      // const signer = await provider.getSigner();
      const genTokenContract = new ethers.Contract(GEN_TOKEN_ADDRESS, genTokenAbi, provider);
      

      
      
      const tokenPrice = await getTokenPriceByPair(genTokenContract, provider);
      
      const totalSupply = await genTokenContract.totalSupply();
      setTotalSupply(ethers.utils.formatUnits(totalSupply, 5))// * tokenPrice).toFixed(2));
      
      const circulatingSupply = await genTokenContract.getCirculatingSupply()
      setCirculatingSupply(ethers.utils.formatUnits(circulatingSupply, 5))// * tokenPrice).toFixed(2));
      
      const balances = await getBalancesInfo(genTokenContract)
      
      

      // const balance = await getWalletInfo(provider, genTokenContract);
      // const rewards = CalculateRewardsCustom(REBASE_FREQ) - 1;
      // setNextRewardYield((rewards*100).toFixed(5));
      // setNextRewardAmount(rewards * balance);
      // const fiveDayReawards = CalculateRewardsCustom(MIN_PER_DAY*5) - 1;
      // setRoi(truncateDecimals(fiveDayReawards*100, 2));
    }
    catch (err) {
      console.log("[gen] Refresh page. error! (%s)", err.message);
    }
  }

  async function getTokenPriceByPair(genToken, provider) {
    try {

      const pairAddr = await genToken.pair();
      const poolBalance = await genToken.balanceOf(pairAddr);
      const wbnbContract = new ethers.Contract(WBNB_TOKEN_ADDRESS, erc20Abi, provider);
      const bnbInPool = await wbnbContract.balanceOf(pairAddr);
      const derivedBNB = parseFloat(ethers.utils.formatEther(bnbInPool))/parseFloat(ethers.utils.formatUnits(poolBalance,5));
      const bnbPrice = getBNBPrice();
      const price = parseFloat(bnbPrice)*derivedBNB.toFixed(6);
      setTokenPrice(price);
      console.log("[GEN] :: Price of GEN = %s $", price);
      return price;
    } catch (err) {
      console.log("[GEN] Getting price of token error!");
      return 0;
    }
  }

  const getBNBPrice = async () => {
    const url = 'https://deep-index.moralis.io/api/v2/erc20/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c/price?chain=bsc';
    const resp = await axios.get(url,
        {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                "X-API-Key": "YEEwMh0B4VRg6Hu5gFQcKxqinJ7UizRza1JpbkyMgNTfj4jUkSaZVajOxLNabvnt"
            }
        }
    );

    // console.log("Price get result:",resp);
    return resp.data.usdPrice;
}

  async function getWalletInfo(web3Provider, genToken) {
    if (typeof web3Provider === "undefined" ||
      typeof genToken === "undefined") {
      return 0;
    }
    try {
      const signer = web3Provider.getSigner(); // user
      const contractUser = await signer.getAddress();
      const tokenBalance = await genToken.balanceOf(contractUser);
      const balance = ethers.utils.formatEther(tokenBalance)
      setWalletBalance(balance.toString());
      return balance;
    } catch (err) {
      console.log("[GEN] Getting wallet balance error! (%s)", err.message);
    }
    return 0;
  }

  async function getBalancesInfo(genToken) {
    if (typeof genToken === "undefined") {
      return 0;
    }
    try {
      const treasuryAddr = await genToken.treasuryReceiver();
      const GIFAddr = await genToken.genInsuranceFundReceiver();
      const firePitAddr = await genToken.firePit();
      const poolAddr = await genToken.pair();

      const treasuryBalance = await genToken.balanceOf(treasuryAddr)
      const GIFBalance = await genToken.balanceOf(GIFAddr)
      const firePitBalance = await genToken.balanceOf(firePitAddr)
      const poolBalance = await genToken.balanceOf(poolAddr)
      setTreasuryBalance(ethers.utils.formatUnits(treasuryBalance, 5))
      setGIFBalance(ethers.utils.formatUnits(GIFBalance, 5))
      setFirePitBalance(ethers.utils.formatUnits(firePitBalance, 5))
      setPoolBalance(ethers.utils.formatUnits(poolBalance, 5))

      return 1;
    } catch (err) {
      console.log("[GEN] Getting wallet balance error! (%s)", err.message);
    }
    return 0;
  }

  // const connectWallet = async () => {
  //   const { ethereum } = window;
  //   const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
  //   console.log(ethereum);
  //   if (metamaskIsInstalled) {
  //       Web3EthContract.setProvider(ethereum);
  //       try {
  //           var accounts = await ethereum.request({
  //               method: "eth_requestAccounts",
  //           });
  //           var networkId = await ethereum.request({
  //               method: "net_version",
  //           });
  //           if (networkId == CONFIG.NETWORK.ID) {
  //               const SmartContractObj = new Web3EthContract(
  //                   contractABI,
  //                   CONFIG.CONTRACT_ADDRESS,
  //                   {from: accounts[0]}
  //               );
  //               window.contract = SmartContractObj;
  //               ethereum.on("chainChanged", () => {
  //                   window.location.reload();
  //               });
  //           }
  //       } catch (err) {
  //       }
  //   } else {
  //   }
// };





  return (
    <>
      <Routes>
        <Route path="/" exact element={
        <Dashboard 
          setmobMenu={handlerSetmonMenu} 
          setModal={handlerSetModal} 
          tokenPrice={tokenPrice}
          totalSupply={totalSupply}
          circulatingSupply={circulatingSupply}
          treasuryBalance={treasuryBalance}
          GIFBalance={GIFBalance}
          poolBalance={poolBalance}
          firePitBalance={firePitBalance} 
          />} />
        <Route path="/account" exact element={<Account setmobMenu={handlerSetmonMenu} setModal={handlerSetModal} />} />
        <Route path="/calculator" exact element={<Calculator setmobMenu={handlerSetmonMenu} setModal={handlerSetModal} />} />
      </Routes>
      <MobSidebar mobMenu={mobMenu} setmobMenu={handlerSetmonMenu} />
      <WalletModal Modal={Modal} setModal={handlerSetModal} />
    </>
  );
}

export default App;
