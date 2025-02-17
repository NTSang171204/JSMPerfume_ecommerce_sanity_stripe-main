import React from 'react';
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';
import { FaFacebook } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-grid">
        {/* Logo */}
        <div className="footer-logo">
          <h2>JSM Perfumes</h2>
        </div>

        {/* Contact */}
        <div className="footer-contact">
          <h3>Contact</h3>
          <p>Email: contact@jsmperfumes.com</p>
          <p>Address: 123 Perfume St, Fragrance City</p>
        </div>

        {/* Company */}
        <div className="footer-company">
          <h3>Company</h3>
          <ul>
            <li><Link href="/"><a>Home</a></Link></li>
            <li><Link href="/about"><a>About Us</a></Link></li>
            <li><Link href="/products"><a>Products</a></Link></li>
          </ul>
        </div>

        {/* Social */}
        <div className="footer-social">
          <h3>Social</h3>
          <div className="icons">
            <AiFillInstagram />
            <AiOutlineTwitter />
            <FaFacebook />
          </div>
        </div>
      </div>
      <p className="footer-rights">2025 JSM Perfumes All rights reserved</p>
    </div>
  );
};

export default Footer;