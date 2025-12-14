import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ProviderCard } from '@/components/providers/ProviderCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { Hotel as HotelType, Profile } from '@/types';
import { Search, Hotel } from 'lucide-react';

export default function Hotels() {
  const [hotels, setHotels] = useState<(HotelType & { profile: Profile })[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('all');

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const { data: hotelsData, error } = await supabase
        .from('hotels')
        .select('*')
        .eq('status', 'verified');

      if (error) throw error;

      const hotelsWithProfiles = await Promise.all(
        (hotelsData || []).map(async (hotel) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', hotel.user_id)
            .single();
          return { ...hotel, profile: profile as Profile };
        })
      );

      setHotels(hotelsWithProfiles as (HotelType & { profile: Profile })[]);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredHotels = hotels.filter((hotel) => {
    const matchesSearch =
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.amenities.some((a) => a.toLowerCase().includes(searchTerm.toLowerCase()));
    
    let matchesPrice = true;
    if (priceRange !== 'all' && hotel.price_per_night) {
      const price = Number(hotel.price_per_night);
      if (priceRange === 'budget') matchesPrice = price < 50;
      else if (priceRange === 'mid') matchesPrice = price >= 50 && price < 100;
      else if (priceRange === 'luxury') matchesPrice = price >= 100;
    }
    
    return matchesSearch && matchesPrice;
  });

  const demoHotels = [
    {
      id: 'demo-1',
      user_id: 'demo-1',
      name: 'Mountain View Lodge',
      description: 'Stunning views of the Lalibela mountains with traditional Ethiopian hospitality.',
      address: 'Near Bet Maryam Church',
      location: 'Lalibela',
      amenities: ['WiFi', 'Restaurant', 'Garden', 'Tour Desk'],
      price_per_night: 85,
      images: [],
      status: 'verified' as const,
      rating: 4.8,
      total_reviews: 124,
      created_at: '',
      updated_at: '',
      profile: { id: 'demo-1', email: '', full_name: 'Mountain View Lodge', phone: null, avatar_url: null, bio: null, created_at: '', updated_at: '' },
    },
    {
      id: 'demo-2',
      user_id: 'demo-2',
      name: 'Heritage Guest House',
      description: 'Authentic Ethiopian guesthouse with home-cooked meals and warm family atmosphere.',
      address: 'Central Lalibela',
      location: 'Lalibela',
      amenities: ['WiFi', 'Breakfast', 'Airport Transfer', 'Laundry'],
      price_per_night: 45,
      images: [],
      status: 'verified' as const,
      rating: 4.6,
      total_reviews: 89,
      created_at: '',
      updated_at: '',
      profile: { id: 'demo-2', email: '', full_name: 'Heritage Guest House', phone: null, avatar_url: null, bio: null, created_at: '', updated_at: '' },
    },
    {
      id: 'demo-3',
      user_id: 'demo-3',
      name: 'Lalibela Luxury Resort',
      description: 'Premium resort offering spa, pool, and exclusive tours to the rock-hewn churches.',
      address: 'Hilltop, Lalibela',
      location: 'Lalibela',
      amenities: ['Pool', 'Spa', 'Restaurant', 'Bar', 'Gym', 'WiFi'],
      price_per_night: 180,
      images: [],
      status: 'verified' as const,
      rating: 4.9,
      total_reviews: 67,
      created_at: '',
      updated_at: '',
      profile: { id: 'demo-3', email: '', full_name: 'Lalibela Luxury Resort', phone: null, avatar_url: null, bio: null, created_at: '', updated_at: '' },
    },
  ];

  const displayHotels = hotels.length > 0 ? filteredHotels : demoHotels;

  return (
    <Layout>
      <section className="bg-gradient-to-br from-accent/10 to-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center">
              <Hotel className="w-7 h-7 text-accent-foreground" />
            </div>
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">Hotels</h1>
              <p className="text-muted-foreground">Find your perfect accommodation</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search hotels by name or amenity..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="budget">Budget (under $50)</SelectItem>
                <SelectItem value="mid">Mid-Range ($50-$100)</SelectItem>
                <SelectItem value="luxury">Luxury ($100+)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : displayHotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayHotels.map((hotel) => (
                <ProviderCard
                  key={hotel.id}
                  id={hotel.id}
                  type="hotel"
                  name={hotel.name}
                  subtitle={hotel.address || hotel.location}
                  description={hotel.description || 'Comfortable accommodation'}
                  rating={Number(hotel.rating)}
                  reviewCount={hotel.total_reviews}
                  price={hotel.price_per_night ? `$${hotel.price_per_night}/night` : undefined}
                  tags={hotel.amenities.slice(0, 4)}
                  verified={hotel.status === 'verified'}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No hotels found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}