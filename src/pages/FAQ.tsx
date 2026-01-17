import { Layout } from '@/components/layout/Layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  { q: 'How do I book an event?', a: 'Browse events, click on one you like, and hit "Book Now". You\'ll need to sign in or create an account to complete your booking.' },
  { q: 'Can I cancel my booking?', a: 'Yes, you can cancel up to 24 hours before the event for a full refund. Go to Dashboard > Bookings to manage your reservations.' },
  { q: 'How do I receive my tickets?', a: 'Digital tickets are sent to your email and are also available in your dashboard. Simply show the QR code at the venue.' },
  { q: 'Is my payment secure?', a: 'Absolutely. We use industry-standard encryption to protect all transactions.' },
  { q: 'Can I transfer my ticket?', a: 'Yes, you can transfer tickets to another person from your booking details page.' },
];

export default function FAQ() {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-custom max-w-3xl">
          <h1 className="text-4xl font-display font-bold text-center mb-12">Frequently Asked Questions</h1>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-card rounded-xl border border-border px-6">
                <AccordionTrigger className="text-left font-semibold">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </Layout>
  );
}
