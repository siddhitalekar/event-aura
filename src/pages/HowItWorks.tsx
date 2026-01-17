import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Search, LogIn, Ticket } from 'lucide-react';

const steps = [
  { icon: Search, title: 'Discover Events', description: 'Browse our curated collection of premium events across various categories.' },
  { icon: LogIn, title: 'Sign In & Book', description: 'Create an account or sign in to secure your spot at any event.' },
  { icon: Ticket, title: 'Enjoy the Experience', description: 'Receive your digital tickets and enjoy unforgettable moments.' },
];

export default function HowItWorks() {
  return (
    <Layout>
      <section className="section-padding bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">How It Works</h1>
            <p className="text-lg text-muted-foreground">Getting started with Eventify is simple. Follow these three easy steps.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div key={step.title} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-24 h-24 rounded-2xl gradient-primary flex items-center justify-center shadow-glow shrink-0">
                  <step.icon className="w-12 h-12 text-primary-foreground" />
                </div>
                <div className="text-center md:text-left">
                  <div className="text-sm text-primary font-semibold mb-2">Step {i + 1}</div>
                  <h3 className="text-2xl font-display font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
