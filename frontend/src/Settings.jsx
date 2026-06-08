import {
  useState
} from 'react';

import toast from 'react-hot-toast';

import axios from 'axios';

function Settings() {

  const user =
    JSON.parse(
      localStorage.getItem(
        'user'
      )
    );

  const [activeTab,
    setActiveTab] =
      useState('profile');

  const [name, setName] =
    useState(
      user.name || ''
    );

  const normalizeAvatarPath =
    (path) => {
      if (!path) {
        return '';
      }
      if (path.startsWith('http')) {
        return path;
      }
      return `http://localhost:5000${path.startsWith('/') ? path : `/${path}`}`;
    };

  const [avatarFile,
    setAvatarFile] =
      useState(null);

  const [avatarPreview,
    setAvatarPreview] =
      useState(
        normalizeAvatarPath(user.avatar || '')
      );

  const [bio, setBio] =
    useState(
      user.bio || ''
    );

  const [github, setGithub] =
    useState(
      user.github || ''
    );

  const [website, setWebsite] =
    useState(
      user.website || ''
    );

  const [social1, setSocial1] =
    useState(
      user.social1 || ''
    );

  const [social2, setSocial2] =
    useState(
      user.social2 || ''
    );

  const [social3, setSocial3] =
    useState(
      user.social3 || ''
    );

  const [showPasswordModal,
    setShowPasswordModal] =
      useState(false);

  const [currentPassword,
    setCurrentPassword] =
      useState('');

  const [newPassword,
    setNewPassword] =
      useState('');

  const [confirmPassword,
    setConfirmPassword] =
      useState('');

  const [securityError,
    setSecurityError] =
      useState('');

  const [isBusy,
    setIsBusy] =
      useState(false);

  const handleSave =
    async () => {

      try {
        setIsBusy(true);

        const formData =
          new FormData();

        formData.append('name', name);
        formData.append('bio', bio);
        formData.append('github', github);
        formData.append('website', website);
        formData.append('social1', social1);
        formData.append('social2', social2);
        formData.append('social3', social3);

        if (avatarFile) {
          formData.append('avatar', avatarFile);
        }

        const response =
          await axios.put(
            `http://localhost:5000/api/settings/${user.id}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          );

        localStorage.setItem(
          'user',
          JSON.stringify(
            response.data.user
          )
        );

        window.dispatchEvent(new Event('userUpdated'));

        setAvatarPreview(
          normalizeAvatarPath(response.data.user.avatar || '')
        );
        setAvatarFile(null);

        toast.success(
          'Profile updated'
        );
      } catch (error) {
        console.error(error);
        toast.error(
          'Update failed'
        );
      } finally {
        setIsBusy(false);
      }
    };

  const handlePasswordChange =
    async () => {
      if (!currentPassword || !newPassword || !confirmPassword) {
        setSecurityError(
          'Please fill in all password fields'
        );
        return;
      }

      if (newPassword !== confirmPassword) {
        setSecurityError('New password and confirmation must match');
        return;
      }

      if (newPassword === currentPassword) {
        setSecurityError('New password must be different from current password');
        return;
      }

      const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

      if (!passwordRequirements.test(newPassword)) {
        setSecurityError(
          'Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol'
        );
        return;
      }

      try {
        setSecurityError('');
        setIsBusy(true);

        await axios.post(
          `http://localhost:5000/api/settings/${user.id}/change-password`,
          {
            currentPassword,
            newPassword
          }
        );

        toast.success('Password changed successfully');
        setShowPasswordModal(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } catch (error) {
        console.error(error);
        setSecurityError(
          error.response?.data?.message ||
            'Password change failed'
        );
      } finally {
        setIsBusy(false);
      }
    };

  const handleLogout =
    () => {

      localStorage.clear();

      window.location.href = '/';
    };

  return (
    <div className="page-content">
      <h1>Settings</h1>

      <div className="settings-shell">
        <aside className="settings-sidebar">
          <button
            type="button"
            className={`settings-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            type="button"
            className={`settings-nav-item ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            Security
          </button>
        </aside>

        <div className="settings-content">
          {activeTab === 'profile' ? (
            <div className="card">
              <h2 className="card-title">Profile</h2>
              <div className="form-grid">
                <label className="full-width">
                  Name
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="input-field"
                  />
                </label>

                <label className="full-width">
                  Upload avatar
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      setAvatarFile(file || null);
                      setAvatarPreview(
                        file
                          ? URL.createObjectURL(file)
                          : normalizeAvatarPath(user.avatar || '')
                      );
                    }}
                    className="input-field"
                  />
                </label>

                {avatarPreview && (
                  <img
                    src={avatarPreview}
                    alt="avatar"
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginTop: '10px'
                    }}
                  />
                )}

                <label className="full-width">
                  Bio
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Bio"
                    className="input-field"
                    style={{ minHeight: '120px' }}
                  />
                </label>

                <label className="full-width">
                  GitHub URL
                  <input
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    placeholder="GitHub URL"
                    className="input-field"
                  />
                </label>

                <label className="full-width">
                  Website URL
                  <input
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="Website URL"
                    className="input-field"
                  />
                </label>

                <div className="section-title" style={{ marginTop: '16px' }}>
                  Social accounts
                </div>

                <label className="full-width">
                  Social account 1
                  <input
                    value={social1}
                    onChange={(e) => setSocial1(e.target.value)}
                    placeholder="https://"
                    className="input-field"
                  />
                </label>

                <label className="full-width">
                  Social account 2
                  <input
                    value={social2}
                    onChange={(e) => setSocial2(e.target.value)}
                    placeholder="https://"
                    className="input-field"
                  />
                </label>

                <label className="full-width">
                  Social account 3
                  <input
                    value={social3}
                    onChange={(e) => setSocial3(e.target.value)}
                    placeholder="https://"
                    className="input-field"
                  />
                </label>
              </div>

              <div className="settings-actions">
                <button
                  onClick={handleSave}
                  className="btn btn-primary"
                  disabled={isBusy}
                >
                  Save profile
                </button>
                <button
                  onClick={handleLogout}
                  className="btn btn-danger"
                  disabled={isBusy}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="card">
              <h2 className="card-title">Security</h2>
              <p style={{ marginBottom: '20px', color: 'var(--text-muted)' }}>
                Change your password in a separate secure flow.
              </p>
              <button
                onClick={() => setShowPasswordModal(true)}
                className="btn btn-secondary"
                disabled={isBusy}
              >
                Change password
              </button>
            </div>
          )}
        </div>
      </div>

      {showPasswordModal && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <div>
                <h2>Change password</h2>
                <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                  Enter your current password and choose a new password.
                </p>
              </div>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setShowPasswordModal(false)}
              >
                Close
              </button>
            </div>

            <div className="form-grid">
              <label className="full-width">
                Current password
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="input-field"
                  placeholder="Current password"
                />
              </label>

              <label className="full-width">
                New password
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input-field"
                  placeholder="New password"
                />
              </label>

              <label className="full-width">
                Confirm new password
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field"
                  placeholder="Confirm new password"
                />
              </label>

            </div>

            {securityError && (
              <div className="card" style={{ background: 'rgba(230,95,43,0.06)', color: 'var(--accent)', marginTop: '16px' }}>
                {securityError}
              </div>
            )}

            <div className="settings-actions" style={{ marginTop: '20px' }}>
              <button
                type="button"
                onClick={handlePasswordChange}
                className="btn btn-primary"
                disabled={isBusy}
              >
                Save new password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;