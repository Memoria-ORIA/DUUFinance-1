import React from "react";
import MenuIcon from "../../assets/images/menu.svg";
import "./analytics.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Wallet from "../../components/Wallet";
import { numberWithCommas } from '../../utils/numberUtils.ts';
import happyImage from '../../assets/images/earn.png';
import sadImage from '../../assets/images/lose.png';
import metre from '../../assets/images/metrc.png';
import { History } from "./History";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
  } from "@material-ui/core";

const Account = ({ setmobMenu, setModal, account, setAccount, ...props }) => {
	const rate = 1.00039566;
	let { chainId, setChainId, tokenPrice, balance, interval, remainTime, setInit } = props;
	// console.log("BBBB",balance, numberWithCommas(balance));
	tokenPrice = parseFloat(tokenPrice).toFixed(3);
	const tokenUSD = (tokenPrice) * parseFloat(balance);
	const nextRewardAmount = parseFloat(balance) * (rate - 1);
	const nextRewardYield = 100 * (rate - 1);
	const nextRewardUSD = nextRewardAmount * (tokenPrice);
	const apy = 100 * rate ** (365 * 24 * 3600 / interval);
	const roi_1day = 100 * (rate ** (24 * 3600 / interval));
	const roi_1dayUSD = parseFloat(tokenUSD) * roi_1day / 100;

	const roi_5day = 100 * (rate ** (5 * 24 * 3600 / interval));
	const roi_5dayUSD = parseFloat(tokenUSD) * roi_5day / 100;

	return (
		<>
			<div className="root-container">
				<div className="sidebar">
					<Sidebar account={account} />
				</div>
				<div className="main-container">
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
										<img className="riskicon" src={metre} alt="happy Logo" />
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
									<p className="historyheader">Recent trading history</p>
								</div>
								{/* <div className="account-data">
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
								</div> */}

								<TableContainer>
									<Table aria-label="Available bonds">
										<TableHead>
											<TableRow>
												<TableCell align="center">Transaction Hash</TableCell>
												<TableCell align="center">Block number</TableCell>
												<TableCell align="center">Method</TableCell>
												<TableCell align="center">Amount</TableCell>
												<TableCell align="center">$Safuu</TableCell>
												<TableCell align="center">$BNB</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>

										<History />
										<History />
										<History />
										<History />

										</TableBody>
									</Table>
								</TableContainer>

							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Account;
