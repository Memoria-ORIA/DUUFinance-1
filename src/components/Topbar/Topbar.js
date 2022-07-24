import { useCallback, useState } from "react";
import { AppBar, Toolbar, Box, Button, SvgIcon, Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Wallet from "../Wallet";
import "./Topbar.css";
import LogoImg from '../../assets/images/duu_logo.png'
import { NavLink } from "react-router-dom";
import Social from "./Social";
import MenuIcon from "../../assets/images/menu.svg";

const useStyles = makeStyles(theme => ({
  appBar: {
    [theme.breakpoints.up("sm")]: {
      // width: "100%",
    },
    justifyContent: "flex-end",
    alignItems: "flex-end",
    background: "#fff",
    backdropFilter: "none",
    zIndex: 10,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("981")]: {
      display: "none",
    },
  },
  logo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: "30px",
    width: "250px",
  },
  logoTitle: {
    fontFamily: "Black Han Sans, Sans-serif",
    color: "#B2D268",
    fontSize: "1rem",
    paddingLeft: "30px",
  },
  buttonProp: {
    paddingLeft: "50px",
  }
}));

function TopBar({ setmobMenu, account, setAccount, ...props }) {
  const classes = useStyles();
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const [isActive] = useState();
  let { chainId, setChainId } = props;

  const checkPage = useCallback((match, location, page) => {
    const currentPath = location.pathname.replace("/", "");
    if (currentPath.indexOf("dashboard") >= 0 && page === "dashboard") {
      return true;
    }
    if (currentPath.indexOf("stake") >= 0 && page === "stake") {
      return true;
    }
    if (currentPath.indexOf("resourcelist") >= 0 && page === "resourcelist") {
      return true;
    }
    if (currentPath.indexOf("governancelist") >= 0 && page === "governancelist") {
      return true;
    }
    if (currentPath.indexOf("finance") >= 0 && page === "finance") {
      return true;
    }
    if (currentPath.indexOf("swap") >= 0 && page === "swap") {
      return true;
    }
    if (currentPath.indexOf("Presale") >= 0 && page === "Presale") {
      return true;
    }
    if (currentPath.indexOf("calculator") >= 0 && page === "calculator") {
      return true;
    }
    if (currentPath.indexOf("nft") >= 0 && page === "nft") {
      return true;
    }
    if ((currentPath.indexOf("bonds") >= 0 || currentPath.indexOf("choose_bond") >= 0) && page === "bonds") {
      return true;
    }
    return false;
  }, []);

  const ButtonGroup = () => {
    return (
      <>
        {isSmallScreen ? <div> </div> :
          <div className={classes.logo}>
            <img src={LogoImg} alt="" style={{ height: "50px", width: "50px" }} />
            <span className={classes.logoTitle}>Ecosystem for Decentralized Finance</span>
          </div>
        }
      </>
    );
  };

  return (
    <AppBar position="sticky" className={classes.appBar} elevation={0}>
      <Toolbar disableGutters className="dapp-topbar">
        <Box id="topbuttongroup" display="flex" justifyContent="space-between" width="100%" marginTop="10px">
          <ButtonGroup />
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            {isSmallScreen ? <img src={MenuIcon} className="icon-mob" alt="logo" style={{ width: "40px", height: "40px" }} onClick={setmobMenu} /> : <div/> }
            <Social />
            {/* <div className="buy-duu-btn">
                <a href="https://pancakeswap.finance/swap?tokenIn=BNB&tokenOut=0x1B6f709Ff948e00F4c2eD8338a00E40863960Cdb" target="_blank">Dinuu</a>
              </div> */}
            <div className="connect-wallet-btn">
              <Wallet account={account} setAccount={setAccount} chainId={chainId} setChainId={setChainId} />
            </div>
          </div>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;