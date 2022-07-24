import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import Dashboard from './pages/Dashboard/Dashboard'
import { Routes, Route } from "react-router-dom";
import Calculator from './pages/Calculator/Calculator';
import Account from './pages/Account/Account';
import Analytics from './pages/Analytics/Analytics';
import MobSidebar from './components/MobSidebar/MobSidebar';
import WalletModal from './components/WalletModal/WalletModal';
import routerAbi from './abis/ROUTER.json';
import genTokenAbi from './abis/GEN.json';
import erc20Abi from './abis/ERC20.json';
import { ethers } from 'ethers';
import axios from 'axios'
import Loading from './components/Loading';
import TopBar from './components/Topbar/Topbar';

// mainnet
// const GEN_TOKEN_ADDRESS  = "";
// const BUSD_TOKEN_ADDRESS  = "0xe9e7cea3dedca5984780bafc599bd69add087d56";

// cube testnet url info
// pair address: 0x6deC2ceb5cCBDCFe5fFBe6d0f53C5E9B32339809
// duu address:  0x81186E77c327b7D55Ca740Cd99B047e03a79946E
// test factory: https://testnet.cubescan.network/en-us/address/0x7a1eba426aa389aac9b410cdfe3cef5d344e043f?tab=Contract
// test router : https://testnet.cubescan.network/en-us/address/0x14c02dc9b29ac28e852f740cba6722bc7308feb8?tab=Transactions


const GEN_TOKEN_ADDRESS = "0x81186E77c327b7D55Ca740Cd99B047e03a79946E";
const WBNB_TOKEN_ADDRESS = "0xB9164670A2F388D835B868b3D0D441fa1bE5bb00";

