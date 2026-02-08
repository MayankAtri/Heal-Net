import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../components/common/AnimatedBackground';

export default function Profile() {
  const { user, updateProfile, changePassword, logout } = useAuth();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    profilePicture: user?.profilePicture || ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    setLoading(true);

    try {
      const result = await updateProfile(formData);

      if (result.success) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        setEditing(false);
      } else {
        setMessage({ type: 'error', text: result.error || 'Update failed' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }

    setLoading(true);

    try {
      const result = await changePassword(passwordData.currentPassword, passwordData.newPassword);

      if (result.success) {
        setMessage({ type: 'success', text: result.message || 'Password changed successfully!' });
        setChangingPassword(false);
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setMessage({ type: 'error', text: result.error || 'Password change failed' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const inputClass = "w-full px-4 py-2.5 bg-stone-50/50 dark:bg-dark-surface/50 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white rounded-xl text-sm transition-all duration-200 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50";

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground variant="default" />

      <div className="relative z-10 max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="mb-8">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 mb-3 block">Account</span>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-stone-900 dark:text-white">
              Profile Settings
            </h1>
          </div>

          {/* Message */}
          {message.text && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 px-4 py-3 rounded-xl text-sm border ${
                message.type === 'success'
                  ? 'bg-emerald-50/80 dark:bg-emerald-900/10 text-emerald-700 dark:text-emerald-300 border-emerald-200/50 dark:border-emerald-800/30'
                  : 'bg-red-50/80 dark:bg-red-900/10 text-red-700 dark:text-red-300 border-red-200/50 dark:border-red-800/30'
              }`}
            >
              {message.text}
            </motion.div>
          )}

          {/* Profile Information */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-xl rounded-2xl border border-stone-200/60 dark:border-stone-800/60 p-6 shadow-sm mb-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-semibold text-stone-900 dark:text-white">
                Profile Information
              </h2>
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Edit
                </button>
              )}
            </div>

            {editing ? (
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-stone-500 dark:text-stone-400 mb-1.5 uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-500 dark:text-stone-400 mb-1.5 uppercase tracking-wider">
                    Profile Picture URL
                  </label>
                  <input
                    type="url"
                    value={formData.profilePicture}
                    onChange={(e) => setFormData({ ...formData, profilePicture: e.target.value })}
                    className={inputClass}
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-xl text-sm font-medium hover:bg-stone-800 dark:hover:bg-stone-100 disabled:opacity-50 transition-colors"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(false);
                      setFormData({ name: user.name, profilePicture: user.profilePicture || '' });
                    }}
                    className="px-4 py-2 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-xl text-sm font-medium hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={user.name}
                      className="w-14 h-14 rounded-2xl object-cover"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-stone-900 dark:bg-white flex items-center justify-center text-white dark:text-stone-900 text-xl font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-stone-900 dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-sm text-stone-500 dark:text-stone-400">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-stone-200/50 dark:border-stone-700/50">
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Auth Provider: <span className="font-medium text-stone-700 dark:text-stone-300 capitalize">{user.authProvider}</span>
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    Member since: <span className="font-medium text-stone-700 dark:text-stone-300">{new Date(user.createdAt).toLocaleDateString()}</span>
                  </p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Change Password */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-xl rounded-2xl border border-stone-200/60 dark:border-stone-800/60 p-6 shadow-sm mb-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-semibold text-stone-900 dark:text-white">
                Change Password
              </h2>
              {!changingPassword && (
                <button
                  onClick={() => setChangingPassword(true)}
                  className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Change
                </button>
              )}
            </div>

            {changingPassword ? (
              <form onSubmit={handlePasswordChange} className="space-y-4">
                {user.authProvider !== 'google' && (
                  <div>
                    <label className="block text-xs font-medium text-stone-500 dark:text-stone-400 mb-1.5 uppercase tracking-wider">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-stone-500 dark:text-stone-400 mb-1.5 uppercase tracking-wider">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-500 dark:text-stone-400 mb-1.5 uppercase tracking-wider">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className={inputClass}
                    required
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-xl text-sm font-medium hover:bg-stone-800 dark:hover:bg-stone-100 disabled:opacity-50 transition-colors"
                  >
                    {loading ? 'Changing...' : 'Change Password'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setChangingPassword(false);
                      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    }}
                    className="px-4 py-2 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-xl text-sm font-medium hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <p className="text-sm text-stone-500 dark:text-stone-400">
                {user.authProvider === 'google'
                  ? 'Set a password to enable email/password login alongside Google.'
                  : 'Keep your account secure by regularly updating your password.'}
              </p>
            )}
          </motion.div>

          {/* Account Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-xl rounded-2xl border border-stone-200/60 dark:border-stone-800/60 p-6 shadow-sm"
          >
            <h2 className="text-sm font-semibold text-stone-900 dark:text-white mb-4">
              Account Actions
            </h2>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200/50 dark:border-red-800/30 text-red-700 dark:text-red-300 rounded-xl text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            >
              Log Out
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
