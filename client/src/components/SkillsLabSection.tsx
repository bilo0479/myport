import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code2, Palette, Zap, Eye, Play, Maximize } from 'lucide-react';

interface Experiment {
  id: string;
  title: string;
  description: string;
  icon: typeof Code2;
  demoType: 'css' | 'interaction' | 'physics';
  featured: boolean;
}

export default function SkillsLabSection() {
  const [activeExperiment, setActiveExperiment] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // TODO: Replace with real experiments data
  const experiments: Experiment[] = [
    {
      id: 'css-art',
      title: 'CSS Art Gallery',
      description: 'Pure CSS illustrations and animations showcasing the artistic potential of code',
      icon: Palette,
      demoType: 'css',
      featured: true
    },
    {
      id: 'micro-interactions',
      title: 'Micro-Interaction Library',
      description: 'Collection of delightful UI animations that bring interfaces to life',
      icon: Zap,
      demoType: 'interaction',
      featured: true
    },
    {
      id: 'physics-playground',
      title: 'Physics Playground',
      description: 'WebGL experiments with realistic physics and particle systems',
      icon: Code2,
      demoType: 'physics',
      featured: true
    },
    {
      id: 'visual-experiments',
      title: 'Visual Experiments',
      description: 'Explorations in generative art and dynamic visual systems',
      icon: Eye,
      demoType: 'css',
      featured: false
    }
  ];

  const handleExperimentClick = (experimentId: string) => {
    setActiveExperiment(activeExperiment === experimentId ? null : experimentId);
    console.log(`Toggling experiment: ${experimentId}`);
  };

  const toggleDemoMode = () => {
    setIsDemoMode(!isDemoMode);
    console.log(`Demo mode: ${!isDemoMode ? 'enabled' : 'disabled'}`);
  };

  const renderDemoContent = (experiment: Experiment) => {
    switch (experiment.demoType) {
      case 'css':
        return (
          <div className="grid grid-cols-3 gap-4 p-4">
            {/* CSS Art Pieces */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="aspect-square bg-gradient-to-br from-red-400 via-yellow-400 to-pink-400 rounded-full relative overflow-hidden"
            >
              <div className="absolute inset-2 bg-white rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black rounded-full"></div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.1, rotate: -5 }}
              className="aspect-square bg-gradient-to-tr from-blue-500 to-purple-600 relative"
              style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
            >
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.1 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="aspect-square bg-gradient-to-br from-green-400 to-blue-500 relative"
              style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
            >
            </motion.div>
          </div>
        );
      
      case 'interaction':
        return (
          <div className="space-y-4 p-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-primary text-primary-foreground rounded-lg cursor-pointer text-center"
            >
              Hover & Click Me!
            </motion.div>
            
            <motion.div
              className="flex space-x-2"
            >
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                  className="w-4 h-4 bg-secondary rounded-full"
                />
              ))}
            </motion.div>
          </div>
        );
      
      case 'physics':
        return (
          <div className="relative h-32 bg-gradient-to-b from-blue-100 to-green-100 rounded-lg overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-primary rounded-full"
                initial={{ x: Math.random() * 200, y: -10 }}
                animate={{ 
                  y: 120,
                  x: Math.random() * 200
                }}
                transition={{
                  duration: Math.random() * 2 + 2,
                  repeat: Infinity,
                  ease: "easeIn"
                }}
              />
            ))}
          </div>
        );
      
      default:
        return <div className="p-4 text-center text-muted-foreground">Demo loading...</div>;
    }
  };

  return (
    <section 
      className="py-20 bg-gradient-to-b from-background to-accent/5 relative overflow-hidden"
      id="lab"
      data-testid="skills-lab-section"
    >
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Code Rain Effect */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-xs text-primary/20 font-mono"
            initial={{ y: -50, x: i * 150 }}
            animate={{ y: window.innerHeight + 50 }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          >
            {['const', 'function', 'return', 'export', 'import', 'class'][Math.floor(Math.random() * 6)]}
          </motion.div>
        ))}
        
        {/* Circuit Patterns */}
        <svg className="absolute inset-0 w-full h-full opacity-5">
          <defs>
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M10,10 L90,10 L90,90 L10,90 Z" fill="none" stroke="currentColor" strokeWidth="1"/>
              <circle cx="10" cy="10" r="2" fill="currentColor"/>
              <circle cx="90" cy="90" r="2" fill="currentColor"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Skills Lab
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Where creativity meets code. Experimental projects that push the boundaries of web design
          </p>
          
          {/* Demo Mode Toggle */}
          <Button
            variant={isDemoMode ? "default" : "outline"}
            onClick={toggleDemoMode}
            className="hover-elevate"
            data-testid="demo-mode-toggle"
          >
            <Play className="w-4 h-4 mr-2" />
            {isDemoMode ? 'Exit Demo Mode' : 'Enter Demo Mode'}
          </Button>
        </motion.div>

        {/* Experiments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experiments.map((experiment, index) => (
            <motion.div
              key={experiment.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              layout
            >
              <Card 
                className={`group cursor-pointer overflow-hidden hover-elevate transition-all ${
                  experiment.featured ? 'ring-2 ring-primary/20' : ''
                } ${
                  activeExperiment === experiment.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleExperimentClick(experiment.id)}
                data-testid={`experiment-${experiment.id}`}
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                    >
                      <experiment.icon className="w-6 h-6 text-primary" />
                    </motion.div>
                    
                    <div className="flex gap-2">
                      {experiment.featured && (
                        <Badge variant="default">Featured</Badge>
                      )}
                      <Badge variant="secondary">{experiment.demoType}</Badge>
                    </div>
                  </div>
                  
                  <div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {experiment.title}
                    </CardTitle>
                    <p className="text-muted-foreground mt-2">
                      {experiment.description}
                    </p>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Demo Content */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: activeExperiment === experiment.id ? 'auto' : 0,
                      opacity: activeExperiment === experiment.id ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    {activeExperiment === experiment.id && (
                      <div className="border-t border-border pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-sm font-medium">Live Demo</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log(`Opening ${experiment.id} in fullscreen`);
                            }}
                            data-testid={`fullscreen-${experiment.id}`}
                          >
                            <Maximize className="w-3 h-3" />
                          </Button>
                        </div>
                        {renderDemoContent(experiment)}
                      </div>
                    )}
                  </motion.div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Viewing code for ${experiment.id}`);
                      }}
                      data-testid={`view-code-${experiment.id}`}
                    >
                      <Code2 className="w-3 h-3 mr-1" />
                      Code
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Opening ${experiment.id} demo`);
                      }}
                      data-testid={`open-demo-${experiment.id}`}
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-display font-semibold mb-8">
            Powered By
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['React', 'Three.js', 'Framer Motion', 'GSAP', 'WebGL', 'CSS3', 'TypeScript'].map((tech) => (
              <motion.div
                key={tech}
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Badge 
                  variant="outline" 
                  className="px-4 py-2 text-sm hover-elevate"
                  data-testid={`tech-${tech.toLowerCase()}`}
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}