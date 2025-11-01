'use client';

import { useState } from 'react';
import Link from 'next/link';
import './navbar.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'Journal', href: '/journal' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <Link href="/" className="navbar-logo">
            {'Oddpartikle'.split('').map((char, index) => (
              <span
                key={index}
                className="navbar-char-wrapper"
                style={{ display: 'inline-block', overflow: 'hidden', height: '1em', ['--delay' as any]: `${index * 0.02}s` }}
              >
                <span className="navbar-char">{char === ' ' ? '\u00A0' : char}</span>
                <span className="navbar-char">{char === ' ' ? '\u00A0' : char}</span>
              </span>
            ))}
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-desktop">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="navbar-link"
              >
                {item.name.split('').map((char, index) => (
                  <span
                    key={index}
                    className="navbar-char-wrapper"
                    style={{ display: 'inline-block', overflow: 'hidden', height: '1em', ['--delay' as any]: `${index * 0.02}s` }}
                  >
                    <span className="navbar-char">{char === ' ' ? '\u00A0' : char}</span>
                    <span className="navbar-char">{char === ' ' ? '\u00A0' : char}</span>
                  </span>
                ))}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="navbar-mobile-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="navbar-menu-line"></span>
            <span className="navbar-menu-line"></span>
            <span className="navbar-menu-line"></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="navbar-mobile-menu">
            <div className="navbar-mobile-links">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="navbar-mobile-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name.split('').map((char, index) => (
                    <span
                      key={index}
                      className="navbar-char-wrapper"
                      style={{ display: 'inline-block', overflow: 'hidden', height: '1em', ['--delay' as any]: `${index * 0.02}s` }}
                    >
                      <span className="navbar-char">{char === ' ' ? '\u00A0' : char}</span>
                      <span className="navbar-char">{char === ' ' ? '\u00A0' : char}</span>
                    </span>
                  ))}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}