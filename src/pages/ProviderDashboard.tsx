import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Booking } from '@/types';
import { Calendar, Settings, Star, TrendingUp, Users } from 'lucide-react';
import { format } from 'date-fns';

export default function ProviderDashboard() {
  const { user, profile, role, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [providerData, setProviderData] = useState<any>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [editing, setEditing] = useState(false);

  // Form states for guide (example)
  const [languages, setLanguages] = useState('');
  const [specialties, setSpecialties] = useState('');
  const [dailyRate, setDailyRate] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user && role) {
      fetchProviderData();
    }
  }, [user, role]);

  const fetchProviderData = async () => {
    if (!user || !role) return;

    try {
      let data = null;
      
      if (role === 'guide') {
        const { data: guideData } = await supabase.from('guides').select('*').eq('user_id', user.id).maybeSingle();
        data = guideData;
        if (guideData) {
          setLanguages(guideData.languages?.join(', ') || '');
          setSpecialties(guideData.specialties?.join(', ') || '');
          setDailyRate(guideData.daily_rate?.toString() || '');
        }
      } else if (role === 'hotel') {
        const { data: hotelData } = await supabase.from('hotels').select('*').eq('user_id', user.id).maybeSingle();
        data = hotelData;
      } else if (role === 'transport') {
        const { data: transportData } = await supabase.from('transport').select('*').eq('user_id', user.id).maybeSingle();
        data = transportData;
      } else if (role === 'artisan') {
        const { data: artisanData } = await supabase.from('artisans').select('*').eq('user_id', user.id).maybeSingle();
        data = artisanData;
      }

      setProviderData(data);
      if (data) {
        setBio(profile?.bio || '');
      }
    } catch (error) {
      console.error('Error fetching provider data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleCreateProfile = async () => {
    if (!user || !role) return;

    try {
      let error = null;

      if (role === 'guide') {
        const { error: e } = await supabase.from('guides').insert({
          user_id: user.id,
          languages: languages.split(',').map((l) => l.trim()).filter(Boolean),
          specialties: specialties.split(',').map((s) => s.trim()).filter(Boolean),
          daily_rate: dailyRate ? parseFloat(dailyRate) : null,
        });
        error = e;
      } else if (role === 'hotel') {
        const { error: e } = await supabase.from('hotels').insert({ user_id: user.id, name: profile?.full_name || 'My Hotel' });
        error = e;
      } else if (role === 'transport') {
        const { error: e } = await supabase.from('transport').insert({ user_id: user.id });
        error = e;
      } else if (role === 'artisan') {
        const { error: e } = await supabase.from('artisans').insert({ user_id: user.id, craft_type: 'Traditional Craft' });
        error = e;
      }

      if (error) throw error;

      toast({
        title: 'Profile created!',
        description: 'Your provider profile has been created. It will be reviewed for verification.',
      });

      fetchProviderData();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleUpdateProfile = async () => {
    if (!user || !role || !providerData) return;

    try {
      if (role === 'guide') {
        await supabase.from('guides').update({
          languages: languages.split(',').map((l) => l.trim()).filter(Boolean),
          specialties: specialties.split(',').map((s) => s.trim()).filter(Boolean),
          daily_rate: dailyRate ? parseFloat(dailyRate) : null,
        }).eq('id', providerData.id);
      }

      await supabase.from('profiles').update({ bio }).eq('id', user.id);

      toast({
        title: 'Profile updated!',
        description: 'Your changes have been saved.',
      });

      setEditing(false);
      fetchProviderData();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-primary text-primary-foreground">Verified</Badge>;
      case 'pending':
        return <Badge className="bg-accent text-accent-foreground">Pending Review</Badge>;
      case 'rejected':
        return <Badge className="bg-destructive text-destructive-foreground">Rejected</Badge>;
      default:
        return null;
    }
  };

  if (loading || loadingData) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/4" />
            <div className="h-64 bg-muted rounded" />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Provider Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your {role} profile and view booking requests.
          </p>
        </div>

        {/* Stats Cards */}
        {providerData && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{providerData.rating || 0}</p>
                    <p className="text-sm text-muted-foreground">Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{providerData.total_reviews || 0}</p>
                    <p className="text-sm text-muted-foreground">Reviews</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-ethiopia-green/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">0</p>
                    <p className="text-sm text-muted-foreground">This Month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                    <Settings className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    {getStatusBadge(providerData.status)}
                    <p className="text-sm text-muted-foreground mt-1">Status</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Profile Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Your Profile</span>
              {providerData && !editing && (
                <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </CardTitle>
            <CardDescription>
              {providerData
                ? 'Update your profile information to attract more customers'
                : 'Create your provider profile to start receiving bookings'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!providerData ? (
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  You haven't set up your {role} profile yet. Fill in your details below to get started.
                </p>
                {role === 'guide' && (
                  <>
                    <div className="space-y-2">
                      <Label>Languages (comma-separated)</Label>
                      <Input
                        placeholder="English, Amharic, French"
                        value={languages}
                        onChange={(e) => setLanguages(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Specialties (comma-separated)</Label>
                      <Input
                        placeholder="Rock-Hewn Churches, Ethiopian History"
                        value={specialties}
                        onChange={(e) => setSpecialties(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Daily Rate (USD)</Label>
                      <Input
                        type="number"
                        placeholder="100"
                        value={dailyRate}
                        onChange={(e) => setDailyRate(e.target.value)}
                      />
                    </div>
                  </>
                )}
                <Button onClick={handleCreateProfile}>Create Profile</Button>
              </div>
            ) : editing ? (
              <div className="space-y-4">
                {role === 'guide' && (
                  <>
                    <div className="space-y-2">
                      <Label>Languages (comma-separated)</Label>
                      <Input
                        placeholder="English, Amharic, French"
                        value={languages}
                        onChange={(e) => setLanguages(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Specialties (comma-separated)</Label>
                      <Input
                        placeholder="Rock-Hewn Churches, Ethiopian History"
                        value={specialties}
                        onChange={(e) => setSpecialties(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Daily Rate (USD)</Label>
                      <Input
                        type="number"
                        placeholder="100"
                        value={dailyRate}
                        onChange={(e) => setDailyRate(e.target.value)}
                      />
                    </div>
                  </>
                )}
                <div className="space-y-2">
                  <Label>Bio</Label>
                  <Textarea
                    placeholder="Tell customers about yourself..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleUpdateProfile}>Save Changes</Button>
                  <Button variant="outline" onClick={() => setEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {role === 'guide' && (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">Languages</p>
                      <p className="font-medium">{providerData.languages?.join(', ') || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Specialties</p>
                      <p className="font-medium">{providerData.specialties?.join(', ') || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Daily Rate</p>
                      <p className="font-medium">${providerData.daily_rate || 'Not specified'}</p>
                    </div>
                  </>
                )}
                <div>
                  <p className="text-sm text-muted-foreground">Bio</p>
                  <p className="font-medium">{profile?.bio || 'Not specified'}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Booking Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Booking Requests
            </CardTitle>
            <CardDescription>View and manage incoming booking requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No booking requests yet</p>
              <p className="text-sm text-muted-foreground mt-2">
                Once customers start booking, their requests will appear here.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}