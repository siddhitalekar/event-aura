import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ArrowLeft, Download, Mail, QrCode, User } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuthStore } from '@/store/authStore';

const bookingData = {
  id: '1',
  title: 'Summer Gala 2024',
  date: 'Jul 15, 2024',
  time: '7:00 PM',
  location: 'Grand Ballroom, The Ritz-Carlton, New York',
  image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
  status: 'confirmed' as const,
  price: 350,
  ticketCount: 2,
  bookingRef: 'EVT-2024-001234',
  bookedOn: 'June 1, 2024',
  organizer: {
    name: 'Elite Events Co.',
    email: 'contact@eliteevents.com',
  },
};

export default function BookingDetails() {
  const { id } = useParams();
  const { user } = useAuthStore();

  // In real app, fetch booking by id
  const booking = bookingData;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/dashboard/bookings">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Bookings
            </Button>
          </Link>
        </motion.div>

        {/* Booking Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl border border-border overflow-hidden"
        >
          {/* Header Image */}
          <div className="relative h-64">
            <img src={booking.image} alt={booking.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <Badge className="bg-primary text-primary-foreground mb-3">
                {booking.status}
              </Badge>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-white">
                {booking.title}
              </h1>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-4">Event Details</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p className="font-medium">{booking.date}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Time</p>
                        <p className="font-medium">{booking.time}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Venue</p>
                        <p className="font-medium">{booking.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h2 className="text-lg font-semibold mb-4">Organizer</h2>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{booking.organizer.name}</p>
                      <p className="text-sm text-muted-foreground">{booking.organizer.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="bg-muted/50 rounded-xl p-6">
                  <h2 className="text-lg font-semibold mb-4">Booking Summary</h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Booking Reference</span>
                      <span className="font-mono font-medium">{booking.bookingRef}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Booked On</span>
                      <span>{booking.bookedOn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tickets</span>
                      <span>{booking.ticketCount}x General Admission</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ticket Price</span>
                      <span>${booking.price} each</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service Fee</span>
                      <span>$5.00</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total Paid</span>
                      <span>${booking.price * booking.ticketCount + 5}</span>
                    </div>
                  </div>
                </div>

                {/* Attendee Info */}
                <div className="bg-muted/50 rounded-xl p-6">
                  <h2 className="text-lg font-semibold mb-4">Attendee</h2>
                  <div className="flex items-center gap-3">
                    <img
                      src={user?.avatar}
                      alt={user?.username}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{user?.username}</p>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                </div>

                {/* QR Code Placeholder */}
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-muted rounded-xl flex items-center justify-center">
                    <QrCode className="w-16 h-16 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Show this QR code at the venue
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-border">
              <Button className="btn-primary">
                <Download className="w-4 h-4 mr-2" />
                Download Ticket
              </Button>
              <Button variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                Email Ticket
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
