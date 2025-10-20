import { MdVerifiedUser, MdNotifications, MdAnalytics, MdSupport } from "react-icons/md";
import { FaUsers, FaHandshake, FaTruck, FaChartLine } from "react-icons/fa";
const ForNGO = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      
      <main className="px-6 py-24 max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Partner with <span className="text-emerald-600">FoodLink</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Join our network of NGOs and food banks to efficiently collect surplus food and serve your community better.
          </p>
          <button className="bg-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-emerald-700 transition-all transform hover:scale-105 shadow-lg">
            Register Your NGO
          </button>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="text-center p-8 bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/30 dark:to-emerald-800/20 rounded-2xl">
            <MdNotifications className="text-5xl text-emerald-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Real-time Notifications</h3>
            <p className="text-gray-600 dark:text-gray-300">Get instant alerts when food becomes available in your area</p>
          </div>
          <div className="text-center p-8 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 rounded-2xl">
            <FaUsers className="text-5xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Expand Your Reach</h3>
            <p className="text-gray-600 dark:text-gray-300">Access more food sources and serve more people in need</p>
          </div>
          <div className="text-center p-8 bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/20 rounded-2xl">
            <MdAnalytics className="text-5xl text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Impact Tracking</h3>
            <p className="text-gray-600 dark:text-gray-300">Monitor your impact with detailed analytics and reports</p>
          </div>
        </div>

        {/* How it Works for NGOs */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">How It Works for NGOs</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">Simple steps to start collecting surplus food</p>
        </div>

        <div className="space-y-16 mb-20">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-emerald-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">1</div>
                <MdVerifiedUser className="text-4xl text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Register & Verify</h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Submit your NGO registration documents and get verified on our platform. We ensure all partners are legitimate organizations.
              </p>
            </div>
            <div className="md:w-1/2 bg-gray-900 dark:bg-gray-800 rounded-2xl p-8 font-mono">
              <div className="bg-black dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-700">
                <h4 className="font-semibold mb-3 text-green-400">Registration Requirements:</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><span className="text-blue-400">•</span> <span className="text-yellow-300">ngoRegistrationCertificate</span></li>
                  <li><span className="text-blue-400">•</span> <span className="text-yellow-300">taxExemptionDocument</span></li>
                  <li><span className="text-blue-400">•</span> <span className="text-yellow-300">organizationAddress</span></li>
                  <li><span className="text-blue-400">•</span> <span className="text-yellow-300">contactPersonDetails</span></li>
                  <li><span className="text-blue-400">•</span> <span className="text-yellow-300">serviceAreaCoverage</span></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="md:w-1/2">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">2</div>
                <MdNotifications className="text-4xl text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Receive Notifications</h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Get real-time alerts when food becomes available in your service area. Filter by food type, quantity, and distance.
              </p>
            </div>
            <div className="md:w-1/2 bg-gray-900 dark:bg-gray-800 rounded-2xl p-8 font-mono">
              <div className="bg-black dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-700">
                <h4 className="font-semibold mb-3 text-green-400">Notification Filters:</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><span className="text-blue-400">•</span> <span className="text-yellow-300">foodType</span> (meals, produce, packaged)</li>
                  <li><span className="text-blue-400">•</span> <span className="text-yellow-300">minimumQuantity</span></li>
                  <li><span className="text-blue-400">•</span> <span className="text-yellow-300">maxDistance</span> (km radius)</li>
                  <li><span className="text-blue-400">•</span> <span className="text-yellow-300">urgencyLevel</span></li>
                  <li><span className="text-blue-400">•</span> <span className="text-yellow-300">availableTimeSlots</span></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">3</div>
                <FaTruck className="text-4xl text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Coordinate Pickup</h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Contact donors directly through the app to arrange pickup times and coordinate with your volunteers for efficient collection.
              </p>
            </div>
            <div className="md:w-1/2 bg-gray-900 dark:bg-gray-800 rounded-2xl p-8 font-mono">
              <div className="bg-black dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-700">
                <h4 className="font-semibold mb-3 text-green-400">Pickup Coordination:</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><span className="text-blue-400">•</span> <span className="text-yellow-300">expressInterest()</span></li>
                  <li><span className="text-blue-400">•</span> <span className="text-yellow-300">contactDonor()</span></li>
                  <li><span className="text-blue-400">•</span> <span className="text-yellow-300">schedulePickup()</span></li>
                  <li><span className="text-blue-400">•</span> <span className="text-yellow-300">assignVolunteer()</span></li>
                  <li><span className="text-blue-400">•</span> <span className="text-yellow-300">trackPickupStatus()</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Platform Features</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center">
            <FaChartLine className="text-3xl text-emerald-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Analytics Dashboard</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Track your impact and performance</p>
          </div>
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center">
            <MdSupport className="text-3xl text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">24/7 Support</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Get help whenever you need it</p>
          </div>
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center">
            <FaHandshake className="text-3xl text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Network Access</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Connect with other NGOs</p>
          </div>
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center">
            <MdVerifiedUser className="text-3xl text-orange-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Verified Donors</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Work with trusted food sources</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-emerald-600 to-blue-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Network?</h2>
          <p className="text-xl mb-8 opacity-90">Start collecting surplus food and serving more people today</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all">
              Register Your NGO
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ForNGO
