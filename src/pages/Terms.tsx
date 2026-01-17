import { Layout } from '@/components/layout/Layout';

export default function Terms() {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-custom max-w-3xl prose prose-slate">
          <h1 className="text-4xl font-display font-bold mb-8">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: January 2024</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground">By accessing Eventify, you agree to be bound by these terms of service and all applicable laws.</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use of Service</h2>
          <p className="text-muted-foreground">You may use our service for lawful purposes only. You must not misuse our platform or attempt to access it using methods other than our provided interfaces.</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Bookings & Payments</h2>
          <p className="text-muted-foreground">All bookings are subject to availability. Payments are processed securely through our payment partners. Refund policies vary by event.</p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Contact</h2>
          <p className="text-muted-foreground">For questions about these terms, contact us at legal@eventify.com</p>
        </div>
      </section>
    </Layout>
  );
}
