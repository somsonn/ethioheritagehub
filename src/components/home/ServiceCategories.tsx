import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Hotel, Car, ShoppingBag } from 'lucide-react';

const categories = [
  {
    title: 'Tour Guides',
    description: 'Expert local guides fluent in multiple languages with deep knowledge of Ethiopian history and culture.',
    icon: Users,
    link: '/guides',
    color: 'bg-ethiopia-green',
  },
  {
    title: 'Hotels',
    description: 'Verified accommodations from luxury lodges to authentic guesthouses near heritage sites.',
    icon: Hotel,
    link: '/hotels',
    color: 'bg-ethiopia-yellow',
  },
  {
    title: 'Transport',
    description: 'Reliable vehicles and experienced drivers for safe travel across Ethiopia\'s landscapes.',
    icon: Car,
    link: '/transports',
    color: 'bg-ethiopia-red',
  },
  {
    title: 'Artisans',
    description: 'Connect with local craftspeople creating traditional Ethiopian art, textiles, and jewelry.',
    icon: ShoppingBag,
    link: '/artisans',
    color: 'bg-ethiopia-earth',
  },
];

export function ServiceCategories() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From expert guides to comfortable stays, we connect you with trusted services 
            for your Ethiopian heritage journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link key={category.title} to={category.link}>
              <Card 
                className="h-full card-hover border-border/50 group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-xl ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <category.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}