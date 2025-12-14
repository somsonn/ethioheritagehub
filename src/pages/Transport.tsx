import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ProviderCard } from '@/components/providers/ProviderCard';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { Transport as TransportType, Profile } from '@/types';
import { Search, Car } from 'lucide-react';

export default function Transport() {
  const [transports, setTransports] = useState<(TransportType & { profile: Profile })[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTransports();
  }, []);

  const fetchTransports = async () => {
    try {
      const { data: transportData, error } = await supabase
        .from('transport')
        .select('*')
        .eq('status', 'verified');

      if (error) throw error;

      const transportsWithProfiles = await Promise.all(
        (transportData || []).map(async (transport) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', transport.user_id)
            .single();
          return { ...transport, profile: profile as Profile };
        })
      );

      setTransports(transportsWithProfiles as (TransportType & { profile: Profile })[]);
    } catch (error) {
      console.error('Error fetching transport:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTransports = transports.filter((transport) =>
    transport.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transport.vehicle_types.some((v) => v.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const demoTransports = [
    {
      id: 'demo-1',
      user_id: 'demo-1',
      company_name: 'Lalibela Tours & Transport',
      vehicle_types: ['SUV', 'Minivan', '4x4'],
      capacity: 8,
      price_per_day: 80,
      location: 'Lalibela',
      status: 'verified' as const,
      rating: 4.7,
      total_reviews: 56,
      created_at: '',
      updated_at: '',
      profile: { id: 'demo-1', email: '', full_name: 'Lalibela Tours', phone: null, avatar_url: null, bio: null, created_at: '', updated_at: '' },
    },
    {
      id: 'demo-2',
      user_id: 'demo-2',
      company_name: 'Ethiopian Road Adventures',
      vehicle_types: ['Land Cruiser', 'Coaster Bus'],
      capacity: 25,
      price_per_day: 150,
      location: 'Lalibela',
      status: 'verified' as const,
      rating: 4.9,
      total_reviews: 82,
      created_at: '',
      updated_at: '',
      profile: { id: 'demo-2', email: '', full_name: 'Road Adventures', phone: null, avatar_url: null, bio: null, created_at: '', updated_at: '' },
    },
    {
      id: 'demo-3',
      user_id: 'demo-3',
      company_name: 'Safe Travels Ethiopia',
      vehicle_types: ['Sedan', 'SUV'],
      capacity: 4,
      price_per_day: 60,
      location: 'Lalibela',
      status: 'verified' as const,
      rating: 4.6,
      total_reviews: 41,
      created_at: '',
      updated_at: '',
      profile: { id: 'demo-3', email: '', full_name: 'Safe Travels', phone: null, avatar_url: null, bio: null, created_at: '', updated_at: '' },
    },
  ];

  const displayTransports = transports.length > 0 ? filteredTransports : demoTransports;

  return (
    <Layout>
      <section className="bg-gradient-to-br from-destructive/5 to-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-ethiopia-red flex items-center justify-center">
              <Car className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">Transport</h1>
              <p className="text-muted-foreground">Reliable vehicles for your journey</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by company or vehicle type..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
          ) : displayTransports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayTransports.map((transport) => (
                <ProviderCard
                  key={transport.id}
                  id={transport.id}
                  type="transport"
                  name={transport.company_name || 'Transport Service'}
                  subtitle={`Capacity: ${transport.capacity} passengers • ${transport.location}`}
                  description={`Reliable transport service with ${transport.vehicle_types.join(', ')}`}
                  rating={Number(transport.rating)}
                  reviewCount={transport.total_reviews}
                  price={transport.price_per_day ? `$${transport.price_per_day}/day` : undefined}
                  tags={transport.vehicle_types}
                  verified={transport.status === 'verified'}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No transport services found.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}