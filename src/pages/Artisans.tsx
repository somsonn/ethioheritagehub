import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ProviderCard } from '@/components/providers/ProviderCard';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { Artisan, Profile } from '@/types';
import { Search, ShoppingBag } from 'lucide-react';

export default function Artisans() {
  const [artisans, setArtisans] = useState<(Artisan & { profile: Profile })[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchArtisans();
  }, []);

  const fetchArtisans = async () => {
    try {
      const { data: artisansData, error } = await supabase
        .from('artisans')
        .select('*')
        .eq('status', 'verified');

      if (error) throw error;

      const artisansWithProfiles = await Promise.all(
        (artisansData || []).map(async (artisan) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', artisan.user_id)
            .single();
          return { ...artisan, profile: profile as Profile };
        })
      );

      setArtisans(artisansWithProfiles as (Artisan & { profile: Profile })[]);
    } catch (error) {
      console.error('Error fetching artisans:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredArtisans = artisans.filter((artisan) =>
    artisan.profile?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artisan.craft_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artisan.products.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const demoArtisans = [
    {
      id: 'demo-1',
      user_id: 'demo-1',
      craft_type: 'Traditional Weaving',
      description: 'Master weaver creating beautiful Ethiopian textiles using traditional techniques passed down for generations.',
      products: ['Shemma', 'Netela', 'Gabi', 'Table Runners'],
      location: 'Lalibela',
      status: 'verified' as const,
      rating: 4.9,
      total_reviews: 38,
      created_at: '',
      updated_at: '',
      profile: { id: 'demo-1', email: '', full_name: 'Tigist Alemu', phone: null, avatar_url: null, bio: null, created_at: '', updated_at: '' },
    },
    {
      id: 'demo-2',
      user_id: 'demo-2',
      craft_type: 'Jewelry Making',
      description: 'Handcrafted Ethiopian jewelry featuring traditional Coptic cross designs and semi-precious stones.',
      products: ['Coptic Crosses', 'Silver Necklaces', 'Beaded Jewelry'],
      location: 'Lalibela',
      status: 'verified' as const,
      rating: 4.8,
      total_reviews: 52,
      created_at: '',
      updated_at: '',
      profile: { id: 'demo-2', email: '', full_name: 'Dawit Mengistu', phone: null, avatar_url: null, bio: null, created_at: '', updated_at: '' },
    },
    {
      id: 'demo-3',
      user_id: 'demo-3',
      craft_type: 'Wood Carving',
      description: 'Religious and decorative wood carvings inspired by the rock-hewn churches of Lalibela.',
      products: ['Church Replicas', 'Religious Icons', 'Decorative Boxes'],
      location: 'Lalibela',
      status: 'verified' as const,
      rating: 4.7,
      total_reviews: 29,
      created_at: '',
      updated_at: '',
      profile: { id: 'demo-3', email: '', full_name: 'Berhanu Tadesse', phone: null, avatar_url: null, bio: null, created_at: '', updated_at: '' },
    },
  ];

  const displayArtisans = artisans.length > 0 ? filteredArtisans : demoArtisans;

  return (
    <Layout>
      <section className="bg-gradient-to-br from-ethiopia-earth/10 to-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-ethiopia-earth flex items-center justify-center">
              <Palette className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">Artisans</h1>
              <p className="text-muted-foreground">Discover authentic Ethiopian craftsmanship</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by craft type or product..."
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
          ) : displayArtisans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayArtisans.map((artisan) => (
                <ProviderCard
                  key={artisan.id}
                  id={artisan.id}
                  type="artisan"
                  name={artisan.profile?.full_name || 'Artisan'}
                  subtitle={`${artisan.craft_type} • ${artisan.location}`}
                  description={artisan.description || 'Traditional Ethiopian craftsperson'}
                  rating={Number(artisan.rating)}
                  reviewCount={artisan.total_reviews}
                  tags={[artisan.craft_type, ...artisan.products.slice(0, 2)]}
                  verified={artisan.status === 'verified'}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No artisans found.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}