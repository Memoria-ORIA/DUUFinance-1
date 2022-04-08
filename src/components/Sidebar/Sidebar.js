import React from 'react'
import { NavLink } from "react-router-dom";
import Logo from "../../assets/images/favicon.png";
import DashboardIcon from "../../assets/images/dashboard.svg";
import AccountIcon from "../../assets/images/account.svg";
import CalcIcon from "../../assets/images/calculator.svg";
import DocIcon from "../../assets/images/document.svg";
import './sidebar.css'
export default function Sidebar(props) {
    const account = props.account;
    const dispaccount = props.account? props.account.substr(0,6) +"..."+props.account.slice(-4):"";
    const url = "https://bscscan.com/address/" + account;
    return (
        <>
            <div className="sidebar-wrap">
                <div className="sidebar-img">
                    <img className="icon" src={Logo} alt="Site Logo" />
                </div>
                <div className="sidebar-navigation">
                    <ul>
                        {account?
                            <li>
                                <span>
                                    <a href={url} style={{ paddingLeft: "30px", fontSize: "15px" }} target="_blank">{dispaccount}</a>
                                </span>
                            </li> :
                            <li></li>
                        }
                        <li>
                            <NavLink to="/" activeclassname="active">
                                <img src={DashboardIcon} alt="Dashboard Icon" />
                                <span>Dashboard</span></NavLink>
                        </li>
                        <li>
                            <NavLink to="/account" activeclassname="active">
                                <img src={AccountIcon} alt="Account Icon" />
                                <span>Account</span></NavLink>
                        </li>
                        <li>
                            <NavLink to="/calculator" activeclassname="active">
                                <img src={CalcIcon} alt="Calc Icon" />
                                <span>Calculator</span></NavLink>
                        </li>
                        <li>
                            <a href="#">
                                <img src={DocIcon} alt="Doc Icon" />
                                <span>Docs</span></a>
                        </li>
                    </ul>
                </div>
                <div className="sidebar-social">
                    <ul>
                        <li><a href="/">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill='#ffffff' xmlns="http://www.w3.org/2000/svg" className="fill-svg" focusable="false" aria-hidden="true"><path d="M 18.609375 6.992188 C 18.609375 8.164062 18.449219 9.167969 18.125 10 C 17.800781 10.832031 17.332031 11.472656 16.714844 11.921875 C 16.09375 12.367188 15.476562 12.691406 14.859375 12.894531 C 14.242188 13.09375 13.519531 13.242188 12.683594 13.332031 C 13.273438 13.828125 13.566406 14.613281 13.566406 15.695312 L 13.566406 19.859375 L 7.128906 19.859375 L 7.128906 16.851562 C 6.636719 16.945312 6.179688 16.992188 5.765625 16.992188 C 5.347656 16.992188 4.992188 16.953125 4.699219 16.875 C 4.40625 16.796875 4.144531 16.699219 3.910156 16.574219 C 3.679688 16.449219 3.496094 16.320312 3.355469 16.179688 C 3.21875 16.042969 3.101562 15.910156 3.007812 15.785156 C 2.917969 15.664062 2.855469 15.554688 2.824219 15.464844 L 2.777344 15.324219 C 2.59375 14.890625 2.382812 14.523438 2.152344 14.214844 C 1.921875 13.90625 1.726562 13.703125 1.574219 13.609375 L 1.34375 13.472656 C 1.003906 13.195312 0.832031 13 0.832031 12.894531 C 0.832031 12.785156 0.941406 12.714844 1.15625 12.683594 L 1.433594 12.683594 C 1.804688 12.714844 2.160156 12.839844 2.5 13.054688 C 2.839844 13.273438 3.070312 13.488281 3.195312 13.703125 L 3.425781 13.980469 C 4.257812 15.433594 5.507812 15.785156 7.175781 15.046875 C 7.269531 14.304688 7.546875 13.734375 8.007812 13.332031 C 7.175781 13.242188 6.449219 13.09375 5.832031 12.894531 C 5.214844 12.691406 4.605469 12.367188 4.003906 11.921875 C 3.402344 11.472656 2.933594 10.832031 2.59375 10 C 2.253906 9.167969 2.082031 8.164062 2.082031 6.992188 C 2.082031 5.664062 2.53125 4.523438 3.425781 3.566406 C 3.023438 2.546875 3.070312 1.40625 3.566406 0.140625 C 3.65625 0.167969 3.78125 0.160156 3.933594 0.117188 C 4.089844 0.0703125 4.476562 0.160156 5.09375 0.394531 C 5.710938 0.625 6.390625 0.988281 7.128906 1.480469 C 8.148438 1.203125 9.226562 1.050781 10.371094 1.019531 C 11.480469 1.050781 12.5625 1.203125 13.609375 1.480469 C 14.320312 0.988281 14.976562 0.632812 15.578125 0.417969 C 16.179688 0.199219 16.589844 0.09375 16.804688 0.09375 L 17.128906 0.140625 C 17.65625 1.40625 17.699219 2.546875 17.269531 3.566406 C 18.164062 4.523438 18.609375 5.664062 18.609375 6.992188 Z M 2.316406 13.265625 C 2.34375 13.1875 2.308594 13.125 2.199219 13.078125 C 2.089844 13.03125 2.023438 13.046875 1.992188 13.125 C 1.960938 13.203125 2 13.265625 2.105469 13.308594 C 2.214844 13.355469 2.285156 13.339844 2.316406 13.265625 Z M 2.847656 13.84375 C 2.925781 13.78125 2.910156 13.695312 2.800781 13.589844 C 2.691406 13.480469 2.601562 13.457031 2.523438 13.519531 C 2.445312 13.582031 2.460938 13.664062 2.570312 13.773438 C 2.675781 13.882812 2.769531 13.90625 2.847656 13.84375 Z M 3.332031 14.582031 C 3.425781 14.523438 3.425781 14.421875 3.332031 14.28125 C 3.242188 14.144531 3.148438 14.105469 3.054688 14.167969 C 2.964844 14.226562 2.964844 14.328125 3.054688 14.46875 C 3.148438 14.605469 3.242188 14.644531 3.332031 14.582031 Z M 4.050781 15.324219 C 4.128906 15.230469 4.105469 15.117188 3.980469 14.976562 C 3.859375 14.839844 3.75 14.816406 3.65625 14.90625 C 3.566406 15 3.589844 15.117188 3.726562 15.253906 C 3.867188 15.394531 3.972656 15.417969 4.050781 15.324219 Z M 5 15.71875 C 5.03125 15.609375 4.960938 15.523438 4.792969 15.464844 C 4.621094 15.402344 4.523438 15.433594 4.492188 15.554688 C 4.460938 15.679688 4.53125 15.765625 4.699219 15.808594 C 4.867188 15.855469 4.96875 15.824219 5 15.71875 Z M 5.785156 15.972656 C 5.972656 15.972656 6.066406 15.910156 6.066406 15.785156 C 6.066406 15.664062 5.972656 15.601562 5.785156 15.601562 C 5.601562 15.601562 5.507812 15.664062 5.507812 15.785156 C 5.507812 15.910156 5.601562 15.972656 5.785156 15.972656 Z M 6.804688 15.878906 C 6.898438 15.847656 6.96875 15.808594 7.015625 15.765625 C 7.058594 15.71875 7.066406 15.679688 7.035156 15.648438 C 7.035156 15.492188 6.945312 15.433594 6.757812 15.464844 C 6.667969 15.492188 6.597656 15.53125 6.550781 15.578125 C 6.503906 15.625 6.496094 15.679688 6.527344 15.742188 C 6.527344 15.863281 6.621094 15.910156 6.804688 15.878906 Z M 6.804688 15.878906"></path></svg>
                        </a></li>
                        <li><a href="/">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" className="fill-svg" focusable="false" aria-hidden="true"><path d="M18.1818 0H1.81818C0.813636 0 0 0.813636 0 1.81818V18.1818C0 19.1864 0.813636 20 1.81818 20H18.1818C19.1864 20 20 19.1864 20 18.1818V1.81818C20 0.813636 19.1864 0 18.1818 0ZM16.8564 15.4545H11.4645V15.1518L12.7273 14.0409V7.7L9.62636 15.4545H9.14182L5.68182 7.63909V13.1727L7.26364 15.1518V15.4545H3.14364V15.1518L4.77909 13.1727V6.58909L3.32545 4.77182C3.32545 4.77182 3.32545 4.50909 3.32545 4.55H7.30364L10.3936 11.2345L13.0591 4.55H16.8355V4.77182L15.4545 5.93273V14.0409L16.8564 15.1518V15.4545Z"></path></svg>
                        </a></li>
                        <li><a href="/">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" className="fill-svg" focusable="false" aria-hidden="true"><path d="M20 3.92377C19.2639 4.25068 18.4731 4.47067 17.6432 4.5699C18.4908 4.06223 19.1408 3.25841 19.4469 2.29999C18.6547 2.76997 17.7762 3.1115 16.8409 3.2961C16.0925 2.49844 15.0263 2 13.8464 2C11.5803 2 9.74347 3.83762 9.74347 6.10292C9.74347 6.42445 9.78039 6.73828 9.84962 7.0375C6.43975 6.86674 3.41679 5.23295 1.39225 2.74997C1.03996 3.3561 0.83766 4.06069 0.83766 4.81374C0.83766 6.23676 1.56148 7.49287 2.66221 8.22822C1.98992 8.20669 1.35687 8.02208 0.803815 7.71517C0.803815 7.73286 0.803815 7.74901 0.803815 7.7667C0.803815 9.75509 2.21761 11.4135 4.09523 11.7896C3.75139 11.8835 3.38833 11.9335 3.01373 11.9335C2.74989 11.9335 2.49221 11.9073 2.24222 11.8604C2.76451 13.4903 4.27984 14.6772 6.07515 14.7103C4.67136 15.811 2.9022 16.4671 0.979193 16.4671C0.648437 16.4671 0.321526 16.4479 0 16.4094C1.81608 17.5733 3.97216 18.2525 6.28976 18.2525C13.8372 18.2525 17.9632 12.0004 17.9632 6.57829C17.9632 6.4006 17.9593 6.22368 17.9516 6.04754C18.7539 5.46833 19.45 4.74605 20 3.92377Z"></path></svg>
                        </a></li>
                        <li><a href="/"><svg width="20" height="20" viewBox="0 0 20 20" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" className="fill-svg" focusable="false" aria-hidden="true"><path d="M17.2286 4.63925C15.4971 3.24782 12.7593 3.01211 12.6436 3.00211C12.4607 2.98639 12.2871 3.08997 12.2121 3.25711C12.2093 3.26282 12.0564 3.70639 11.9086 4.13425C13.9207 4.48639 15.2879 5.26782 15.3607 5.31068C15.7021 5.50925 15.8164 5.94711 15.6171 6.28782C15.485 6.51496 15.2457 6.64211 15 6.64211C14.8779 6.64211 14.755 6.61139 14.6421 6.54568C14.6221 6.53354 12.6164 5.39211 10.0014 5.39211C7.38571 5.39211 5.37929 6.53425 5.35929 6.54568C5.01857 6.74354 4.58143 6.62711 4.38357 6.28568C4.18571 5.94568 4.30071 5.50925 4.64071 5.31068C4.71357 5.26782 6.08571 4.48354 8.10357 4.13211C7.94786 3.69925 7.79071 3.26282 7.78786 3.25711C7.71286 3.08925 7.53929 2.98354 7.35643 3.00211C7.24071 3.01139 4.50286 3.24711 2.74857 4.65782C1.83143 5.50497 0 10.4578 0 14.74C0 14.8157 0.0192857 14.8893 0.0571429 14.955C1.32214 17.1764 4.77071 17.7578 5.55643 17.7828C5.56143 17.7835 5.56571 17.7835 5.57 17.7835C5.70857 17.7835 5.83929 17.7171 5.92143 17.605L6.77143 16.4535C4.90714 16.0043 3.92143 15.2978 3.86214 15.2542C3.545 15.0207 3.47643 14.5735 3.71 14.2557C3.94286 13.9393 4.38857 13.8693 4.70571 14.1014C4.73214 14.1185 6.55143 15.3921 10 15.3921C13.4621 15.3921 15.2764 14.1135 15.2943 14.1007C15.6114 13.8707 16.0586 13.94 16.2907 14.2585C16.5221 14.5757 16.455 15.02 16.1393 15.2528C16.08 15.2964 15.0993 16.0014 13.2393 16.4507L14.0786 17.6042C14.1607 17.7171 14.2914 17.7828 14.43 17.7828C14.435 17.7828 14.4393 17.7828 14.4436 17.7821C15.23 17.7571 18.6786 17.1757 19.9429 14.9542C19.9807 14.8885 20 14.815 20 14.7393C20 10.4578 18.1686 5.50497 17.2286 4.63925ZM7.14286 13.2493C6.35357 13.2493 5.71429 12.45 5.71429 11.4635C5.71429 10.4771 6.35357 9.67782 7.14286 9.67782C7.93214 9.67782 8.57143 10.4771 8.57143 11.4635C8.57143 12.45 7.93214 13.2493 7.14286 13.2493ZM12.8571 13.2493C12.0679 13.2493 11.4286 12.45 11.4286 11.4635C11.4286 10.4771 12.0679 9.67782 12.8571 9.67782C13.6464 9.67782 14.2857 10.4771 14.2857 11.4635C14.2857 12.45 13.6464 13.2493 12.8571 13.2493Z"></path></svg></a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

