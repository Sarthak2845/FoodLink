import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { AppwriteService } from '../appwrite/appwrite';
import type { FoodDonation } from '../types/Users';
import { MdFastfood, MdVolunteerActivism, MdAnalytics, MdTrendingUp, MdNotifications, MdScale, MdSchedule, MdLocationOn, MdPhone, MdDescription } from 'react-icons/md';
import { FaHeart, FaClock, FaUsers, FaArrowUp } from 'react-icons/fa';
import DashboardLayout from '../components/DashboardLayout';
import GooglePlacesInput from '../components/GooglePlacesInput';

const Dashboard = () => {
  const { profile, user } = useAuth();
  const [stats, setStats] = useState({ totalDonations: 0, activeDonations: 0, claimedDonations: 0, peopleHelped: 0 });
  const [recentDonations, setRecentDonations] = useState<FoodDonation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('dashboard');
  const [donations, setDonations] = useState<FoodDonation[]>([]);
  const [requests, setRequests] = useState<{ [key: string]: any[] }>({});
  const [formData, setFormData] = useState({
    food_type: '',
    quantity: '',
    expiry_date: '',
    pickup_address: '',
    pickup_time: '',
    contact_info: '',
    description: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const appwriteService = new AppwriteService();

  useEffect(() => {
    loadDashboardData();
    if (activeView === 'my-donations') {
      loadMyDonations();
    }
  }, [activeView]);

  const loadDashboardData = async () => {
    try {
      if (profile?.role === 'donor') {
        const donations = await appwriteService.getUserDonations(user.$id);
        const donationList = donations as FoodDonation[];
        setStats({
          totalDonations: donationList.length,
          activeDonations: donationList.filter(d => d.status === 'available').length,
          claimedDonations: donationList.filter(d => d.status === 'claimed').length,
          peopleHelped: donationList.filter(d => d.status === 'completed').length * 5
        });
        setRecentDonations(donationList.slice(0, 4));
      } else if (profile?.role === 'ngo') {
        const donations = await appwriteService.getFoodDonations(10, profile?.location);
        setRecentDonations(donations as FoodDonation[]);
        setStats({
          totalDonations: 0,
          activeDonations: (donations as FoodDonation[]).length,
          claimedDonations: 0,
          peopleHelped: 0
        });
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMyDonations = async () => {
    try {
      const data = await appwriteService.getUserDonations(user.$id);
      const donationList = data as FoodDonation[];
      setDonations(donationList);

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
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = '';
      if (imageFile) {
        imageUrl = await appwriteService.uploadImage(imageFile);
      }
      
      await appwriteService.createFoodDonation({
        ...formData,
        donor_id: user.$id,
        status: 'available',
        image_url: imageUrl
      });
      alert('Food donation posted successfully!');
      setFormData({
        food_type: '',
        quantity: '',
        expiry_date: '',
        pickup_address: '',
        pickup_time: '',
        contact_info: '',
        description: ''
      });
      setImageFile(null);
      setImagePreview('');
      setActiveView('dashboard');
      loadDashboardData();
    } catch (error) {
      console.error('Error creating donation:', error);
      alert('Error posting donation: ' + (error as any).message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocationChange = (location: string) => {
    setFormData({ ...formData, pickup_address: location });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleApprove = async (requestId: string, donationId: string) => {
    try {
      await appwriteService.approveRequest(requestId, donationId);
      alert('Request approved! NGO can now collect the food.');
      loadMyDonations();
    } catch (error) {
      console.error('Error approving request:', error);
      alert('Error approving request: ' + (error as any).message);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  if (loading && activeView === 'dashboard') {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="loading-spinner"></div>
        </div>
      </DashboardLayout>
    );
  }

  const renderShareFood = () => (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Share Your Food</h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Help reduce waste and feed those in need</p>
          </div>
          <button
            onClick={() => setActiveView('dashboard')}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            ← Back
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <MdFastfood className="inline mr-2" />Food Type
              </label>
              <select name="food_type" value={formData.food_type} onChange={handleChange} required className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option value="">Select food type</option>
                <option value="cooked_meals">Cooked Meals</option>
                <option value="packaged_food">Packaged Food</option>
                <option value="fresh_produce">Fresh Produce</option>
                <option value="baked_goods">Baked Goods</option>
                <option value="beverages">Beverages</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <MdScale className="inline mr-2" />Quantity
              </label>
              <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} required className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="e.g., 10 servings, 5kg" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <MdSchedule className="inline mr-2" />Best Before / Expiry
              </label>
              <input type="datetime-local" name="expiry_date" value={formData.expiry_date} onChange={handleChange} required className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <MdSchedule className="inline mr-2" />Pickup Time
              </label>
              <input type="text" name="pickup_time" value={formData.pickup_time} onChange={handleChange} required className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="e.g., 2-4 PM today" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <MdLocationOn className="inline mr-2" />Pickup Address
            </label>
            <GooglePlacesInput value={formData.pickup_address} onChange={handleLocationChange} placeholder="Start typing your address..." className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <MdPhone className="inline mr-2" />Contact Information
            </label>
            <input type="text" name="contact_info" value={formData.contact_info} onChange={handleChange} required className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="Phone number" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <MdDescription className="inline mr-2" />Additional Details
            </label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="Any special instructions..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Food Image (Optional)
            </label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            {imagePreview && (
              <div className="mt-3">
                <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
              </div>
            )}
          </div>
          <button type="submit" disabled={loading} className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
            {loading ? 'Posting...' : 'Post Food Donation'}
          </button>
        </form>
      </div>
    </div>
  );

  const renderMyDonations = () => (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Donations</h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Manage your food donations and requests</p>
          </div>
          <button
            onClick={() => setActiveView('dashboard')}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            ← Back
          </button>
        </div>
        
        {donations.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍽️</div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">You haven't made any donations yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {donations.map((donation: any) => (
              <div key={donation.$id} className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                <div className="flex gap-4">
                  {donation.photos && (
                    <img src={donation.photos} alt="Food" className="w-20 h-20 object-cover rounded-lg" />
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{donation.food_type.replace('_', ' ')}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300 mt-2">
                          <span>Quantity: {donation.quantity}</span>
                          <span>Expires: {new Date(donation.expiry_date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        donation.status === 'available' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                        donation.status === 'claimed' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                        'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                      }`}>
                        {donation.status}
                      </span>
                    </div>
                  </div>
                </div>
                {donation.status === 'available' && requests[donation.$id] && requests[donation.$id].length > 0 && (
                  <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-3">Requests ({requests[donation.$id].length})</h4>
                    <div className="space-y-3">
                      {requests[donation.$id].map((request: any) => (
                        <div key={request.$id} className="flex justify-between items-center bg-white dark:bg-gray-800 p-3 rounded">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">NGO Request</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Requested: {new Date(request.claimed_at).toLocaleString()}</p>
                          </div>
                          {request.status === 'claimed' && (
                            <button onClick={() => handleApprove(request.$id, donation.$id)} className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                              Approve
                            </button>
                          )}
                          {request.status === 'confirmed' && (
                            <span className="text-emerald-600 font-medium">Confirmed</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <DashboardLayout onNavigate={setActiveView} activeView={activeView}>
      {activeView === 'share-food' && renderShareFood()}
      {activeView === 'my-donations' && renderMyDonations()}
      {activeView === 'dashboard' && (
        <div className="space-y-8">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {getGreeting()}, {profile?.name}!
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  {profile?.role === 'donor' ? 'Ready to share some food?' : 'Find food donations in your area'}
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 dark:text-gray-400">Today</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            </div>
            {profile?.role === 'donor' && (
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setActiveView('share-food')}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium flex items-center gap-2"
                >
                  <MdFastfood /> Share Food
                </button>
                <button
                  onClick={() => setActiveView('my-donations')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                >
                  My Donations
                </button>
              </div>
            )}
          </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {profile?.role === 'donor' ? (
            <>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                    <MdFastfood className="text-2xl text-emerald-600" />
                  </div>
                  <div className="flex items-center text-emerald-600 text-sm font-medium">
                    <FaArrowUp className="w-3 h-3 mr-1" />
                    +12%
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalDonations}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Total Donations</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                    <MdTrendingUp className="text-2xl text-blue-600" />
                  </div>
                  <div className="flex items-center text-blue-600 text-sm font-medium">
                    <FaArrowUp className="w-3 h-3 mr-1" />
                    +8%
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeDonations}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Active Posts</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                    <MdVolunteerActivism className="text-2xl text-purple-600" />
                  </div>
                  <div className="flex items-center text-purple-600 text-sm font-medium">
                    <FaArrowUp className="w-3 h-3 mr-1" />
                    +15%
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.claimedDonations}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Claimed</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                    <FaHeart className="text-2xl text-orange-600" />
                  </div>
                  <div className="flex items-center text-orange-600 text-sm font-medium">
                    <FaArrowUp className="w-3 h-3 mr-1" />
                    +25%
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.peopleHelped}+</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">People Helped</p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                    <MdNotifications className="text-2xl text-green-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeDonations}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Available Donations</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                    <FaClock className="text-2xl text-blue-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">12</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">This Week</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                    <FaUsers className="text-2xl text-purple-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">150+</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">People Fed</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                    <MdAnalytics className="text-2xl text-orange-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">95%</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Impact Score</p>
              </div>
            </>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {profile?.role === 'donor' ? 'Recent Donations' : 'Available Near You'}
            </h2>
            <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
              View All
            </button>
          </div>
          
          {recentDonations.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">
                '🍽️'
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {profile?.role === 'donor' 
                  ? 'No donations yet. Start sharing food to make a difference!' 
                  : 'No donations available right now. Check back soon!'}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {recentDonations.map((donation: any) => (
                <div key={donation.$id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                  <div className="flex gap-3">
                    {donation.photos && (
                      <img src={donation.photos} alt="Food" className="w-16 h-16 object-cover rounded-lg" />
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{donation.food_type.replace('_', ' ')}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          donation.status === 'available' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                          donation.status === 'claimed' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                          'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        }`}>
                          {donation.status}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        <p><span className="font-medium">Quantity:</span> {donation.quantity}</p>
                        <p><span className="font-medium">Location:</span> {donation.pickup_address}</p>
                        <p><span className="font-medium">Time:</span> {donation.pickup_time}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;