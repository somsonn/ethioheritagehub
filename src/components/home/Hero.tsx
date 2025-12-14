import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Star, Shield } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-accent blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary-foreground blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-in">
            <MapPin className="w-4 h-4 text-accent" />
            <span className="text-primary-foreground/90 text-sm">Starting in Lalibela, Ethiopia</span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Discover Ethiopia's
            <br />
            <span className="text-accent">Living Heritage</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Connect with verified tour guides, trusted hotels, reliable transport, 
            and authentic artisans—all in one place.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 btn-glow" asChild>
              <Link to="/guides">
                <Search className="w-5 h-5 mr-2" />
                Find a Guide
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/auth?mode=signup">Become a Provider</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2 text-primary-foreground/70">
              <Shield className="w-5 h-5 text-accent" />
              <span className="text-sm">Verified Providers</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/70">
              <Star className="w-5 h-5 text-accent" />
              <span className="text-sm">Trusted Reviews</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/70">
              <MapPin className="w-5 h-5 text-accent" />
              <span className="text-sm">Local Expertise</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute right-0 bottom-0 w-1/3 h-full hidden lg:block">
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-l from-primary-foreground/5 to-transparent" />
      </div>
    </section>
  );
}