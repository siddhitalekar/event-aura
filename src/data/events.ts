export interface Event {
  id: string;
  slug: string;
  title: string;
  date: string;
  time: string;
  description: string;
  location: string;
  category: string;
  price: number;
  image: string;
  organizer: {
    name: string;
    avatar: string;
  };
  attendees: number;
  maxAttendees: number;
  featured?: boolean;
}

export const dummyEvents: Event[] = [
  {
    id: '1',
    slug: 'summer-gala-2024',
    title: 'Summer Gala 2024',
    date: '2024-07-15',
    time: '19:00',
    description: 'Join us for an unforgettable evening of elegance, fine dining, and live entertainment at our annual Summer Gala. Experience world-class cuisine, networking opportunities, and performances by renowned artists in a stunning venue.',
    location: 'Grand Ballroom, The Ritz-Carlton, New York',
    category: 'Corporate',
    price: 350,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    organizer: { name: 'Elite Events Co.', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=EE' },
    attendees: 420,
    maxAttendees: 500,
    featured: true,
  },
  {
    id: '2',
    slug: 'tech-innovation-summit',
    title: 'Tech Innovation Summit',
    date: '2024-08-22',
    time: '09:00',
    description: 'The premier technology conference bringing together industry leaders, innovators, and visionaries. Discover the latest trends in AI, blockchain, and sustainable tech through keynotes, workshops, and hands-on demos.',
    location: 'Silicon Valley Convention Center, San Francisco',
    category: 'Corporate',
    price: 499,
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
    organizer: { name: 'TechVentures Inc.', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=TV' },
    attendees: 1200,
    maxAttendees: 1500,
    featured: true,
  },
  {
    id: '3',
    slug: 'vintage-wine-tasting',
    title: 'Vintage Wine Tasting Experience',
    date: '2024-06-28',
    time: '18:00',
    description: 'Embark on a sensory journey through the world\'s finest vineyards. Sample rare vintages, learn from master sommeliers, and enjoy gourmet pairings in an intimate château setting.',
    location: 'Château de Lumière, Napa Valley',
    category: 'Private Parties',
    price: 175,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80',
    organizer: { name: 'Vino Elite', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=VE' },
    attendees: 45,
    maxAttendees: 60,
    featured: true,
  },
  {
    id: '4',
    slug: 'luxury-wedding-expo',
    title: 'Luxury Wedding Expo 2024',
    date: '2024-09-10',
    time: '10:00',
    description: 'Discover your dream wedding at the most prestigious bridal showcase. Meet top designers, planners, florists, and photographers. Exclusive runway shows and complimentary champagne reception.',
    location: 'The Plaza Hotel, New York',
    category: 'Weddings',
    price: 75,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    organizer: { name: 'Bridal Dreams', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=BD' },
    attendees: 800,
    maxAttendees: 1000,
    featured: true,
  },
  {
    id: '5',
    slug: 'jazz-night-exclusive',
    title: 'Jazz Night: An Exclusive Evening',
    date: '2024-07-05',
    time: '20:00',
    description: 'An intimate evening featuring Grammy-winning jazz artists in a historic speakeasy setting. Premium cocktails, fine dining, and unforgettable music.',
    location: 'The Blue Note, Chicago',
    category: 'Concerts',
    price: 150,
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80',
    organizer: { name: 'Rhythm & Soul Events', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=RS' },
    attendees: 180,
    maxAttendees: 200,
  },
  {
    id: '6',
    slug: 'masterclass-photography',
    title: 'Masterclass: Professional Photography',
    date: '2024-08-05',
    time: '10:00',
    description: 'Learn from award-winning photographers in this intensive two-day workshop. Covering portrait, landscape, and commercial photography with hands-on sessions.',
    location: 'Creative Arts Studio, Los Angeles',
    category: 'Workshops',
    price: 299,
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80',
    organizer: { name: 'Lens Academy', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=LA' },
    attendees: 25,
    maxAttendees: 30,
  },
  {
    id: '7',
    slug: 'charity-gala-children',
    title: 'Children\'s Hope Charity Gala',
    date: '2024-10-12',
    time: '18:30',
    description: 'An elegant evening supporting children\'s education worldwide. Silent auction, celebrity appearances, gourmet dinner, and live entertainment.',
    location: 'Beverly Wilshire Hotel, Beverly Hills',
    category: 'Corporate',
    price: 500,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
    organizer: { name: 'Hope Foundation', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=HF' },
    attendees: 350,
    maxAttendees: 400,
  },
  {
    id: '8',
    slug: 'startup-pitch-night',
    title: 'Startup Pitch Night',
    date: '2024-07-25',
    time: '18:00',
    description: 'Watch the next generation of innovators present their groundbreaking ideas to top investors. Networking, refreshments, and exclusive investment opportunities.',
    location: 'WeWork HQ, San Francisco',
    category: 'Corporate',
    price: 50,
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
    organizer: { name: 'Venture Hub', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=VH' },
    attendees: 150,
    maxAttendees: 200,
  },
];

export const categories = [
  { name: 'Weddings', icon: 'Heart', color: 'from-pink-500 to-rose-500' },
  { name: 'Corporate', icon: 'Building2', color: 'from-indigo-500 to-purple-500' },
  { name: 'Concerts', icon: 'Music', color: 'from-orange-500 to-red-500' },
  { name: 'Workshops', icon: 'GraduationCap', color: 'from-emerald-500 to-teal-500' },
  { name: 'Private Parties', icon: 'PartyPopper', color: 'from-amber-500 to-yellow-500' },
];

export const testimonials = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'CEO, TechStart Inc.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    content: 'Eventify transformed our annual conference into an unforgettable experience. The platform made managing 1,000+ attendees seamless.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Wedding Planner',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
    content: 'As a wedding planner, I\'ve used many platforms. Eventify stands out with its elegant design and intuitive booking system.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Emma Davis',
    role: 'Event Coordinator',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
    content: 'The customer support is exceptional. They helped us customize everything for our corporate retreat. Highly recommended!',
    rating: 5,
  },
];