function App() {
  const [mobMenu, setmobMenu] = useState(false)
  // const [Modal, setModal] = useState(false)
  const handlerSetmonMenu = () => {
    setmobMenu(!mobMenu)
  }

  const [init, setInit] = useState(false);
  const [tokenPrice, setTokenPrice] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [circulatingSupply, setCirculatingSupply] = useState(0);
  const [treasuryBalance, setTreasuryBalance] = useState(0);
  const [GIFBalance, setGIFBalance] = useState(0);
  const [firePitBalance, setFirePitBalance] = useState(0);
  const [poolBalance, setPoolBalance] = useState(0);

  const [interval, setIntervalSec] = useState(1800);
  const [remainTime, setRemainTime] = useState(0);
  const [account, setAccount] = useState("");
  const [chainId, setChainId] = useState("");


  const [walletBalance, setWalletBalance] = useState(0);
  const [rebaseDuration, setRebaseDuration] = useState(1800);
  const [nextRewardAmount, setNextRewardAmount] = useState();
  const [nextRewardYield, setNextRewardYield] = useState();
  const [roi, setRoi] = useState();

  const provider = new ethers.providers.JsonRpcProvider('https://http-testnet.cube.network');
  const genTokenContract = new ethers.Contract(GEN_TOKEN_ADDRESS, genTokenAbi, provider);

  const handlerSetModal = () => {
    // event.preventDefault()
    console.log('clicked');
    // setModal(!Modal)
  }

  useEffect(() => {
    const interval = setInterval(refreshPage, 1000 * 1800);
    return () => clearInterval(interval);
  }, []);

  // event on initialize page.
  useEffect(() => {
    if (!init) {
      refreshPage();
    }
    // return () => clearInterval(interval);
  }, [init]);

  useEffect(() => {
    getWalletInfo(account, genTokenContract);
  }, [account]);

  const handleDrawerToggle = () => {
    // setMobileOpen(!mobileOpen);
  };

  async function refreshPage() {
    try {
      await getTokenPriceByPair(genTokenContract, provider);

      const totalSupply = await genTokenContract.totalSupply();
      setTotalSupply(ethers.utils.formatUnits(totalSupply, 5))// * tokenPrice).toFixed(2));

      const circulatingSupply = await genTokenContract.getCirculatingSupply()
      setCirculatingSupply(ethers.utils.formatUnits(circulatingSupply, 5))// * tokenPrice).toFixed(2));

      await getBalancesInfo(genTokenContract)

      const lRTime = await genTokenContract._lastRebasedTime();
      const utcTimestamp = new Date().getTime();
      const deltaTime = parseInt(utcTimestamp / 1000) - parseInt(lRTime);
      const remainTime = interval - deltaTime % interval;
      setRemainTime(remainTime);
      // console.log("[tz]: interval:", interval);
      // console.log("[tz]: remainTime:", remainTime);
      setInit(true);
    }
    catch (err) {
      console.log("[gen] Refresh page. error! (%s)", err.message);
    }
  }

  async function getTokenPriceByPair(genToken, provider) {
    try {

      const pairAddr = await genToken.pairAddress();
      const poolBalance = await genToken.balanceOf(pairAddr);
      const wbnbContract = new ethers.Contract(WBNB_TOKEN_ADDRESS, erc20Abi, provider);
      const bnbInPool = await wbnbContract.balanceOf(pairAddr);
      const derivedBNB = parseFloat(ethers.utils.formatEther(bnbInPool)) / parseFloat(ethers.utils.formatUnits(poolBalance, 5));
      // console.log("derivedBNB:", derivedBNB);

      const bnbPrice = await getCubePrice();
      // console.log("bnbPrice:", bnbPrice);
      const price = parseFloat(bnbPrice) * derivedBNB
      setTokenPrice(price);
      // console.log("[GEN] :: Price of GEN = %s $", price);
      return price;
    } catch (err) {
      console.log("[GEN] Getting price of token error!");
      return 0;
    }
  }

  const getCubePrice = async () => {
    const res = await axios.get('https://api.dexscreener.com/latest/dex/pairs/cube/0x5d3aD1Fe9beEE77167033dF7E9F43020f1071e41');
    const marketPrice = res.data["pair"].priceUsd;

    console.log("[tz] Cube Price get result:", marketPrice);
    return marketPrice;
  }

  async function getWalletInfo(account, genToken) {
    if (!account) {
      setWalletBalance(0);
      return 0;
    }
    try {
      const tokenBalance = await genToken.balanceOf(account);
      const balance = ethers.utils.formatUnits(tokenBalance, 5);
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
      const GIFAddr = await genToken.insuranceReceiver();
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

  const path = useMemo(() => window.location.pathname, [window.location.pathname]);

  return (
    <>
      {init ? <TopBar account={account}
        setAccount={setAccount}
        chainId={chainId}
        setChainId={setChainId}
        setmobMenu={handlerSetmonMenu} /> : (
          <Loading />
      )}
      <Routes>
        <Route path="/" exact element={init ?
          <Dashboard
            setmobMenu={handlerSetmonMenu}
            setModal={handlerSetModal}
            account={account}
            setAccount={setAccount}
            chainId={chainId}
            setChainId={setChainId}
            tokenPrice={tokenPrice}
            totalSupply={totalSupply}
            circulatingSupply={circulatingSupply}
            treasuryBalance={treasuryBalance}
            GIFBalance={GIFBalance}
            poolBalance={poolBalance}
            firePitBalance={firePitBalance}
            interval={interval}
            remainTime={remainTime}
            setInit={setInit}
          /> : <Loading />}
        />
        <Route path="/account" exact element={init ?
          <Account setmobMenu={handlerSetmonMenu} setModal={handlerSetModal} account={account}
            setAccount={setAccount} chainId={chainId} setChainId={setChainId} tokenPrice={tokenPrice} balance={walletBalance} interval={interval} remainTime={remainTime}
            setInit={setInit}
          /> : <Loading />}
        />
        <Route path="/calculator" exact element={init ?
          <Calculator setmobMenu={handlerSetmonMenu} setModal={handlerSetModal} account={account}
            setAccount={setAccount} chainId={chainId} setChainId={setChainId} tokenPrice={tokenPrice} balance={walletBalance} interval={interval}
          /> : <Loading />}
        />
        <Route path="/analytics" exact element={init ?
          <Analytics
            setmobMenu={handlerSetmonMenu}
            setModal={handlerSetModal}
            account={account}
            setAccount={setAccount}
            chainId={chainId}
            setChainId={setChainId}
            tokenPrice={tokenPrice}
            balance={walletBalance}
            interval={interval}
          /> : <Loading />}
        />
      </Routes>
      <MobSidebar mobMenu={mobMenu} setmobMenu={handlerSetmonMenu} />
      {/* <WalletModal Modal={Modal} setModal={handlerSetModal} /> */}
    </>
  );
}

export default App;
