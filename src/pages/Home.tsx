import { MdPhoneAndroid } from "react-icons/md";
import { FaHandshake, FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { AppwriteService } from "../appwrite/appwrite";

const Home = () => {
  const [stats, setStats] = useState({
    totalDonations: 0,
    activeDonors: 0,
    partnerNGOs: 0,
    estimatedMeals: 0,
    peopleFed: 0
  });
  const [loading, setLoading] = useState(true);
  const appwriteService = new AppwriteService();

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await appwriteService.getStats();
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
      <main className="px-6 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Bridge the Gap Between
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600"> Surplus & Need</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Millions face hunger while tons of food go to waste. FoodLink connects surplus food from households and events with NGOs who deliver it to those in need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-emerald-700 transition-all transform hover:scale-105 shadow-lg cursor-pointer">
              Share Food
            </button>
            <button className="border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all cursor-pointer">
              Join as NGO 
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-20">
          <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-200 dark:border-emerald-700">
            <div className="text-4xl font-bold text-emerald-600 mb-2">
              {loading ? '...' : stats.estimatedMeals.toLocaleString()}
            </div>
            <div className="text-emerald-700 dark:text-emerald-300 font-medium">Meals Shared</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200 dark:border-blue-700">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {loading ? '...' : stats.activeDonors}
            </div>
            <div className="text-blue-700 dark:text-blue-300 font-medium">Active Donors</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-200 dark:border-purple-700">
            <div className="text-4xl font-bold text-purple-600 mb-2">
              {loading ? '...' : stats.partnerNGOs}
            </div>
            <div className="text-purple-700 dark:text-purple-300 font-medium">Partner NGOs</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200 dark:border-orange-700">
            <div className="text-4xl font-bold text-orange-600 mb-2">
              {loading ? '...' : stats.peopleFed.toLocaleString()}
            </div>
            <div className="text-orange-700 dark:text-orange-300 font-medium">People Fed</div>
          </div>
        </div>


        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">How FoodLink Works</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">Simple steps to reduce waste and fight hunger</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="text-center p-8 bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/30 dark:to-emerald-800/20 rounded-2xl">
            <MdPhoneAndroid className="text-5xl mb-4 mx-auto text-emerald-600" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Post Surplus Food</h3>
            <p className="text-gray-600 dark:text-gray-300">Share details about your excess food - quantity, type, and pickup location</p>
          </div>
          <div className="text-center p-8 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 rounded-2xl">
            <FaHandshake className="text-5xl mb-4 mx-auto text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">NGO Connection</h3>
            <p className="text-gray-600 dark:text-gray-300">Local NGOs and food banks receive notifications and coordinate pickup</p>
          </div>
          <div className="text-center p-8 bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/20 rounded-2xl">
            <FaHeart className="text-5xl mb-4 mx-auto text-purple-600" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Impact Created</h3>
            <p className="text-gray-600 dark:text-gray-300">Food reaches those in need, reducing waste and fighting hunger together</p>
          </div>
        </div>

        <div className="text-center bg-gradient-to-r from-emerald-600 to-blue-600 rounded-3xl p-12 text-white ">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands already fighting food waste and hunger</p>
          <button className="bg-white text-emerald-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
            Start Sharing Food Today
          </button>
        </div>
      </main>
  )
}

export default Home