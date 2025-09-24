import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download, ArrowDown, Sparkles } from 'lucide-react';
import sarahImage from '@assets/generated_images/Sarah_Chen_professional_headshot_b4c466f4.png';

export default function HeroSection() {
  const [isNameComplete, setIsNameComplete] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();
  const heroRef = useRef<HTMLDivElement>(null);

  const name = "Sarah Chen";
  const tagline = ["Designing", "Tomorrow's", "Sustainable", "Digital", "Experiences"];
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleScrollToWork = () => {
    console.log('Scrolling to work section');
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadResume = () => {
    console.log('Downloading resume');
    // TODO: Implement actual resume download
  };

  const replayNameAnimation = () => {
    setIsNameComplete(false);
    controls.start({
      width: 0,
      transition: { duration: 0 }
    }).then(() => {
      controls.start({
        width: "100%",
        transition: { duration: 2, ease: "easeInOut" }
      }).then(() => {
        setIsNameComplete(true);
      });
    });
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5"
      id="home"
      data-testid="hero-section"
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              x: mousePosition.x * 100 + Math.random() * 200 - 100,
              y: mousePosition.y * 100 + Math.random() * 200 - 100,
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-16 h-16 border-2 border-primary/30 rotate-45"
          animate={{ 
            rotate: [45, 225, 45],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 right-32 w-12 h-12 bg-secondary/20 rounded-full"
          animate={{ 
            y: [-20, 20, -20],
            opacity: [0.2, 0.8, 0.2]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 right-20 w-8 h-8 bg-accent/30"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.5, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center lg:text-left space-y-8"
          >
            {/* Name with Typewriter Effect */}
            <div className="space-y-4">
              <motion.h1 
                className="text-5xl md:text-7xl font-display font-bold text-foreground cursor-pointer"
                onClick={replayNameAnimation}
                data-testid="hero-name"
              >
                <motion.span
                  className="inline-block overflow-hidden whitespace-nowrap"
                  initial={{ width: 0 }}
                  animate={controls}
                  onAnimationComplete={() => setIsNameComplete(true)}
                >
                  {name}
                </motion.span>
                <motion.span
                  className="inline-block w-1 h-16 bg-primary ml-2"
                  animate={{ opacity: isNameComplete ? 0 : [1, 0, 1] }}
                  transition={{ 
                    duration: 0.8, 
                    repeat: isNameComplete ? 0 : Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.h1>

              {/* Tagline with Staggered Animation */}
              <motion.div 
                className="text-xl md:text-2xl text-muted-foreground space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
              >
                {tagline.map((word, index) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 2.5 + index * 0.2,
                      duration: 0.6,
                      ease: "easeOut"
                    }}
                    className={`inline-block mr-3 ${
                      ["Tomorrow's", "Sustainable", "Experiences"].includes(word)
                        ? "text-primary font-semibold"
                        : ""
                    }`}
                    data-testid={`hero-tagline-${index}`}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="group relative overflow-hidden hover-elevate"
                onClick={handleScrollToWork}
                data-testid="hero-cta-explore"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary to-secondary"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Explore My Work
                </span>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="group hover-elevate"
                onClick={handleDownloadResume}
                data-testid="hero-cta-resume"
              >
                <motion.div
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Download className="w-4 h-4 group-hover:animate-bounce" />
                  Download Resume
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              animate={{ 
                y: [-10, 10, -10],
                rotateY: [0, 5, 0, -5, 0]
              }}
              transition={{ 
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                rotateY: { duration: 8, repeat: Infinity, ease: "easeInOut" }
              }}
              data-testid="hero-profile-image"
            >
              <div className="relative w-80 h-80 rounded-full overflow-hidden shadow-2xl border-4 border-primary/20">
                <motion.img
                  src={sarahImage}
                  alt="Sarah Chen"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Overlay on Hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent flex items-end justify-center p-6"
                >
                  <span className="text-white font-medium bg-black/50 px-3 py-1 rounded-full text-sm">
                    Click to see magic ✨
                  </span>
                </motion.div>
              </div>

              {/* Floating Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={handleScrollToWork}
            className="flex flex-col items-center space-y-2 text-muted-foreground hover:text-primary transition-colors group"
            whileHover={{ y: -5 }}
            data-testid="hero-scroll-indicator"
          >
            <span className="text-sm">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}