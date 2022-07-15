import React from "react";
import MenuIcon from "../../assets/images/menu.svg";
import "./analytics.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Wallet from "../../components/Wallet";
import CountDown from '../../components/CountDown';
import {numberWithCommas} from '../../utils/numberUtils.ts';
import happyImage from '../../assets/images/earn.png';
import sadImage from '../../assets/images/lose.png';
import metre from '../../assets/images/metrc.png';

const Account = ({setmobMenu, setModal, account, setAccount, ...props}) => {
	const rate = 1.00039566;
	let {chainId, setChainId, tokenPrice, balance, interval, remainTime,setInit} = props;
	// console.log("BBBB",balance, numberWithCommas(balance));
	tokenPrice = parseFloat(tokenPrice).toFixed(3);
	const tokenUSD =(tokenPrice)*parseFloat(balance);
	const nextRewardAmount = parseFloat(balance)*(rate-1);
	const nextRewardYield = 100*(rate-1);
	const nextRewardUSD = nextRewardAmount*(tokenPrice);
	const apy = 100 * rate**(365*24*3600/interval);
	const roi_1day = 100 * (rate**(24*3600/interval));
	const roi_1dayUSD = parseFloat(tokenUSD)*roi_1day/100;

	const roi_5day = 100 * (rate**(5*24*3600/interval));
	const roi_5dayUSD = parseFloat(tokenUSD)*roi_5day/100;

	return (
		<>
			<div className="root-container">
				<div className= "sidebar">
					<Sidebar account={account}/>
				</div>
				<div className="main-container">
					<div className="topbar">
						<div className="connect-wallet-btn">
							<img src={MenuIcon} className="icon-mob" alt="logo" onClick={setmobMenu} />
							<h2><i></i></h2>
							<ul>
								<li className="menu__icon" onClick={setmobMenu}><img src={MenuIcon} className="icon-tab" alt="menu Icon" /></li>
								<li><a >LION</a>
								<ul className="dropdown">
									<li>
									<a href="https://pancakeswap.finance/swap?tokenIn=BNB&tokenOut=0x1B6f709Ff948e00F4c2eD8338a00E40863960Cdb" target="_blank">Buy on PancakeSwap</a>
									</li>
								</ul>
								</li>
								<li><Wallet account={account} setAccount={setAccount} chainId= {chainId} setChainId = {setChainId}/></li>
							</ul>
						</div>
					</div>
					<div className="main-container-area">
						<div className="account-container">

							<div className="account-detail-container">
								<div className="acc-detail-wrap">
									<span>How much you have invested so far</span>
									<div>
										<img className="icon" src={happyImage} alt="happy Logo" />
									</div>
									<span>Total investment</span>
									<h1>${numberWithCommas(tokenUSD)}</h1>
								</div>
								<div className="acc-detail-wrap">
									<span>Risk Meter</span>
									<div>
										<img style={{width:"150px"}} src={metre} alt="happy Logo" />
									</div>
								</div>
								<div className="acc-detail-wrap">
									<span>How much you have withdrawn so far</span>
									<div>
										<img className="icon" src={sadImage} alt="happy Logo" />
									</div>
									<span>Total Earned</span>
									<h1>${numberWithCommas(tokenUSD)}</h1>
								</div>
							</div>
							<div className="account-matrix-wrap">
								<div className="account-data">
									<p>Current DUU Price</p>
									<span className="color-white">${numberWithCommas(tokenPrice)}</span>
								</div>
								<div className="account-data">
									<p>Next Reward Amount</p>
									<span className="color-white">{numberWithCommas(nextRewardAmount)} LION</span>
								</div>
								<div className="account-data">
									<p>Next Reward Amount USD</p>
									<span>${numberWithCommas(nextRewardUSD)}</span>
								</div>
								<div className="account-data">
									<p>Next Reward Yield</p>
									<span className="color-white">{numberWithCommas(nextRewardYield)}%</span>
								</div>
								<div className="account-data">
									<p>ROI (1-Day Rate) USD</p>
									<span className="color-white">${numberWithCommas(roi_1dayUSD)}</span>
								</div>
								<div className="account-data">
									<p>ROI (5-Day Rate)</p>
									<span className="color-white">{numberWithCommas(roi_5day)}%</span>
								</div>
								<div className="account-data">
									<p>ROI (5-Day Rate) USD</p>
									<span className="color-white">${numberWithCommas(roi_5dayUSD)}</span>
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Account;
