import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { AppwriteService } from '../appwrite/appwrite';
import { useNavigate } from 'react-router';
import GooglePlacesInput from '../components/GooglePlacesInput';
import { MdFastfood, MdScale, MdSchedule, MdLocationOn, MdPhone, MdDescription } from 'react-icons/md';

const DonatePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    food_type: '',
    quantity: '',
    expiry_date: '',
    pickup_address: '',
    pickup_time: '',
    contact_info: '',
    description: ''
  });

  const appwriteService = new AppwriteService();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await appwriteService.createFoodDonation({
        ...formData,
        donor_id: user.$id,
        status: 'available'
      });
      console.log('Donation created:', result);
      alert('🎉 Food donation posted successfully!');
      navigate('/dashboard');
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

  return (
    <div className="page-gradient min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        <div className="card p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🍽️</div>
            <h1 className="text-4xl font-bold text-primary mb-2">Share Your Food</h1>
            <p className="text-secondary text-lg">Help reduce waste and feed those in need</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-secondary mb-3">
                  <MdFastfood className="inline mr-2" />
                  Food Type
                </label>
                <select 
                  name="food_type" 
                  value={formData.food_type} 
                  onChange={handleChange} 
                  required 
                  className="input-field"
                >
                  <option value="">Select food type</option>
                  <option value="cooked_meals">🍛 Cooked Meals</option>
                  <option value="packaged_food">📦 Packaged Food</option>
                  <option value="fresh_produce">🥬 Fresh Produce</option>
                  <option value="baked_goods">🍞 Baked Goods</option>
                  <option value="beverages">🥤 Beverages</option>
                  <option value="other">🍴 Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-3">
                  <MdScale className="inline mr-2" />
                  Quantity
                </label>
                <input 
                  type="text" 
                  name="quantity" 
                  value={formData.quantity} 
                  onChange={handleChange} 
                  required 
                  className="input-field" 
                  placeholder="e.g., 10 servings, 5kg, 20 packets" 
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-secondary mb-3">
                  <MdSchedule className="inline mr-2" />
                  Best Before / Expiry
                </label>
                <input 
                  type="datetime-local" 
                  name="expiry_date" 
                  value={formData.expiry_date} 
                  onChange={handleChange} 
                  required 
                  className="input-field" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-3">
                  <MdSchedule className="inline mr-2" />
                  Pickup Time
                </label>
                <input 
                  type="text" 
                  name="pickup_time" 
                  value={formData.pickup_time} 
                  onChange={handleChange} 
                  required 
                  className="input-field" 
                  placeholder="e.g., 2-4 PM today, Evening" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-3">
                <MdLocationOn className="inline mr-2" />
                Pickup Address
              </label>
              <GooglePlacesInput
                value={formData.pickup_address}
                onChange={handleLocationChange}
                placeholder="Start typing your address..."
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-3">
                <MdPhone className="inline mr-2" />
                Contact Information
              </label>
              <input 
                type="text" 
                name="contact_info" 
                value={formData.contact_info} 
                onChange={handleChange} 
                required 
                className="input-field" 
                placeholder="Phone number or preferred contact method" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-3">
                <MdDescription className="inline mr-2" />
                Additional Details (Optional)
              </label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                rows={4} 
                className="input-field" 
                placeholder="Any special instructions, dietary information, or additional details..."
              />
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-lg border border-emerald-200 dark:border-emerald-700">
              <h3 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-2">📋 Before you post:</h3>
              <ul className="text-sm text-emerald-700 dark:text-emerald-400 space-y-1">
                <li>• Ensure food is safe and within expiry date</li>
                <li>• Be available during the specified pickup time</li>
                <li>• Package food properly for transport</li>
                <li>• Respond promptly to NGO inquiries</li>
              </ul>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="btn-primary w-full py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              {loading ? '🔄 Posting...' : '🚀 Post Food Donation'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;