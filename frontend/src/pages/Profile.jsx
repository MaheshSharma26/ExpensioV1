import React, { useState, useCallback, useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { User, Lock, Mail, Key, X, Eye, EyeOff } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import { profileStyles } from "../assets/dummyStyles";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

Modal.setAppElement('#root');

const PasswordInput = memo(({ name, label, value, error, showField, onToggle, onChange, disabled }) => (
  <div>
    <label className={profileStyles.passwordLabel}>
      {label}
    </label>
    <div className={profileStyles.passwordContainer}>
      <input
        type={showField ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        className={`${profileStyles.inputWithError} ${
          error ? 'border-red-300' : 'border-gray-200'
        }`}
        placeholder=""
        disabled={disabled}
        key={`password-input-${name}`}
      />
      <button
        type="button"
        onClick={onToggle}
        className={profileStyles.passwordToggle}
        disabled={disabled}
      >
        {showField ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    </div>
    {error && (
      <p className={profileStyles.errorText}>{error}</p>
    )}
  </div>
));

PasswordInput.displayName = 'PasswordInput';

const ProfilePage = ({ user: profileUser, onUpdateProfile, onLogout }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ 
    name: '', 
    email: '',
    joinDate: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [tempUser, setTempUser] = useState({ ...user });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setTempUser(parsed);
      } catch (e) {
        console.error("Failed to parse user in profile", e);
      }
    } else if (profileUser) {
      setUser(profileUser);
      setTempUser(profileUser);
    }
  }, [profileUser]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setTempUser(prev => ({ ...prev, [name]: value }));
  }, []);

  const handlePasswordChange = useCallback((e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    setPasswordErrors(prev => ({ ...prev, [name]: '' }));
  }, []);

  const togglePasswordVisibility = useCallback((field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  }, []);

  const validatePassword = useCallback(() => {
    const errors = {};
    if (!passwordData.current) errors.current = 'Current password is required';
    if (!passwordData.new) {
      errors.new = 'New password is required';
    } else {
      const hasUppercase = /[A-Z]/.test(passwordData.new);
      const hasLowercase = /[a-z]/.test(passwordData.new);
      const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(passwordData.new);
      
      if (passwordData.new.length < 8) {
        errors.new = 'Password must be at least 8 characters';
      } else if (!hasUppercase || !hasLowercase) {
        errors.new = 'Password must contain both uppercase and lowercase letters';
      } else if (!hasSymbol) {
        errors.new = 'Password must contain at least one symbol';
      }
    }
    if (passwordData.new !== passwordData.confirm) {
      errors.confirm = 'Passwords do not match';
    }
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  }, [passwordData]);

  const saveProfilePictureImmediately = async (base64Str) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
      const payload = {
        name: tempUser.name || user.name,
        email: tempUser.email || user.email,
        profilePicture: base64Str
      };

      const res = await axios.put(`${API_BASE}/user/updateprofile`, payload, { headers });
      if (res.data?.success) {
        const updated = res.data.user || payload;
        setUser(updated);
        setTempUser(updated);
        
        const isRemember = localStorage.getItem("token") ? true : false;
        const storage = isRemember ? localStorage : sessionStorage;
        storage.setItem("user", JSON.stringify(updated));
        
        if (typeof onUpdateProfile === "function") {
          onUpdateProfile(updated);
        }
        toast.success("Profile picture updated successfully!");
      }
    } catch (err) {
      console.error("Failed to upload profile picture:", err);
      toast.error(err.response?.data?.message || "Failed to upload profile picture.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file.");
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image file is too large (max 5MB).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const size = 150;
        canvas.width = size;
        canvas.height = size;
        
        const sourceSize = Math.min(img.width, img.height);
        const sourceX = (img.width - sourceSize) / 2;
        const sourceY = (img.height - sourceSize) / 2;
        
        ctx.drawImage(img, sourceX, sourceY, sourceSize, sourceSize, 0, 0, size, size);
        const base64Str = canvas.toDataURL("image/jpeg", 0.85);
        
        setTempUser(prev => ({ ...prev, profilePicture: base64Str }));
        
        if (!editMode) {
          saveProfilePictureImmediately(base64Str);
        } else {
          toast.info("Image selected! Click 'Save Changes' to apply.");
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!tempUser.name || !tempUser.email) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const res = await axios.put(`${API_BASE}/user/updateprofile`, {
        name: tempUser.name,
        email: tempUser.email,
        profilePicture: tempUser.profilePicture || user.profilePicture || ""
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data?.success) {
        const updated = res.data.user || tempUser;
        setUser(updated);
        
        const isRemember = localStorage.getItem("token") ? true : false;
        const storage = isRemember ? localStorage : sessionStorage;
        storage.setItem("user", JSON.stringify(updated));
        
        if (typeof onUpdateProfile === "function") {
          onUpdateProfile(updated);
        }
        toast.success("Profile updated successfully!");
        setEditMode(false);
      }
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const res = await axios.put(`${API_BASE}/user/changepassword`, {
        currentPassword: passwordData.current,
        newPassword: passwordData.new
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data?.success) {
        toast.success("Password changed successfully!");
        setShowPasswordModal(false);
        setPasswordData({ current: "", new: "", confirm: "" });
        setPasswordErrors({});
        setShowPassword({ current: false, new: false, confirm: false });
      }
    } catch (err) {
      console.error("Change password error:", err);
      toast.error(err.response?.data?.message || "Failed to change password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    if (typeof onLogout === "function") {
      onLogout();
    }
    navigate("/login");
  }, [onLogout, navigate]);

  const closePasswordModal = useCallback(() => {
    if (!loading) {
      setShowPasswordModal(false);
      setPasswordData({ current: "", new: "", confirm: "" });
      setPasswordErrors({});
      setShowPassword({ current: false, new: false, confirm: false });
    }
  }, [loading]);

  const initials = user.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className={profileStyles.container}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className={profileStyles.mainContainer}>
        <div className={profileStyles.header}>
          <div 
            onClick={() => document.getElementById("profilePicInput").click()}
            className={`${profileStyles.avatar} relative overflow-hidden group cursor-pointer hover:opacity-90 transition-all flex items-center justify-center`}
            style={{ width: "80px", height: "80px" }}
            title="Click to change profile picture"
          >
            {tempUser.profilePicture || user.profilePicture ? (
              <img 
                src={tempUser.profilePicture || user.profilePicture} 
                alt="Avatar" 
                className="w-full h-full object-cover transition-transform group-hover:scale-105" 
              />
            ) : (
              <span className="font-extrabold">{initials}</span>
            )}
            
            {/* Dark camera icon overlay on hover */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
            </div>
            
            <input
              type="file"
              id="profilePicInput"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              disabled={loading}
            />
          </div>
          <h1 className={profileStyles.userName}>{user.name || "Loading..."}</h1>
          <p className={profileStyles.userEmail}>{user.email || "Loading..."}</p>
        </div>

        <div className={profileStyles.content}>
          <div className={profileStyles.grid}>
            <div className={profileStyles.card}>
              <div className="flex justify-between items-center mb-6">
                <h2 className={profileStyles.cardTitle}>
                  <User className={profileStyles.icon} />
                  Personal Information
                </h2>
                {!editMode && (
                  <button
                    onClick={() => setEditMode(true)}
                    className={profileStyles.editButton}
                    disabled={loading}
                  >
                    Edit
                  </button>
                )}
              </div>

              {editMode ? (
                <div className="space-y-4">
                  <div>
                    <label className={profileStyles.label}>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={tempUser.name}
                      onChange={handleInputChange}
                      className={profileStyles.input}
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className={profileStyles.label}>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={tempUser.email}
                      onChange={handleInputChange}
                      className={profileStyles.input}
                      disabled={loading}
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleSave}
                      className={profileStyles.buttonPrimary}
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      onClick={() => {
                        setTempUser(user);
                        setEditMode(false);
                      }}
                      className={profileStyles.buttonSecondary}
                      disabled={loading}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className={profileStyles.label}>Full Name</p>
                    <p className="font-medium text-gray-800">{user.name || "Loading..."}</p>
                  </div>
                  <div>
                    <p className={profileStyles.label}>Email Address</p>
                    <p className="font-medium text-gray-800">{user.email || "Loading..."}</p>
                  </div>
                </div>
              )}
            </div>

            <div className={profileStyles.card}>
              <h2 className={profileStyles.cardTitle}>
                <Lock className={profileStyles.icon} />
                Account Security
              </h2>
              <div className="space-y-4 mt-6">
                <div className={profileStyles.securityItem}>
                  <div>
                    <p className={profileStyles.securityText}>Password</p>
                  </div>
                  <button
                    onClick={() => setShowPasswordModal(true)}
                    className={profileStyles.changeButton}
                    disabled={loading}
                  >
                    Change
                  </button>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className={`${profileStyles.buttonPrimary} mt-6 w-full hover:opacity-90 transition-opacity`}
                disabled={loading}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showPasswordModal}
        onRequestClose={closePasswordModal}
        contentLabel="Change Password"
        className="modal"
        overlayClassName="modal-overlay"
        shouldCloseOnOverlayClick={!loading}
        shouldCloseOnEsc={!loading}
      >
        <div className={profileStyles.modalContent}>
          <div className={profileStyles.modalHeader}>
            <h3 className={profileStyles.modalTitle}>Change Password</h3>
            <button 
              onClick={closePasswordModal}
              className="text-gray-500 hover:text-gray-800 disabled:opacity-50"
              disabled={loading}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <PasswordInput
              name="current"
              label="Current Password"
              value={passwordData.current}
              error={passwordErrors.current}
              showField={showPassword.current}
              onToggle={() => togglePasswordVisibility('current')}
              onChange={handlePasswordChange}
              disabled={loading}
            />
            
            <PasswordInput
              name="new"
              label="New Password"
              value={passwordData.new}
              error={passwordErrors.new}
              showField={showPassword.new}
              onToggle={() => togglePasswordVisibility('new')}
              onChange={handlePasswordChange}
              disabled={loading}
            />
            
            <div className="text-xs text-gray-500 mt-2 space-y-1 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
              <p className="font-semibold text-gray-600">Password requirements:</p>
              <ul className="list-disc pl-4 space-y-0.5">
                <li>Must be at least 8 characters long</li>
                <li>Must contain mixed case letters (uppercase & lowercase)</li>
                <li>Must contain at least one symbol (e.g. @, #, $, !, etc.)</li>
              </ul>
            </div>
            
            <PasswordInput
              name="confirm"
              label="Confirm New Password"
              value={passwordData.confirm}
              error={passwordErrors.confirm}
              showField={showPassword.confirm}
              onToggle={() => togglePasswordVisibility('confirm')}
              onChange={handlePasswordChange}
              disabled={loading}
            />
            
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className={profileStyles.buttonPrimary}
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
              <button
                type="button"
                onClick={closePasswordModal}
                className={profileStyles.buttonSecondary}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ProfilePage;