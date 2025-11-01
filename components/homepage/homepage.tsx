'use client';

import './homepage.css';
import { useEffect, useRef, ReactNode, useMemo } from 'react';

export default function Homepage() {
  const projects = [
    'Pagenta',
    'TARC',
    'TARC Impacts by Tech',
    'TARC',
    'TARC',
    'GO Games - Think, For Life',
    'TARC Central',
    'TARC',
    'TARC',
    'INFO X',
    'The 4.6'
  ];

  // Use the 7 images from public/portfolio, shuffled once per render lifecycle
  const portfolioImages = [
    '/portfolio/Project-Cover-ANF.jpg',
    '/portfolio/Project-Cover-Cactus.jpg',
    '/portfolio/Project-Cover-Cyberthum.jpg',
    '/portfolio/Project-Cover-GD-Goenka.jpg',
    '/portfolio/Project-Cover-INFOX.jpg',
    '/portfolio/Project-Cover-TARC.jpg',
    '/portfolio/Project-Cover-The54.jpg',
  ];

  const shuffledImages = useMemo(() => {
    const arr = [...portfolioImages];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  // Limit to 7 cards and let titles be handled later
  const displayedProjects = useMemo(() => projects.slice(2, 9), [projects]);

  const services = [
    'Brand Strategy',
    'Identity Design',
    'Web Design',
    'Go-to-market Communication'
  ];

  const journalPosts = [
    { text: 'New developments start?', image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop' },
    { text: 'Makers manage a lot', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop' },
    { text: 'A team from on-time', image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop' }
  ];

  const brandStatement =
    'We design brands that shape environments and influence culture. Our partners are forward thinkers who view design as an engine for change, people who build futures and reshape spaces.';

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="golden-corner top-left"></div>
          <div className="golden-corner top-right"></div>
          <div className="golden-corner bottom-left"></div>
          <div className="curve-bottom-right"></div>
          <div className="hero-curve"></div>
        </div>
        
        <div className="hero-content">
          <h1 className="hero-heading">
                    Building the next 
            <br />
            <span>generation of products , brands</span>
            <span className="hero-ampersand">{' '}&{' '}</span>
            
            experiences.
          </h1>
        </div>
      </section>

      <section className="brand-statement">
      <div className="brand-statement-content">
        <BrandStatement text={brandStatement} />
      </div>
    </section>

      {/* Portfolio Grid Section */}
      <section className="portfolio-section">
        <div className="portfolio-container">
          <div className="portfolio-split">
            {/* First tile: title */}
            <div className="portfolio-tile title-tile">
              <PortfolioTitle text="Portfolio" />
            </div>

            {/* Second tile: first image with caption */}
            <div className="portfolio-tile-wrapper">
              <div
                className="portfolio-tile image-tile"
                style={{
                  backgroundImage: `url(${shuffledImages[0]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              ></div>
              <div className="tile-caption">{displayedProjects[0]}</div>
            </div>

            {/* Remaining images fill the grid in rows of two */}
            {shuffledImages.slice(1).map((img, i) => (
              <div key={`tile-${i}`} className="portfolio-tile-wrapper">
                <div
                  className="portfolio-tile image-tile"
                  style={{
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                ></div>
                <div className="tile-caption">{displayedProjects[i + 1] || ''}</div>
              </div>
            ))}
          </div>
          <button className="view-all-button">
            {'View All'.split('').map((char, index) => (
              <span
                key={index}
                className="view-all-char-wrapper"
                style={{ display: 'inline-block', overflow: 'hidden', height: '1em', ['--delay' as any]: `${index * 0.02}s` }}
              >
                <span className="view-all-char">{char === ' ' ? '\u00A0' : char}</span>
                <span className="view-all-char">{char === ' ' ? '\u00A0' : char}</span>
              </span>
            ))}
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="services-container">
          <div className="services-content-wrapper">
            <h2 className="services-heading">
              We help you to design, build, and launch your project. From strategy and design to development and delivery, we&apos;re here to guide you.
            </h2>
            <div className="services-grid">
              {services.map((service, index) => (
                <div key={index} className="service-item">
                  {service}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Journal Section */}
      <section className="journal-section">
        <div className="journal-container">
          <div className="journal-title-container">
            <JournalTitle text="Journal" />
          </div>
          <div className="journal-content">
            <div className="journal-grid">
              {journalPosts.map((post, index) => (
                <div key={index} className="journal-post">
                  <div className="journal-image" style={{ backgroundImage: `url(${post.image})` }}></div>
                  <div className="journal-text">{post.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Removed placeholder homepage footer section to avoid blank space before global Footer */}
    </div>
  );
}

function PortfolioTitle({ text }: { text: string }) {
  const containerRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = Array.from(container.querySelectorAll<HTMLSpanElement>('.portfolio-char'));
    const totalChars = chars.length;

    const computeProgress = (): number => {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      // Adjust enter/exit points to account for 5rem margin-bottom
      const enterPoint = viewportHeight * 0.85;
      const exitPoint = viewportHeight * 0.15;
      // Include margin-bottom (5rem = 80px) in distance calculation
      const marginBottom = 80;
      const distance = rect.height + marginBottom + (enterPoint - exitPoint);
      const traveled = Math.min(Math.max(enterPoint - rect.top, 0), Math.max(distance, 1));
      return Math.min(Math.max(traveled / Math.max(distance, 1), 0), 1);
    };

    const updateCharsByProgress = (progress: number) => {
      const visibleCharsCount = Math.round(progress * totalChars);
      chars.forEach((char, index) => {
        const shouldBeVisible = index < visibleCharsCount;
        char.classList.toggle('portfolio-char--visible', shouldBeVisible);
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
            chars.forEach((el) => el.classList.remove('portfolio-char--visible'));
            handleScroll();
          }
        });
      },
      { root: null, threshold: 0.01 }
    );

    window.addEventListener('scroll', throttledScroll);
    observer.observe(container);
    
    const handleResize = () => {
      chars.forEach((el) => el.classList.remove('portfolio-char--visible'));
      handleScroll();
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [text]);

  const words = text.split(' ');

  return (
    <p ref={containerRef} className="portfolio-title-text">
      {(
        words
        .map((word, wIndex) => (
          <span key={`w-${wIndex}`} className="portfolio-wordwrap">
            {Array.from(word).map((ch, cIndex) => (
              <span key={`c-${wIndex}-${cIndex}`} className="portfolio-char">
                {ch}
              </span>
            ))}
          </span>
        )) as ReactNode[]
      ).reduce<ReactNode[]>((acc, el, idx) => (idx === 0 ? [el] : [...acc, ' ', el]), [] as ReactNode[])}
    </p>
  );
}

function JournalTitle({ text }: { text: string }) {
  const containerRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = Array.from(container.querySelectorAll<HTMLSpanElement>('.journal-char'));
    const totalChars = chars.length;

    const computeProgress = (): number => {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const enterPoint = viewportHeight * 0.8;
      const exitPoint = viewportHeight * 0.2;
      const distance = rect.height + (enterPoint - exitPoint);
      const traveled = Math.min(Math.max(enterPoint - rect.top, 0), Math.max(distance, 1));
      return Math.min(Math.max(traveled / Math.max(distance, 1), 0), 1);
    };

    const updateCharsByProgress = (progress: number) => {
      const visibleCharsCount = Math.round(progress * totalChars);
      chars.forEach((char, index) => {
        const shouldBeVisible = index < visibleCharsCount;
        char.classList.toggle('journal-char--visible', shouldBeVisible);
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
            chars.forEach((el) => el.classList.remove('journal-char--visible'));
            handleScroll();
          }
        });
      },
      { root: null, threshold: 0.01 }
    );

    window.addEventListener('scroll', throttledScroll);
    observer.observe(container);
    
    const handleResize = () => {
      chars.forEach((el) => el.classList.remove('journal-char--visible'));
      handleScroll();
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [text]);

  const words = text.split(' ');

  return (
    <p ref={containerRef} className="journal-title-text">
      {(
        words
        .map((word, wIndex) => (
          <span key={`w-${wIndex}`} className="journal-wordwrap">
            {Array.from(word).map((ch, cIndex) => (
              <span key={`c-${wIndex}-${cIndex}`} className="journal-char">
                {ch}
              </span>
            ))}
          </span>
        )) as ReactNode[]
      ).reduce<ReactNode[]>((acc, el, idx) => (idx === 0 ? [el] : [...acc, ' ', el]), [] as ReactNode[])}
    </p>
  );
}

function BrandStatement({ text }: { text: string }) {
  const containerRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = Array.from(container.querySelectorAll<HTMLSpanElement>('.brand-char'));
    const totalChars = chars.length;

    const computeProgress = (): number => {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      // Section starts animating when its top is 80% down the viewport,
      // and finishes when its bottom reaches 20% up the viewport
      const enterPoint = viewportHeight * 1.4;
      const exitPoint = viewportHeight * 0.5;
      const distance = rect.height + (enterPoint - exitPoint);
      const traveled = Math.min(Math.max(enterPoint - rect.top, 0), Math.max(distance, 1));
      return Math.min(Math.max(traveled / Math.max(distance, 1), 0), 1);
    };

    const updateCharsByProgress = (progress: number) => {
      const visibleCharsCount = Math.round(progress * totalChars);
      chars.forEach((char, index) => {
        const shouldBeVisible = index < visibleCharsCount;
        char.classList.toggle('brand-char--visible', shouldBeVisible);
      });
    };

    const handleScroll = () => {
      const progress = computeProgress();
      updateCharsByProgress(progress);
    };

    // Throttle scroll events
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

    // Reset animation when section enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            chars.forEach((el) => el.classList.remove('brand-char--visible'));
            handleScroll();
          }
        });
      },
      { root: null, threshold: 0.01 }
    );

    window.addEventListener('scroll', throttledScroll);
    observer.observe(container);
    
    // Initial state and on resize
    const handleResize = () => {
      chars.forEach((el) => el.classList.remove('brand-char--visible'));
      handleScroll();
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [text]);

  const words = text.split(' ');

  return (
    <p ref={containerRef} className="brand-statement-text">
      {(
        words
        .map((word, wIndex) => (
          <span key={`w-${wIndex}`} className="brand-wordwrap">
            {Array.from(word).map((ch, cIndex) => (
              <span key={`c-${wIndex}-${cIndex}`} className="brand-char">
                {ch}
              </span>
            ))}
          </span>
        )) as ReactNode[]
      ).reduce<ReactNode[]>((acc, el, idx) => (idx === 0 ? [el] : [...acc, ' ', el]), [] as ReactNode[])}
    </p>
  );
}