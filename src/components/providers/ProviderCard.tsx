import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ProviderCardProps {
  id: string;
  type: 'guide' | 'hotel' | 'transport' | 'artisan';
  name: string;
  subtitle: string;
  description: string;
  rating: number;
  reviewCount: number;
  price?: string;
  tags: string[];
  imageUrl?: string;
  verified?: boolean;
}

export function ProviderCard({
  id,
  type,
  name,
  subtitle,
  description,
  rating,
  reviewCount,
  price,
  tags,
  verified = true,
}: ProviderCardProps) {
  const linkPath = `/${type}s/${id}`;

  return (
    <Card className="card-hover border-border/50 overflow-hidden">
      <CardContent className="p-0">
        {/* Image Placeholder */}
        <div className="h-48 bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-3xl font-display font-bold text-primary">
              {name.charAt(0)}
            </span>
          </div>
        </div>

        <div className="p-5">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {name}
                </h3>
                {verified && (
                  <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span className="font-medium text-foreground">{rating.toFixed(1)}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({reviewCount} review{reviewCount !== 1 ? 's' : ''})
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            {price && (
              <div>
                <span className="font-semibold text-foreground">{price}</span>
              </div>
            )}
            <Button size="sm" asChild className="ml-auto">
              <Link to={linkPath}>View Details</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}