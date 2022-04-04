import React, {useState, useMemo, useCallback} from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import MenuIcon from "../../assets/images/menu.svg";
import "./calculator.css";
import Slider from "../../components/Slider/Slider";
const Calculator = ({setmobMenu, setModal}) => {
	    const [parentVal, setParentVal] = useState(1);

      const sliderValueChanged = useCallback(val => {
        console.log("NEW VALUE", val);
        setParentVal(val);
      });

      const sliderProps = useMemo(
        () => ({
          min: 1,
          max: 365,
          value: parentVal,
          step: 0,
          label: "",
          onChange: e => sliderValueChanged(e)
        }),
        [parentVal]
      );
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
								<li><a href="/">AXEN COIN</a>
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
						<div className="calc-container">
							<div className="calc-heading">
								<h2>Calculator</h2>
								<span>Estimate your returns</span>
							</div>
							<div className="calc-price-container">
								<div className="calc-price-wrap">
									<h3 className="color-white">AXEN COIN Price</h3>
									<h2>$0.195172</h2>
								</div>
								<div className="calc-price-wrap">
									<h3 className="color-white">Current APY</h3>
									<h2>383,025.8%</h2>
								</div>
								<div className="calc-price-wrap mob-mt">
									<h3 className="color-white">Your AXEN COIN Balance</h3>
									<h2>0 AXEN COIN</h2>
								</div>
							</div>
							<div className="calc-grid-container">
								<div className="field-wrap">
									<span>AXEN COIN Amount</span>
									<div className="field">
										<input type="text" name="" id="" value={0} />
										<span>Max</span>
									</div>
								</div>
								<div className="field-wrap">
									<span>APY (%)</span>
									<div className="field">
										<input type="text" name="" id="" value="383025.8" placeholder="Amount" />
										<span>Current</span>
									</div>
								</div>
								<div className="field-wrap">
									<span>AXEN COIN price at purchase ($)</span>
									<div className="field">
										<input type="text" name="" id="" value={150.06} placeholder="Amount" />
										<span>Current</span>
									</div>
								</div>
								<div className="field-wrap">
									<span>Future AXEN COIN market price ($)</span>
									<div className="field">
										<input type="text" name="" id="" value={150.06} placeholder="Amount" />
										<span>Current</span>
									</div>
								</div>
							</div>
							<Slider {...sliderProps} classes="additional-css-classes" />
							<div className="calc-matrix color-white">
								<div className="data">
									<p>Your initial investment</p>
									<span>$0</span>
								</div>
								<div className="data">
									<p>Current wealth</p>
									<span>$0</span>
								</div>
								<div className="data">
									<p>AXEN COIN rewards estimation</p>
									<span>0 AXEN COIN</span>
								</div>
								<div className="data">
									<p>Potential return</p>
									<span>$0.00</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Calculator;
