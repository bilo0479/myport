import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, TrendingUp, Users, Heart, Lightbulb } from 'lucide-react';

interface TimelinePoint {
  year: string;
  event: string;
  description: string;
  icon: typeof Calendar;
}

interface Skill {
  name: string;
  level: number;
  description: string;
}

export default function AboutSection() {
  // TODO: Replace with real timeline data
  const timeline: TimelinePoint[] = [
    {
      year: '2020',
      event: 'First Figma Mockup',
      description: 'Discovered the magic of design systems and fell in love with user-centered design',
      icon: Lightbulb
    },
    {
      year: '2021',
      event: 'Joined First Startup',
      description: 'Led design for a fintech startup, learning to balance user needs with business goals',
      icon: TrendingUp
    },
    {
      year: '2023',
      event: 'Led Design System',
      description: 'Built a comprehensive design system used by 50+ developers across 3 products',
      icon: Users
    },
    {
      year: '2024',
      event: 'Sustainability Focus',
      description: 'Pivoted to sustainable design, researching eco-friendly UX patterns',
      icon: Heart
    }
  ];

  const skills: Skill[] = [
    { name: 'Creativity', level: 95, description: 'Innovative problem solving and visual design' },
    { name: 'Technical', level: 85, description: 'Frontend development and prototyping' },
    { name: 'Leadership', level: 80, description: 'Team collaboration and project management' },
    { name: 'Empathy', level: 90, description: 'User research and inclusive design' },
    { name: 'Innovation', level: 88, description: 'Emerging tech and sustainable practices' }
  ];

  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section 
      className="py-20 bg-gradient-to-b from-muted/20 to-background"
      id="about"
      data-testid="about-section"
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
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A passionate designer on a mission to create digital experiences that are not just beautiful, 
            but also sustainable and accessible to everyone
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Timeline Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-display font-semibold mb-8">My Journey</h3>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary"></div>
              
              {timeline.map((point, index) => (
                <motion.div
                  key={point.year}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative flex items-start space-x-6 pb-8"
                  data-testid={`timeline-${point.year}`}
                >
                  {/* Timeline Icon */}
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="relative z-10 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg"
                  >
                    <point.icon className="w-5 h-5 text-primary-foreground" />
                  </motion.div>
                  
                  {/* Content */}
                  <Card className="flex-1 hover-elevate">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="secondary">{point.year}</Badge>
                        <h4 className="font-semibold text-lg">{point.event}</h4>
                      </div>
                      <p className="text-muted-foreground">{point.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills Radar Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-display font-semibold mb-8">Core Strengths</h3>
            
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  data-testid={`skill-${skill.name.toLowerCase()}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                    />
                  </div>
                  
                  {/* Description on Hover */}
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: hoveredSkill === skill.name ? 1 : 0,
                      height: hoveredSkill === skill.name ? 'auto' : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-sm text-muted-foreground mt-2 overflow-hidden"
                  >
                    {skill.description}
                  </motion.p>
                </motion.div>
              ))}
            </div>

            {/* Personal Touch */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary" />
                    What Drives Me
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    I believe technology should enhance human connection and protect our planet. 
                    Every pixel I push and every interaction I design is guided by the question: 
                    "How can this make the world a little bit better?"
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}