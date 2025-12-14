import { CheckCircle, Globe, Shield, Clock, Users, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Verified Providers',
    description: 'Every guide, hotel, and service provider is vetted and verified for quality and trust.',
  },
  {
    icon: Globe,
    title: 'Multi-Language Support',
    description: 'Find guides who speak your language for a more immersive cultural experience.',
  },
  {
    icon: Clock,
    title: 'Instant Booking',
    description: 'Book services instantly with real-time availability and confirmation.',
  },
  {
    icon: Users,
    title: 'Local Community',
    description: 'Support local businesses and communities while experiencing authentic culture.',
  },
  {
    icon: Sparkles,
    title: 'Authentic Experiences',
    description: 'Curated heritage experiences that go beyond typical tourist attractions.',
  },
  {
    icon: CheckCircle,
    title: 'Quality Guaranteed',
    description: 'Customer reviews and ratings ensure consistently high-quality services.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why EthioHeritageHub?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're transforming cultural tourism in Ethiopia with a trusted, 
            connected platform for travelers and service providers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="flex gap-4 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}