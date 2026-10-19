// Core types for the e-commerce platform

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: Category;
  tags: string[];
  inStock: boolean;
  stockQuantity: number;
  specifications: ProductSpecs;
  careInstructions: CareInstructions;
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isBestSeller: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductSpecs {
  height: string;
  potSize: string;
  sunlight?: SunlightLevel;
  water?: WaterLevel;
  difficulty?: DifficultyLevel;
  petFriendly: boolean;
  indoor: boolean;
  outdoor: boolean;
  airPurifying: boolean;
  flowering: boolean;
  fruitBearing: boolean;
  fastGrowing: boolean;
  medicinal: boolean;
}

export interface CareInstructions {
  water: string;
  sunlight: string;
  temperature: string;
  humidity: string;
  fertilizer: string;
  repotting: string;
  pruning: string;
}

export type SunlightLevel = 'full-sun' | 'partial-sun' | 'shade' | 'indirect';
export type WaterLevel = 'low' | 'moderate' | 'high';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'expert';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon?: string;
  parentId?: string;
  children?: Category[];
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  variant?: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  role: 'customer' | 'admin';
  addresses: Address[];
  wishlist: WishlistItem[];
  createdAt: Date;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  shippingAddress: Address;
  billingAddress: Address;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: string;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'processing' 
  | 'shipped' 
  | 'delivered' 
  | 'cancelled' 
  | 'refunded';

export type PaymentStatus = 
  | 'pending' 
  | 'processing' 
  | 'completed' 
  | 'failed' 
  | 'refunded';

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  content: string;
  images?: string[];
  helpful: number;
  verified: boolean;
  createdAt: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  authorAvatar?: string;
  category: string;
  tags: string[];
  publishedAt: Date;
  readingTime: number;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: SubscriptionPlan;
  status: 'active' | 'paused' | 'cancelled';
  startDate: Date;
  nextDeliveryDate?: Date;
  deliveryFrequency: 'monthly' | 'bi-monthly' | 'quarterly';
  preferences: string[];
}

export type SubscriptionPlan = 
  | 'starter' 
  | 'premium' 
  | 'ultimate';

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed' | 'free-shipping';
  value: number;
  minPurchase?: number;
  maxDiscount?: number;
  applicableCategories?: string[];
  applicableProducts?: string[];
  usageLimit?: number;
  usedCount: number;
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
}

export interface FilterOptions {
  categories?: string[];
  priceRange?: [number, number];
  sunlight?: SunlightLevel[];
  water?: WaterLevel[];
  difficulty?: DifficultyLevel[];
  petFriendly?: boolean;
  inStock?: boolean;
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'popular';
}
