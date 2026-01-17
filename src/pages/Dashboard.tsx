import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Ticket, TrendingUp, Clock } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';

const stats = [
  { label: 'Upcoming Events', value: '3', icon: Calendar, trend: '+1 this week' },
  { label: 'Total Bookings', value: '12', icon: Ticket, trend: '+4 this month' },
  { label: 'Events Attended', value: '8', icon: TrendingUp, trend: '67% attendance' },
  { label: 'Hours of Fun', value: '24+', icon: Clock, trend: 'And counting!' },
];

const upcomingBookings = [
  {
    id: '1',
    title: 'Summer Gala 2024',
    date: 'Jul 15, 2024',
    time: '7:00 PM',
    location: 'The Ritz-Carlton, New York',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200&q=80',
    status: 'confirmed',
  },
  {
    id: '2',
    title: 'Tech Innovation Summit',
    date: 'Aug 22, 2024',
    time: '9:00 AM',
    location: 'Silicon Valley Convention Center',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=200&q=80',
    status: 'confirmed',
  },
  {
    id: '3',
    title: 'Jazz Night: An Exclusive Evening',
    date: 'Jul 5, 2024',
    time: '8:00 PM',
    location: 'The Blue Note, Chicago',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&q=80',
    status: 'pending',
  },
];

export default function Dashboard() {
  const { user } = useAuthStore();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Welcome back, {user?.username}! 👋
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your events.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 border border-border"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-primary mt-1">{stat.trend}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Upcoming Bookings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-2xl border border-border overflow-hidden"
        >
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="text-xl font-display font-semibold">Upcoming Bookings</h2>
            <Link to="/dashboard/bookings">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </div>
          <div className="divide-y divide-border">
            {upcomingBookings.map((booking) => (
              <div
                key={booking.id}
                className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-muted/50 transition-colors"
              >
                <img
                  src={booking.image}
                  alt={booking.title}
                  className="w-full sm:w-20 h-32 sm:h-20 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{booking.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {booking.date} at {booking.time}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">{booking.location}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'confirmed'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-accent/10 text-accent'
                    }`}
                  >
                    {booking.status}
                  </span>
                  <Link to={`/dashboard/bookings/${booking.id}`}>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 md:p-8"
        >
          <h2 className="text-xl font-display font-semibold mb-2">Discover More Events</h2>
          <p className="text-muted-foreground mb-4">
            Explore our curated collection of extraordinary experiences.
          </p>
          <Link to="/events">
            <Button className="btn-primary">Browse Events</Button>
          </Link>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
