import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/config';

const inputStyle = {
  width: '100%',
  padding: '0.5rem 0.75rem',
  background: '#111827',
  border: '1px solid #374151',
  borderRadius: '0.5rem',
  color: '#fff',
  transition: 'border-color 0.3s ease'
};

const labelStyle = {
  display: 'block',
  fontSize: '0.875rem',
  fontWeight: '500',
  color: '#d1d5db',
  marginBottom: '0.5rem'
};

const AdminPanel = () => {
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [driveLink, setDriveLink] = useState('');
  const [fileName, setFileName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCVs();
  }, []);

  const fetchCVs = async () => {
    try {
      setLoading(true);
      const response = await api.get('/cv/all');
      if (response.success) {
        setCvs(response.cvs);
      }
    } catch (err) {
      setError('Failed to fetch CVs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleCvUpload = async (e) => {
    e.preventDefault();
    if (!driveLink.trim()) {
      setError('Please enter a Google Drive link');
      return;
    }

    if (!driveLink.includes('drive.google.com')) {
      setError('Please enter a valid Google Drive link');
      return;
    }

    setError('');
    setUploading(true);

    try {
      const response = await api.post('/cv/upload', {
        driveLink: driveLink.trim(),
        fileName: fileName.trim() || 'Resume'
      });

      if (response.success) {
        await fetchCVs();
        setDriveLink('');
        setFileName('');
        setError('');
        alert(response.message);
      }
    } catch (err) {
      setError(err.message || 'Failed to save CV link');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteCV = async (id) => {
    if (!window.confirm('Are you sure you want to delete this CV?')) {
      return;
    }

    try {
      await api.delete(`/cv/delete/${id}`);
      await fetchCVs();
    } catch (err) {
      setError(err.message || 'Delete failed');
    }
  };

  const handleSetActiveCV = async (id) => {
    try {
      await api.patch(`/cv/set-active/${id}`);
      await fetchCVs();
    } catch (err) {
      setError(err.message || 'Failed to set active CV');
    }
  };

  return (
    <div className="min-h-screen text-white" style={{
      background: 'linear-gradient(135deg, #111827 0%, #000000 50%, #111827 100%)',
      padding: '1.5rem',
      overflowY: 'auto',
      overflowX: 'hidden'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h1 className="text-4xl font-bold" style={{
              background: 'linear-gradient(135deg, #f97316, #ea580c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Admin Panel
            </h1>
            <p style={{ color: '#9ca3af', marginTop: '0.5rem' }}>Manage your CV/Resume</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/')}
              style={{
                padding: '0.5rem 1.5rem',
                background: '#1f2937',
                borderRadius: '0.5rem',
                transition: 'background 0.3s ease',
                border: 'none',
                cursor: 'pointer',
                color: '#fff'
              }}
              onMouseEnter={(e) => e.target.style.background = '#374151'}
              onMouseLeave={(e) => e.target.style.background = '#1f2937'}
            >
              View Portfolio
            </button>
            <button
              onClick={handleLogout}
              style={{
                padding: '0.5rem 1.5rem',
                background: '#dc2626',
                borderRadius: '0.5rem',
                transition: 'background 0.3s ease',
                border: 'none',
                cursor: 'pointer',
                color: '#fff'
              }}
              onMouseEnter={(e) => e.target.style.background = '#b91c1c'}
              onMouseLeave={(e) => e.target.style.background = '#dc2626'}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid #ef4444',
            color: '#ef4444',
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            marginBottom: '1.5rem'
          }}>
            {error}
          </div>
        )}

        {/* CV Upload Form */}
        <>
          <div style={{
              background: 'rgba(31, 41, 55, 0.8)',
              padding: '1.5rem',
              borderRadius: '1rem',
              marginBottom: '2rem',
              border: '1px solid #374151'
            }}>
              <h2 className="text-2xl font-bold" style={{ marginBottom: '1.5rem' }}>
                Add Resume Link
              </h2>
              <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '1rem' }}>
                Note: Adding a new resume will automatically delete the previous one.
              </p>
              <form onSubmit={handleCvUpload}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={labelStyle}>Resume Name (Optional)</label>
                  <input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    placeholder="e.g., My Resume 2024"
                    style={inputStyle}
                  />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={labelStyle}>Google Drive View Link *</label>
                  <input
                    type="url"
                    value={driveLink}
                    onChange={(e) => setDriveLink(e.target.value)}
                    placeholder="https://drive.google.com/file/d/.../view"
                    required
                    style={inputStyle}
                  />
                  <p style={{ color: '#6b7280', marginTop: '0.5rem', fontSize: '0.75rem' }}>
                    Paste your Google Drive shareable link here (view access required)
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={uploading}
                  style={{
                    padding: '0.5rem 1.5rem',
                    background: uploading ? '#6b7280' : 'linear-gradient(135deg, #f97316, #ea580c)',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    transition: 'background 0.3s ease',
                    border: 'none',
                    cursor: uploading ? 'not-allowed' : 'pointer',
                    color: '#fff'
                  }}
                  onMouseEnter={(e) => !uploading && (e.target.style.background = 'linear-gradient(135deg, #ea580c, #dc2626)')}
                  onMouseLeave={(e) => !uploading && (e.target.style.background = 'linear-gradient(135deg, #f97316, #ea580c)')}
                >
                  {uploading ? 'Saving...' : 'Save Resume Link'}
                </button>
              </form>
            </div>

            {/* CV List */}
            <div style={{
              background: 'rgba(31, 41, 55, 0.8)',
              padding: '1.5rem',
              borderRadius: '1rem',
              border: '1px solid #374151'
            }}>
              <h2 className="text-2xl font-bold" style={{ marginBottom: '1.5rem' }}>Current Resume</h2>
              
              {loading ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>Loading resume...</div>
              ) : cvs.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>No resume found. Add your first resume link!</div>
              ) : (
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {cvs.map((cv) => (
                    <div
                      key={cv._id}
                      style={{
                        background: '#111827',
                        padding: '1.5rem',
                        borderRadius: '0.5rem',
                        border: cv.isActive ? '2px solid #10b981' : '1px solid #374151',
                        transition: 'border-color 0.3s ease'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '1rem'
                      }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <h3 className="text-lg font-bold">{cv.fileName}</h3>
                            {cv.isActive && (
                              <span style={{
                                background: '#10b981',
                                color: '#fff',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '0.25rem',
                                fontSize: '0.75rem',
                                fontWeight: '600'
                              }}>
                                ACTIVE
                              </span>
                            )}
                          </div>
                          <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                            Uploaded: {new Date(cv.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                          <a
                            href={cv.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: '0.5rem 1rem',
                              background: '#6b7280',
                              borderRadius: '0.5rem',
                              fontSize: '0.875rem',
                              transition: 'background 0.3s ease',
                              border: 'none',
                              cursor: 'pointer',
                              color: '#fff',
                              textDecoration: 'none'
                            }}
                            onMouseEnter={(e) => e.target.style.background = '#4b5563'}
                            onMouseLeave={(e) => e.target.style.background = '#6b7280'}
                          >
                            View
                          </a>
                          {!cv.isActive && (
                            <button
                              onClick={() => handleSetActiveCV(cv._id)}
                              style={{
                                padding: '0.5rem 1rem',
                                background: '#10b981',
                                borderRadius: '0.5rem',
                                fontSize: '0.875rem',
                                transition: 'background 0.3s ease',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#fff'
                              }}
                              onMouseEnter={(e) => e.target.style.background = '#059669'}
                              onMouseLeave={(e) => e.target.style.background = '#10b981'}
                            >
                              Set Active
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteCV(cv._id)}
                            style={{
                              padding: '0.5rem 1rem',
                              background: '#dc2626',
                              borderRadius: '0.5rem',
                              fontSize: '0.875rem',
                              transition: 'background 0.3s ease',
                              border: 'none',
                              cursor: 'pointer',
                              color: '#fff'
                            }}
                            onMouseEnter={(e) => e.target.style.background = '#b91c1c'}
                            onMouseLeave={(e) => e.target.style.background = '#dc2626'}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )
      </div>
    </div>
  );
};

export default AdminPanel;
