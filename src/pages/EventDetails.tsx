import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowLeft,
  Share2,
  Heart,
  Check,
  User,
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { EventCard } from '@/components/events/EventCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/store/authStore';
import { fetchEvents, fetchEventBySlug } from '@/services/api';
import { Event } from '@/data/events';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function EventDetails() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, setReturnUrl } = useAuthStore();
  
  const [event, setEvent] = useState<Event | null>(null);
  const [relatedEvents, setRelatedEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!slug) return;
    
    setIsLoading(true);
    Promise.all([fetchEventBySlug(slug), fetchEvents()]).then(
      ([eventData, { events }]) => {
        setEvent(eventData);
        if (eventData) {
          setRelatedEvents(
            events
              .filter((e) => e.category === eventData.category && e.id !== eventData.id)
              .slice(0, 3)
          );
        }
        setIsLoading(false);
      }
    );
  }, [slug]);

  const handleBookNow = () => {
    if (!isAuthenticated) {
      setReturnUrl(`/events/${slug}`);
      navigate('/login');
      return;
    }
    setShowBookingModal(true);
  };

  const confirmBooking = async () => {
    setIsBooking(true);
    // Simulate booking API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsBooking(false);
    setShowBookingModal(false);
    toast({
      title: 'Booking Confirmed! 🎉',
      description: `You've successfully booked ${event?.title}. Check your email for details.`,
    });
    navigate('/dashboard/bookings');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="section-padding">
          <div className="container-custom">
            <div className="animate-pulse space-y-8">
              <div className="h-96 bg-muted rounded-2xl" />
              <div className="h-8 bg-muted rounded w-1/2" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-3/4" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!event) {
    return (
      <Layout>
        <div className="section-padding">
          <div className="container-custom text-center">
            <div className="text-6xl mb-4">😕</div>
            <h1 className="text-2xl font-display font-bold mb-4">Event Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The event you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/events">
              <Button>Browse All Events</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const spotsLeft = event.maxAttendees - event.attendees;
  const spotsPercentage = (event.attendees / event.maxAttendees) * 100;

  return (
    <Layout>
      {/* Hero Image */}
      <section className="relative h-[50vh] md:h-[60vh]">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Back Button */}
        <div className="absolute top-8 left-4 md:left-8">
          <Link to="/events">
            <Button variant="secondary" size="sm" className="glass">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Button>
          </Link>
        </div>

        {/* Category Badge */}
        <div className="absolute top-8 right-4 md:right-8 flex gap-2">
          <Badge className="bg-primary text-primary-foreground">{event.category}</Badge>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container-custom">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4"
            >
              {event.title}
            </motion.h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {formatDate(event.date)}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {event.time}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {event.location}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-card rounded-2xl p-6 md:p-8 border border-border">
                <h2 className="text-2xl font-display font-semibold mb-4">About This Event</h2>
                <p className="text-muted-foreground leading-relaxed">{event.description}</p>
              </div>

              {/* Organizer */}
              <div className="bg-card rounded-2xl p-6 md:p-8 border border-border">
                <h2 className="text-2xl font-display font-semibold mb-4">Organizer</h2>
                <div className="flex items-center gap-4">
                  <img
                    src={event.organizer.avatar}
                    alt={event.organizer.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{event.organizer.name}</h3>
                    <p className="text-muted-foreground">Event Organizer</p>
                    <Badge variant="secondary" className="mt-2">
                      <Check className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="bg-card rounded-2xl p-6 md:p-8 border border-border">
                <h2 className="text-2xl font-display font-semibold mb-4">Event Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">{formatDate(event.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="font-medium">{event.time}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Venue</p>
                      <p className="font-medium">{event.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Capacity</p>
                      <p className="font-medium">{event.maxAttendees} attendees</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-4">
                {/* Booking Card */}
                <div className="bg-card rounded-2xl p-6 border border-border shadow-lg">
                  <div className="text-3xl font-bold text-foreground mb-1">
                    ${event.price}
                    <span className="text-base font-normal text-muted-foreground"> / person</span>
                  </div>
                  
                  {/* Availability */}
                  <div className="my-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Availability</span>
                      <span className="font-medium text-primary">{spotsLeft} spots left</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${spotsPercentage}%` }}
                      />
                    </div>
                  </div>

                  <Button onClick={handleBookNow} size="lg" className="w-full btn-primary mb-3">
                    Book Now
                  </Button>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setIsSaved(!isSaved)}
                    >
                      <Heart className={`w-4 h-4 mr-2 ${isSaved ? 'fill-destructive text-destructive' : ''}`} />
                      {isSaved ? 'Saved' : 'Save'}
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="bg-muted/50 rounded-2xl p-4 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2 mb-2">
                    <Check className="w-4 h-4 text-primary" />
                    Free cancellation up to 24h before
                  </p>
                  <p className="flex items-center gap-2 mb-2">
                    <Check className="w-4 h-4 text-primary" />
                    Instant confirmation
                  </p>
                  <p className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    Mobile tickets accepted
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Events */}
      {relatedEvents.length > 0 && (
        <section className="section-padding bg-muted/50">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedEvents.map((e, i) => (
                <EventCard key={e.id} event={e} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Booking Modal */}
      <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Confirm Your Booking</DialogTitle>
            <DialogDescription>
              You're about to book a spot for this event.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={event.image}
                alt={event.title}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div>
                <h4 className="font-semibold">{event.title}</h4>
                <p className="text-sm text-muted-foreground">{formatDate(event.date)}</p>
              </div>
            </div>
            <div className="border-t border-border pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Ticket (1x)</span>
                <span>${event.price}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Service fee</span>
                <span>$5.00</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t border-border pt-2 mt-2">
                <span>Total</span>
                <span>${event.price + 5}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBookingModal(false)}>
              Cancel
            </Button>
            <Button onClick={confirmBooking} disabled={isBooking} className="btn-primary">
              {isBooking ? 'Processing...' : 'Confirm Booking'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
