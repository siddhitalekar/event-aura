import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, X, AlertCircle } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Booking {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  price: number;
  ticketCount: number;
}

const mockBookings: Booking[] = [
  {
    id: '1',
    title: 'Summer Gala 2024',
    date: 'Jul 15, 2024',
    time: '7:00 PM',
    location: 'The Ritz-Carlton, New York',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80',
    status: 'confirmed',
    price: 350,
    ticketCount: 2,
  },
  {
    id: '2',
    title: 'Tech Innovation Summit',
    date: 'Aug 22, 2024',
    time: '9:00 AM',
    location: 'Silicon Valley Convention Center',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&q=80',
    status: 'confirmed',
    price: 499,
    ticketCount: 1,
  },
  {
    id: '3',
    title: 'Jazz Night: An Exclusive Evening',
    date: 'Jul 5, 2024',
    time: '8:00 PM',
    location: 'The Blue Note, Chicago',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80',
    status: 'pending',
    price: 150,
    ticketCount: 2,
  },
  {
    id: '4',
    title: 'Vintage Wine Tasting Experience',
    date: 'Jun 28, 2024',
    time: '6:00 PM',
    location: 'Château de Lumière, Napa Valley',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80',
    status: 'cancelled',
    price: 175,
    ticketCount: 1,
  },
];

const statusColors = {
  confirmed: 'bg-primary/10 text-primary',
  pending: 'bg-accent/10 text-accent',
  cancelled: 'bg-destructive/10 text-destructive',
};

export default function Bookings() {
  const { toast } = useToast();
  const [bookings, setBookings] = useState(mockBookings);
  const [cancelBooking, setCancelBooking] = useState<Booking | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancel = async () => {
    if (!cancelBooking) return;
    setIsCancelling(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setBookings(
      bookings.map((b) =>
        b.id === cancelBooking.id ? { ...b, status: 'cancelled' as const } : b
      )
    );
    setIsCancelling(false);
    setCancelBooking(null);
    toast({
      title: 'Booking Cancelled',
      description: 'Your booking has been cancelled successfully.',
    });
  };

  const activeBookings = bookings.filter((b) => b.status !== 'cancelled');
  const cancelledBookings = bookings.filter((b) => b.status === 'cancelled');

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">My Bookings</h1>
          <p className="text-muted-foreground">Manage and view all your event bookings.</p>
        </motion.div>

        {/* Active Bookings */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Active Bookings ({activeBookings.length})</h2>
          {activeBookings.length === 0 ? (
            <div className="bg-card rounded-2xl border border-border p-8 text-center">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No active bookings</h3>
              <p className="text-muted-foreground mb-4">
                You haven't booked any events yet. Start exploring!
              </p>
              <Link to="/events">
                <Button className="btn-primary">Browse Events</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {activeBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl border border-border overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    <img
                      src={booking.image}
                      alt={booking.title}
                      className="w-full md:w-48 h-40 md:h-auto object-cover"
                    />
                    <div className="flex-1 p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                        <div>
                          <Badge className={statusColors[booking.status]}>
                            {booking.status}
                          </Badge>
                          <h3 className="text-xl font-display font-semibold mt-2">
                            {booking.title}
                          </h3>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">${booking.price * booking.ticketCount}</p>
                          <p className="text-sm text-muted-foreground">
                            {booking.ticketCount} ticket{booking.ticketCount > 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {booking.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {booking.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span className="truncate">{booking.location}</span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Link to={`/dashboard/bookings/${booking.id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>
                        {booking.status !== 'cancelled' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setCancelBooking(booking)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <X className="w-4 h-4 mr-1" />
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Cancelled Bookings */}
        {cancelledBookings.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-muted-foreground">
              Cancelled Bookings ({cancelledBookings.length})
            </h2>
            <div className="space-y-4 opacity-60">
              {cancelledBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-card rounded-2xl border border-border p-4 flex items-center gap-4"
                >
                  <img
                    src={booking.image}
                    alt={booking.title}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold line-through">{booking.title}</h3>
                    <p className="text-sm text-muted-foreground">{booking.date}</p>
                  </div>
                  <Badge variant="secondary">Cancelled</Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cancel Modal */}
        <Dialog open={!!cancelBooking} onOpenChange={() => setCancelBooking(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-destructive" />
                Cancel Booking
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel your booking for "{cancelBooking?.title}"? This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCancelBooking(null)}>
                Keep Booking
              </Button>
              <Button
                variant="destructive"
                onClick={handleCancel}
                disabled={isCancelling}
              >
                {isCancelling ? 'Cancelling...' : 'Yes, Cancel'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
