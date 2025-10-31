'use client';

import { useState } from 'react';
import './about.css';

export default function AboutPage() {
  const [activeService, setActiveService] = useState('Brand Strategy');

  const servicesData = {
    'Brand Strategy': [
      'Brand Naming',
      'Core Belief, Vision & Values',
      'Brand Strategy and Positioning',
      'Go-To-Market',
      'Brand Architecture',
      'Brand Audit'
    ],
    'Brand Design': [
      'Brand Identity Design',
      'Brand Guidelines Document',
      'Packaging Design',
      'Type Design',
      'Illustration'
    ],
    'Communication': [
      'Comms Strategy and Planning',
      'Product Launch Campaigns',
      'Employee Communication',
      'Digital Strategy & Campaigns',
      'Activation and Ambient'
    ],
    'Digital': [
      'Website and Application Experience',
      'Social Media Marketing',
      'Search Engine Optimization',
      'Platform Management',
      'Influencer Marketing'
    ],
    'Films': [
      'Script and Storyboarding',
      'Commercial Product Films',
      'Brand and Corporate Films',
      '3D Content Creation',
      'Motion Design',
      'AI Video creation'
    ]
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <h1 className="hero-main-heading">FIND YOUR ODD</h1>
        <p className="hero-subheading">
          Oddpartikle is an independent design and technology studio with a clear purpose: to craft communication that builds authentic, meaningful connections.
        </p>
        
        {/* Image Banner - Horizontal client logos */}
        <div className="client-banner">
          <div className="client-logo">TARC</div>
          <div className="client-logo">Pagenta</div>
          <div className="client-logo">GO Games</div>
          <div className="client-logo">INFO X</div>
          <div className="client-logo">The 4.6</div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Our Founder Section */}
      <section className="founder-section">
        <h2 className="section-heading">Our Founder</h2>
        <p className="section-text">
          Brand is no longer a static entity. For us, brands are living and breathing organisms. And it should always interact and empathise with people.
        </p>
        <p className="section-text">
          Oddpartikle was founded on a simple belief — that people connect with people, not perfection. And it&apos;s our oddness that makes those connections real.
        </p>
      </section>

      <div className="section-divider"></div>

      {/* About Section */}
      <section className="about-section">
        <h2 className="section-heading">About Oddpartikle</h2>
        <p className="section-text">
          Our philosophy is rooted in minimalism, stripping away the unnecessary to highlight what truly matters. This approach allows us to craft bold, innovative, and timeless solutions that are both visually striking and strategically effective.
        </p>
        <p className="section-text">
          Whether it&apos;s designing a brand identity, producing a unique piece, or building a full global experience, we approach every project with the same focus: clarity, creativity, and impact.
        </p>
      </section>

      <div className="section-divider"></div>

      {/* Interactive Services Section */}
      <section className="services-section">
        <h2 className="section-heading">Our Services</h2>
        <p className="section-text">
          We position in a strong concern through cultivating, working community areas platforms to build a solution in a changing fashion capabilities.
        </p>
        
        {/* Service Buttons */}
        <div className="service-buttons">
          {Object.keys(servicesData).map((service) => (
            <button
              key={service}
              className={`service-button ${activeService === service ? 'active' : ''}`}
              onClick={() => setActiveService(service)}
            >
              {service}
            </button>
          ))}
        </div>

        {/* Service Details */}
        <div className="service-details">
          <h3 className="service-title">{activeService}</h3>
          <div className="service-items">
            {servicesData[activeService as keyof typeof servicesData].map((item, index) => (
              <div key={index} className="service-item">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* CTA Section */}
      <section className="cta-section">
        <h2 className="cta-heading">Let&apos;s Find Your Odd</h2>
      </section>
    </div>
  );
}