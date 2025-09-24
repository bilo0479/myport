import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavigationHeader from '@/components/NavigationHeader';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import PortfolioSection from '@/components/PortfolioSection';
import SkillsLabSection from '@/components/SkillsLabSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';

export default function Portfolio() {
  const [currentSection, setCurrentSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial page load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
    console.log(`Current section: ${section}`);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg font-display"
          >
            Loading Sarah's Portfolio...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen bg-background text-foreground overflow-x-hidden"
        data-testid="portfolio-page"
      >
        {/* Fixed Theme Toggle */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 300 }}
          className="fixed top-20 right-4 z-40"
        >
          <ThemeToggle />
        </motion.div>

        {/* Navigation */}
        <NavigationHeader onSectionChange={handleSectionChange} />

        {/* Page Sections */}
        <main className="relative">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <HeroSection />
          </motion.div>

          {/* About Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <AboutSection />
          </motion.div>

          {/* Portfolio Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <PortfolioSection />
          </motion.div>

          {/* Skills Lab Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <SkillsLabSection />
          </motion.div>

          {/* Testimonials Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <TestimonialsSection />
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <ContactSection />
          </motion.div>
        </main>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Footer />
        </motion.div>

        {/* Scroll Progress Indicator */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-primary/20 z-50"
          initial={{ scaleX: 0 }}
          style={{ transformOrigin: "0%" }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary"
            style={{ 
              scaleX: typeof window !== 'undefined' ? 
                window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) : 0
            }}
          />
        </motion.div>

        {/* Floating Back to Top Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: currentSection !== 'home' ? 1 : 0,
            scale: currentSection !== 'home' ? 1 : 0
          }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setCurrentSection('home');
          }}
          className="fixed bottom-8 right-8 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg hover-elevate flex items-center justify-center z-40"
          data-testid="back-to-top"
        >
          <motion.div
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            ↑
          </motion.div>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}