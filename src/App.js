import React, {useState} from 'react';
import './App.css';
import Dashboard from './pages/Dashboard/Dashboard'
import { Routes, Route } from "react-router-dom";
import Calculator from './pages/Calculator/Calculator';
import Account from './pages/Account/Account';
import MobSidebar from './components/MobSidebar/MobSidebar';
import WalletModal from './components/WalletModal/WalletModal';
function App() {
  const[mobMenu, setmobMenu] = useState(false)
  const[Modal, setModal] = useState(false)
  const handlerSetmonMenu= () =>{
    setmobMenu(!mobMenu)
  }
  const handlerSetModal= (event) => {
    event.preventDefault()
    console.log('clicked');
    setModal(!Modal)
  }
  return (
    <>
      <Routes>
				<Route path="/" exact element={<Dashboard setmobMenu={handlerSetmonMenu} setModal={handlerSetModal}/>} />
				<Route path="/account" exact element={<Account setmobMenu={handlerSetmonMenu} setModal={handlerSetModal}/>} />
				<Route path="/calculator" exact element={<Calculator setmobMenu={handlerSetmonMenu} setModal={handlerSetModal}/>} />
			</Routes>
      <MobSidebar mobMenu={mobMenu} setmobMenu={handlerSetmonMenu}/>
      <WalletModal Modal={Modal} setModal={handlerSetModal}/>
    </>
  );
}

export default App;
