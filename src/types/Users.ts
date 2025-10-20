export type Role = 'donor' | 'ngo';
export type DonationStatus = 'available' | 'claimed' | 'collected' | 'completed';
export type ClaimStatus = 'requested' | 'approved' | 'collected' | 'completed';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  mobile_no: string;
  location: string;
  role: Role;
}

export interface NGOData {
  id: string;
  user_id: string;
  ngo_name: string;
  ngo_address: string;
  is_verified: boolean;
  ngo_docs?: string;
}

export interface FoodDonation {
  id: string;
  donor_id: string;
  food_type: string;
  quantity: string;
  expiry_date: string;
  pickup_address: string;
  pickup_time: string;
  contact_info: string;
  status: DonationStatus;
  description?: string;
  photos?: string[];
  $createdAt?: string;
}

export interface DonationClaim {
  id: string;
  donation_id: string;
  ngo_id: string;
  claimed_at: string;
  pickup_scheduled?: string;
  status: ClaimStatus;
}
