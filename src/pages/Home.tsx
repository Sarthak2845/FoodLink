import { MdPhoneAndroid } from "react-icons/md";
import { FaHandshake, FaHeart } from "react-icons/fa";
const Home = () => {
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

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="text-3xl font-bold text-emerald-600 mb-2">828M+</div>
            <div className="text-gray-600 dark:text-gray-300">People face hunger globally</div>
          </div>
          <div className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">1.3B</div>
            <div className="text-gray-600 dark:text-gray-300">Tons of food wasted annually</div>
          </div>
          <div className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">Zero</div>
            <div className="text-gray-600 dark:text-gray-300">Cost to make a difference</div>
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
