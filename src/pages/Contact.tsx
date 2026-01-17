import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Contact() {
  const { toast } = useToast();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = () => {
    toast({ title: 'Message Sent!', description: 'We\'ll get back to you soon.' });
    reset();
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">Contact Us</h1>
            <p className="text-muted-foreground">Have questions? We'd love to hear from you.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"><Mail className="w-6 h-6 text-primary" /></div><div><h3 className="font-semibold">Email</h3><p className="text-muted-foreground">hello@eventify.com</p></div></div>
              <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"><Phone className="w-6 h-6 text-primary" /></div><div><h3 className="font-semibold">Phone</h3><p className="text-muted-foreground">+1 (555) 123-4567</p></div></div>
              <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"><MapPin className="w-6 h-6 text-primary" /></div><div><h3 className="font-semibold">Address</h3><p className="text-muted-foreground">123 Event Street, New York, NY 10001</p></div></div>
            </motion.div>

            <motion.form initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} onSubmit={handleSubmit(onSubmit)} className="bg-card rounded-2xl p-6 border border-border space-y-4">
              <div><Label>Name</Label><Input {...register('name')} className="mt-1" /></div>
              <div><Label>Email</Label><Input type="email" {...register('email')} className="mt-1" /></div>
              <div><Label>Message</Label><Textarea {...register('message')} className="mt-1 min-h-[120px]" /></div>
              <Button type="submit" className="w-full btn-primary">Send Message</Button>
            </motion.form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
