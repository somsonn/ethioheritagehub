import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Booking } from '@/types';
import { Calendar, MapPin, Clock, ShoppingBag, Plus } from 'lucide-react';
import { format } from 'date-fns';

export default function TouristDashboard() {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('tourist_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data as Booking[]);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoadingBookings(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-primary text-primary-foreground';
      case 'pending': return 'bg-accent text-accent-foreground';
      case 'cancelled': return 'bg-destructive text-destructive-foreground';
      case 'completed': return 'bg-muted text-muted-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  if (loading) {
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
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Welcome back, {profile?.full_name || 'Traveler'}!
          </h1>
          <p className="text-muted-foreground">
            Manage your bookings and explore more of Ethiopia's heritage.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="card-hover cursor-pointer" onClick={() => navigate('/guides')}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Plus className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Find a Guide</p>
                <p className="text-sm text-muted-foreground">Book an expert</p>
              </div>
            </CardContent>
          </Card>
          <Card className="card-hover cursor-pointer" onClick={() => navigate('/hotels')}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">Book Hotel</p>
                <p className="text-sm text-muted-foreground">Find stays</p>
              </div>
            </CardContent>
          </Card>
          <Card className="card-hover cursor-pointer" onClick={() => navigate('/transports')}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="font-medium text-foreground">Arrange Transport</p>
                <p className="text-sm text-muted-foreground">Get around</p>
              </div>
            </CardContent>
          </Card>
          <Card className="card-hover cursor-pointer" onClick={() => navigate('/artisans')}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-ethiopia-earth/10 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-ethiopia-earth" />
              </div>
              <div>
                <p className="font-medium text-foreground">Meet Artisans</p>
                <p className="text-sm text-muted-foreground">Local crafts</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Your Bookings
            </CardTitle>
            <CardDescription>View and manage your upcoming and past bookings</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingBookings ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 bg-muted animate-pulse rounded-lg" />
                ))}
              </div>
            ) : bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground capitalize">
                          {booking.provider_type} Booking
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(booking.start_date), 'MMM d, yyyy')}
                          {booking.end_date && ` - ${format(new Date(booking.end_date), 'MMM d, yyyy')}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {booking.total_price && (
                        <span className="font-medium text-foreground">
                          ${booking.total_price}
                        </span>
                      )}
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No bookings yet</p>
                <Button onClick={() => navigate('/guides')}>Book Your First Guide</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}