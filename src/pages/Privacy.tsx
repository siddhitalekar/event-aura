import { Layout } from '@/components/layout/Layout';

export default function Privacy() {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-custom max-w-3xl prose prose-slate">
          <h1 className="text-4xl font-display font-bold mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: January 2024</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
          <p className="text-muted-foreground">We collect information you provide directly, such as your name, email, and booking details to deliver our services.</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
          <p className="text-muted-foreground">Your information is used to process bookings, send confirmations, and improve our services. We never sell your data.</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Data Security</h2>
          <p className="text-muted-foreground">We implement industry-standard security measures to protect your personal information.</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact</h2>
          <p className="text-muted-foreground">For privacy inquiries, contact privacy@eventify.com</p>
        </div>
      </section>
    </Layout>
  );
}
