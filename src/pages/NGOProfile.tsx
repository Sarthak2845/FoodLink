import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { AppwriteService } from '../appwrite/appwrite';
import type { NGOData } from '../types/Users';

const NGOProfile = () => {
  const { user } = useAuth();
  const [ngoData, setNgoData] = useState<NGOData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    ngo_name: '',
    ngo_address: '',
    ngo_docs: ''
  });
  const appwriteService = new AppwriteService();

  useEffect(() => {
    loadNGOProfile();
  }, []);

  const loadNGOProfile = async () => {
    try {
      const profile = await appwriteService.getNGOProfile(user.$id);
      if (profile) {
        setNgoData(profile as NGOData);
        setFormData({
          ngo_name: profile.ngo_name || '',
          ngo_address: profile.ngo_address || '',
          ngo_docs: profile.ngo_docs || ''
        });
      }
    } catch (error) {
      console.error('NGO profile not found, will create new');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (ngoData) {
        await appwriteService.updateNGOProfile(ngoData.id, formData);
      } else {
        await appwriteService.createNGOProfile({
          user_id: user.$id,
          ...formData,
          is_verified: false
        });
      }
      await loadNGOProfile();
      setEditing(false);
    } catch (error) {
      console.error('Error saving NGO profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) return <div className="page-gradient flex items-center justify-center"><div className="loading-spinner"></div></div>;

  return (
    <div className="page-gradient p-6">
      <div className="max-w-4xl mx-auto">
        <div className="card p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-primary">NGO Profile</h1>
            {ngoData && (
              <span className={`px-3 py-1 rounded-full text-sm ${
                ngoData.is_verified 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
              }`}>
                {ngoData.is_verified ? '✓ Verified' : '⏳ Pending Verification'}
              </span>
            )}
          </div>

          {!editing && ngoData ? (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">NGO Name</h3>
                  <p className="text-secondary">{ngoData.ngo_name}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Address</h3>
                  <p className="text-secondary">{ngoData.ngo_address}</p>
                </div>
              </div>
              
              {ngoData.ngo_docs && (
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Documents</h3>
                  <p className="text-secondary break-all">{ngoData.ngo_docs}</p>
                </div>
              )}

              <button 
                onClick={() => setEditing(true)}
                className="btn-primary"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">NGO Name</label>
                <input 
                  type="text" 
                  name="ngo_name" 
                  value={formData.ngo_name} 
                  onChange={handleChange} 
                  required 
                  className="input-field" 
                  placeholder="Enter your NGO name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">NGO Address</label>
                <textarea 
                  name="ngo_address" 
                  value={formData.ngo_address} 
                  onChange={handleChange} 
                  required 
                  rows={3}
                  className="input-field" 
                  placeholder="Enter your NGO address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  NGO Documents (Registration Certificate, Tax Exemption, etc.)
                </label>
                <textarea 
                  name="ngo_docs" 
                  value={formData.ngo_docs} 
                  onChange={handleChange} 
                  rows={4}
                  className="input-field" 
                  placeholder="Paste document URLs or upload links here"
                />
                <p className="text-xs text-secondary mt-1">
                  Upload your documents to a cloud service and paste the links here
                </p>
              </div>

              <div className="flex gap-4">
                <button type="submit" disabled={loading} className="btn-primary">
                  {loading ? 'Saving...' : 'Save Profile'}
                </button>
                {ngoData && (
                  <button 
                    type="button" 
                    onClick={() => setEditing(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          )}

          {!ngoData && !editing && (
            <div className="text-center py-8">
              <p className="text-secondary mb-4">Complete your NGO profile to start receiving donations</p>
              <button 
                onClick={() => setEditing(true)}
                className="btn-primary"
              >
                Create NGO Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NGOProfile;