import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Users, Award, Globe, Heart } from 'lucide-react';

const stats = [
  { label: 'Events Hosted', value: '10,000+' },
  { label: 'Happy Attendees', value: '50,000+' },
  { label: 'Cities Covered', value: '100+' },
  { label: 'Expert Organizers', value: '500+' },
];

const values = [
  { icon: Users, title: 'Community First', description: 'We bring people together through shared experiences.' },
  { icon: Award, title: 'Excellence', description: 'Only the finest events make it to our platform.' },
  { icon: Globe, title: 'Accessibility', description: 'Events for everyone, everywhere.' },
  { icon: Heart, title: 'Passion', description: 'We love what we do and it shows.' },
];

export default function About() {
  return (
    <Layout>
      <section className="section-padding bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">About Eventify</h1>
            <p className="text-lg text-muted-foreground">We're on a mission to connect people through extraordinary events. From intimate gatherings to grand celebrations, we make every moment memorable.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-6 bg-card rounded-2xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <h2 className="text-3xl font-display font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div key={value.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-2xl p-6 border border-border text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl gradient-primary flex items-center justify-center">
                  <value.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
