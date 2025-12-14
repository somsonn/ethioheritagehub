export type AppRole = 'tourist' | 'guide' | 'hotel' | 'transport' | 'artisan' | 'admin';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type ProviderStatus = 'pending' | 'verified' | 'rejected';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
}

export interface Guide {
  id: string;
  user_id: string;
  languages: string[];
  specialties: string[];
  experience_years: number;
  hourly_rate: number | null;
  daily_rate: number | null;
  location: string;
  status: ProviderStatus;
  rating: number;
  total_reviews: number;
  created_at: string;
  updated_at: string;
  profile?: Profile;
}

export interface Hotel {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  address: string | null;
  location: string;
  amenities: string[];
  price_per_night: number | null;
  images: string[];
  status: ProviderStatus;
  rating: number;
  total_reviews: number;
  created_at: string;
  updated_at: string;
  profile?: Profile;
}

export interface Transport {
  id: string;
  user_id: string;
  company_name: string | null;
  vehicle_types: string[];
  capacity: number | null;
  price_per_day: number | null;
  location: string;
  status: ProviderStatus;
  rating: number;
  total_reviews: number;
  created_at: string;
  updated_at: string;
  profile?: Profile;
}

export interface Artisan {
  id: string;
  user_id: string;
  craft_type: string;
  description: string | null;
  products: string[];
  location: string;
  status: ProviderStatus;
  rating: number;
  total_reviews: number;
  created_at: string;
  updated_at: string;
  profile?: Profile;
}

export interface Booking {
  id: string;
  tourist_id: string;
  provider_id: string;
  provider_type: AppRole;
  start_date: string;
  end_date: string | null;
  guests: number;
  total_price: number | null;
  status: BookingStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  tourist_id: string;
  provider_id: string;
  provider_type: AppRole;
  booking_id: string | null;
  rating: number;
  comment: string | null;
  created_at: string;
  profile?: Profile;
}