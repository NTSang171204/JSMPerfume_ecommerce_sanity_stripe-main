import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineShopping } from "react-icons/ai";
import { IoSearchSharp } from "react-icons/io5";
import { Cart } from "./";
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">JSM Perfumes</Link>
      </p>
      
      <nav className="flex space-x-4">
        <Link href="/">
          <a className="nav-link">Home</a>
        </Link>
        <Link href="/about">
          <a className="nav-link">About Us</a>
        </Link>
        <Link href="/products">
          <a className="nav-link">Products</a>
        </Link>
      </nav>
      {/* Search Form */}

      
      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
          <button type="submit" className="search-button">
            <IoSearchSharp />
          </button>
          <input
            type="text"
            placeholder="Search product(s) name..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
        </form>
      </div>

      <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
