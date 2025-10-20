import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Contacts = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      
      <main className="px-6 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Get in <span className="text-emerald-600">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Have questions about FoodLink? Want to partner with us? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent" placeholder="Your full name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent" placeholder="your.email@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                  <option>General Inquiry</option>
                  <option>NGO Partnership</option>
                  <option>Technical Support</option>
                  <option>Media & Press</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea rows={5} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent" placeholder="Tell us how we can help..."></textarea>
              </div>
              <button type="submit" className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-8 font-mono">
              <div className="bg-black dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-700">
                <h3 className="font-semibold mb-6 text-green-400">Contact Information</h3>
                <div className="space-y-4 text-gray-300">
                  <div className="flex items-center gap-4">
                    <MdEmail className="text-2xl text-blue-400" />
                    <span className="text-yellow-300">contact@foodlink.org</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <MdPhone className="text-2xl text-blue-400" />
                    <span className="text-yellow-300">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <MdLocationOn className="text-2xl text-blue-400" />
                    <span className="text-yellow-300">San Francisco, CA</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-8 font-mono">
              <div className="bg-black dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-700">
                <h3 className="font-semibold mb-6 text-green-400">Follow Us</h3>
                <div className="flex gap-6">
                  <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                    <FaGithub className="text-2xl" />
                  </a>
                  <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                    <FaLinkedin className="text-2xl" />
                  </a>
                  <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                    <FaTwitter className="text-2xl" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-8 font-mono">
              <div className="bg-black dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-700">
                <h3 className="font-semibold mb-4 text-green-400">Office Hours</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div><span className="text-blue-400">Monday - Friday:</span> <span className="text-yellow-300">9:00 AM - 6:00 PM</span></div>
                  <div><span className="text-blue-400">Saturday:</span> <span className="text-yellow-300">10:00 AM - 4:00 PM</span></div>
                  <div><span className="text-blue-400">Sunday:</span> <span className="text-yellow-300">Closed</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">How do I register my NGO?</h3>
              <p className="text-gray-600 dark:text-gray-300">Contact us with your NGO registration documents and we&apos;ll help you get started on the platform.</p>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Is there a cost to use FoodLink?</h3>
              <p className="text-gray-600 dark:text-gray-300">FoodLink is completely free for both food donors and NGOs. Our mission is to reduce food waste, not create barriers.</p>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">What types of food can be shared?</h3>
              <p className="text-gray-600 dark:text-gray-300">Any safe, edible food that&apos;s within its expiry date. This includes cooked meals, packaged foods, fresh produce, and baked goods.</p>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">How do you ensure food safety?</h3>
              <p className="text-gray-600 dark:text-gray-300">We provide guidelines for food safety and our partner NGOs are trained in proper food handling and verification procedures.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Contacts
