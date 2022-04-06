import React from "react";
import MenuIcon from "../../assets/images/menu.svg";
import "./dashboard.css";

import Sidebar from "../../components/Sidebar/Sidebar";
const Dashboard = ({setmobMenu, setModal, ...props}) => {

	console.log(props);
	const {tokenPrice, totalSupply, circulatingSupply, treasuryBalance, GIFBalance, poolBalance, firePitBalance} = props
	const marketCap = parseFloat(totalSupply)*parseFloat(tokenPrice);
	
	return (
		<>
			<div className="root-container">
				<div className="sidebar">
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
						<div className="dashboard-data-container">
							<div className="dashboard-data-wrap">
								<div className="heading-wrap">
									<span>GEN Price</span>
									<h5>${props.tokenPrice}</h5>
								</div>
								<div className="heading-wrap">
									<span>Market Cap</span>
									<h5>${}</h5>
								</div>
								<div className="heading-wrap">
									<span>Circulating Supply</span>
									<h5>542,881.91</h5>
								</div>

							<div className="heading-wrap">
								<span>Backed Liquidity</span>
								<h5>100%</h5>
							</div>
							<div className="heading-wrap">
								<span>Next Rebase</span>
								<h5>00:15:00</h5>
							</div>
							<div className="heading-wrap">
								<span>Total Supply</span>
								<h5>640,029.55</h5>
							</div>
							</div>
						</div>
						<div className="dashboard-grid-container">
							<div className="grid-data-wrap dashboard-grid-gap">
								<div className="grid-data-heading">
									<span>GEN Price</span>
									<h1>$151.84</h1>
								</div>
							</div>
							<div className="grid-data-wrap dashboard-grid-gap">
								<div className="grid-data-heading">
									<span>Market Value of Treasury Asset</span>
									<h1>$2,766,562</h1>
								</div>
							</div>
							<div className="grid-data-wrap dashboard-grid-gap-mob">
								<div className="grid-data-heading">
									<span>Pool Value</span>
									<h1>$15,989,753</h1>
								</div>
							</div>
							<div className="grid-data-wrap">
								<div className="grid-data-heading">
									<span>GEN Insurance Fund Value</span>
									<h1>$2,030,858</h1>
								</div>
							</div>
						</div>
						<div className="dashboard-firepit-container">
							<div className="firepit-wrap">
								<span># Value of FirePit</span>
								<h1>97,195.42 GEN</h1>
							</div>
							<div className="firepit-wrap">
								<span># Value of FirePit</span>
								<h1>97,195.42 GEN</h1>
							</div>
							<div className="firepit-wrap">
								<span># Value of FirePit</span>
								<h1>97,195.42 GEN</h1>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
