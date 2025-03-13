import React from 'react';
import NavigationBar1 from './NavigationBar1';
import AboutHero from './AboutHero';
import ContentSection from './ContentSection';
import Footer from './Footer';

function AboutPage() {
  return (
    <div className="flex overflow-hidden flex-col bg-white">
      <NavigationBar1 />
      <AboutHero />
      <ContentSection />
      <Footer />
    </div>
  );
}

export default AboutPage;