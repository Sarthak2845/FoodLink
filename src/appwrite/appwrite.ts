import config from "../config/config";
import { Client, Account, Databases, Storage, ID, Query } from "appwrite";
import type { UserProfile, FoodDonation, DonationClaim } from "../types/Users";


const client = new Client();
client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

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

    async uploadImage(file: File): Promise<string> {
        try {
            const result = await storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            );
            return storage.getFileView(config.appwriteBucketId, result.$id).toString();
        } catch (error) {
            console.error("Error uploading image:", error);
            throw error;
        }
    }

    async createFoodDonation(donation: Omit<FoodDonation, 'id'> & { image_url?: string }) {
        try {
            const docData: any = {
                users: donation.donor_id,
                food_type: donation.food_type,
                quantity: donation.quantity,
                expiry_date: donation.expiry_date,
                pickup_address: donation.pickup_address,
                pickup_time: donation.pickup_time,
                contact_info: donation.contact_info,
                status: donation.status,
                description: donation.description || ''
            };
            
            if (donation.image_url) {
                docData.photos = donation.image_url;
            }
            
            const result = await databases.createDocument(
                config.appwriteDatabaseId,
                'food_donations',
                ID.unique(),
                docData
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
        
        // Extract city from Google Maps formatted address
        const words = address.split(',');
        return words[0]?.trim().toLowerCase() || '';
    }

    async getStats() {
        try {
            const queryLimit = parseInt(import.meta.env.VITE_DB_QUERY_LIMIT || '1000');
            
            const donations = await databases.listDocuments(
                config.appwriteDatabaseId,
                'food_donations',
                [Query.limit(queryLimit)]
            );
            
            const users = await databases.listDocuments(
                config.appwriteDatabaseId,
                'users',
                [Query.limit(queryLimit)]
            );
            
            const claims = await databases.listDocuments(
                config.appwriteDatabaseId,
                'donation_claims',
                [Query.limit(queryLimit)]
            );
            
            const totalDonations = donations.documents.length;
            const activeDonors = users.documents.filter((u: any) => u.role === 'donor').length;
            const partnerNGOs = users.documents.filter((u: any) => u.role === 'ngo').length;
            const completedClaims = claims.documents.filter((c: any) => c.status === 'completed').length;
            const estimatedMeals = totalDonations * parseInt(import.meta.env.VITE_MEALS_PER_DONATION || '5')
            
            return {
                totalDonations,
                activeDonors,
                partnerNGOs,
                estimatedMeals,
                peopleFed: completedClaims * parseInt(import.meta.env.VITE_PEOPLE_PER_CLAIM || '3')
            };
        } catch (error) {
            console.error('Error getting stats:', error);
            return {
                totalDonations: 0,
                activeDonors: 0,
                partnerNGOs: 0,
                estimatedMeals: 0,
                peopleFed: 0
            };
        }
    }

    async getLeaderboardData() {
        try {
            const queryLimit = parseInt(import.meta.env.VITE_DB_QUERY_LIMIT || '1000');
            
            const donations = await databases.listDocuments(
                config.appwriteDatabaseId,
                'food_donations',
                [Query.limit(queryLimit)]
            );
            
            const users = await databases.listDocuments(
                config.appwriteDatabaseId,
                'users',
                [Query.limit(queryLimit)]
            );
            
            // Calculate donor stats
            const donorStats: { [key: string]: any } = {};
            donations.documents.forEach((donation: any) => {
                const donorId = donation.users?.$id || donation.donor_id;
                if (!donorStats[donorId]) {
                    donorStats[donorId] = { donations: 0, meals: 0 };
                }
                donorStats[donorId].donations++;
                donorStats[donorId].meals += parseInt(import.meta.env.VITE_MEALS_PER_DONATION || '5')
            });
            
            // Get top donors with user info
            const topDonors = Object.entries(donorStats)
                .map(([userId, stats]) => {
                    const user = users.documents.find((u: any) => u.$id === userId);
                    return {
                        ...stats,
                        name: user?.name || 'Anonymous',
                        location: user?.location?.split(',')[0] || 'Unknown',
                        avatar: '👨🍳'
                    };
                })
                .sort((a, b) => b.donations - a.donations)
                .slice(0, parseInt(import.meta.env.VITE_LEADERBOARD_LIMIT || '5'));
            
            // Calculate city stats
            const cityStats: { [key: string]: any } = {};
            donations.documents.forEach((donation: any) => {
                const city = this.extractCity(donation.pickup_address);
                if (city) {
                    if (!cityStats[city]) {
                        cityStats[city] = { donations: 0, meals: 0 };
                    }
                    cityStats[city].donations++;
                    cityStats[city].meals += parseInt(import.meta.env.VITE_MEALS_PER_DONATION || '5');
                }
            });
            
            const topCities = Object.entries(cityStats)
                .map(([city, stats]) => ({
                    name: city.charAt(0).toUpperCase() + city.slice(1),
                    ...stats
                }))
                .sort((a, b) => b.donations - a.donations)
                .slice(0, parseInt(import.meta.env.VITE_LEADERBOARD_LIMIT || '5'));
            
            return { topDonors, topCities };
        } catch (error) {
            console.error('Error getting leaderboard data:', error);
            return { topDonors: [], topCities: [] };
        }
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
