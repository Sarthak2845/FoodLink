import config from "../config/config";
import { Client, Account, Databases, ID, Query } from "appwrite";
import type { UserProfile, FoodDonation, DonationClaim } from "../types/Users";

const client = new Client();
client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);

export const account = new Account(client);
export const databases = new Databases(client);

export class AppwriteService {
    async createUserAccount({ name, email, password, mobile_no, location, role }: UserProfile & { password: string }) {
        try {
            const user = await account.create(ID.unique(), email, password, name);
            await account.createEmailPasswordSession(email, password);
            await this.saveUserProfile(user.$id, { name, email, mobile_no, location, role });
            return user;
        } catch (error) {
            console.error("Error creating user account:", error);
            throw error;
        }
    }

    async login(email: string, password: string) {
        try {
            const session = await account.createEmailPasswordSession(email, password);
            return session;
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    }

    async logout() {
        try {
            await account.deleteSession('current');
        } catch (error) {
            console.error("Error logging out:", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const user = await account.get();
            return user;
        } catch (error) {
            console.error("Error getting current user:", error);
            return null;
        }
    }

    async saveUserProfile(userId: string, profile: Omit<UserProfile, 'id'>) {
        try {
            await databases.createDocument(
                config.appwriteDatabaseId, 
                'users', 
                userId,
                profile
            );
        } catch (error) {
            console.error("Error saving user profile:", error);
            throw error;
        }
    }


    async getUserProfile(userId: string) {
        try {
            const profile = await databases.getDocument(
                config.appwriteDatabaseId,
                'users',
                userId
            );
            return profile;
        } catch (error) {
            console.error("Error getting user profile:", error);
            throw error;
        }
    }

    async createFoodDonation(donation: Omit<FoodDonation, 'id'>) {
        try {
            const result = await databases.createDocument(
                config.appwriteDatabaseId,
                'food_donations',
                ID.unique(),
                {
                    users: donation.donor_id,
                    food_type: donation.food_type,
                    quantity: donation.quantity,
                    expiry_date: donation.expiry_date,
                    pickup_address: donation.pickup_address,
                    pickup_time: donation.pickup_time,
                    contact_info: donation.contact_info,
                    status: donation.status,
                    description: donation.description || ''
                }
            );
            return result;
        } catch (error) {
            console.error("Error creating food donation:", error);
            throw error;
        }
    }

    async getFoodDonations(limit = 50, userLocation?: string) {
        try {
            const result = await databases.listDocuments(
                config.appwriteDatabaseId,
                'food_donations',
                [Query.equal('status', 'available'), Query.limit(limit), Query.orderDesc('$createdAt')]
            );
            
            // Filter by location if provided
            if (userLocation) {
                const userCity = this.extractCity(userLocation);
                return result.documents.filter((donation: any) => {
                    const donationCity = this.extractCity(donation.pickup_address);
                    return userCity === donationCity;
                });
            }
            
            return result.documents;
        } catch (error) {
            console.error("Error getting food donations:", error);
            throw error;
        }
    }

    extractCity(address: string): string {
        if (!address) return '';
        
        // Common Indian city patterns
        const cityPatterns = [
            /Mumbai|Bombay/i,
            /Delhi|New Delhi/i,
            /Bangalore|Bengaluru/i,
            /Chennai|Madras/i,
            /Hyderabad/i,
            /Pune/i,
            /Kolkata|Calcutta/i,
            /Ahmedabad/i,
            /Jaipur/i,
            /Surat/i,
            /Lucknow/i,
            /Kanpur/i,
            /Nagpur/i,
            /Indore/i,
            /Thane/i,
            /Bhopal/i,
            /Visakhapatnam/i,
            /Patna/i,
            /Vadodara/i,
            /Ghaziabad/i,
            /Ludhiana/i,
            /Agra/i,
            /Nashik/i,
            /Faridabad/i,
            /Meerut/i,
            /Rajkot/i,
            /Varanasi/i,
            /Srinagar/i,
            /Aurangabad/i,
            /Dhanbad/i,
            /Amritsar/i,
            /Allahabad|Prayagraj/i,
            /Ranchi/i,
            /Howrah/i,
            /Coimbatore/i,
            /Jabalpur/i
        ];
        
        for (const pattern of cityPatterns) {
            const match = address.match(pattern);
            if (match) {
                return match[0].toLowerCase();
            }
        }
        
        // Fallback: extract first word that looks like a city
        const words = address.split(',');
        return words[0]?.trim().toLowerCase() || '';
    }

    async getUserDonations(userId: string) {
        try {
            const result = await databases.listDocuments(
                config.appwriteDatabaseId,
                'food_donations',
                [Query.equal('users', userId), Query.orderDesc('$createdAt')]
            );
            return result.documents;
        } catch (error) {
            console.error("Error getting user donations:", error);
            throw error;
        }
    }

    async requestDonation(donationId: string, ngoId: string) {
        try {
            const request = await databases.createDocument(
                config.appwriteDatabaseId,
                'donation_claims',
                ID.unique(),
                {
                    foodDonations: donationId,
                    users: ngoId,
                    claimed_at: new Date().toISOString(),
                    status: 'claimed'
                }
            );
            
            return request;
        } catch (error) {
            console.error("Error requesting donation:", error);
            throw error;
        }
    }

    async approveRequest(requestId: string, donationId: string) {
        try {
            await databases.updateDocument(
                config.appwriteDatabaseId,
                'donation_claims',
                requestId,
                { status: 'confirmed' }
            );
            
            await databases.updateDocument(
                config.appwriteDatabaseId,
                'food_donations',
                donationId,
                { status: 'claimed' }
            );
        } catch (error) {
            console.error("Error approving request:", error);
            throw error;
        }
    }

    async getDonationRequests(donationId: string) {
        try {
            const result = await databases.listDocuments(
                config.appwriteDatabaseId,
                'donation_claims',
                [Query.equal('foodDonations', donationId), Query.equal('status', 'claimed')]
            );
            return result.documents;
        } catch (error) {
            console.error("Error getting donation requests:", error);
            throw error;
        }
    }

    async getNGOProfile(userId: string) {
        try {
            const result = await databases.listDocuments(
                config.appwriteDatabaseId,
                'ngo_data',
                [Query.equal('user_id', userId)]
            );
            return result.documents[0] || null;
        } catch (error) {
            console.error("Error getting NGO profile:", error);
            return null;
        }
    }

    async createNGOProfile(ngoData: Omit<any, 'id'>) {
        try {
            const result = await databases.createDocument(
                config.appwriteDatabaseId,
                'ngo_data',
                ID.unique(),
                ngoData
            );
            return result;
        } catch (error) {
            console.error("Error creating NGO profile:", error);
            throw error;
        }
    }

    async updateNGOProfile(ngoId: string, ngoData: any) {
        try {
            const result = await databases.updateDocument(
                config.appwriteDatabaseId,
                'ngo_data',
                ngoId,
                ngoData
            );
            return result;
        } catch (error) {
            console.error("Error updating NGO profile:", error);
            throw error;
        }
    }
}
