import React from "react";
import useFixedHeader from "../hooks/useFixedHeader";
import { Link } from "react-router-dom";

function Header() {
    const isAtTop = useFixedHeader();

    return (
        <header className="header">
            <div className="container-menu-desktop">
                <div className="top-bar">
                    <div className="content-topbar flex-sb-m h-full container">
                        <div className="left-top-bar">
                            Free shipping for standard order over $100
                        </div>
                        <div className="right-top-bar flex-w h-full">
                            <Link to="/help" className="flex-c-m trans-04 p-lr-25">
                                Help & FAQs
                            </Link>
                            <Link to="/account" className="flex-c-m trans-04 p-lr-25">
                                My Account
                            </Link>
                            <a className="flex-c-m trans-04 p-lr-25">EN</a>
                            <a className="flex-c-m trans-04 p-lr-25">USD</a>
                        </div>
                    </div>
                </div>

                <div
                    className="wrap-menu-desktop"
                    style={{
                        top: isAtTop ? "40px" : "0",
                        backgroundColor: isAtTop ? "transparent" : "#fff",
                        height: isAtTop ? "84px" : "64px",
                        boxShadow: isAtTop ? "none" : "0 4px 6px rgba(0, 0, 0, 0.1)",
                        opacity: isAtTop ? "1" : "0.95",
                        transition: isAtTop
                            ? "top 0.2s ease-out, background-color 0.5s ease-in-out, height 0.5s ease-in-out, box-shadow 0.5s ease-in-out, opacity 0.5s ease-in-out"
                            : "top 0.1s ease-in, background-color 0.5s ease-in-out, height 0.5s ease-in-out, box-shadow 0.5s ease-in-out, opacity 0.5s ease-in-out",
                    }}
                >
                    <nav className="limiter-menu-desktop container">
                        <Link to="/" className="logo">
                            <img
                                src={`${process.env.PUBLIC_URL}/images/icons/logo-01.png`}
                                alt="LOGO"
                            />
                        </Link>

                        <div className="menu-desktop">
                            <ul className="main-menu">
                                <li className="active-menu">
                                    <a href="/">Home</a>
                                    <ul className="sub-menu">
                                        <li>
                                            <a href="/" className="animsition-link">Homepage 1</a>
                                        </li>
                                        <li>
                                            <a href="/shop">Homepage 2</a>
                                        </li>
                                        <li>
                                            <a href="/contact">Homepage 3</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="/shop">Shop</a>
                                </li>
                                <li className="label1" data-label1="hot">
                                    <a href="/features">Features</a>
                                </li>
                                <li>
                                    <a href="/blog">Blog</a>
                                </li>
                                <li>
                                    <a href="/about">About</a>
                                </li>
                                <li>
                                    <a href="/contact">Contact</a>
                                </li>
                            </ul>
                        </div>
                        <div className="wrap-icon-header flex-w flex-r-m">
                            <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11">
                                <i className="zmdi zmdi-search"></i>
                            </div>
                            <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti" data-notify="2">
                                <i className="zmdi zmdi-shopping-cart"></i>
                            </div>
                            <a
                                href="#"
                                className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti"
                                data-notify="0"
                            >
                                <i className="zmdi zmdi-favorite-outline"></i>
                            </a>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;