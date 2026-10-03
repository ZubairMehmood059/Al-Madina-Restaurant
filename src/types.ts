export type CategoryType = 'All' | 'Featured' | 'Biryani' | 'Karahi' | 'BBQ' | 'Fast Food' | 'Drinks';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: CategoryType;
  tag?: string; // e.g. "Chef's Pick", "Popular", "Karahi", "Best Seller", "Fast Food", "Drinks"
  placeholderId: string;
  dimensions: string; // e.g. "800x600"
  available: boolean;
  imageSrc?: string; // Optional user-uploaded or finalized image
}

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  note?: string;
  status: 'pending' | 'confirmed' | 'seated' | 'cancelled';
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  dateAgo: string;
  source: string;
  isDark?: boolean;
}

export interface MediaSlot {
  id: string;
  section: 'Hero' | 'Menu' | 'Story' | 'Gallery' | 'Location';
  label: string;
  dimensions: string;
  aspectRatio: string;
  recommendedSubject: string;
  customImage?: string;
}

export interface OrderItem {
  item: MenuItem;
  quantity: number;
}

export type OrderStatus =
  | 'confirmed'
  | 'preparing'
  | 'packaging'
  | 'out_for_delivery'
  | 'ready_for_pickup'
  | 'delivered';

export interface TrackedOrder {
  id: string; // e.g. "ORD-4821"
  customerName: string;
  phone?: string;
  orderType: 'delivery' | 'takeaway';
  address?: string;
  status: OrderStatus;
  estimatedMinutesRemaining: number;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  createdAt: string;
  riderName?: string;
  riderPhone?: string;
  notes?: string;
}
