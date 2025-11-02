'use client';

import './homepage.css';
import { useEffect, useRef, ReactNode, useMemo } from 'react';

export default function Homepage() {
  const brandStatementRef = useRef<HTMLElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const servicesScrollRef = useRef<HTMLDivElement>(null);
  const workSvgRef = useRef<HTMLImageElement>(null);

  // Prevent scroll jump on page load
  useEffect(() => {
    // Disable scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Ensure page starts at top on load
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      
      // Also reset on page show (back/forward navigation)
      const handlePageShow = (e: PageTransitionEvent) => {
        if (e.persisted) {
          window.scrollTo(0, 0);
        }
      };
      
      window.addEventListener('pageshow', handlePageShow);
      
      return () => {
        window.removeEventListener('pageshow', handlePageShow);
      };
    }
  }, []);
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

  // Use the 7 images from public/portfolio in specific order: TARC, GD-Goenka, INFOX, then others
  const portfolioImages = [
    '/portfolio/Project-Cover-TARC.jpg',      // First: TARC
    '/portfolio/Project-Cover-GD-Goenka.jpg', // Second: GD-Goenka
    '/portfolio/Project-Cover-INFOX.jpg',      // Third: INFOX
    '/portfolio/Project-Cover-ANF.jpg',
    '/portfolio/Project-Cover-Cactus.jpg',
    '/portfolio/Project-Cover-Cyberthum.jpg',
    '/portfolio/Project-Cover-The54.jpg',
  ];

  // Match projects to image order: TARC, GD-Goenka, INFOX, then others
  const displayedProjects = useMemo(() => [
    'TARC',
    'GD Goenka',
    'INFO X',
    'ANF',
    'Cactus',
    'Cyberthum',
    'The54'
  ], []);

  const services = [
    'Brand Strategy',
    'Identity Design',
    'Web Design',
    'Go-to-market Communication',
    'UX/UI Design',
    'Product Development',
    'Digital Marketing',
    'Content Strategy',
    'Brand Consulting',
    'Motion Design',
    'E-commerce Solutions',
    'Mobile App Design'
  ];

  const journalPosts = [
    { text: 'What does Oddpartikle mean?', image: '/journal.avif' },
    { text: 'Hidden message in LIC', image: '/journal.avif' },
    { text: 'A lesson from an Old Wall', image: '/journal.avif' },
    { text: 'New developments start?', image: '/journal.avif' }
  ];

  const brandStatement =
    'We design brands that shape environments and influence culture. Our partners are forward thinkers who view design as an engine for change, people who build futures and reshape spaces.';

  // Hero section background change when brand statement scrolls over it
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = heroSectionRef.current;
      const brandStatement = brandStatementRef.current;
      
      if (!heroSection || !brandStatement) return;
      
      const heroRect = heroSection.getBoundingClientRect();
      const brandRect = brandStatement.getBoundingClientRect();
      
      // Check if brand statement has scrolled past the hero section (top of brand is above bottom of hero)
      const brandTopRelativeToHero = brandRect.top - heroRect.bottom;
      
      // If brand statement has crossed over the hero (brand top is at or above hero bottom)
      if (brandTopRelativeToHero <= 0) {
        heroSection.classList.add('hero-section--white');
      } else {
        heroSection.classList.remove('hero-section--white');
      }
    };
    
    let rafId: number | null = null;
    const throttledScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        handleScroll();
        rafId = null;
      });
    };
    
    window.addEventListener('scroll', throttledScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Parallax effect for work.svg
  useEffect(() => {
    const handleScroll = () => {
      const workSvg = workSvgRef.current;
      if (!workSvg) return;
      
      const rect = workSvg.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate parallax offset based on scroll position
      // SVG moves slower than scroll (30% speed)
      const scrollProgress = (viewportHeight - rect.top) / viewportHeight;
      const parallaxOffset = scrollProgress * 50; // Adjust multiplier for intensity
      
      workSvg.style.transform = `translateY(${parallaxOffset}px)`;
    };
    
    let rafId: number | null = null;
    const throttledScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        handleScroll();
        rafId = null;
      });
    };
    
    window.addEventListener('scroll', throttledScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Minimal parallax effect for portfolio and journal images and their text
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const parallaxSpeed = 0.1;
      const parallaxOffset = scrollY * parallaxSpeed;
      
      // Portfolio wrappers (includes both image and caption - they move together)
      const portfolioWrappers = document.querySelectorAll<HTMLElement>('.portfolio-tile-wrapper');
      portfolioWrappers.forEach((wrapper) => {
        wrapper.style.transform = `translateY(${parallaxOffset}px)`;
      });
      
      // View All button should NOT move with parallax - it stays in place
      const viewAllWrapper = document.querySelector<HTMLElement>('.view-all-wrapper');
      if (viewAllWrapper) {
        viewAllWrapper.style.transform = `translateY(0)`;
      }
      
      // Journal posts - NO parallax effect, stays in normal flow
      const journalPosts = document.querySelectorAll<HTMLElement>('.journal-post');
      journalPosts.forEach((post) => {
        post.style.transform = `translateY(0)`;
      });
    };
    
    let rafId: number | null = null;
    const throttledScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        handleScroll();
        rafId = null;
      });
    };
    
    window.addEventListener('scroll', throttledScroll);
    
    // Delay initial scroll check to ensure images are fully rendered
    const initialTimeout = setTimeout(() => {
      handleScroll();
    }, 100);
    
    return () => {
      clearTimeout(initialTimeout);
      window.removeEventListener('scroll', throttledScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Infinite horizontal scroll for services with scroll-fill animation
  useEffect(() => {
    const scrollContainer = servicesScrollRef.current;
    if (!scrollContainer) return;

    const serviceItems = Array.from(scrollContainer.querySelectorAll<HTMLDivElement>('.service-item'));
    const totalItems = serviceItems.length;

    const computeProgress = (): number => {
      const rect = scrollContainer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight * 0.5;
      const elementCenter = rect.top + rect.height * 0.5;
      
      // Start animating when element center is above screen center
      // Finish when element center reaches screen center (scroll down makes text black)
      const startPoint = viewportCenter + viewportHeight * 0.5;
      const endPoint = viewportCenter;
      const distance = startPoint - endPoint;
      const elementProgress = startPoint - elementCenter;
      
      // Progress increases as we scroll down
      const progress = Math.min(Math.max(elementProgress / Math.max(distance, 1), 0), 1);
      return progress;
    };

    const updateItemsByProgress = (progress: number) => {
      const visibleItemsCount = Math.round(progress * totalItems);
      serviceItems.forEach((item, index) => {
        const shouldBeVisible = index < visibleItemsCount;
        item.classList.toggle('service-item--visible', shouldBeVisible);
      });
    };

    const handleScroll = () => {
      const progress = computeProgress();
      updateItemsByProgress(progress);
    };

    let scrollPosition = 0;
    const scrollSpeed = 0.50; // Scroll speed (pixels per frame)
    let animationFrameId: number | null = null;
    let isAnimating = false;

    const animate = () => {
      if (scrollContainer && isAnimating) {
        scrollPosition += scrollSpeed;
        scrollContainer.scrollLeft = scrollPosition;

        // Reset scroll position when reaching the end (one complete set)
        const singleSetWidth = scrollContainer.scrollWidth / 3; // Divide by 3 since we have 3 copies
        if (scrollPosition >= singleSetWidth) {
          scrollPosition = 0;
          scrollContainer.scrollLeft = 0;
        }
        
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    // Only start auto-scroll when the section is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!isAnimating) {
              isAnimating = true;
              animate();
            }
            serviceItems.forEach((el) => el.classList.remove('service-item--visible'));
            handleScroll();
          } else if (!entry.isIntersecting && isAnimating) {
            isAnimating = false;
            if (animationFrameId !== null) {
              cancelAnimationFrame(animationFrameId);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

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

    window.addEventListener('scroll', throttledScroll);
    observer.observe(scrollContainer);
    
    const handleResize = () => {
      serviceItems.forEach((el) => el.classList.remove('service-item--visible'));
      handleScroll();
    };
    window.addEventListener('resize', handleResize);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      isAnimating = false;
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [services]);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section ref={heroSectionRef} className="hero-section">
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
            <span>generation of products, brands</span>
            <span className="hero-ampersand">{'   '} & {'  '}</span>
            
            experiences.
          </h1>
        </div>
      </section>

      <section ref={brandStatementRef} className="brand-statement">
      <div className="brand-statement-content">
        <BrandStatement text={brandStatement} />
        <div className="brand-statement-svg">
          <img ref={workSvgRef} src="/work.svg" alt="Work" className="work-svg" />
        </div>
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
                  backgroundImage: `url(${portfolioImages[0]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              ></div>
              <TileCaption text={displayedProjects[0]} />
            </div>

            {/* Remaining images fill the grid in rows of two */}
            {portfolioImages.slice(1).map((img: string, i: number) => (
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
                <TileCaption text={displayedProjects[i + 1] || ''} />
              </div>
            ))}
            {/* View All button after all projects, spans both columns */}
            <div className="view-all-wrapper">
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
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="services-container">
          <div className="services-content-wrapper">
            <ServicesHeading 
              text="We help you to design, build, and launch your project. From strategy and design to development and delivery, we're here to guide you." 
              services={services}
            />
            <div className="services-grid" id="services-scroll" ref={servicesScrollRef}>
              {services.map((service, index) => (
                <div key={index} className="service-item" data-index={index}>
                  {service}
                </div>
              ))}
              {services.map((service, index) => (
                <div key={`duplicate-${index}`} className="service-item" data-index={services.length + index}>
                  {service}
                </div>
              ))}
              {services.map((service, index) => (
                <div key={`duplicate2-${index}`} className="service-item" data-index={services.length * 2 + index}>
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
          <div className="journal-content-wrapper">
            <div className="journal-content">
              <div className="journal-title-container">
                <JournalTitle text="Journal" />
              </div>
              <div className="journal-grid">
                {journalPosts.map((post, index) => (
                  <div key={index} className="journal-post">
                    <div 
                      className="journal-image" 
                      style={{ 
                        backgroundImage: `url(${post.image})`,
                        ['--journal-bg-image' as any]: `url(${post.image})`
                      }}
                    ></div>
                    <div className="journal-text">{post.text}</div>
                  </div>
                ))}
              </div>
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
      const viewportCenter = viewportHeight * 0.5;
      const elementCenter = rect.top + rect.height * 0.5;
      
      // Start animating when element center is above screen center
      // Finish when element center reaches screen center (scroll down makes text black)
      const startPoint = viewportCenter + viewportHeight * 0.5;
      const endPoint = viewportCenter;
      const distance = startPoint - endPoint;
      const elementProgress = startPoint - elementCenter;
      
      // Progress increases as we scroll down (element moves up, elementCenter decreases)
      // When elementCenter = startPoint (above), progress = 0
      // When elementCenter = endPoint (at center), progress = 1
      const progress = Math.min(Math.max(elementProgress / Math.max(distance, 1), 0), 1);
      return progress;
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

function TileCaption({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !text) return;

    const chars = Array.from(container.querySelectorAll<HTMLSpanElement>('.caption-char'));
    const totalChars = chars.length;
    if (totalChars === 0) return;

    const computeProgress = (): number => {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight * 0.5;
      const elementCenter = rect.top + rect.height * 0.5;
      
      // Start animating when element center is above screen center
      // Finish when element center reaches screen center (scroll down makes text black)
      const startPoint = viewportCenter + viewportHeight * 0.5;
      const endPoint = viewportCenter;
      const distance = startPoint - endPoint;
      const elementProgress = startPoint - elementCenter;
      
      // Progress increases as we scroll down
      const progress = Math.min(Math.max(elementProgress / Math.max(distance, 1), 0), 1);
      return progress;
    };

    const updateCharsByProgress = (progress: number) => {
      const visibleCharsCount = Math.round(progress * totalChars);
      chars.forEach((char, index) => {
        const shouldBeVisible = index < visibleCharsCount;
        char.classList.toggle('caption-char--visible', shouldBeVisible);
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
            chars.forEach((el) => el.classList.remove('caption-char--visible'));
            handleScroll();
          }
        });
      },
      { root: null, threshold: 0.01 }
    );

    window.addEventListener('scroll', throttledScroll);
    observer.observe(container);
    
    const handleResize = () => {
      chars.forEach((el) => el.classList.remove('caption-char--visible'));
      handleScroll();
    };
    window.addEventListener('resize', handleResize);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [text]);

  return (
    <div ref={containerRef} className="tile-caption">
      {Array.from(text).map((ch, cIndex) => (
        <span key={`c-${cIndex}`} className="caption-char">
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </div>
  );
}

function ServicesHeading({ text, services }: { text: string; services: string[] }) {
  const containerRef = useRef<HTMLHeadingElement | null>(null);

  // Extract all words from services array (case-insensitive, split multi-word services)
  const servicesWords = useMemo(() => {
    const words = new Set<string>();
    services.forEach(service => {
      const serviceWords = service.toLowerCase().split(/[\s/-]+/);
      serviceWords.forEach(word => {
        if (word.length > 2) { // Only add words longer than 2 characters
          words.add(word);
        }
      });
    });
    return words;
  }, [services]);

  // Split text into words
  const words = useMemo(() => {
    return text.split(/(\s+)/);
  }, [text]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const wordSpans = Array.from(container.querySelectorAll<HTMLSpanElement>('.services-word'));
    const totalWords = wordSpans.length;
    if (totalWords === 0) return;

    const computeProgress = (): number => {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight * 0.5;
      const elementCenter = rect.top + rect.height * 0.5;
      
      // Start animating when element center is above screen center
      // Finish when element center reaches screen center (scroll down makes text black)
      const startPoint = viewportCenter + viewportHeight * 0.5;
      const endPoint = viewportCenter;
      const distance = startPoint - endPoint;
      const elementProgress = startPoint - elementCenter;
      
      // Progress increases as we scroll down
      const progress = Math.min(Math.max(elementProgress / Math.max(distance, 1), 0), 1);
      return progress;
    };

    const updateWordsByProgress = (progress: number) => {
      const visibleWordsCount = Math.round(progress * totalWords);
      wordSpans.forEach((wordSpan, index) => {
        const shouldBeVisible = index < visibleWordsCount;
        wordSpan.classList.toggle('services-word--visible', shouldBeVisible);
      });
    };

    const handleScroll = () => {
      const progress = computeProgress();
      updateWordsByProgress(progress);
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
            wordSpans.forEach((el) => el.classList.remove('services-word--visible'));
            handleScroll();
          }
        });
      },
      { root: null, threshold: 0.01 }
    );

    window.addEventListener('scroll', throttledScroll);
    observer.observe(container);
    
    const handleResize = () => {
      wordSpans.forEach((el) => el.classList.remove('services-word--visible'));
      handleScroll();
    };
    window.addEventListener('resize', handleResize);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [words]);

  return (
    <h2 ref={containerRef} className="services-heading">
      {words.map((word, index) => {
        // Check if word matches any service word (case-insensitive, remove punctuation)
        const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
        const isServiceWord = cleanWord.length > 2 && servicesWords.has(cleanWord);
        
        return (
          <span
            key={`word-${index}`}
            className={`services-word ${isServiceWord ? 'services-word--service' : ''}`}
          >
            {word}
          </span>
        );
      })}
    </h2>
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
      const viewportCenter = viewportHeight * 0.5;
      const elementCenter = rect.top + rect.height * 0.5;
      
      // Start showing grey text earlier, then start animation
      // Animation should finish when element center reaches viewport center
      const startPoint = viewportCenter + viewportHeight * 1.5; // Start showing grey text
      const animationStartPoint = viewportCenter + viewportHeight * 0.8; // Start animation here
      const endPoint = viewportCenter; // Finish when element center is at viewport center
      const distance = animationStartPoint - endPoint;
      const elementProgress = animationStartPoint - elementCenter;
      
      // Progress increases as we scroll down (element moves up, elementCenter decreases)
      // When elementCenter is above animationStartPoint, progress = 0 (grey text visible)
      // When elementCenter reaches endPoint (at center), progress = 1 (all characters highlighted)
      if (elementCenter > animationStartPoint) {
        return 0; // Show grey text before animation starts
      }
      // Calculate progress: finish at viewport center
      const progress = Math.min(Math.max((animationStartPoint - elementCenter) / Math.max(distance, 1), 0), 1);
      return progress;
    };

    const updateCharsByProgress = (progress: number) => {
      // Use floor instead of round for smoother, more predictable progress
      const visibleCharsCount = Math.floor(progress * totalChars);
      chars.forEach((char, index) => {
        const shouldBeVisible = index < visibleCharsCount;
        // Only toggle if state actually changed to prevent unnecessary DOM updates
        if (char.classList.contains('brand-char--visible') !== shouldBeVisible) {
          char.classList.toggle('brand-char--visible', shouldBeVisible);
        }
      });
    };

    const handleScroll = () => {
      const progress = computeProgress();
      updateCharsByProgress(progress);
    };

    // Smooth scroll handling with better throttling
    let rafId: number | null = null;
    const throttledScroll = () => {
      if (rafId !== null) {
        return; // Already scheduled
      }
      rafId = requestAnimationFrame(() => {
        handleScroll();
        rafId = null;
      });
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