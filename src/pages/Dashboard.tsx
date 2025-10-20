import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import { AppwriteService } from '../appwrite/appwrite';
import type { FoodDonation } from '../types/Users';
import { MdFastfood, MdVolunteerActivism, MdAnalytics, MdTrendingUp, MdNotifications, MdLocationOn } from 'react-icons/md';
import { FaHeart, FaClock, FaUsers } from 'react-icons/fa';

const Dashboard = () => {
  const { profile, user } = useAuth();
  const [stats, setStats] = useState({ totalDonations: 0, activeDonations: 0, claimedDonations: 0, peopleHelped: 0 });
  const [recentDonations, setRecentDonations] = useState<FoodDonation[]>([]);
  const [loading, setLoading] = useState(true);
  const appwriteService = new AppwriteService();

  useEffect(() => {
    loadDashboardData();
  }, []);

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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  if (loading) {
    return (
      <div className="page-gradient flex items-center justify-center min-h-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="page-gradient min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-primary mb-2">
                {getGreeting()}, {profile?.name}! 👋
              </h1>
              <p className="text-secondary text-lg flex items-center">
                <MdLocationOn className="mr-2" />
                {profile?.location}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-secondary">Role</div>
              <div className="text-lg font-semibold text-primary capitalize">
                {profile?.role === 'donor' ? '🍽️ Food Donor' : '🏢 NGO Partner'}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {profile?.role === 'donor' ? (
            <>
              <div className="card p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-emerald-200 dark:border-emerald-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">Total Donations</p>
                    <p className="text-3xl font-bold text-emerald-800 dark:text-emerald-300">{stats.totalDonations}</p>
                  </div>
                  <MdFastfood className="text-4xl text-emerald-600" />
                </div>
              </div>
              
              <div className="card p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Active Posts</p>
                    <p className="text-3xl font-bold text-blue-800 dark:text-blue-300">{stats.activeDonations}</p>
                  </div>
                  <MdTrendingUp className="text-4xl text-blue-600" />
                </div>
              </div>
              
              <div className="card p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">Claimed</p>
                    <p className="text-3xl font-bold text-purple-800 dark:text-purple-300">{stats.claimedDonations}</p>
                  </div>
                  <MdVolunteerActivism className="text-4xl text-purple-600" />
                </div>
              </div>
              
              <div className="card p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-600 dark:text-orange-400 text-sm font-medium">People Helped</p>
                    <p className="text-3xl font-bold text-orange-800 dark:text-orange-300">{stats.peopleHelped}+</p>
                  </div>
                  <FaHeart className="text-4xl text-orange-600" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="card p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 dark:text-green-400 text-sm font-medium">Available Donations</p>
                    <p className="text-3xl font-bold text-green-800 dark:text-green-300">{stats.activeDonations}</p>
                  </div>
                  <MdNotifications className="text-4xl text-green-600" />
                </div>
              </div>
              
              <div className="card p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">This Week</p>
                    <p className="text-3xl font-bold text-blue-800 dark:text-blue-300">12</p>
                  </div>
                  <FaClock className="text-4xl text-blue-600" />
                </div>
              </div>
              
              <div className="card p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">People Fed</p>
                    <p className="text-3xl font-bold text-purple-800 dark:text-purple-300">150+</p>
                  </div>
                  <FaUsers className="text-4xl text-purple-600" />
                </div>
              </div>
              
              <div className="card p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-600 dark:text-orange-400 text-sm font-medium">Impact Score</p>
                    <p className="text-3xl font-bold text-orange-800 dark:text-orange-300">95%</p>
                  </div>
                  <MdAnalytics className="text-4xl text-orange-600" />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
              <MdFastfood className="mr-3" />
              Quick Actions
            </h2>
            <div className="space-y-4">
              {profile?.role === 'donor' ? (
                <>
                  <Link to="/donate" className="block">
                    <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-4 rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg">
                      <div className="flex items-center">
                        <MdFastfood className="text-2xl mr-3" />
                        <div>
                          <div className="font-semibold">Share Food</div>
                          <div className="text-sm opacity-90">Post surplus food</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <Link to="/my-donations" className="block">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg">
                      <div className="flex items-center">
                        <MdAnalytics className="text-2xl mr-3" />
                        <div>
                          <div className="font-semibold">My Donations</div>
                          <div className="text-sm opacity-90">Track your posts</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/browse" className="block">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg">
                      <div className="flex items-center">
                        <MdNotifications className="text-2xl mr-3" />
                        <div>
                          <div className="font-semibold">Browse Donations</div>
                          <div className="text-sm opacity-90">Find available food</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <Link to="/ngo-profile" className="block">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg">
                      <div className="flex items-center">
                        <MdVolunteerActivism className="text-2xl mr-3" />
                        <div>
                          <div className="font-semibold">NGO Profile</div>
                          <div className="text-sm opacity-90">Manage verification</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2 card p-6">
            <h2 className="text-2xl font-bold text-primary mb-6">
              {profile?.role === 'donor' ? '📋 Recent Donations' : '🔍 Available Near You'}
            </h2>
            {recentDonations.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">
                  {profile?.role === 'donor' ? '🍽️' : '🔍'}
                </div>
                <p className="text-secondary text-lg">
                  {profile?.role === 'donor' 
                    ? 'No donations yet. Start sharing food to make a difference!' 
                    : 'No donations available right now. Check back soon!'}
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {recentDonations.map((donation: any) => (
                  <div key={donation.$id} className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-primary">{donation.food_type.replace('_', ' ')}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        donation.status === 'available' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                        donation.status === 'claimed' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                        'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                      }`}>
                        {donation.status}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-secondary">
                      <p><span className="font-medium">Quantity:</span> {donation.quantity}</p>
                      <p><span className="font-medium">Location:</span> {donation.pickup_address}</p>
                      <p><span className="font-medium">Time:</span> {donation.pickup_time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;