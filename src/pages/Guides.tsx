import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ProviderCard } from '@/components/providers/ProviderCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { Guide, Profile } from '@/types';
import { Search, Users } from 'lucide-react';

export default function Guides() {
  const [guides, setGuides] = useState<(Guide & { profile: Profile })[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState('all');

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const { data: guidesData, error } = await supabase
        .from('guides')
        .select('*')
        .eq('status', 'verified');

      if (error) throw error;

      // Fetch profiles for each guide
      const guidesWithProfiles = await Promise.all(
        (guidesData || []).map(async (guide) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', guide.user_id)
            .single();
          return { ...guide, profile: profile as Profile };
        })
      );

      setGuides(guidesWithProfiles as (Guide & { profile: Profile })[]);
    } catch (error) {
      console.error('Error fetching guides:', error);
    } finally {
      setLoading(false);
    }
  };

  const allLanguages = [...new Set(guides.flatMap((g) => g.languages))];

  const filteredGuides = guides.filter((guide) => {
    const matchesSearch =
      guide.profile?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLanguage =
      languageFilter === 'all' || guide.languages.includes(languageFilter);
    return matchesSearch && matchesLanguage;
  });

  // Demo data for when database is empty
  const demoGuides = [
    {
      id: 'demo-1',
      user_id: 'demo-1',
      languages: ['English', 'Amharic', 'French'],
      specialties: ['Rock-Hewn Churches', 'Ethiopian History', 'Religious Sites'],
      experience_years: 12,
      hourly_rate: 25,
      daily_rate: 150,
      location: 'Lalibela',
      status: 'verified' as const,
      rating: 4.9,
      total_reviews: 47,
      created_at: '',
      updated_at: '',
      profile: {
        id: 'demo-1',
        email: 'abebe@example.com',
        full_name: 'Abebe Kebede',
        phone: null,
        avatar_url: null,
        bio: 'Passionate about sharing the wonders of Lalibela with visitors from around the world.',
        created_at: '',
        updated_at: '',
      },
    },
    {
      id: 'demo-2',
      user_id: 'demo-2',
      languages: ['English', 'Amharic', 'German'],
      specialties: ['Cultural Tours', 'Photography Tours', 'Hiking'],
      experience_years: 8,
      hourly_rate: 20,
      daily_rate: 120,
      location: 'Lalibela',
      status: 'verified' as const,
      rating: 4.7,
      total_reviews: 32,
      created_at: '',
      updated_at: '',
      profile: {
        id: 'demo-2',
        email: 'sara@example.com',
        full_name: 'Sara Tekle',
        phone: null,
        avatar_url: null,
        bio: 'Specialized in cultural immersion experiences and local traditions.',
        created_at: '',
        updated_at: '',
      },
    },
    {
      id: 'demo-3',
      user_id: 'demo-3',
      languages: ['English', 'Amharic', 'Italian'],
      specialties: ['UNESCO Sites', 'Adventure Tours', 'History'],
      experience_years: 15,
      hourly_rate: 30,
      daily_rate: 180,
      location: 'Lalibela',
      status: 'verified' as const,
      rating: 4.8,
      total_reviews: 64,
      created_at: '',
      updated_at: '',
      profile: {
        id: 'demo-3',
        email: 'yonas@example.com',
        full_name: 'Yonas Haile',
        phone: null,
        avatar_url: null,
        bio: 'Expert guide with deep knowledge of Ethiopian archaeology and ancient history.',
        created_at: '',
        updated_at: '',
      },
    },
  ];

  const displayGuides = guides.length > 0 ? filteredGuides : demoGuides;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
              <Users className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Tour Guides
              </h1>
              <p className="text-muted-foreground">
                Connect with verified local experts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search guides by name or specialty..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={languageFilter} onValueChange={setLanguageFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                {allLanguages.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
                {allLanguages.length === 0 && (
                  <>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Amharic">Amharic</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : displayGuides.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayGuides.map((guide) => (
                <ProviderCard
                  key={guide.id}
                  id={guide.id}
                  type="guide"
                  name={guide.profile?.full_name || 'Guide'}
                  subtitle={`${guide.experience_years} years experience • ${guide.location}`}
                  description={guide.profile?.bio || 'Experienced local guide'}
                  rating={Number(guide.rating)}
                  reviewCount={guide.total_reviews}
                  price={guide.daily_rate ? `$${guide.daily_rate}/day` : undefined}
                  tags={[...guide.languages.slice(0, 2), ...guide.specialties.slice(0, 1)]}
                  verified={guide.status === 'verified'}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No guides found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}