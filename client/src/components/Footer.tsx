import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { label: 'Privacy', href: '#', id: 'privacy' },
    { label: 'Accessibility', href: '#', id: 'accessibility' },
    { label: 'Colophon', href: '#', id: 'colophon' }
  ];

  const handleLinkClick = (linkId: string) => {
    console.log(`Footer link clicked: ${linkId}`);
    // TODO: Implement actual navigation or modal content
  };

  const handleKonamiCode = () => {
    console.log('🎮 Konami code activated! Easter egg discovered!');
    // TODO: Implement special easter egg functionality
  };

  return (
    <footer className="py-12 bg-gradient-to-t from-muted/20 to-background relative overflow-hidden">
      {/* Shooting Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            initial={{ 
              x: -10, 
              y: Math.random() * 100 + 20,
              scale: 0
            }}
            animate={{ 
              x: window.innerWidth + 10,
              y: Math.random() * 100 + 20,
              scale: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              delay: Math.random() * 10,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
          data-testid="footer-content"
        >
          {/* Copyright */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 text-muted-foreground"
            onDoubleClick={handleKonamiCode}
            data-testid="footer-copyright"
          >
            <span>© {currentYear} Built with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.div>
            <span>and countless iterations</span>
          </motion.div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {footerLinks.map((link, index) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ 
                  y: -2,
                  color: "hsl(var(--primary))"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLinkClick(link.id)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                data-testid={`footer-link-${link.id}`}
              >
                {link.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Hidden Easter Egg Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          transition={{ duration: 2, delay: 3 }}
          className="text-center mt-8"
        >
          <p className="text-xs text-muted-foreground/50">
            ↑ ↑ ↓ ↓ ← → ← → B A
          </p>
        </motion.div>
      </div>
    </footer>
  );
}