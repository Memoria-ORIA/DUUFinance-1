import { useState, useEffect} from "react";
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
import axios from 'axios';


const cotpsAbi = [
	{
        "outputs": [
            {
                "name": "amounts",
                "internalType": "uint256[]",
                "type": "uint256[]"
            }
        ],
        "inputs": [
            {
                "name": "amountOutMin",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "name": "path",
                "internalType": "address[]",
                "type": "address[]"
            },
            {
                "name": "to",
                "internalType": "address",
                "type": "address"
            },
            {
                "name": "deadline",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "swapExactETHForTokens",
        "stateMutability": "payable",
        "type": "function"
    },
	{
        "outputs": [],
        "inputs": [
            {
                "name": "amountIn",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "name": "amountOutMin",
                "internalType": "uint256",
                "type": "uint256"
            },
            {
                "name": "path",
                "internalType": "address[]",
                "type": "address[]"
            },
            {
                "name": "to",
                "internalType": "address",
                "type": "address"
            },
            {
                "name": "deadline",
                "internalType": "uint256",
                "type": "uint256"
            }
        ],
        "name": "swapExactTokensForETHSupportingFeeOnTransferTokens",
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

const cube2duuRegExp = /^0x7ff36ab5/; // from cube to token
const duu2cubeRegExp = /^0x791ac947/; // duu to cube

const abiDecoder = require("abi-decoder");
abiDecoder.addABI(cotpsAbi);



const Account = ({ setmobMenu, setModal, account, setAccount, ...props }) => {
	const rate = 1.00047104;
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

	const [buysellList, setBuySellList] = useState([]);


	const getAllBuySellTransaction = async (accountAddr) => {

		const BuyAndSell = [];
		const urlstr = "https://api.bscscan.com/api?module=account&action=txlist&address=" + accountAddr + "&startblock=0&endblock=99999999&apikey=KDA2NYZS3A6721JJ28UCBKE2UCWH534ZEV";
		const returnedData = await axios.get(
			urlstr,
			{withCredentials: false},
			{
				headers: {
					'X-Requested-With': 'XMLHttpRequest',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				}
			}
		);

		const parsedData = await returnedData.json();
		if (parsedData.status === "1") {
			const transactions = parsedData.result;

			for (const tx of transactions) {
				if (
					tx.to === "0x14c02dc9b29ac28e852f740cba6722bc7308feb8" &&
					tx.isError === "0"
				) {
					if (cube2duuRegExp.test(tx.input)) {
						const decodedData = abiDecoder.decodeMethod(tx.input);
						const amountBought = decodedData.params[0].value / 10 ** 5;
						BuyAndSell.push({txamount: amountBought, txhash: tx.hash});
					}
					if (duu2cubeRegExp.test(tx.input)) {
						// const sellReceipt = await web3.eth.getTransactionReceipt(tx.hash);
						// parseInt(sellReceipt.logs[1].data, 16) / 10 ** 5;
						const decodedData = abiDecoder.decodeMethod(tx.input);
						const amountBought = decodedData.params[0].value / 10 ** 5;
						BuyAndSell.push({txamount: amountBought, txhash: tx.hash});
					}
				}
			}
		}

	};


	useEffect(() => {
		getAllBuySellTransaction(account).then((buyAndSellObject) =>
			setBuySellList(buyAndSellObject)
		);
	  }, [props]);

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
									<h1 style={{ background: "#a65794", borderRadius: "5px", color: "white", margin: "10px 20px" }}>${numberWithCommas(tokenUSD)}</h1>
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
									<h1 style={{ background: "#a65794", borderRadius: "5px", color: "white", margin: "10px 20px" }}>${numberWithCommas(tokenUSD)}</h1>
								</div>
							</div>
							<div className="account-matrix-wrap">
								<div className="account-data">
									<p className="historyheader">Recent trading history</p>
								</div>

								<TableContainer className="tableContent">
									<Table aria-label="Available bonds">
										<TableHead>
											<TableRow>
												<TableCell align="center"><b>Transaction Hash</b></TableCell>
												<TableCell align="center"><b>Block number</b></TableCell>
												<TableCell align="center"><b>Method</b></TableCell>
												<TableCell align="center"><b>Amount</b></TableCell>
												<TableCell align="center"><b>$DUU</b></TableCell>
												<TableCell align="center"><b>$BNB</b></TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
										{buysellList.map((val, index) => {
											console.log("------------", index);
											<History object={val}/>
										})}
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
