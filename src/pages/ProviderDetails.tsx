import { useParams, Link, useLocation, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, MapPin, Phone, Mail, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import { BookingModal } from '@/components/booking/BookingModal';
import { toast } from 'sonner';

const ProviderDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const type = location.pathname.split('/')[1];
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    const paymentStatus = searchParams.get('payment_status');
    if (paymentStatus === 'success') {
      toast.success('Payment Successful! Your booking has been confirmed.');
    } else if (paymentStatus === 'cancel') {
      toast.error('Payment Cancelled.');
    }
  }, [searchParams]);
  
  // This would normally fetch data from an API based on type and id
  // For now we'll just display the params and some placeholder content
  
  const getTitle = () => {
    if (!type) return 'Provider Details';
    // Remove 's' from end if present for display
    const singular = type.endsWith('s') ? type.slice(0, -1) : type;
    return `${singular.charAt(0).toUpperCase() + singular.slice(1)} Details`;
  };

  const getUnitName = () => {
    if (type === 'hotels') return 'night';
    if (type === 'guides') return 'day';
    if (type === 'transports') return 'trip';
    return 'item';
  };

  const getPrice = () => {
    // Mock prices
    if (type === 'hotels') return 2500;
    if (type === 'guides') return 1500;
    if (type === 'transports') return 800;
    return 500;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link to={`/${type}`} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to {type}
        </Link>
      </Button>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <div className="relative h-64 md:h-96 rounded-xl overflow-hidden bg-muted">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <Badge className="mb-2 bg-primary text-primary-foreground hover:bg-primary/90">
                {type?.slice(0, -1).toUpperCase()}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Provider Name {id}
              </h1>
              <div className="flex items-center gap-4 text-sm md:text-base">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">4.8</span>
                  <span className="text-white/80">(120 reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-5 h-5" />
                  <span>Addis Ababa, Ethiopia</span>
                </div>
              </div>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold mb-4">About</h2>
            <p className="text-muted-foreground leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Services</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {['Service 1', 'Service 2', 'Service 3', 'Service 4'].map((service) => (
                <div key={service} className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
                  <h3 className="font-semibold mb-2">{service}</h3>
                  <p className="text-sm text-muted-foreground">Description of the service provided.</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-5 h-5" />
                <span>+251 91 234 5678</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5" />
                <span>contact@example.com</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Globe className="w-5 h-5" />
                <span>www.example.com</span>
              </div>
            </div>
            <div className="grid gap-3 mt-6">
              <Button onClick={() => setIsBookingModalOpen(true)} className="w-full bg-[#00a651] hover:bg-[#008f45]">
                Book Now
              </Button>
              <Button variant="outline" className="w-full">Contact Provider</Button>
            </div>
          </div>

          <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Opening Hours</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monday - Friday</span>
                <span>9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Saturday</span>
                <span>10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sunday</span>
                <span>Closed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        providerName={`Provider ${id}`}
        pricePerUnit={getPrice()}
        unitName={getUnitName()}
      />
    </div>
  );
};

export default ProviderDetails;
