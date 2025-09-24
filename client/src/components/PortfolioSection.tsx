import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Play, Pause } from 'lucide-react';
import ecoTrackImage from '@assets/generated_images/EcoTrack_mobile_app_mockup_6ac1541f.png';
import financeFlowImage from '@assets/generated_images/FinanceFlow_banking_dashboard_mockup_9f582349.png';
import mindfulMedImage from '@assets/generated_images/MindfulMed_design_system_components_65fde04d.png';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  impact: string;
  featured: boolean;
}

export default function PortfolioSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  // TODO: Replace with real project data
  const projects: Project[] = [
    {
      id: 'ecotrack',
      title: 'EcoTrack - Carbon Footprint App',
      category: 'Mobile',
      description: 'Sustainable lifestyle tracking app that helps users reduce their carbon footprint through gamified daily actions.',
      image: ecoTrackImage,
      tags: ['React Native', 'Sustainability', 'Gamification'],
      impact: '40% reduction in user carbon footprint',
      featured: true
    },
    {
      id: 'financeflow',
      title: 'FinanceFlow - Banking Dashboard',
      category: 'Web Apps',
      description: 'Modern banking interface with real-time analytics and personalized financial insights.',
      image: financeFlowImage,
      tags: ['React', 'Data Visualization', 'FinTech'],
      impact: '60% increase in user engagement',
      featured: true
    },
    {
      id: 'mindfulmed',
      title: 'MindfulMed - Healthcare Design System',
      category: 'Design Systems',
      description: 'Comprehensive design system for healthcare applications focusing on accessibility and empathy.',
      image: mindfulMedImage,
      tags: ['Design System', 'Healthcare', 'Accessibility'],
      impact: '50% faster development cycle',
      featured: true
    },
    {
      id: 'research-1',
      title: 'Sustainable UX Research',
      category: 'Research',
      description: 'Comprehensive study on eco-friendly design patterns and their impact on user behavior.',
      image: ecoTrackImage,
      tags: ['Research', 'Sustainability', 'UX'],
      impact: 'Published in UX Magazine',
      featured: false
    },
    {
      id: 'mobile-2',
      title: 'Wellness Companion',
      category: 'Mobile',
      description: 'Mental health support app with mood tracking and personalized recommendations.',
      image: mindfulMedImage,
      tags: ['React Native', 'Mental Health', 'AI'],
      impact: '4.8★ App Store rating',
      featured: false
    },
    {
      id: 'web-2',
      title: 'E-learning Platform',
      category: 'Web Apps',
      description: 'Interactive learning platform with adaptive content and progress tracking.',
      image: financeFlowImage,
      tags: ['React', 'Education', 'Adaptive Learning'],
      impact: '200k+ active learners',
      featured: false
    }
  ];

  const categories = ['All', 'Web Apps', 'Mobile', 'Design Systems', 'Research'];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    console.log(`Filtering projects by: ${category}`);
  };

  const handleProjectClick = (projectId: string) => {
    console.log(`Opening project: ${projectId}`);
    // TODO: Implement project modal or navigation
  };

  return (
    <section 
      className="py-20 bg-gradient-to-b from-background to-muted/20"
      id="work"
      data-testid="portfolio-section"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Featured Work
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Crafting digital experiences that make a difference in people's lives and the planet
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
          data-testid="portfolio-filters"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => handleCategoryChange(category)}
              className="hover-elevate"
              data-testid={`filter-${category.toLowerCase().replace(' ', '-')}`}
            >
              <motion.span
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.span>
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            data-testid="portfolio-grid"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                layout
              >
                <Card
                  className={`group cursor-pointer overflow-hidden border-0 bg-card/50 backdrop-blur hover-elevate ${
                    project.featured ? 'ring-2 ring-primary/20' : ''
                  }`}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => handleProjectClick(project.id)}
                  data-testid={`project-card-${project.id}`}
                >
                  <div className="relative overflow-hidden">
                    {/* Project Image */}
                    <motion.div
                      className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Overlay on Hover */}
                      <AnimatePresence>
                        {hoveredProject === project.id && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 flex items-center justify-center"
                          >
                           <a href={`/pages/mobileproject/${project.id}`} target="_blank" rel="/pages/mobileproject" onClick={(e) => e.stopPropagation()}>
                           <Button
                            size="lg"
                             className="bg-white text-black hover:bg-white/90"
                             data-testid={`project-view-${project.id}`}
                             >
                               <ExternalLink className="w-4 h-4 mr-2" />
                                 View Project
                                  </Button>
                                  </a>
                                </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Featured Badge */}
                      {project.featured && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                          className="absolute top-4 right-4"
                        >
                          <Badge className="bg-primary text-primary-foreground">
                            Featured
                          </Badge>
                        </motion.div>
                      )}
                    </motion.div>

                    <CardContent className="p-6 space-y-4">
                      {/* Project Title */}
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Impact */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="pt-2 border-t border-border"
                      >
                        <p className="text-sm font-medium text-primary">
                          📈 {project.impact}
                        </p>
                      </motion.div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="hover-elevate"
            onClick={() => console.log('Loading more projects')}
            data-testid="portfolio-load-more"
          >
            <motion.span
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              Load More Projects
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                ✨
              </motion.div>
            </motion.span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}