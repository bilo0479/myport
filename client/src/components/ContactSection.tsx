import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Send, CheckCircle, AlertCircle, Mail, Calendar, Github, Linkedin, Twitter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  projectType: z.string().min(1, 'Please select a project type'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

interface SocialLink {
  name: string;
  url: string;
  icon: typeof Mail;
  color: string;
}

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [wordCount, setWordCount] = useState(0);
  const [availability] = useState<'available' | 'booking' | 'full'>('available');
  const { toast } = useToast();

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      projectType: '',
      message: '',
    },
  });

  // TODO: Replace with real social links
  const socialLinks: SocialLink[] = [
    {
      name: 'Email',
      url: 'mailto:sarah@example.com',
      icon: Mail,
      color: 'bg-blue-500'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/sarahchen',
      icon: Linkedin,
      color: 'bg-blue-600'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/sarahchen',
      icon: Github,
      color: 'bg-gray-800'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/sarahchen',
      icon: Twitter,
      color: 'bg-blue-400'
    }
  ];

  const availabilityStatus = {
    available: { text: 'Available for projects', color: 'bg-green-500', pulse: true },
    booking: { text: 'Booking for Q2 2025', color: 'bg-yellow-500', pulse: true },
    full: { text: 'Currently full', color: 'bg-red-500', pulse: false }
  };

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    console.log('Form submitted:', data);
    
    try {
      // TODO: Implement actual form submission
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      setSubmitStatus('success');
      form.reset();
      setWordCount(0);
      
      toast({
        title: "Message sent successfully! 🎉",
        description: "I'll get back to you within 24 hours.",
      });
      
      // Confetti effect simulation
      console.log('🎉 Confetti explosion!');
      
    } catch (error) {
      setSubmitStatus('error');
      toast({
        title: "Something went wrong",
        description: "Please try again or reach out via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const handleMessageChange = (value: string) => {
    setWordCount(value.length);
    form.setValue('message', value);
  };

  const handleSocialClick = (link: SocialLink) => {
    console.log(`Opening ${link.name}: ${link.url}`);
    // TODO: Implement actual navigation
  };

  return (
    <section 
      className="py-20 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden"
      id="contact"
      data-testid="contact-section"
    >
      {/* Constellation Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              scale: [0.5, 1, 0.5],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.line
              key={i}
              x1={Math.random() * 100 + '%'}
              y1={Math.random() * 100 + '%'}
              x2={Math.random() * 100 + '%'}
              y2={Math.random() * 100 + '%'}
              stroke="currentColor"
              strokeWidth="1"
              className="text-primary/10"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, repeatType: "reverse" }}
            />
          ))}
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
            Let's Create Together
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have an exciting project in mind? I'd love to hear about it and explore how we can bring your vision to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <Card className="bg-card/50 backdrop-blur border-0 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-display">Send me a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="name">Your Name</Label>
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Input
                        id="name"
                        {...form.register('name')}
                        className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                        placeholder="John Doe"
                        data-testid="contact-name"
                      />
                    </motion.div>
                    {form.formState.errors.name && (
                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-sm text-destructive flex items-center gap-1"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {form.formState.errors.name.message}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Email Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="email">Email Address</Label>
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Input
                        id="email"
                        type="email"
                        {...form.register('email')}
                        className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                        placeholder="john@example.com"
                        data-testid="contact-email"
                      />
                    </motion.div>
                    {form.formState.errors.email && (
                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-sm text-destructive flex items-center gap-1"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {form.formState.errors.email.message}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Project Type Select */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="projectType">Project Type</Label>
                    <Select onValueChange={(value) => form.setValue('projectType', value)}>
                      <SelectTrigger data-testid="contact-project-type">
                        <SelectValue placeholder="What kind of project?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web-app">Web Application</SelectItem>
                        <SelectItem value="mobile-app">Mobile Application</SelectItem>
                        <SelectItem value="design-system">Design System</SelectItem>
                        <SelectItem value="consultation">Design Consultation</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.projectType && (
                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-sm text-destructive flex items-center gap-1"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {form.formState.errors.projectType.message}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Message Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <Label htmlFor="message">Tell me about your project</Label>
                      <span className="text-xs text-muted-foreground">
                        {wordCount} characters
                      </span>
                    </div>
                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Textarea
                        id="message"
                        onChange={(e) => handleMessageChange(e.target.value)}
                        className="min-h-32 resize-none transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                        placeholder="Describe your project, goals, timeline, and anything else you'd like me to know..."
                        data-testid="contact-message"
                      />
                    </motion.div>
                    {form.formState.errors.message && (
                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-sm text-destructive flex items-center gap-1"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {form.formState.errors.message.message}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full relative overflow-hidden hover-elevate"
                      data-testid="contact-submit"
                    >
                      <AnimatePresence mode="wait">
                        {isSubmitting ? (
                          <motion.div
                            key="loading"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex items-center gap-2"
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                            />
                            Sending...
                          </motion.div>
                        ) : submitStatus === 'success' ? (
                          <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex items-center gap-2"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Message Sent!
                          </motion.div>
                        ) : (
                          <motion.div
                            key="default"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex items-center gap-2"
                          >
                            <Send className="w-4 h-4" />
                            Send Message
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Availability Status */}
            <Card className="bg-card/50 backdrop-blur border-0">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Current Availability</h3>
                <div className="flex items-center gap-3">
                  <motion.div
                    className={`w-3 h-3 rounded-full ${availabilityStatus[availability].color}`}
                    animate={availabilityStatus[availability].pulse ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-sm">{availabilityStatus[availability].text}</span>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="bg-card/50 backdrop-blur border-0">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Connect with me</h3>
                <div className="space-y-3">
                  {socialLinks.map((link, index) => (
                    <motion.button
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ 
                        scale: 1.05,
                        x: 10
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSocialClick(link)}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover-elevate transition-colors group"
                      data-testid={`social-${link.name.toLowerCase()}`}
                    >
                      <motion.div
                        className={`w-10 h-10 ${link.color} rounded-lg flex items-center justify-center text-white`}
                        whileHover={{ rotate: 5 }}
                      >
                        <link.icon className="w-5 h-5" />
                      </motion.div>
                      <span className="font-medium group-hover:text-primary transition-colors">
                        {link.name}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Fun Fact */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
                <CardContent className="p-6 text-center">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-2xl mb-2"
                  >
                    ☕
                  </motion.div>
                  <p className="text-sm text-muted-foreground">
                    I typically respond within 24 hours, fueled by good coffee and great ideas!
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