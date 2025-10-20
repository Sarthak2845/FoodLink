import { MdPhoneAndroid, MdNotifications} from "react-icons/md";
import { FaHandshake, FaHeart, FaTruck, FaUsers } from "react-icons/fa";

const HowItWorks = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">

            <main className="px-6 py-24 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        How <span className="text-emerald-600">FoodLink</span> Works
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        A simple 6-step process to turn food waste into hope
                    </p>
                </div>

                <div className="space-y-16">
                    {/* Step 1 */}
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="md:w-1/2">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-emerald-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">1</div>
                                <MdPhoneAndroid className="text-4xl text-emerald-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">User Posts Surplus Food</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                Users upload details about their excess food including quantity, type, expiry date, and pickup location. Photos help NGOs assess the food quality and plan accordingly.
                            </p>
                        </div>
                        <div className="md:w-1/2 bg-gray-900 dark:bg-gray-800 rounded-2xl p-8 font-mono">
                            <div className="bg-black dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-700">
                                <h4 className="font-semibold mb-3 text-green-400">Food Details Required:</h4>
                                <ul className="space-y-2 text-sm text-gray-300">
                                    <li><span className="text-blue-400">•</span> <span className="text-yellow-300">foodType</span> & <span className="text-yellow-300">quantity</span></li>
                                    <li><span className="text-blue-400">•</span> <span className="text-yellow-300">expiryDate</span></li>
                                    <li><span className="text-blue-400">•</span> <span className="text-yellow-300">pickupAddress</span> & <span className="text-yellow-300">time</span></li>
                                    <li><span className="text-blue-400">•</span> <span className="text-yellow-300">contactInfo</span></li>
                                    <li><span className="text-blue-400">•</span> <span className="text-yellow-300">foodPhotos</span></li>
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
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">NGOs Get Notified</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                Registered NGOs and food banks in the area receive instant notifications about available food. They can view all details and decide if they can collect it.
                            </p>
                        </div>
                        <div className="md:w-1/2 bg-gray-900 dark:bg-gray-800 rounded-2xl p-8 font-mono">
                            <div className="bg-black dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-700">
                                <h4 className="font-semibold mb-3 text-green-400">Notification Includes:</h4>
                                <ul className="space-y-2 text-sm text-gray-300">
                                    <li><span className="text-blue-400">•</span> <span className="text-yellow-300">foodDescription</span> & <span className="text-yellow-300">photos</span></li>
                                    <li><span className="text-blue-400">•</span> <span className="text-yellow-300">distanceFromNGO</span></li>
                                    <li><span className="text-blue-400">•</span> <span className="text-yellow-300">pickupTimeWindow</span></li>
                                    <li><span className="text-blue-400">•</span> <span className="text-yellow-300">donorContactDetails</span></li>
                                    <li><span className="text-blue-400">•</span> <span className="text-yellow-300">urgencyLevel</span></li>
                                </ul>
                            </div>
                        </div>

                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="md:w-1/2">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">3</div>
                                <FaHandshake className="text-4xl text-purple-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">NGO Contacts Donor</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                Interested NGOs contact the donor directly through the app to confirm pickup details, timing, and any special requirements for food collection.
                            </p>
                        </div>
                        <div className="md:w-1/2 bg-gray-900 dark:bg-gray-800 rounded-2xl p-8 font-mono">
                            <div className="bg-black dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-700">
                                <h4 className="font-semibold mb-3 text-green-400">Coordination Process:</h4>
                                <ul className="space-y-2 text-sm text-gray-300">
                                    <li><span className="text-blue-400">•</span> <span className="text-yellow-300">ngoExpressesInterest()</span></li>
                                    <li><span className="text-blue-400">•</span> <span className="text-yellow-300">directCommunication</span></li>
                                    <li><span className="text-blue-400">•</span> <span className="text-yellow-300">confirmPickupDetails()</span></li>
                                    <li><span className="text-blue-400">•</span> <span className="text-yellow-300">shareVolunteerInfo</span></li>
                                    <li><span className="text-blue-400">•</span> <span className="text-yellow-300">setBackupPlans()</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Step 4 */}
                    <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                        <div className="md:w-1/2">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">4</div>
                                <FaTruck className="text-4xl text-orange-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Food Collection</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                NGO volunteers arrive at the specified time to collect the food. They verify the food quality and quantity, ensuring safe transportation to distribution centers.
                            </p>
                        </div>
                        <div className="md:w-1/2 bg-gray-900 dark:bg-gray-800 rounded-2xl p-8 font-mono">
                            <div className="bg-black dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-700">
                                <h4 className="font-semibold mb-3 text-green-400">Collection Process:</h4>
                                <ul className="space-y-2 text-sm text-gray-300">
                                    <li><span className="text-blue-400">•</span> <span className="text-yellow-300">volunteerArrives()</span></li>
                                    <li><span className="text-blue-400">•</span> <span className="text-yellow-300">verifyFoodQuality()</span></li>
                                    <li><span className="text-blue-400">•</span> <span className="text-yellow-300">packageAndLabel()</span></li>
                                    <li><span className="text-blue-400">•</span> <span className="text-yellow-300">temperatureControlledTransport</span></li>
                                    <li><span className="text-blue-400">•</span> <span className="text-yellow-300">confirmReceipt()</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Step 5 */}
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="md:w-1/2">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">5</div>
                                <FaUsers className="text-4xl text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Food Distribution</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                NGOs distribute the collected food to beneficiaries through their established networks - soup kitchens, shelters, community centers, or direct distribution to families in need.
                            </p>
                        </div>
                        <div className="md:w-1/2 bg-gray-900 dark:bg-gray-800 rounded-2xl p-8 font-mono">
                            <div className="bg-black dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-700">
                                <h4 className="font-semibold mb-3 text-green-400">Distribution Channels:</h4>
                                <ul className="space-y-2 text-sm text-gray-300">
                                    <li><span className="text-blue-400">•</span> <span className="text-yellow-300">communityKitchens</span></li>
                                    <li><span className="text-blue-400">•</span> <span className="text-yellow-300">homelessShelters</span></li>
                                    <li><span className="text-blue-400">•</span> <span className="text-yellow-300">foodBanks</span></li>
                                    <li><span className="text-blue-400">•</span> <span className="text-yellow-300">directFamilyAssistance</span></li>
                                    <li><span className="text-blue-400">•</span> <span className="text-yellow-300">emergencyReliefCenters</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Step 6 */}
                    <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                        <div className="md:w-1/2">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">6</div>
                                <FaHeart className="text-4xl text-red-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Impact Created</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                Both donor and NGO receive impact reports showing how many people were fed, environmental impact saved, and community benefit created through their collaboration.
                            </p>
                        </div>
                        <div className="md:w-1/2 bg-gray-900 dark:bg-gray-800 rounded-2xl p-8 font-mono">
                            <div className="bg-black dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-700">
                                <h4 className="font-semibold mb-3 text-green-400">Impact Metrics:</h4>
                                <ul className="space-y-2 text-sm text-gray-300">
                                    <li><span className="text-blue-400">•</span> <span className="text-yellow-300">peopleFed</span></li>
                                    <li><span className="text-blue-400">•</span> <span className="text-yellow-300">co2EmissionsPrevented</span></li>
                                    <li><span className="text-blue-400">•</span> <span className="text-yellow-300">foodWasteReduced</span></li>
                                    <li><span className="text-blue-400">•</span> <span className="text-yellow-300">communityImpactScore</span></li>
                                    <li><span className="text-blue-400">•</span> <span className="text-yellow-300">thankYouMessages</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-20 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-3xl p-12 text-white">
                    <h2 className="text-3xl font-bold mb-4">Ready to Start Making a Difference?</h2>
                    <p className="text-xl mb-8 opacity-90">Join our community of food heroes today</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-emerald-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all cursor-pointer">
                            Share Food Now
                        </button>
                        <button className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all cursor-pointer">
                            Register as NGO
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default HowItWorks
