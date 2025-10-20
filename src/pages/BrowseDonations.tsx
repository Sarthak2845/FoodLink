import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { AppwriteService } from '../appwrite/appwrite';
import type { FoodDonation } from '../types/Users';
import { MdLocationOn, MdSchedule, MdScale, MdPhone } from 'react-icons/md';
import { FaClock, FaHeart } from 'react-icons/fa';

const BrowseDonations = () => {
  const { user, profile } = useAuth();
  const [donations, setDonations] = useState<FoodDonation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const appwriteService = new AppwriteService();

  useEffect(() => {
    loadDonations();
  }, []);

  const loadDonations = async () => {
    try {
      const data = await appwriteService.getFoodDonations(50, profile?.location);
      setDonations(data as FoodDonation[]);
    } catch (error) {
      console.error('Error loading donations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async (donationId: string) => {
    try {
      await appwriteService.requestDonation(donationId, user.$id);
      alert('📋 Request sent to donor! Wait for approval.');
      loadDonations();
    } catch (error) {
      console.error('Error requesting donation:', error);
      alert('Error sending request: ' + (error as any).message);
    }
  };

  const getFoodIcon = (foodType: string) => {
    const icons: { [key: string]: string } = {
      'cooked_meals': '🍛',
      'packaged_food': '📦',
      'fresh_produce': '🥬',
      'baked_goods': '🍞',
      'beverages': '🥤',
      'other': '🍴'
    };
    return icons[foodType] || '🍴';
  };

  const getTimeRemaining = (expiryDate: string) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diff = expiry.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 0) return 'Expired';
    if (hours < 24) return `${hours}h left`;
    const days = Math.floor(hours / 24);
    return `${days}d left`;
  };

  const filteredDonations = donations.filter(donation => {
    if (filter === 'all') return true;
    return donation.food_type === filter;
  });

  if (loading) return (
    <div className="page-gradient flex items-center justify-center min-h-screen">
      <div className="loading-spinner"></div>
    </div>
  );

  return (
    <div className="page-gradient min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-4xl font-bold text-primary mb-2">Available Food Donations</h1>
          <p className="text-secondary text-lg">Find and claim food donations in your area</p>
          {profile?.location && (
            <div className="mt-2 inline-flex items-center bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full text-sm">
              📍 Showing donations near {profile.location.split(',')[0]}
            </div>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { key: 'all', label: '🍽️ All Food', count: donations.length },
            { key: 'cooked_meals', label: '🍛 Cooked Meals', count: donations.filter(d => d.food_type === 'cooked_meals').length },
            { key: 'packaged_food', label: '📦 Packaged', count: donations.filter(d => d.food_type === 'packaged_food').length },
            { key: 'fresh_produce', label: '🥬 Fresh Produce', count: donations.filter(d => d.food_type === 'fresh_produce').length },
            { key: 'baked_goods', label: '🍞 Baked Goods', count: donations.filter(d => d.food_type === 'baked_goods').length }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === tab.key
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
        
        {filteredDonations.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-2xl font-bold text-primary mb-2">No donations available</h3>
            <p className="text-secondary">Check back soon for new food donations in your area.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonations.map((donation: any) => (
              <div key={donation.$id} className="card p-6 hover:shadow-xl transition-all transform hover:scale-105">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <span className="text-3xl mr-3">{getFoodIcon(donation.food_type)}</span>
                    <div>
                      <h3 className="text-xl font-bold text-primary">
                        {donation.food_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </h3>
                      <div className="flex items-center text-sm text-secondary">
                        <FaClock className="mr-1" />
                        {getTimeRemaining(donation.expiry_date)}
                      </div>
                    </div>
                  </div>
                  <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full text-sm font-medium">
                    {donation.status}
                  </span>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-secondary">
                    <MdScale className="mr-2 text-lg" />
                    <span className="font-medium">Quantity:</span>
                    <span className="ml-2">{donation.quantity}</span>
                  </div>
                  
                  <div className="flex items-center text-secondary">
                    <MdSchedule className="mr-2 text-lg" />
                    <span className="font-medium">Expires:</span>
                    <span className="ml-2">{new Date(donation.expiry_date).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center text-secondary">
                    <FaClock className="mr-2 text-lg" />
                    <span className="font-medium">Pickup:</span>
                    <span className="ml-2">{donation.pickup_time}</span>
                  </div>
                  
                  <div className="flex items-start text-secondary">
                    <MdLocationOn className="mr-2 text-lg mt-0.5" />
                    <div>
                      <span className="font-medium">Location:</span>
                      <div className="text-sm">{donation.pickup_address}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-secondary">
                    <MdPhone className="mr-2 text-lg" />
                    <span className="font-medium">Contact:</span>
                    <span className="ml-2">{donation.contact_info}</span>
                  </div>
                  
                  {donation.description && (
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                      <span className="font-medium text-secondary">Notes:</span>
                      <p className="text-sm text-secondary mt-1">{donation.description}</p>
                    </div>
                  )}
                </div>

                {profile?.role === 'ngo' && donation.status === 'available' && (
                  <button 
                    onClick={() => handleRequest(donation.$id)}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
                  >
                    <FaHeart className="mr-2" />
                    Request This Donation
                  </button>
                )}
                
                {donation.status === 'claimed' && (
                  <div className="w-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 py-3 px-4 rounded-lg font-semibold text-center">
                    ⏳ Already Claimed
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

export default BrowseDonations;