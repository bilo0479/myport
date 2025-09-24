import { useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import mikeImage from '@assets/generated_images/Mike_Chen_testimonial_headshot_ecd84312.png';
import lisaImage from '@assets/generated_images/Lisa_Rodriguez_testimonial_headshot_978a0d41.png';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  companyLogo?: string;
}

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);

  // TODO: Replace with real testimonials data
  const testimonials: Testimonial[] = [
    {
      id: '1',
      quote: "Sarah's designs don't just look beautiful—they solve real problems with elegant simplicity. Her sustainable design approach has completely transformed how we think about user experience.",
      author: 'Mike Chen',
      role: 'Startup Founder',
      company: 'GreenTech Solutions',
      avatar: mikeImage
    },
    {
      id: '2',
      quote: "Her attention to accessibility details made our app usable by 40% more users. Sarah doesn't just design interfaces; she designs inclusive experiences that truly matter.",
      author: 'Lisa Rodriguez',
      role: 'Product Manager',
      company: 'HealthFirst',
      avatar: lisaImage
    },
    {
      id: '3',
      quote: "Working with Sarah was a game-changer. She brought a level of strategic thinking to design that elevated our entire product. Her design system saved us months of development time.",
      author: 'David Kim',
      role: 'CTO',
      company: 'Innovation Labs',
      avatar: mikeImage // TODO: Add real avatar
    },
    {
      id: '4',
      quote: "Sarah's research-driven approach to UX design helped us reduce user drop-off by 60%. She truly understands how to translate user needs into beautiful, functional designs.",
      author: 'Maria Santos',
      role: 'Head of Design',
      company: 'TechCorp',
      avatar: lisaImage // TODO: Add real avatar
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    console.log('Next testimonial');
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    console.log('Previous testimonial');
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    console.log(`Go to testimonial ${index}`);
  };

  return (
    <section 
      className="py-20 bg-gradient-to-b from-background to-primary/5 overflow-hidden"
      data-testid="testimonials-section"
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
            What People Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear from amazing collaborators and clients I've had the privilege to work with
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div 
            ref={constraintsRef}
            className="overflow-hidden"
          >
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag="x"
              dragConstraints={constraintsRef}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={(e, { offset, velocity }) => {
                setIsDragging(false);
                const swipeThreshold = 50;
                
                if (offset.x > swipeThreshold) {
                  prevTestimonial();
                } else if (offset.x < -swipeThreshold) {
                  nextTestimonial();
                }
              }}
              data-testid="testimonials-carousel"
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                  whileHover={{ 
                    scale: 1.02,
                    rotateY: 5,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  style={{ 
                    transformStyle: "preserve-3d",
                    perspective: "1000px"
                  }}
                >
                  <Card className="relative overflow-hidden bg-card/50 backdrop-blur border-0 shadow-2xl">
                    <CardContent className="p-8 md:p-12">
                      {/* Quote Icon */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="absolute top-6 right-6 text-primary/20"
                      >
                        <Quote className="w-12 h-12" />
                      </motion.div>

                      {/* Testimonial Content */}
                      <div className="space-y-6">
                        {/* Quote */}
                        <motion.blockquote
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                          className="text-lg md:text-xl leading-relaxed text-foreground"
                        >
                          "{testimonial.quote}"
                        </motion.blockquote>

                        {/* Author Info */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.5 }}
                          className="flex items-center space-x-4 pt-4 border-t border-border"
                        >
                          {/* Avatar with Breathing Animation */}
                          <motion.div
                            animate={{ 
                              scale: [1, 1.05, 1],
                            }}
                            transition={{ 
                              duration: 4, 
                              repeat: Infinity, 
                              ease: "easeInOut" 
                            }}
                            className="relative"
                          >
                            <Avatar className="w-14 h-14 ring-2 ring-primary/20">
                              <AvatarImage 
                                src={testimonial.avatar} 
                                alt={testimonial.author}
                              />
                              <AvatarFallback>
                                {testimonial.author.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            
                            {/* Status Indicator */}
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card"
                            />
                          </motion.div>

                          <div className="flex-1">
                            <h4 className="font-semibold text-lg">{testimonial.author}</h4>
                            <p className="text-muted-foreground">{testimonial.role}</p>
                            <p className="text-sm text-primary font-medium">{testimonial.company}</p>
                          </div>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="hover-elevate"
              data-testid="testimonials-prev"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {/* Dot Indicators */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-primary' : 'bg-muted'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  data-testid={`testimonial-dot-${index}`}
                >
                  <motion.div
                    className="w-full h-full rounded-full bg-primary"
                    initial={{ scale: 0 }}
                    animate={{ scale: index === currentIndex ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="hover-elevate"
              data-testid="testimonials-next"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Auto-advance progress */}
          <motion.div
            className="w-full h-1 bg-muted rounded-full mt-4 overflow-hidden"
          >
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "linear"
              }}
              onAnimationComplete={() => {
                // Auto-advance every 8 seconds
                setTimeout(nextTestimonial, 100);
              }}
            />
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground mb-6">
            Ready to create something amazing together?
          </p>
          <Button
            size="lg"
            onClick={() => {
              console.log('Navigating to contact section');
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover-elevate"
            data-testid="testimonials-cta"
          >
            Let's Work Together
          </Button>
        </motion.div>
      </div>
    </section>
  );
}