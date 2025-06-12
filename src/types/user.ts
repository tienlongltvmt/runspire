export interface AppUser {
  uid: string;
  provider: 'google' | 'facebook' | 'tiktok';
  email: string;
  fullName: string;
  avatar: string;
  createdAt: number;
  lastLoginAt: number;
  gender?: 'male' | 'female' | 'other';
  birthYear?: number;
  weightKg?: number;
  heightCm?: number;
  runTargetKmPerWeek?: number;
  location?: {
    lat: number;
    lng: number;
    city?: string;
  };
  stats?: {
    totalSteps: number;
    totalCalories: number;
    totalRuns: number;
    totalDistanceKm: number;
  };
  friends?: string[];
  blockedUsers?: string[];
}
