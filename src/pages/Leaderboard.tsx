import React, { useState, useEffect } from 'react';
import { FaTrophy, FaMedal, FaAward, FaHeart, FaUsers } from 'react-icons/fa';
import { MdTrendingUp, MdLocationOn } from 'react-icons/md';
import { AppwriteService } from '../appwrite/appwrite';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState({
    topDonors: [],
    topCities: []
  });
  const [loading, setLoading] = useState(true);
  const appwriteService = new AppwriteService();

  useEffect(() => {
    loadLeaderboardData();
  }, []);

  const loadLeaderboardData = async () => {
    try {
      const data = await appwriteService.getLeaderboardData();
      setLeaderboardData(data);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return <FaTrophy className="text-yellow-500 text-2xl" />;
    if (index === 1) return <FaMedal className="text-gray-400 text-2xl" />;
    if (index === 2) return <FaAward className="text-amber-600 text-2xl" />;
    return <span className="text-2xl font-bold text-gray-500">#{index + 1}</span>;
  };

  const getColorClass = (index: number) => {
    if (index === 0) return 'bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border border-yellow-200 dark:border-yellow-700';
    if (index === 1) return 'bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 border border-gray-200 dark:border-gray-600';
    if (index === 2) return 'bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border border-amber-200 dark:border-amber-700';
    return 'bg-gray-50 dark:bg-gray-800/30';
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-2">FoodLink Leaderboard</h1>
          <p className="text-secondary text-lg">Celebrating our food heroes making a difference</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Top Donors */}
          <div className="card p-8">
            <div className="flex items-center mb-6">
              <FaHeart className="text-3xl text-emerald-600 mr-3" />
              <h2 className="text-2xl font-bold text-primary">Top Food Donors</h2>
            </div>
            {leaderboardData.topDonors.length === 0 ? (
              <div className="text-center py-8 text-secondary">
                <div className="text-4xl mb-2">🍽️</div>
                <p>No donations yet. Be the first to share food!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {leaderboardData.topDonors.map((donor: any, index) => (
                  <div key={index} className={`flex items-center p-4 rounded-lg ${getColorClass(index)}`}>
                    <div className="flex items-center justify-center w-12 h-12 mr-4">
                      {getRankIcon(index)}
                    </div>
                    <div className="text-3xl mr-4"></div>
                    <div className="flex-1">
                      <h3 className="font-bold text-primary">{donor.name}</h3>
                      <div className="flex items-center text-sm text-secondary">
                        <MdLocationOn className="mr-1" />
                        {donor.location}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-emerald-600">{donor.donations}</div>
                      <div className="text-xs text-secondary">donations</div>
                      <div className="text-sm text-secondary">{donor.meals} meals</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Top Cities */}
          <div className="card p-8">
            <div className="flex items-center mb-6">
              <MdTrendingUp className="text-3xl text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold text-primary">Top Cities by Impact</h2>
            </div>
            {leaderboardData.topCities.length === 0 ? (
              <div className="text-center py-8 text-secondary">
                <div className="text-4xl mb-2">🏙️</div>
                <p>No city data yet. Start donating to put your city on the map!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {leaderboardData.topCities.map((city: any, index) => (
                  <div key={index} className={`flex items-center p-4 rounded-lg ${getColorClass(index)}`}>
                    <div className="flex items-center justify-center w-12 h-12 mr-4">
                      {getRankIcon(index)}
                    </div>
                    <div className="text-3xl mr-4"></div>
                    <div className="flex-1">
                      <h3 className="font-bold text-primary">{city.name}</h3>
                      <div className="text-sm text-secondary">{city.meals} meals shared</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-purple-600">{city.donations}</div>
                      <div className="text-xs text-secondary">donations</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-primary mb-8">Achievement Milestones</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="card p-6 text-center">
              <h3 className="font-bold text-primary">First Donation</h3>
              <p className="text-sm text-secondary">Share your first meal</p>
            </div>
            <div className="card p-6 text-center">
              <h3 className="font-bold text-primary">Streak Master</h3>
              <p className="text-sm text-secondary">10 donations in a month</p>
            </div>
            <div className="card p-6 text-center">
              <h3 className="font-bold text-primary">Food Hero</h3>
              <p className="text-sm text-secondary">Feed 100+ people</p>
            </div>
            <div className="card p-6 text-center">
              <h3 className="font-bold text-primary">Legend</h3>
              <p className="text-sm text-secondary">1000+ meals shared</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;