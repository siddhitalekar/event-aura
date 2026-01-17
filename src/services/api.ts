import { Event, dummyEvents } from '@/data/events';

const API_BASE = 'http://localhost:8080';

export interface APIEvent {
  title: string;
  date: string;
  description: string;
  location: string;
}

function transformAPIEvent(apiEvent: APIEvent, index: number): Event {
  const categories = ['Corporate', 'Weddings', 'Concerts', 'Workshops', 'Private Parties'];
  const images = [
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
    'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80',
  ];

  return {
    id: String(index + 1),
    slug: apiEvent.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    title: apiEvent.title,
    date: apiEvent.date,
    time: '19:00',
    description: apiEvent.description,
    location: apiEvent.location,
    category: categories[index % categories.length],
    price: 99 + (index * 50),
    image: images[index % images.length],
    organizer: {
      name: 'Event Organizer',
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=EO${index}`,
    },
    attendees: 50 + (index * 30),
    maxAttendees: 200 + (index * 50),
    featured: index < 4,
  };
}

export async function fetchEvents(): Promise<{ events: Event[]; isFromAPI: boolean }> {
  try {
    const response = await fetch(`${API_BASE}/events`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const data: APIEvent[] = await response.json();
      const events = data.map((event, index) => transformAPIEvent(event, index));
      return { events, isFromAPI: true };
    }
    throw new Error('Failed to fetch events');
  } catch (error) {
    console.log('API unavailable, using dummy events');
    return { events: dummyEvents, isFromAPI: false };
  }
}

export async function fetchEventBySlug(slug: string): Promise<Event | null> {
  const { events } = await fetchEvents();
  return events.find(event => event.slug === slug) || null;
}
