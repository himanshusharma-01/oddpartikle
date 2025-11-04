'use client';

import Link from 'next/link';
import './footer.css';
import { useEffect, useRef } from 'react';

function FooterHeading({ text }: { text: string }) {
  const containerRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = Array.from(container.querySelectorAll<HTMLSpanElement>('.footer-heading-char'));
    const totalChars = chars.length;
    if (totalChars === 0) return;

    const computeProgress = (): number => {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight * 0.5;
      const elementCenter = rect.top + rect.height * 0.5;
      
      const startPoint = viewportCenter + viewportHeight * 0.5;
      const endPoint = viewportCenter;
      const distance = startPoint - endPoint;
      const elementProgress = startPoint - elementCenter;
      
      const progress = Math.min(Math.max(elementProgress / Math.max(distance, 1), 0), 1);
      return progress;
    };

    const updateCharsByProgress = (progress: number) => {
      const visibleCharsCount = Math.round(progress * totalChars);
      chars.forEach((char, index) => {
        const shouldBeVisible = index < visibleCharsCount;
        char.classList.toggle('footer-heading-char--visible', shouldBeVisible);
      });
    };

    const handleScroll = () => {
      const progress = computeProgress();
      updateCharsByProgress(progress);
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            chars.forEach((el) => el.classList.remove('footer-heading-char--visible'));
            handleScroll();
          }
        });
      },
      { root: null, threshold: 0.01 }
    );

    window.addEventListener('scroll', throttledScroll);
    observer.observe(container);
    
    const handleResize = () => {
      chars.forEach((el) => el.classList.remove('footer-heading-char--visible'));
      handleScroll();
    };
    window.addEventListener('resize', handleResize);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <h2 ref={containerRef} className="footer-heading">
      {Array.from(text).map((ch, cIndex) => (
        <span key={`c-${cIndex}`} className="footer-heading-char">
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </h2>
  );
}

function FooterSubheading({ text }: { text: string }) {
  return (
    <p className="footer-subheading">
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="footer-subheading-char-wrapper"
          style={{ display: 'inline-block', overflow: 'hidden', height: '1em', ['--delay' as any]: `${index * 0.02}s` }}
        >
          <span className="footer-subheading-char">{char === ' ' ? '\u00A0' : char}</span>
          <span className="footer-subheading-char">{char === ' ' ? '\u00A0' : char}</span>
        </span>
      ))}
    </p>
  );
}

function FooterSubtitle({ text }: { text: string }) {
  const containerRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = Array.from(container.querySelectorAll<HTMLSpanElement>('.footer-subtitle-char'));
    const totalChars = chars.length;
    if (totalChars === 0) return;

    const computeProgress = (): number => {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight * 0.5;
      const elementCenter = rect.top + rect.height * 0.5;
      
      const startPoint = viewportCenter + viewportHeight * 0.5;
      const endPoint = viewportCenter;
      const distance = startPoint - endPoint;
      const elementProgress = startPoint - elementCenter;
      
      const progress = Math.min(Math.max(elementProgress / Math.max(distance, 1), 0), 1);
      return progress;
    };

    const updateCharsByProgress = (progress: number) => {
      const visibleCharsCount = Math.round(progress * totalChars);
      chars.forEach((char, index) => {
        const shouldBeVisible = index < visibleCharsCount;
        char.classList.toggle('footer-subtitle-char--visible', shouldBeVisible);
      });
    };

    const handleScroll = () => {
      const progress = computeProgress();
      updateCharsByProgress(progress);
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            chars.forEach((el) => el.classList.remove('footer-subtitle-char--visible'));
            handleScroll();
          }
        });
      },
      { root: null, threshold: 0.01 }
    );

    window.addEventListener('scroll', throttledScroll);
    observer.observe(container);
    
    const handleResize = () => {
      chars.forEach((el) => el.classList.remove('footer-subtitle-char--visible'));
      handleScroll();
    };
    window.addEventListener('resize', handleResize);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <h3 ref={containerRef} className="footer-subtitle">
      {Array.from(text).map((ch, cIndex) => (
        <span key={`c-${cIndex}`} className="footer-subtitle-char">
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </h3>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Left Section - Let's Talk */}
          <div className="footer-section">
            <FooterHeading text="Let's Talk" />
            <FooterSubheading text="Get in touch" />
          </div>

          {/* Middle Section - Contact */}
          <div className="footer-section">
            <FooterSubtitle text="Contact" />
            <div className="footer-links">
              <a href="mailto:bhartendu@oddpartikle.com" className="footer-link">
                {'bhartendu@oddpartikle.com'.split('').map((char, index) => (
                  <span
                    key={index}
                    className="footer-link-char-wrapper"
                    style={{ display: 'inline-block', overflow: 'hidden', height: '1em', ['--delay' as any]: `${index * 0.02}s` }}
                  >
                    <span>{char === ' ' ? '\u00A0' : char}</span>
                    <span>{char === ' ' ? '\u00A0' : char}</span>
                  </span>
                ))}
              </a>
              <a href="tel:+919930687849" className="footer-link">
                {'+91 99306 87849'.split('').map((char, index) => (
                  <span
                    key={index}
                    className="footer-link-char-wrapper"
                    style={{ display: 'inline-block', overflow: 'hidden', height: '1em', ['--delay' as any]: `${index * 0.02}s` }}
                  >
                    <span>{char === ' ' ? '\u00A0' : char}</span>
                    <span>{char === ' ' ? '\u00A0' : char}</span>
                  </span>
                ))}
              </a>
            </div>
          </div>

          {/* Right Section - Catch us */}
          <div className="footer-section">
            <FooterSubtitle text="Catch us" />
            <div className="footer-links">
              <a href="#" className="footer-link" target="_blank" rel="noopener noreferrer">
                {'Linkedin'.split('').map((char, index) => (
                  <span
                    key={index}
                    className="footer-link-char-wrapper"
                    style={{ display: 'inline-block', overflow: 'hidden', height: '1em', ['--delay' as any]: `${index * 0.02}s` }}
                  >
                    <span>{char === ' ' ? '\u00A0' : char}</span>
                    <span>{char === ' ' ? '\u00A0' : char}</span>
                  </span>
                ))}
              </a>
              <a href="#" className="footer-link" target="_blank" rel="noopener noreferrer">
                {'Instagram'.split('').map((char, index) => (
                  <span
                    key={index}
                    className="footer-link-char-wrapper"
                    style={{ display: 'inline-block', overflow: 'hidden', height: '1em', ['--delay' as any]: `${index * 0.02}s` }}
                  >
                    <span>{char === ' ' ? '\u00A0' : char}</span>
                    <span>{char === ' ' ? '\u00A0' : char}</span>
                  </span>
                ))}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}