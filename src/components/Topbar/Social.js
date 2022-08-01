import { SvgIcon, Link } from "@material-ui/core";
import { ReactComponent as Medium } from "../../assets/images/medium.svg";

import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import GithubIcon from '@mui/icons-material/GitHub';

// import './Topbar.css';
// import img1_1 from '../../assets/ohm/1-1.png';
// import img1_2 from '../../assets/ohm/1-2.png';
// import img1_3 from '../../assets/ohm/1-3.png';
// import img1_4 from '../../assets/ohm/1-4.png';





export default function Social() {
  return (
    // <div className="social-row">
    //   <Link href="https://github.com/OlympusDAO" target="_blank">
    //     <SvgIcon color="primary" component={GitHub} />
    //   </Link>

    //   <Link href="https://olympusdao.medium.com/" target="_blank">
    //     <SvgIcon color="primary" component={Medium} />
    //   </Link>

    //   <Link href="https://twitter.com/OlympusDAO" target="_blank">
    //     <SvgIcon color="primary" component={Twitter} />
    //   </Link>

    //   <Link href="https://discord.gg/6QjjtUcfM4" target="_blank">
    //     <SvgIcon color="primary" component={Discord} />
    //   </Link>
    // </div>
    <div className="social-row " style={{display: "flex"}}>
      <a href="https://twitter.com/DinoDefi_io" target="_blank" className="bottomImgs"><TwitterIcon style={{width: "30px", height: "30px"}}/></a>
      <a href="https://t.me/dinodefi" target="_blank" className="bottomImgs"><TelegramIcon  style={{width: "30px", height: "30px"}}/></a>
      <a href="https://github.com/DinoDefi" target="_blank" className="bottomImgs"><GithubIcon  style={{width: "30px", height: "30px"}}/></a>
      <a href="https://dinodefi.medium.com/" target="_blank" className="bottomImgs"><SvgIcon component={Medium}  style={{width: "30px", height: "30px", marginLeft:"3px", marginTop:"3px"}}/></a>
    </div>
  );
}
