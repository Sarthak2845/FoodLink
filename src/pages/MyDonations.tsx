import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { AppwriteService } from '../appwrite/appwrite';
import type { FoodDonation } from '../types/Users';

const MyDonations = () => {
  const { user } = useAuth();
  const [donations, setDonations] = useState<FoodDonation[]>([]);
  const [requests, setRequests] = useState<{ [key: string]: any[] }>({});
  const [loading, setLoading] = useState(true);
  const appwriteService = new AppwriteService();

  useEffect(() => {
    loadMyDonations();
  }, []);

  const loadMyDonations = async () => {
    try {
      const data = await appwriteService.getUserDonations(user.$id);
      const donationList = data as FoodDonation[];
      setDonations(donationList);

      // Load requests for each donation
      const requestsData: { [key: string]: any[] } = {};
      for (const donation of donationList) {
        if (donation.status === 'available') {
          const donationRequests = await appwriteService.getDonationRequests((donation as any).$id);
          requestsData[(donation as any).$id] = donationRequests;
        }
      }
      setRequests(requestsData);
    } catch (error) {
      console.error('Error loading donations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (requestId: string, donationId: string) => {
    try {
      await appwriteService.approveRequest(requestId, donationId);
      alert('🎉 Request approved! NGO can now collect the food.');
      loadMyDonations();
    } catch (error) {
      console.error('Error approving request:', error);
      alert('Error approving request: ' + (error as any).message);
    }
  };

  if (loading) return <div className="page-gradient flex items-center justify-center"><div className="loading-spinner"></div></div>;

  return (
    <div className="page-gradient min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-8">My Donations</h1>
        
        {donations.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-secondary">You haven't made any donations yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {donations.map((donation: any) => (
              <div key={donation.$id} className="card p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-primary">{donation.food_type.replace('_', ' ')}</h3>
                    <div className="flex items-center space-x-4 text-sm text-secondary mt-2">
                      <span>Quantity: {donation.quantity}</span>
                      <span>Expires: {new Date(donation.expiry_date).toLocaleDateString()}</span>
                      <span>Posted: {donation.$createdAt ? new Date(donation.$createdAt).toLocaleDateString() : 'N/A'}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    donation.status === 'available' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                    donation.status === 'claimed' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                    'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                  }`}>
                    {donation.status}
                  </span>
                </div>

                {/* Show requests for available donations */}
                {donation.status === 'available' && requests[donation.$id] && requests[donation.$id].length > 0 && (
                  <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-3">
                      📋 Requests ({requests[donation.$id].length})
                    </h4>
                    <div className="space-y-3">
                      {requests[donation.$id].map((request: any) => (
                        <div key={request.$id} className="flex justify-between items-center bg-white dark:bg-gray-800 p-3 rounded">
                          <div>
                            <p className="font-medium text-primary">NGO Request</p>
                            <p className="text-sm text-secondary">Requested: {new Date(request.claimed_at).toLocaleString()}</p>
                          </div>
                          {request.status === 'claimed' && (
                            <button
                              onClick={() => handleApprove(request.$id, donation.$id)}
                              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                            >
                              ✅ Approve
                            </button>
                          )}
                          {request.status === 'confirmed' && (
                            <span className="text-emerald-600 font-medium">✅ Confirmed</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {donation.status === 'available' && (!requests[donation.$id] || requests[donation.$id].length === 0) && (
                  <div className="mt-4 text-center text-secondary">
                    💭 No requests yet. Share your donation link to get more visibility!
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyDonations;