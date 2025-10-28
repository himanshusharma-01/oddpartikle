'use client';

import './homepage.css';

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

  const services = [
    'Brand Strategy',
    'Identity Design',
    'Web Design',
    'Go-to-market Communication'
  ];

  const journalPosts = [
    'New developments start?',
    'Makers manage a lot',
    'A team from on-time'
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="golden-corner top-left"></div>
          <div className="golden-corner top-right"></div>
          <div className="golden-corner bottom-left"></div>
          <div className="curve-bottom-right"></div>
        </div>
        
        <div className="hero-content">
          <h1 className="hero-heading">
            Building the next
            <br />
            generation of brands &
            <br />
            experiences.
          </h1>
        </div>
      </section>

      <section className="brand-statement">
      <div className="brand-statement-content">
        <p className="brand-statement-text">
          We design brands that shape environments and influence culture. Our partners are forward thinkers who view design as an engine for change, people who build futures and reshape spaces.
        </p>
      </div>
    </section>

      {/* Portfolio Grid Section */}
      <section className="portfolio-section">
        <div className="portfolio-container">
          <div className="portfolio-grid">
            {projects.map((project, index) => (
              <div key={index} className="portfolio-item">
                <div className="project-image"></div>
                <div className="project-name">{project}</div>
              </div>
            ))}
          </div>
          <button className="view-all-button">View All</button>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="services-container">
          <div className="services-content">
            <h2 className="services-heading">
              We help you to design, build, and launch your project. From strategy and design to development and delivery, we&apos;re here to guide you.
            </h2>
            <div className="services-list">
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
          <h3 className="journal-title">Journal</h3>
          <div className="journal-grid">
            {journalPosts.map((post, index) => (
              <div key={index} className="journal-post">
                {post}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}