/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "../Styles/Header.css"
import { Logo } from '../../assets'
import { CartIcon, SearchIcon } from './icons';
import Search from '../Main/Search';
import { useCart } from '../Hooks/Context';
import { CompanyName } from '../../../Data';
function Header() {
    const { cart } = useCart();
    return (
        <header>
            <div className="header">
                <div className="logo">
                    <Link to="/">
                        {CompanyName}
                    </Link>
                </div>
                <nav>
                    <Search />
                    <ul>
                        <li className='hideRespo'>
                            <Link to="/">
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link to="/cart">
                                <CartIcon />
                                <sup className='cartNumber'><small>{cart && cart.length}</small></sup>
                            </Link>
                        </li>

                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header