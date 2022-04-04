import {useState} from 'react'
import metamask from "../../assets/images/metamask.png";
import walletconnect from "../../assets/images/walletconnect.png";
import Qrcode from '../../assets/images/qr.svg'
import wallet1 from '../../assets/images/w-logo-1.PNG'
import wallet2 from '../../assets/images/w-logo-2.PNG'
import wallet3 from '../../assets/images/w-logo-3.PNG'
import wallet4 from '../../assets/images/w-logo-4.PNG'
import wallet5 from '../../assets/images/w-logo-5.PNG'
import wallet6 from '../../assets/images/w-logo-6.PNG'
import wallet7 from '../../assets/images/w-logo-7.PNG'
import wallet8 from '../../assets/images/w-logo-8.PNG'
import wallet9 from '../../assets/images/w-logo-9.PNG'
import './modal.css'
const WalletModal = ({Modal, setModal}) => {
    const [activeTab, setActiveTab] = useState("desktop")
    const [activeInnerModal, setActiveInnerModal] = useState(false)
    const handleInnerModal = () =>{
        setActiveInnerModal(!activeInnerModal)
    }
  return (
      <>
      <div className={Modal ? "modalroot modal-active": "modalroot"}>

        <div className="wallet-wrap-main">
            <div className="wallets-main border-btm">
                <img src={metamask} alt="Meta mask Logo" />
                <h1>Metamask / Injected</h1>
                <p>Connect with the provider in your Browser or Dapp</p>
            </div>
            <div className="wallets-main bg-gray" onClick={handleInnerModal}>
                <img src={walletconnect} alt="Meta mask Logo" />
                <h1>WalletConnect</h1>
                <p>Scan with WalletConnect to connect</p>
            </div>
            <div
                className={ activeInnerModal ? " " : "close-main"}
                onClick={setModal}
            >
                <div className="line1"></div>
                <div className="line2"></div>
            </div>
        </div> 

        <div className={activeInnerModal ? "modal-container modal-container-active" : "modal-container"}>
            <div className="wallet-header">
                <h1>ConnectWallet</h1>
                <div className="close" onClick={handleInnerModal}>
                    <div class="line1"></div>
                    <div class="line2"></div>
                </div>
            </div>
            <div className="wallet-container">
                <div className="tab-wrap">
                    <button className={activeTab === 'desktop' ? 'active' : ''} onClick={()=>setActiveTab('desktop')}>Desktop</button>
                    <button className={activeTab === 'qrcode' ? 'active' : ''} onClick={()=>setActiveTab('qrcode')}>QR Code</button>
                </div>
                {activeTab === 'qrcode' && (
                    <div className="qrcode-wrap">
                    <p>Scan QR code with a WalletConnect-compatible wallet</p>
                    <img src={Qrcode} alt="Qr code " />
                    <p>Copy to Clipboard</p>
                </div>
                )}
                {activeTab === 'desktop' && (
                    <div className='wallets'>
                    <p>Choose your Prefered Wallet</p>
                   <div className="wallet-desktop">
                       <div className="wallet-wrap">
                           <button>
                            <img src={wallet1} alt="wallet icon" />
                            <span>Ledger</span>
                            </button>
                       </div>
                       <div className="wallet-wrap">
                           <button>
                           <img className='wallet1' src={wallet2} alt="wallet icon" />
                           <span>Tokenary</span>
                           </button>
                       </div>
                       <div className="wallet-wrap">
                           <button>
                           <img src={wallet3} alt="wallet icon" />
                           <span>Infinity Wallet</span>
                           </button>
                       </div>
                       <div className="wallet-wrap">
                           <img className='wallet1' src={wallet4} alt="wallet icon" />
                           <span>Wallet 3</span>
                       </div>
                       <div className="wallet-wrap">
                           <button>
                            <img src={wallet5} alt="wallet icon" />
                            <span>SecuX</span>
                            </button>
                       </div>
                       <div className="wallet-wrap">
                           <button>
                           <img className='wallet1' src={wallet6} alt="wallet icon" />
                           <span>Ambire</span>
                           </button>
                       </div>
                       <div className="wallet-wrap">
                           <button>
                           <img src={wallet7} alt="wallet icon" />
                           <span>KryptoGo</span>
                           </button>
                       </div>
                       <div className="wallet-wrap">
                           <button>
                           <img className='wallet1' src={wallet8} alt="wallet icon" />
                           <span>Ledger</span>
                           </button>
                       </div>
                       <div className="wallet-wrap">
                           <button>
                           <img className='wallet1' src={wallet9} alt="wallet icon" />
                           <span>Ledger</span>
                           </button>
                       </div>
                   </div>
                   </div>
                )}
            </div>
        </div>
      </div>
      </>
  )
}

export default WalletModal