import React from "react";
import MenuIcon from "../../assets/images/menu.svg";
import "./account.css";
import Sidebar from "../../components/Sidebar/Sidebar";
const Account = ({setmobMenu, setModal}) => {
	return (
		<>
			<div className="root-container">
				<div className= "sidebar">
					<Sidebar/>
				</div>
				<div className="main-container">
					<div className="topbar">
						<div className="connect-wallet-btn">
							<img src={MenuIcon} className="icon-mob" alt="logo" onClick={setmobMenu} />
							<ul>
								<li className="menu__icon" onClick={setmobMenu}><img src={MenuIcon} className="icon-tab" alt="menu Icon" /></li>
								<li><a href="/">GEN</a>
								<ul className="dropdown">
									<li>
									<a href="/">Buy on bog swap</a>
									</li>
								</ul>
								</li>
								<li><a href="/" onClick={setModal}>Connect Wallet</a></li>
							</ul>
						</div>
					</div>
					<div className="main-container-area">
						<div className="account-container">

							<div className="account-detail-container">
								<div className="acc-detail-wrap">
									<span>Your Balance</span>
									<h1>$0</h1>
									<span>0 GEN</span>
								</div>
								<div className="acc-detail-wrap">
									<span>APY</span>
									<h1>383,025.8%</h1>
									<span>Daily ROI 2.28%</span>
								</div>
								<div className="acc-detail-wrap">
									<span>Next Rebase:</span>
									<h1>Next Rebase:</h1>
									<span>You will earn money soon</span>
								</div>
							</div>
							<div className="account-matrix-wrap">
								<div className="account-data">
									<p>Current GEN Price</p>
									<span className="color-white">$150.76</span>
								</div>
								<div className="account-data">
									<p>Next Reward Amount</p>
									<span className="color-white">0 GEN</span>
								</div>
								<div className="account-data">
									<p>Next Reward Amount USD</p>
									<span>$0</span>
								</div>
								<div className="account-data">
									<p>Next Reward Yield</p>
									<span className="color-white">0.02355%</span>
								</div>
								<div className="account-data">
									<p>ROI (1-Day Rate) USD</p>
									<span className="color-white">76.80%</span>
								</div>
								<div className="account-data">
									<p>ROI (5-Day Rate)</p>
									<span className="color-white">11.96%</span>
								</div>
								<div className="account-data">
									<p>ROI (5-Day Rate) USD</p>
									<span className="color-white">USD</span>
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
